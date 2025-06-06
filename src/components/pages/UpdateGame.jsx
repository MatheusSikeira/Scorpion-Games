import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import style from './UpdateGame.module.css';

const UpdateGame = () => {
  const { id_game } = useParams();
  const navigate = useNavigate();
  
  const [game, setGame] = useState({
    nome: '',
    descricao_jogo: '',
    preco: '',
    ano_lancamento: ''
  });
  
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(''); // Added missing state
  const [success, setSuccess] = useState(''); // Added missing state

  // Carregar dados do jogo
  useEffect(() => {
    if (!id_game) return;
    
    fetch(`http://localhost:5000/listagemJogo/${id_game}`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(resp => resp.json())
      .then(data => {
        if (data.data) {
          setGame({
            nome: data.data.nome || '',
            descricao_jogo: data.data.descricao_jogo || '',
            preco: data.data.preco || '',
            ano_lancamento: data.data.ano_lancamento || ''
          });
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Erro ao buscar jogo:", err);
        toast.error('Erro ao carregar dados do jogo');
        setLoading(false);
      });
  }, [id_game]);

  // Manipular mudanças nos inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setGame(prevGame => ({
      ...prevGame,
      [name]: value
    }));
  };

  // Submeter formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSubmitting(true); // Set submitting state

    try {
      // Dados para enviar (incluindo o id_game no body conforme sua API)
      const dadosParaEnviar = {
        id_game: id_game,
        ...game
      };

      const response = await fetch(`http://localhost:5000/alterarJogo`, {
        method: 'PUT', // conforme sua API
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosParaEnviar)
      });

      // Verificar se a resposta tem conteúdo antes de tentar fazer parse
      let data = {};
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        // Se não for JSON, pegar como texto para debug
        const text = await response.text();
        console.log('Resposta não JSON:', text);
      }

      if (response.ok) {
        setSuccess('Jogo alterado com sucesso!');
        // Redirecionar após 1.5 segundos
        setTimeout(() => {
          navigate('/listgame');
        }, 1500);
      } else {
        setError(data.mensageStatus || data.message || 'Erro ao alterar jogo');
      }
    } catch (err) {
      console.error('Erro ao alterar jogo:', err);
      setError('Erro de conexão com o servidor');
    } finally {
      setSubmitting(false); // Reset submitting state
    }
  };

  const handleCancel = () => {
    navigate('/listgame');
  };

  if (loading) {
    return <div className={style.loading}>Carregando dados do jogo...</div>;
  }

  return (
    <div className={style.container}>
      <h1 className={style.title}>Editar Jogo</h1>
      
      {error && <div className={style.error}>{error}</div>}
      {success && <div className={style.success}>{success}</div>}

      <form onSubmit={handleSubmit} className={style.form}>
        <div className={style.inputGroup}>
          <label htmlFor="nome">Nome do Jogo:</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={game.nome}
            onChange={handleChange}
            required
            className={style.input}
            disabled={submitting}
          />
        </div>

        <div className={style.inputGroup}>
          <label htmlFor="descricao_jogo">Descrição:</label>
          <textarea
            id="descricao_jogo"
            name="descricao_jogo"
            value={game.descricao_jogo}
            onChange={handleChange}
            rows="4"
            className={style.textarea}
            disabled={submitting}
          />
        </div>

        <div className={style.inputGroup}>
          <label htmlFor="preco">Preço:</label>
          <input
            type="number"
            id="preco"
            name="preco"
            value={game.preco}
            onChange={handleChange}
            step="0.01"
            min="0"
            className={style.input}
            disabled={submitting}
          />
        </div>

        <div className={style.inputGroup}>
          <label htmlFor="ano_lancamento">Ano de Lançamento:</label>
          <input
            type="number"
            id="ano_lancamento"
            name="ano_lancamento"
            value={game.ano_lancamento}
            onChange={handleChange}
            min="1970"
            max="2030"
            className={style.input}
            disabled={submitting}
          />
        </div>

        <div className={style.buttonGroup}>
          <button 
            type="submit" 
            className={style.submitButton}
            disabled={submitting}
          >
            {submitting ? 'Salvando...' : 'Salvar Alterações'}
          </button>
          <button 
            type="button" 
            onClick={handleCancel} 
            className={style.cancelButton}
            disabled={submitting}
          >
            Cancelar
          </button>
        </div>
      </form>
      
      <ToastContainer />
    </div>
  );
};

export default UpdateGame;