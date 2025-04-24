import { useEffect, useRef, useState } from "react";
import "./style.css";
import Trash from "../../assets/Trash.svg";
import api from "../../services/api";

function Home() {
  const [users, setUsers] = useState([]);
  const formRef = useRef(null);

  async function getUsers() {
    const usersFromApi = await api.get("/usuarios");

    setUsers(usersFromApi.data);
  }

  async function deleteUser(id) {
    await api.delete(`/usuarios/${id}`);
  }

  async function createUser(e) {
    e.preventDefault();
    const form = e.target;

    const nome = form.nome.value;
    const idade = form.idade.value;
    const email = form.email.value;
    await api.post("/usuarios", {
      name: nome,
      age: idade,
      email: email,
    });
    formRef.current.reset();
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="container">
      <form
        ref={formRef}
        onSubmit={async (e) => {
          await createUser(e);
          await getUsers();
        }}
      >
        <h1>Cadastro de Usuários</h1>
        <input name="nome" type="text" placeholder="Nome Completo" />
        <input name="idade" type="number" placeholder="Idade" />
        <input name="email" type="email" placeholder="Email" />
        <button type="submit">Cadastrar</button>
      </form>

      {users.map((user) => {
        return (
          <div key={user.id} className="card">
            <div>
              <p>
                Nome: <span>{user.name}</span>{" "}
              </p>
              <p>
                Idade: <span>{user.age}</span>{" "}
              </p>
              <p>
                Email: <span>{user.email}</span>{" "}
              </p>
            </div>
            <button
              onClick={async () => {
                await deleteUser(user.id);
                await getUsers();
              }}
            >
              <img src={Trash} />
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
