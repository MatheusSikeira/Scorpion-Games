import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import style from "./listgame.module.css";
import GameCards from "../GameCards.jsx";

const ListGame = () => {
  const [game, setGame] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch("http://localhost:5000/listagemJogos");
        if (!response.ok) throw new Error("Erro na requisição");
        const data = await response.json();
        setGame(data.data);
      } catch (err) {
        setError(err.message);
        toast.error("Erro ao carregar jogos!");
      } finally {
        setLoading(false);
      }
    };
    fetchGames();
  }, []);

  const handleDelete = (id_jogo, nomeJogo) => {
    setGame((prevGames) => prevGames.filter((jogo) => jogo.id_jogo !== id_jogo));
    toast.success(`Jogo "${nomeJogo}" excluído com sucesso!`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const handleEditSuccess = (nomeJogo) => {
    toast.info(`Redirecionando para editar "${nomeJogo}"...`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  if (loading) return <div>Carregando jogos...</div>;
  if (error) return <div>Erro: {error}</div>;

  return (
    <section className={style.listContainer}>
      <h1>Listar Jogos</h1>
      <div className={style.gamesGrid}>
        {game.map((jogo) => (
          <GameCards
            key={jogo.id_jogo}
            id_jogo={jogo.id_jogo}
            nome={jogo.nome}
            desenvolvedor={jogo.desenvolvedor}
            plataforma={jogo.plataforma}
            preco={jogo.preco}
            imagem={jogo.imagem_url}
            onDelete={handleDelete}
            onEditClick={handleEditSuccess}
          />
        ))}
      </div>
      
      {/* Container dos Toasts */}
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

export default ListGame;