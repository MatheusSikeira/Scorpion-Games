import React, { useState, useEffect } from "react";
import style from "./createUser.module.css";
import Input from "../form/Input.jsx";
import Button from "../form/Button.jsx";

const CreateUser = () => {
    // Estado para armazenar os dados do usuário
    const [user, setUser] = useState({});

    // Função para lidar com as mudanças nos campos de entrada
    const handleChangeUser = (event) => {
        setUser({ ...user, [event.target.name]: event.target.value });
        console.log(user)
    };

    // Função para enviar os dados do formulário
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(user);
        insertUser(user); // Chama a função para inserir o usuário no backend
    };

    // Função para inserir o usuário no backend via POST
    function insertUser(user) {
        fetch('http://127.0.0.1:5000/inserirUsuario', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*'
            },
            body: JSON.stringify(user)
        })
            .then((resp) => resp.json())
            .then((respJSON) => {
                console.log("RESPOSTA: ", respJSON);
                alert("Usuário cadastrado com sucesso!");
            })
            .catch((error) => {
                console.log("ERRO: ", error);
                alert("Erro ao cadastrar usuário. Tente novamente.");
            });
    }

    return (
        <section className={style.create_user_container}>
            <h1>Cadastro de Usuário</h1>

            <form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    name="nome_usuario"
                    id="nome_usuario"
                    placeholder="Digite o nome do usuário"
                    text="Nome do usuário"
                    handlerChange={handleChangeUser}
                />
                <Input
                    type="email"
                    name="email_usuario"
                    id="email_usuario"
                    placeholder="Digite o email do usuário"
                    text="Email do usuário"
                    handlerChange={handleChangeUser}
                />

                <Input
                    type="password"
                    name="senha_usuario"
                    id="senha_usuario"
                    placeholder="Digite a senha do usuário"
                    text="Senha do usuário"
                    handlerChange={handleChangeUser}
                />

                <Button title="Cadastrar" />
            </form>
        </section>
    );
};

export default CreateUser;