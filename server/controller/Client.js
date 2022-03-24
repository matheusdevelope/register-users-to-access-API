const Client = require("../models/Client.js");

const getPagination = (page, size) => {
  const limit = size ? +size : 100;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};
const getPagingData = (dataDB, page, limit, query) => {
  const { count: totalItems, rows: data } = dataDB;
  const currentPage = page ? +page : 0;
  const totalPages = Math.floor(totalItems / limit);

  return { totalItems, data, totalPages, currentPage, query };
};
module.exports = {
  async get(req, res) {
    const { page, size, id, name_client, company } = req.query;
    const query = req.query;
    let condition1 = id ? { id: id } : null;
    let condition2 = name_client ? { name_client: name_client } : null;
    let condition3 = company ? { company: company } : null;

    const { limit, offset } = getPagination(page, size);

    Client.findAndCountAll({
      where: condition1,
      condition2,
      condition3,
      limit,
      offset,
    })
      .then((data) => {
        const response = getPagingData(data, page, limit, query);
        res.send(response);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving data.",
        });
      });
  },
  async post(req, res) {
    let body = req.body;
    if (!body._id)
      return res.status(400).send("Body invalid, _id not provided");
    if (!body.user)
      return res.status(400).send("Body invalid, cnpj not provided");

    const find = Client.findOne({ where: { cnpj: body.user } });
    if (find.user) return res.status(400).send("User already registered");

    try {
      const client = await Client.create(req.body, { returning: false });
      res.json(client);
    } catch (e) {
      res.json(e);
    }
  },
  async put(req, res) {
    let array = req.body;
    let IdsToReturn = [];
    let ItensToReturn = [];
    let Errors = {
      original: {
        errors: {
          errorUpdate: [],
          errorFindItensToReturn: [],
        },
        message: "Error on update itens",
      },
    };
    function CreateOBJUpdate(obj) {
      let OBJ = {
        data: {},
        where: {
          where: {},
        },
      };
      delete obj.updatedAt;
      delete obj.createdAt;
      for (let props in obj) {
        OBJ.data[props] = obj[props];
      }
      OBJ.where.where = { id: obj.id };
      return OBJ;
    }
    async function LoopToUpdate() {
      for (let i = 0; i < array.length; i++) {
        const Data = CreateOBJUpdate(array[i]);
        await Client.update(Data.data, Data.where)
          .then((obj) => {
            IdsToReturn.push(Data.data.id);
          })
          .catch((e) => {
            Errors.original.errors.errorUpdate.push(e);
          });
      }
    }
    async function FindResultsById(params) {
      await Client.findAll({
        where: { id: params },
      })
        .then((obj) => {
          ItensToReturn = obj;
        })
        .catch((e) => {
          Errors.original.errors.errorFindItensToReturn.push(e);
        });
    }

    await LoopToUpdate(array);
    await FindResultsById(IdsToReturn);

    if (
      (Errors.original.errors.errorFindItensToReturn.length <= 0) &
      (Errors.original.errors.errorUpdate.length <= 0)
    ) {
      res.status(200).json(ItensToReturn);
    } else {
      res.status(400).json(Errors);
    }
  },
  async delete(req, res) {
    const { id, all } = req.query;
    let condition = id ? { id: +id } : null;
    // let condition1 = all ? { id: all } : null;
    try {
      const ret = await Client.destroy({
        where: condition,
      });
      res.status(200).json(ret);
    } catch (e) {
      res.status(200).json(e);
    }
  },
};
