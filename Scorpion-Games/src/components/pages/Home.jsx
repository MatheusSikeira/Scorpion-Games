import { useState } from "react";
import styles from './home.module.css';

const Home = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const accordionData = [
    {
      title: "Jogos de Ação",
      content:
        "Explore uma variedade de jogos de ação cheios de adrenalina!",
      image:[
        "./src/assets/COD.png",
        "./src/assets/battle.png",
      ],
      icon: "./src/assets/cage.png",
    },
    {
      title: "Jogos de RPG",
      content:
        "Viva aventuras épicas e faça suas escolhas para mudar o rumo da história.",
      image:[
        "./src/assets/witcher.png",
        "./src/assets/cyber.png"],
      icon: "./src/assets/liukang.png",
    },
    {
      title: "Jogos de Terror",
      content:
        "Vivencie histórias aterrorizantes e sombrias.",
      image: [
        "./src/assets/TEW.png",
        "./src/assets/re4.png",],
      icon: "./src/assets/noobsaibot.png",
    },
    {
      title: "Jogos de Estratégia",
      content:
        "Desafie sua mente com jogos estratégicos e táticas complexas.",
      image: [
        "./src/assets/baldur.png",
        "./src/assets/ff6.png",
      ],
      icon: "./src/assets/kunglau.png",
    },
    {
      title: "Jogos de Mundo Aberto",
      content:
        "Explore mundos vastos e descubra lugares novos.",
      image: [
        "./src/assets/cap1.png",
        "./src/assets/FAC.png",
      ],
      icon: "./src/assets/raiden.png",
    },
  ];

  return (
    <section className={styles.home_container}>
      <h1>Bem-vindo à loja de games Scorpion</h1>
      <p>"Get over here! Buy our games!"</p>
      <div className={styles.grid_container}>
        {accordionData.map((item, index) => (
          <div key={index} className={styles.grid_item}>
            <div
              className={`${styles.grid_title} ${
              activeIndex === index ? styles.active : styles.inactive
              }`}
              onClick={() => toggleAccordion(index)}
            >
              <img
                src={item.icon}
                alt={item.title}
                className={styles.title_icon}
              />
              <h3>{item.title}</h3>
            <span className={styles.arrow}>
              <img
                src={activeIndex === index ? "./src/assets/kunai-up.png" : "./src/assets/kunai-down.png"}
                alt={activeIndex === index ? "Fechar" : "Abrir"}
                className={styles.kunai_icon}
            />
            </span>
            </div>
            {activeIndex === index && (
              <div className={styles.accordion_content}>
                {item.image.map((image, imgIndex) => (
                    <img
                      key={imgIndex}
                      src={image}
                      alt={`${item.title} ${imgIndex + 1}`}
                      className={styles.content_image}
                    />
                  ))}
                <p>{item.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Home;