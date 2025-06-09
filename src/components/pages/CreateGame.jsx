import React, { useState, useEffect } from "react";
import style from "./createGame.module.css";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateGame = () => {
  const [game, setGame] = useState({
    nome: '',
    desenvolvedor: '',
    cod_categoria: '',
    plataforma_id: '',
    preco: '',
    imagem_url: '',
    descricao_jogo: '',
    ano_lancamento: '',
    usuario_id: 1
  });

  const [categories, setCategories] = useState([]);
  const [plataformas, setPlataformas] = useState([]);
  const [imagemFile, setImagemFile] = useState(null);
  const [imagemPreview, setImagemPreview] = useState('');
  const [invalidFields, setInvalidFields] = useState({});

  const handlerChangeGame = (event) => {
    setGame({
      ...game,
      [event.target.name]: event.target.value
    });
    setInvalidFields({ ...invalidFields, [event.target.name]: false });
  };

  // Novo handler para upload de imagem do dispositivo
  const handleImagemChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          toast.error("Arquivo muito grande. Máximo 5MB permitido.");
          return;
        }

        // Validate file type
        if (!file.type.match(/image\/(jpeg|jpg|png|gif|webp)/i)) {
          toast.error("Formato de arquivo não suportado. Use JPG, PNG, GIF ou WEBP.");
          return;
        }

        setImagemFile(file);
        setImagemPreview(URL.createObjectURL(file));
        setGame({ ...game, imagem_url: '' });

      } catch (error) {
        console.error("Erro ao processar imagem:", error);
        toast.error("Erro ao processar a imagem. Tente novamente.");
      }
    }
  };

  const submit = async (event) => {
    event.preventDefault();

    try {
        let imagemUrl = game.imagem_url;

        if (imagemFile) {
            const formData = new FormData();
            formData.append('imagem', imagemFile);

            const uploadResp = await fetch('http://localhost:5000/upload-imagem', {
                method: 'POST',
                body: formData,
            });

            if (!uploadResp.ok) {
                const errorData = await uploadResp.json();
                throw new Error(errorData.message || 'Erro ao enviar imagem');
            }

            const uploadData = await uploadResp.json();
            imagemUrl = uploadData.url;
        }

        const gameData = {
            ...game,
            imagem_url: imagemUrl,
            // Ensure numeric fields are properly formatted
            preco: parseFloat(game.preco),
            ano_lancamento: parseInt(game.ano_lancamento),
            cod_categoria: parseInt(game.cod_categoria),
            plataforma_id: parseInt(game.plataforma_id)
        };

        console.log('Enviando dados:', gameData); // Debug log

        const response = await fetch('http://localhost:5000/inserirJogo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(gameData)
        });

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.mensageStatus || 'Erro ao cadastrar jogo');
        }

        toast.success('Jogo cadastrado com sucesso!');

        // Reset form
        setGame({
            nome: '',
            desenvolvedor: '',
            cod_categoria: '',
            plataforma_id: '',
            preco: '',
            imagem_url: '',
            descricao_jogo: '',
            ano_lancamento: '',
            usuario_id: 1
        });
        setImagemFile(null);
        setImagemPreview('');
        setInvalidFields({});

    } catch (error) {
        console.error("Erro detalhado:", error);
        toast.error(error.message);
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

  useEffect(() => {
    const fetchPlataformas = async () => {
      try {
        const response = await fetch('http://localhost:5000/plataformas');
        const data = await response.json();
        const plataformasFormatadas = Array.isArray(data)
          ? data.map(plat => ({
              value: plat.id_plataforma,
              label: plat.nome_plataforma
            }))
          : [];
        setPlataformas(plataformasFormatadas);
      } catch (error) {
        console.error("Erro ao carregar plataformas:", error);
      }
    };
    fetchPlataformas();
  }, []);

  return (
    <section className={style.create_game_container}>
      {/* Título com Lâminas */}
      <div className={style.form_title_wrapper}>
        <div className={style.lamina_top}></div>
        <div className={style.form_title_container}>
          <div className={style.form_title}>Cadastro do Jogo</div>
        </div>
        <div className={style.lamina_bottom}></div>
      </div>

      <form onSubmit={submit} className={style.oriental_border}>
        <div className={style.form_group}>
          <label htmlFor="nome">Nome do Jogo:</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={game.nome}
            onChange={handlerChangeGame}
            placeholder="Digite o nome do jogo"
            required
            style={invalidFields.nome ? { borderColor: "#ff5252", background: "#fff6f6" } : {}}
          />
          {invalidFields.nome && (
            <span style={{ color: "#ff5252", fontSize: "0.95rem", marginTop: "4px" }}>
              Preencha esse campo
            </span>
          )}
        </div>

        <div className={style.form_group}>
          <label htmlFor="desenvolvedor">Desenvolvedor:</label>
          <input
            type="text"
            id="desenvolvedor"
            name="desenvolvedor"
            value={game.desenvolvedor}
            onChange={handlerChangeGame}
            placeholder="Digite o desenvolvedor"
            required
            style={invalidFields.desenvolvedor ? { borderColor: "#ff5252", background: "#fff6f6" } : {}}
          />
          {invalidFields.desenvolvedor && (
            <span style={{ color: "#ff5252", fontSize: "0.95rem", marginTop: "4px" }}>
              Preencha esse campo
            </span>
          )}
        </div>

        <div className={style.form_group}>
          <label htmlFor="cod_categoria">Categoria:</label>
          <select
            id="cod_categoria"
            name="cod_categoria"
            value={game.cod_categoria}
            onChange={handlerChangeGame}
            required
            style={invalidFields.cod_categoria ? { borderColor: "#ff5252", background: "#fff6f6" } : {}}
          >
            <option value="">Selecione uma categoria</option>
            {categories.map(category => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
          {invalidFields.cod_categoria && (
            <span style={{ color: "#ff5252", fontSize: "0.95rem", marginTop: "4px" }}>
              Preencha esse campo
            </span>
          )}
        </div>

        <div className={style.form_group}>
          <label htmlFor="plataforma_id">Plataforma:</label>
          <select
            id="plataforma_id"
            name="plataforma_id"
            value={game.plataforma_id}
            onChange={handlerChangeGame}
            required
            style={invalidFields.plataforma_id ? { borderColor: "#ff5252", background: "#fff6f6" } : {}}
          >
            <option value="">Selecione uma plataforma</option>
            {plataformas.map(plataforma => (
              <option key={plataforma.value} value={plataforma.value}>
                {plataforma.label}
              </option>
            ))}
          </select>
          {invalidFields.plataforma_id && (
            <span style={{ color: "#ff5252", fontSize: "0.95rem", marginTop: "4px" }}>
              Preencha esse campo
            </span>
          )}
        </div>

        <div className={style.form_group}>
          <label htmlFor="preco">Preço (R$):</label>
          <input
            type="number"
            id="preco"
            name="preco"
            value={game.preco}
            onChange={handlerChangeGame}
            step="0.01"
            min="0"
            placeholder="Digite o preço"
            required
            style={invalidFields.preco ? { borderColor: "#ff5252", background: "#fff6f6" } : {}}
          />
          {invalidFields.preco && (
            <span style={{ color: "#ff5252", fontSize: "0.95rem", marginTop: "4px" }}>
              Preencha esse campo
            </span>
          )}
        </div>

        <div className={style.form_group}>
          <label htmlFor="ano_lancamento">Ano de Lançamento:</label>
          <input
            type="number"
            id="ano_lancamento"
            name="ano_lancamento"
            value={game.ano_lancamento}
            onChange={handlerChangeGame}
            min="1950"
            max={new Date().getFullYear() + 1}
            placeholder="Exemplo: 2025"
            required
            style={invalidFields.ano_lancamento ? { borderColor: "#ff5252", background: "#fff6f6" } : {}}
          />
          {invalidFields.ano_lancamento && (
            <span style={{ color: "#ff5252", fontSize: "0.95rem", marginTop: "4px" }}>
              Preencha esse campo
            </span>
          )}
        </div>

        <div className={style.form_group}>
          <label htmlFor="descricao_jogo">Descrição do Jogo:</label>
          <textarea
            id="descricao_jogo"
            name="descricao_jogo"
            value={game.descricao_jogo}
            onChange={handlerChangeGame}
            placeholder="Insira uma descrição do jogo"
            rows="4"
          />
        </div>

        <div className={style.form_group}>
          <label htmlFor="imagem_url">URL da Imagem:</label>
          <input
            type="url"
            id="imagem_url"
            name="imagem_url"
            value={game.imagem_url}
            onChange={handlerChangeGame}
            placeholder="Cole a URL da imagem"
            disabled={!!imagemFile}
          />
        </div>

        <div className={style.form_group}>
          <label htmlFor="imagem_file">Ou envie uma imagem do seu dispositivo:</label>
          <input
            type="file"
            id="imagem_file"
            name="imagem_file"
            accept="image/*"
            onChange={handleImagemChange}
            disabled={!!game.imagem_url}
          />
        </div>

        {(imagemPreview || game.imagem_url) && (
          <div className={style.preview_container}>
            <label>Pré-visualização da Capa:</label>
            <img
              src={imagemPreview || game.imagem_url}
              alt="Capa do jogo"
              className={style.image_preview}
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/300x400?text=Imagem+Inválida";
              }}
            />
          </div>
        )}

        <div className={style.form_group}>
          <button type="submit" className={style.submit_button}>
            Salvar Jogo
          </button>
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

export default CreateGame;