import * as React from "react";
import { IUser } from "../types/User";
interface FormElements extends HTMLFormControlsCollection {
  name: HTMLInputElement;
  cnpj: HTMLInputElement;
  expiration_files: HTMLInputElement;
  allow_access: HTMLInputElement;
}
interface FormAddUserElement extends HTMLFormElement {
  readonly elements: FormElements;
}

function FormAddUser({ onSubmitUser }: { onSubmitUser: (obj: IUser) => void }) {
  const InitialValues: IUser = {
    name: "",
    cnpj: "",
    expiration_files: 30,
    allow_access: true,
  };
  const [values, setValues] = React.useState<IUser>(InitialValues);

  function handleSubmit(event: React.FormEvent<FormAddUserElement>) {
    event.preventDefault();
    const ret = {
      name: event.currentTarget.elements.name.value,
      cnpj: event.currentTarget.elements.cnpj.value,
      expiration_files: Number(
        event.currentTarget.elements.expiration_files.value
      ),
      allow_access: event.currentTarget.elements.allow_access.checked,
    };
    if (ret.name.length < 1)
      return alert("Nome do usuário precisa ser preenchido!");
    if (ret.cnpj.length < 1) return alert("O CNPJ/CPF precisa ser preenchido!");
    if (ret.expiration_files < 5)
      return alert("O tempo de expiração precisa ser maior que 5 Dias!");

    onSubmitUser(ret);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Empresa</label>
        <input
          id="name"
          type="text"
          placeholder="Empresa"
          value={values.name}
        />
      </div>
      <div>
        <label htmlFor="CNPJ">CNPJ</label>
        <input id="cnpj" type="text" placeholder="CPNJ" value={values.cnpj} />
      </div>
      <label htmlFor="expiration_files">Expiração de Arquivos</label>
      <input
        id="expiration_files"
        type="number"
        value={values.expiration_files}
      />
      <div>
        <label htmlFor="allow_access">Acesso API</label>
        <input id="allow_access" type="checkbox" />
      </div>

      <button type="submit">Adicionar Usuário</button>
    </form>
  );
}
export default FormAddUser;
