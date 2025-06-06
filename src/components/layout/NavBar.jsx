import { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import style from "./navBar.module.css";
import {
  MdGamepad,
  MdList,
  MdPersonAdd,
  MdLogin,
  MdMenu,
  MdClose,
} from "react-icons/md";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar se é mobile
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 600);
      // Fechar menu quando sair do modo mobile
      if (window.innerWidth > 600) {
        setIsMenuOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Controlar scroll do body quando menu está aberto
  useEffect(() => {
    if (isMenuOpen && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    // Cleanup quando componente desmonta
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen, isMobile]);

  // Função para alternar menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Função para fechar menu ao clicar em um item
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Fechar menu com ESC
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscKey);

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isMenuOpen]);

  return (
    <>
      <nav className={style.navbar}>
        {/* Logo */}
        <Link to="/" onClick={closeMenu}>
          <img
            src="./src/assets/ScorpionGames.png"
            alt="Nome da loja"
            className={style.logo}
          />
        </Link>

        {/* Sub-Zero (oculto em mobile) */}
        <img
          src="./src/assets/submk.png"
          alt="Subzero MK9"
          className={style.subzero}
        />

        {/* Botão Hamburger (só aparece em mobile) */}
        <button
          className={`${style.hamburger} ${isMenuOpen ? style.active : ''}`}
          onClick={toggleMenu}
          aria-label="Menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? (
            <MdClose className={style.hamburgerIcon} />
          ) : (
            <MdMenu className={style.hamburgerIcon} />
          )}
        </button>

        {/* Menu de navegação */}
        <div className={`${style.list} ${isMenuOpen ? style.active : ''}`}>
          <Link 
            to="/newGame" 
            className={style.menuItem}
            onClick={closeMenu}
          >
            <MdGamepad className={style.menuIcon} />
            <span>CADASTRAR JOGOS</span>
          </Link>
          
          <Link 
            to="/listGame" 
            className={style.menuItem}
            onClick={closeMenu}
          >
            <MdList className={style.menuIcon} />
            <span>LISTAR JOGOS</span>
          </Link>
          
          <Link 
            to="/cadastro" 
            className={style.menuItem}
            onClick={closeMenu}
          >
            <MdPersonAdd className={style.menuIcon} />
            <span>CADASTRAR USUÁRIOS</span>
          </Link>
          
          <Link 
            to="/login" 
            className={style.menuItem}
            onClick={closeMenu}
          >
            <MdLogin className={style.menuIcon} />
            <span>LOGIN</span>
          </Link>
        </div>

        {/* Scorpion (oculto em mobile) */}
        <img
          src="./src/assets/scor.png"
          alt="Scorpion MK9"
          className={style.scorpion}
        />

        {/* Overlay para fechar menu ao clicar fora (só em mobile) */}
        {isMenuOpen && isMobile && (
          <div 
            className={style.overlay} 
            onClick={closeMenu}
            aria-hidden="true"
          />
        )}
      </nav>

      <Outlet />
    </>
  );
};

export default NavBar;