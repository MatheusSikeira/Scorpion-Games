import React, { useState, useEffect } from "react";
import style from "./createGame.module.css";
import Input from "../form/Input";
import Select from "../form/Select";
import Button from "../form/Button";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateGame = () => {
  const [game, setGame] = useState({
    nome: '',
    desenvolvedor: '',
    cod_categoria: '',
    plataforma: '',
    preco: '',
    imagem_url: '',
    descricao_jogo: '',
    ano_lancamento: '',
    usuario_id: 1
  });

  const [categories, setCategories] = useState([]);

  const plataformas = [
    { value: 'PC', label: 'PC' },
    { value: 'PlayStation', label: 'PlayStation' },
    { value: 'Xbox', label: 'Xbox' },
    { value: 'Nintendo Switch', label: 'Nintendo Switch' },
    { value: 'Mobile', label: 'Mobile' }
  ];

  const handlerChangeGame = (event) => {
    setGame({
      ...game,
      [event.target.name]: event.target.value
    });
  };

  const submit = async (event) => {
    event.preventDefault();

    if (!game.nome || !game.desenvolvedor || !game.cod_categoria || !game.plataforma || !game.preco || !game.ano_lancamento) {
      toast.error("Preencha todos os campos obrigatórios.");
      return;
    }

    const precoNumerico = parseFloat(game.preco);
    const ano = parseInt(game.ano_lancamento);

    if (isNaN(precoNumerico) || precoNumerico < 0) {
      toast.error("O preço deve ser um valor numérico maior ou igual a zero.");
      return;
    }

    if (isNaN(ano) || ano < 1950 || ano > new Date().getFullYear() + 1) {
      toast.error("Insira um ano de lançamento válido.");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/inserirJogo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(game)
      });

      if (!response.ok) throw new Error('Erro ao cadastrar jogo');

      const data = await response.json();
      toast.success('Jogo cadastrado com sucesso!');

      setGame({
        nome: '',
        desenvolvedor: '',
        cod_categoria: '',
        plataforma: '',
        preco: '',
        imagem_url: '',
        descricao_jogo: '',
        ano_lancamento: '',
        usuario_id: 1
      });

    } catch (error) {
      console.error("Erro:", error);
      toast.error('Erro ao cadastrar jogo');
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:5000/listagemCategorias');
        const data = await response.json();
        const categoriasFormatadas = Array.isArray(data?.data) ? data.data.map(cat => ({
          value: cat.cod_categoria,
          label: cat.nome_categoria
        })) : [];
        setCategories(categoriasFormatadas);
      } catch (error) {
        console.error("Erro ao carregar categorias:", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <section className={style.create_game_container}>
      <h1>Cadastro do Jogo</h1>

      <form onSubmit={submit}>

        <Input type="text" name="nome" text="Nome do Jogo:" value={game.nome} handlerChange={handlerChangeGame} placeholder="Digite o nome do jogo" />

        <Input type="text" name="desenvolvedor" text="Desenvolvedor:" value={game.desenvolvedor} handlerChange={handlerChangeGame} placeholder="Digite o desenvolvedor" />

        <Select name="cod_categoria" text="Categoria:" value={game.cod_categoria} handlerChange={handlerChangeGame} options={categories} />

        <Select name="plataforma" text="Plataforma:" value={game.plataforma} handlerChange={handlerChangeGame} options={plataformas} />

        <Input type="number" name="preco" text="Preço (R$):" value={game.preco} handlerChange={handlerChangeGame} step="0.01" placeholder="Digite o preço" />

         <Input type="number" name="ano_lancamento" text="Ano de Lançamento:" value={game.ano_lancamento} handlerChange={handlerChangeGame} placeholder="Exemplo: 2025" />

        <Input type="text" name="descricao_jogo" text="Descrição do Jogo:" value={game.descricao_jogo} handlerChange={handlerChangeGame} placeholder="Insira uma descrição do jogo" />

        <Input type="url" name="imagem_url" text="URL da Imagem:" value={game.imagem_url} handlerChange={handlerChangeGame} placeholder="Cole a URL da imagem" />

        {game.imagem_url && (
          <div className={style.preview_container}>
            <label>Pré-visualização da Capa:</label>
            <img
              src={game.imagem_url}
              alt="Capa do jogo"
              className={style.image_preview}
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/300x400?text=Imagem+Inválida";
              }}
            />
          </div>
        )}

        <Button type="submit" label="Salvar" />
      </form>

      <ToastContainer />
    </section>
  );
};

export default CreateGame;