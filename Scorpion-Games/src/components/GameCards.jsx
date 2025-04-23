import style from './GameCards.module.css'
import Button from './Button.jsx'

const GameCards = ({title, autor, imagem})=>{
    return(
        <div className={style.GameCards}>

            <h3 className={style.title}>{title}</h3>

            <p className={style.autor}>{autor}</p>

            <img src={imagem} alt='Uma imagem' className={style.imagem}/>

            <Button label="DETALHE"/>
            
        </div>
    )
}

export default GameCards