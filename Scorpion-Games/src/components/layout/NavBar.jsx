import { Outlet, Link } from "react-router-dom";
import style from "./navBar.module.css";
import {
  MdGamepad,
  MdList,
  MdPersonAdd,
  MdLogin, 
} from "react-icons/md";

const NavBar = () => {
  return (
    <>
      <nav className={style.navbar}>
        <Link to="/">
          <img
            src="./src/assets/ScorpionGames.png"
            alt="Nome da loja"
            className={style.logo}
          />
        </Link>
        <img
          src="./src/assets/submk.png"
          alt="Subzero MK9"
          className={style.subzero}
        />
        <div className={style.list}>
          <Link to="/newGame" className={style.menuItem}>
            <MdGamepad className={style.menuIcon} />
            <span>CADASTRAR JOGOS</span>
          </Link>

          <Link to="/listGame" className={style.menuItem}>
            <MdList className={style.menuIcon} />
            <span>LISTAR JOGOS</span>
          </Link>

          <Link to="/cadastro" className={style.menuItem}>
            <MdPersonAdd className={style.menuIcon} />
            <span>CADASTRAR USUÁRIOS</span>
          </Link>

          <Link to="/login" className={style.menuItem}>
            <MdLogin className={style.menuIcon} />
            <span>LOGIN</span>
          </Link>
        </div>
        <img
          src="./src/assets/mks.png"
          alt="Scorpion MK9"
          className={style.scorpion}
        />
      </nav>
      <Outlet />
    </>
  );
};

export default NavBar;