import styles from './home.module.css';

const Home = () =>{
    return(
        <section className={styles.home_container}>
            <h1>Bem vindo a loja de games Scorpion<span>venda e compre jogos aqui</span></h1>
            <p>"Get over here for your games!"</p>
            <img className={styles.home_container}src="./game_home.jpeg" alt="" />
        </section>
    );
}

export default Home;