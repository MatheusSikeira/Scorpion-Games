import React from "react";
import { toast, ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import style from "./GameCards.module.css";
import Button from "./form/Button.jsx";
import { Link } from 'react-router-dom';

const MySwal = withReactContent(Swal);

const GameCards = ({ nome, desenvolvedor, plataforma, preco, imagem, id_jogo, onDelete, onEditClick }) => {
  const DeleteGame = async () => {
    const result = await MySwal.fire({
      title: `Tem certeza que deseja excluir o jogo "${nome}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar',
      customClass: {
        confirmButton: 'btn-confirm',
        cancelButton: 'btn-cancel'
      },
      buttonsStyling: false
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`http://localhost:5000/excluirJogo/${id_jogo}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          }
        });

        const data = await response.json();

        if (response.ok) {
          toast.success(`Jogo "${nome}" excluído com sucesso!`);
          if (onDelete) onDelete(id_jogo, nome);
        } else {
          toast.error(`Erro ao excluir jogo: ${data.mensageStatus || 'Erro desconhecido'}`);
        }
      } catch (e) {
        console.log("Erro ao deletar:", e);
        toast.error("Erro de conexão ao excluir jogo!");
      }
    }
  };

  return (
    <div className={style.card}>
      <div className={style.form_title_wrapper}>
        <div className={style.lamina_top}></div>
        <div className={style.form_title_container}>
          <div className={style.form_title}>{nome}</div>
        </div>
        <div className={style.lamina_bottom}></div>
      </div>

      <img src={imagem} alt={nome} className={style.gameImage} loading="lazy" />
      <div className={style.cardContent}>
        <p>Desenvolvedor: {desenvolvedor}</p>
        <p>Plataforma: {plataforma}</p>
        <p className={style.price}>Preço: R$ {parseFloat(preco).toFixed(2)}</p>
        <div className={style.buttons}>
          <Link to={`/gamedetail/${id_jogo}`}>
            <Button label="Detalhes" />
          </Link>
          <Link to={`/updateGame/${id_jogo}`} onClick={onEditClick}>
            <Button label="Editar" />
          </Link>
          <Button label="Excluir" onClick={DeleteGame} />
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={4000} />
    </div>
  );
};

export default GameCards;