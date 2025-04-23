import React, {useState, useEffect } from "react";
import style from "./createGame.module.css";
import Input from "../form/Input.jsx";
import Select from "../form/Select.jsx";
import Button from "../form/Button.jsx";

const CreateGame = () => {

    const[game, setGame] = useState({});
    const[categories, setCategories] = useState([]);
        
    const handlerChangeBook = (event) => {
        setGame({ ...book, [event.target.name]: event.target.value });
      };

const handleChangeCategory = (event) => {
        const selectedIndex = event.target.selectedIndex;
        const selectedText = event.target.options[selectedIndex].text;
        setBook({ ...book, cod_category: selectedText });
      };

    function submit(event){
        event.preventDefault();
        console.log(game);
        insertGame(game);
    } 

    useEffect(()=>{
        fetch('http://127.0.0.1:5000/listagemCategorias', {
            method: 'GET',
            headers:{
                'Content-Type':'application/json',
                'Access-Control-Allow-Origin':'*',
                'Access-Control-Allow-Headers':'*'
            },
        }).then((resp)=>
           resp.json()

        ).then((categorias)=>{
            console.log("TESTE: " + categorias)
        setCategories(categorias.data)
        }).catch((error) =>{
            console.log("ERRO: " + error)
        })
    }, []);

  
    function insertGame(game){
        useEffect(()=>{
            fetch('http://127.0.0.1:5000/inserirJogo', {
                method: 'POST',
                mode: 'cors',
                headers:{
                    'Content-Type':'application/json',
                    'Access-Control-Allow-Origin':'*',
                    'Access-Control-Allow-Headers':'*'
                },
                body:JSON.stringify(game)
            }).then((resp)=>{
               resp.json();
            }).then((respJSON)=>{
                console.log("RESPOSTA: " + respJSON)
            }).catch((error) =>{
                console.log("ERRO: " + error)
            })
        }, []);
    }

    return(
        <section className={style.create_game_container}>

            <h1>Cadastro do Jogo: </h1>

            <form onSubmit={submit}>

                <Input type="text"
                    name="nome_jogo"
                    id="nome_jogo"
                    placeholder="Digite o nome do jogo: "
                    text="Insira um jogo: "
                    handlerChange={handlerChangeBook}
                />
                <Input type="text"
                    name="dev_jogo"
                    id="dev_jogo"
                    placeholder="Digite o nome do desevolvedor do jogo: "
                    text="Coloque o nome do desevolvedor: "
                    handlerChange={handlerChangeBook}
                />
                <Input type="text"
                    name="descricao_jogo"
                    id="descricao_jogo"
                    placeholder="Digite a descrição do jogo: "
                    text="Insira a descrição do jogo: "
                    handlerChange={handlerChangeBook}
                />
               <Select
                    name="cod_categorias"
                    id="cod_categorias"
                    text="Categorias do jogo: "
                    handlerChange={handleChangeCategory}
                    options={categories}
                />

                <Button
                    title="salvar"
                />
            </form>
        </section>
    )
}

export default CreateGame;