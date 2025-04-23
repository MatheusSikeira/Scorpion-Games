import React, { useState } from "react";
import style from "./createGame.module.css";
import Input from "../form/Input.jsx";
import Select from "../form/Select.jsx";
import Button from "../form/Button.jsx";

const CreateGame = () => {
  const [game, setGame] = useState({
    category: "",
  });

  const handleChangeGame = (event) => {
    setGame({ ...game, [event.target.name]: event.target.value });
  };

  const handleChangeCategory = (event) => {
    const selectedIndex = event.target.selectedIndex;
    const selectedText = event.target.options[selectedIndex].text;
    setGame({ ...game, category: selectedText });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Dados do jogo:", game);
  };

  return (
    <section className={style.create_game_container}>
      <h1>Cadastro do jogo:</h1>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="txt_jogo"
          id="tct_jogo"
          placeholder="Digite o jogo desejado: "
          text="Insira um jogo: "
          handlerChange={handleChangeGame}
        />
        <Input
          type="text"
          name="txt_desenvolvedor"
          id="tct_desenvolvedor"
          placeholder="Digite o desenvolvedor: "
          text="Digite o nome do desenvolvedor: "
          handlerChange={handleChangeGame}
        />

        <Input
          type="text"
          name="txt_descricao"
          id="tct_descricao"
          placeholder="Digite a descrição do jogo: "
          text="Insira a descrição do jogo: "
          handlerChange={handleChangeGame}
        />

        <Select
          name="slc_categorias"
          id="slc_categorias"
          text="Categorias do jogo: "
          handlerChange={handleChangeCategory}
        />

        <Button title="Salvar" />
      </form>
    </section>
  );
};

export default CreateGame;
