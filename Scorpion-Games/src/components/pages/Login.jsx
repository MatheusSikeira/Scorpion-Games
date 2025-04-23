import React, { useState } from "react";
import style from "./createLogin.module.css";
import Input from "../form/Input.jsx";
import Button from "../form/Button.jsx";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Dados de login:", user);
  };

  return (
    <section className={style.create_login_container}>
      <h1>Login:</h1>
      <form onSubmit={handleSubmit}>
        <Input
          type="email"
          name="email"
          id="email"
          placeholder="Digite seu e-mail: "
          text="Insira seu e-mail: "
          handlerChange={handleChange}
        />

        <Input
          type="password"
          name="password"
          id="password"
          placeholder="Digite sua senha: "
          text="Insira sua senha: "
          handlerChange={handleChange}
        />

        <Button title="Entrar" />
      </form>
    </section>
  );
};

export default Login;
