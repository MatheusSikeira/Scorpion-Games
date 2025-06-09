CREATE DATABASE scorpion_games;

USE scorpion_games;

INSERT INTO tbl_categoria (nome_categoria, createdAt, updatedAt) VALUES
('Ação', NOW(), NOW()),
('RPG', NOW(), NOW()),
('Terror', NOW(), NOW()),
('Estratégia', NOW(), NOW()),
('Mundo Aberto', NOW(), NOW());

INSERT INTO plataformas (nome_plataforma, createdAt, updatedAt) VALUES 
('Playstation 5', NOW(), NOW()),
('Xbox Series X', NOW(), NOW()),
('PC', NOW(), NOW()),
('Playstation 4', NOW(), NOW()),
('Playstation 3', NOW(), NOW()),
('Playstation 2', NOW(), NOW()),
('Playstation 1', NOW(), NOW()),
('Xbox One', NOW(), NOW()),
('Xbox 360', NOW(), NOW()),
('Xbox', NOW(), NOW()),
('Android', NOW(), NOW()),
('IOS', NOW(), NOW()),
('Nintendo Switch 2', NOW(), NOW()),
('Nintendo Switch', NOW(), NOW()),
('Nintendo Wii', NOW(), NOW()),
('Nintendo Gamecube', NOW(), NOW()),
('Nintendo 3DS', NOW(), NOW()),
('Nintendo DS', NOW(), NOW()),
('Super Nintendo', NOW(), NOW()),
('Sega Dreamcast', NOW(), NOW()),
('Mega Drive', NOW(), NOW()),
('Arcade', NOW(), NOW());
SELECT * FROM tbl_categoria;

#DELETE FROM plataformas;

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
