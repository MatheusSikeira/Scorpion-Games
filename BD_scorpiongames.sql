CREATE DATABASE scorpion_games;

USE scorpion_games;

INSERT INTO tbl_categoria (nome_categoria, createdAt, updatedAt) VALUES
('Ação', NOW(), NOW()),
('RPG', NOW(), NOW()),
('Terror', NOW(), NOW()),
('Estratégia', NOW(), NOW()),
('Mundo Aberto', NOW(), NOW());

SELECT * FROM tbl_categoria;

#DELETE FROM tbl_categoria;

#SET SQL_SAFE_UPDATES = 0;

CREATE TABLE tbl_jogos (
    id_jogo INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    desenvolvedor VARCHAR(255) NOT NULL,
    plataforma VARCHAR(255) NOT NULL,
    preco DECIMAL(10, 2) NOT NULL,
    imagem_url VARCHAR(255),
    usuario_id INT NOT NULL,
    cod_categoria INT NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL
);
