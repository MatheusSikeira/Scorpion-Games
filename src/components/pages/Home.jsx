import styles from './home.module.css';
import logo from '../../assets/banner_scorpion.png';

const Home = () => {
  return (
    <section className={styles.home_container}>
      <div className={styles.logo_home}>
        <img src={logo} alt="Logo da Scorpion Games" />
      </div>
      <div className={styles.generos}>
      <h1>Gêneros</h1>
      </div>
      <div className={styles.accordions_wrapper}>
        {/* Accordion 1 */}
        <div className={styles.accordion_item_wrapper}>
          <details className={styles.accordion_container}>
            <summary className={styles.grid_title}>
              <img src="./src/assets/cage.png" alt="Ícone" className={styles.title_icon} />
              <h3>Ação</h3>
              <img src="./src/assets/kunai-up.png" alt="Seta" className={styles.kunai_icon} />
            </summary>
            <div className={styles.accordion_content}>
              <img src="conteudo-imagem1.jpg" alt="Nossos Jogos" className={styles.content_image} />
              <p>
                Conheça nossa linha de jogos independentes premiados e em desenvolvimento.
              </p>
            </div>
          </details>
        </div>

        {/* Accordion 2 */}
        <div className={styles.accordion_item_wrapper}>
          <details className={styles.accordion_container}>
            <summary className={styles.grid_title}>
              <img src="" alt="Ícone" className={styles.title_icon} />
              <h3>Tecnologia</h3>
              <img src="kunai.svg" alt="Seta" className={styles.kunai_icon} />
            </summary>
            <div className={styles.accordion_content}>
              <img src="conteudo-imagem2.jpg" alt="Tecnologia" className={styles.content_image} />
              <p>
                Usamos as melhores ferramentas do mercado para criar jogos incríveis e otimizados.
              </p>
            </div>
          </details>
        </div>

        {/* Accordion 3 */}
        <div className={styles.accordion_item_wrapper}>
          <details className={styles.accordion_container}>
            <summary className={styles.grid_title}>
              <img src="icone3.jpg" alt="Ícone" className={styles.title_icon} />
              <h3>História</h3>
              <img src="kunai.svg" alt="Seta" className={styles.kunai_icon} />
            </summary>
            <div className={styles.accordion_content}>
              <img src="conteudo-imagem3.jpg" alt="História" className={styles.content_image} />
              <p>
                A trajetória da Scorpion Games desde o início até os dias atuais.
              </p>
            </div>
          </details>
        </div>

        {/* Accordion 4 */}
        <div className={styles.accordion_item_wrapper}>
          <details className={styles.accordion_container}>
            <summary className={styles.grid_title}>
              <img src="icone4.jpg" alt="Ícone" className={styles.title_icon} />
              <h3>Equipe</h3>
              <img src="kunai.svg" alt="Seta" className={styles.kunai_icon} />
            </summary>
            <div className={styles.accordion_content}>
              <img src="conteudo-imagem4.jpg" alt="Equipe" className={styles.content_image} />
              <p>
                Conheça as pessoas por trás dos nossos projetos criativos e inovadores.
              </p>
            </div>
          </details>
        </div>

        {/* Accordion 5 */}
        <div className={styles.accordion_item_wrapper}>
          <details className={styles.accordion_container}>
            <summary className={styles.grid_title}>
              <img src="icone5.jpg" alt="Ícone" className={styles.title_icon} />
              <h3>Contato</h3>
              <img src="kunai.svg" alt="Seta" className={styles.kunai_icon} />
            </summary>
            <div className={styles.accordion_content}>
              <img src="conteudo-imagem5.jpg" alt="Contato" className={styles.content_image} />
              <p>
                Fale conosco ou participe da nossa comunidade de fãs e desenvolvedores.
              </p>
            </div>
          </details>
        </div>
      </div>
    </section>
  );
};

export default Home;