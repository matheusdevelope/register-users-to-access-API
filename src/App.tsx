import { useState, FormEventHandler, FormEvent, SyntheticEvent } from "react";
import "./App.css";
import FormAddUser from "./FormAddUser";
import { User } from "./types/User";

function App() {
  const [usersList, setUserList] = useState<User[]>([]);
  function handleAddUser(user: User) {
    console.log(user);
  }
  return (
    <div className="App">
      <header className="App_Header">
        <p>REGISTRO USUÁRIOS API</p>
      </header>
      <section className="Users_Container">
        <FormAddUser onSubmitUser={handleAddUser} />
        <section className="Users_Container_List">
          <ul className="Users_List">
            {usersList.map((user, key) => (
              <div key={key}>{user.name}</div>
            ))}
          </ul>
        </section>
      </section>
    </div>
  );
}

export default App;
