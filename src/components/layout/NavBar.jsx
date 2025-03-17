import { Outlet, Link } from "react-router-dom"
import style from "./navBar.module.css"

const NavBar = ()=>{
    return(
        <>
            <nav className={style.navbar}>
                    <img src="./src/assets/submk.png" alt="Subzero MK9" className={style.subzero}/>
                <ul className={style.list}>
                    <Link to='/newGame'>
                        <li className={style.item}>CADASTRAR JOGOS</li>
                    </Link>

                    <Link to='/listGame'>
                        <li className={style.item}>LISTAR JOGOS</li>
                    </Link>
                </ul>
                <Link to='/'>
                <img src="./src/assets/ScorpionGames.png" alt="Nome da loja" className={style.logo}></img>
                        </Link>
                <img src="./src/assets/mks.png" alt="Scorpion MK9" className={style.scorpion}></img>
            </nav>
            <Outlet/>
        </>
    )
}

export default NavBar