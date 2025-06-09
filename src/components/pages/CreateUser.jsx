import React, { useState } from "react";
import style from "./createUser.module.css";
import Input from "../form/Input.jsx";
import Button from "../form/Button.jsx";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateUser = () => {
    // Estado para armazenar os dados do usuário
    const [user, setUser] = useState({
        nome_usuario: "",
        email_usuario: "",
        senha_usuario: "",
        tipo_usuario: "cliente",
        nome_loja: "",
        link_loja: ""
    });

    // Estado para campos inválidos
    const [invalidFields, setInvalidFields] = useState({});

    // Função para lidar com as mudanças nos campos de entrada
    const handleChangeUser = (event) => {
        setUser({ ...user, [event.target.name]: event.target.value });
        setInvalidFields({ ...invalidFields, [event.target.name]: false });
        // Faz scroll para o campo corrigido se estava inválido
        if (invalidFields[event.target.name]) {
            const el = document.getElementById(event.target.name);
            if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    };

    // Função para enviar os dados do formulário
    const handleSubmit = (event) => {
        event.preventDefault();

        // Validação dos campos obrigatórios
        const requiredFields = ["nome_usuario", "email_usuario", "senha_usuario", "tipo_usuario"];
        let newInvalidFields = {};

        requiredFields.forEach(field => {
            if (!user[field]) newInvalidFields[field] = true;
        });

        if (user.tipo_usuario === "vendedor") {
            if (!user.nome_loja) newInvalidFields.nome_loja = true;
            if (!user.link_loja) newInvalidFields.link_loja = true;
        }

        setInvalidFields(newInvalidFields);

        // Se houver campos inválidos, faz scroll até o primeiro
        if (Object.keys(newInvalidFields).length > 0) {
            toast.error("Preencha todos os campos obrigatórios.");
            const firstInvalid = Object.keys(newInvalidFields)[0];
            const el = document.getElementById(firstInvalid);
            if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
            return;
        }

        insertUser(user); // Chama a função para inserir o usuário no backend
    };

    // Função para inserir o usuário no backend via POST
    function insertUser(user) {
        fetch("http://127.0.0.1:5000/usuarios", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then((resp) => resp.json())
            .then((respJSON) => {
                if (respJSON.errorStatus) {
                    toast.error(respJSON.mensageStatus || "Erro ao cadastrar usuário.");
                } else {
                    toast.success("Usuário cadastrado com sucesso!");
                    setUser({
                        nome_usuario: "",
                        email_usuario: "",
                        senha_usuario: "",
                        tipo_usuario: "cliente",
                        nome_loja: "",
                        link_loja: ""
                    });
                    setInvalidFields({});
                }
            })
            .catch((error) => {
                toast.error("Erro ao cadastrar usuário. Tente novamente.");
            });
    }

    return (
        <section className={style.create_user_container}>
            <div className={style.form_title_wrapper}>
                <div className={style.lamina_top}></div>
                <div className={style.form_title_container}>
                    <div className={style.form_title}>Cadastro de Usuário</div>
                </div>
                <div className={style.lamina_bottom}></div>
            </div>

            <form onSubmit={handleSubmit} className={style.oriental_border}>
                <div className={style.form_group}>
                    <Input
                        type="text"
                        name="nome_usuario"
                        id="nome_usuario"
                        placeholder="Digite o nome do usuário"
                        text="Nome do usuário"
                        value={user.nome_usuario}
                        handlerChange={handleChangeUser}
                        style={invalidFields.nome_usuario ? { borderColor: "#ff5252", background: "#fff6f6" } : {}}
                    />
                    {invalidFields.nome_usuario && (
                        <span style={{ color: "#ff5252", fontSize: "0.95rem", marginTop: "4px" }}>
                            Preencha esse campo
                        </span>
                    )}
                </div>
                <div className={style.form_group}>
                    <Input
                        type="email"
                        name="email_usuario"
                        id="email_usuario"
                        placeholder="Digite o email do usuário"
                        text="Email do usuário"
                        value={user.email_usuario}
                        handlerChange={handleChangeUser}
                        style={invalidFields.email_usuario ? { borderColor: "#ff5252", background: "#fff6f6" } : {}}
                    />
                    {invalidFields.email_usuario && (
                        <span style={{ color: "#ff5252", fontSize: "0.95rem", marginTop: "4px" }}>
                            Preencha esse campo
                        </span>
                    )}
                </div>
                <div className={style.form_group}>
                    <Input
                        type="password"
                        name="senha_usuario"
                        id="senha_usuario"
                        placeholder="Digite a senha do usuário"
                        text="Senha do usuário"
                        value={user.senha_usuario}
                        handlerChange={handleChangeUser}
                        style={invalidFields.senha_usuario ? { borderColor: "#ff5252", background: "#fff6f6" } : {}}
                    />
                    {invalidFields.senha_usuario && (
                        <span style={{ color: "#ff5252", fontSize: "0.95rem", marginTop: "4px" }}>
                            Preencha esse campo
                        </span>
                    )}
                </div>
                <div className={style.form_group}>
                    <label htmlFor="tipo_usuario">Tipo de Usuário:</label>
                    <select
                        id="tipo_usuario"
                        name="tipo_usuario"
                        value={user.tipo_usuario}
                        onChange={handleChangeUser}
                        className={style.select}
                        style={invalidFields.tipo_usuario ? { borderColor: "#ff5252", background: "#fff6f6" } : {}}
                    >
                        <option value="cliente">Cliente</option>
                        <option value="vendedor">Vendedor</option>
                    </select>
                    {invalidFields.tipo_usuario && (
                        <span style={{ color: "#ff5252", fontSize: "0.95rem", marginTop: "4px" }}>
                            Preencha esse campo
                        </span>
                    )}
                </div>
                {user.tipo_usuario === "vendedor" && (
                    <>
                        <div className={style.form_group}>
                            <Input
                                type="text"
                                name="nome_loja"
                                id="nome_loja"
                                placeholder="Digite o nome da loja"
                                text="Nome da loja"
                                value={user.nome_loja}
                                handlerChange={handleChangeUser}
                                style={invalidFields.nome_loja ? { borderColor: "#ff5252", background: "#fff6f6" } : {}}
                            />
                            {invalidFields.nome_loja && (
                                <span style={{ color: "#ff5252", fontSize: "0.95rem", marginTop: "4px" }}>
                                    Preencha esse campo
                                </span>
                            )}
                        </div>
                        <div className={style.form_group}>
                            <Input
                                type="url"
                                name="link_loja"
                                id="link_loja"
                                placeholder="Digite o link da loja"
                                text="Link da loja"
                                value={user.link_loja}
                                handlerChange={handleChangeUser}
                                style={invalidFields.link_loja ? { borderColor: "#ff5252", background: "#fff6f6" } : {}}
                            />
                            {invalidFields.link_loja && (
                                <span style={{ color: "#ff5252", fontSize: "0.95rem", marginTop: "4px" }}>
                                    Preencha esse campo
                                </span>
                            )}
                        </div>
                    </>
                )}
                <div className={style.form_group}>
                    <Button label="Cadastrar" />
                </div>
            </form>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </section>
    );
};

export default CreateUser;