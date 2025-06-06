import { React, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import style from './GameDetail.module.css'
import templategame from '../../assets/templategame.png'

const GameDetail = () => {
  const { id_game } = useParams();  // esse nome deve ser igual ao da rota no App.js, que você tem: /gamedetail/:id_game
  const [game, setGame] = useState({});

  useEffect(() => {
    if (!id_game) return; // proteção caso o param não exista
    
    fetch(`http://localhost:5000/listagemJogo/${id_game}`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setGame(data.data);
        console.log('Dados do jogo recebidos:', data.data);
      })
      .catch((err) => {
        console.error("Erro ao buscar jogo:", err);
      });
  }, [id_game]);

  if (!game || Object.keys(game).length === 0) {
    return <p>Carregando dados do jogo...</p>;
  }

  return (
    <div className={style.grid}>
      <div className={style.container_img}>
        <img
          className={style.img_game_detail}
          src={game.imagem_url || templategame}
          alt='Capa do jogo'
          onError={(e) => { e.target.src = templategame; }}
        />
      </div>
      <div className={style.info}>
        <span className={style.titulo}>{game.nome}</span>
        <span className={style.autor}>{game.desenvolvedor}</span>
        <span className={style.preco}>
          <strong>Preço:</strong> R$ {parseFloat(game.preco || 0).toFixed(2)}
        </span>
        <span className={style.ano}>
          <strong>Ano de Lançamento:</strong> {game.ano_lancamento}
        </span>
        <span className={style.descricao}>
          <strong>Descrição:</strong><br />
          {game.descricao_jogo}
        </span>
      </div>
    </div>
  );
}

export default GameDetail;