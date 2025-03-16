import { Outlet, Link } from "react-router-dom"
import style from "./navBar.module.css"

const NavBar = ()=>{
    return(
        <>
            <nav className={style.navbar}>
                <ul className={style.list}>

                    <Link to='/'>
                        <li className={style.item}><img src="" alt="Logo tipo" className={style.logo}/>/</li>
                    </Link>

                    <Link to='/'>
                        <li className={style.item}>HOME</li>
                    </Link>

                    <Link to='/newGame'>
                        <li className={style.item}>CADASTRAR JOGOS</li>
                    </Link>

                    <Link to='/listGame'>
                        <li className={style.item}>LISTAR JOGOS</li>
                    </Link>

                </ul>
            </nav>
            <Outlet/>
        </>
    )
}

export default NavBar