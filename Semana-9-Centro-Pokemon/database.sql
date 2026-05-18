-- 1 Creamos la base de datos del Centro Pokémon
CREATE DATABASE IF NOT EXISTS centro_pokemon
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

-- 2 Seleccionamos la base de datos para trabajar con ella
USE centro_pokemon;
 
-- 3 Creamos la tabla cliente para almacenar la información de los entrenadores
-- La tabla cliente representa a los entrenadores que llevan sus
-- Pokémon a la clínica del Centro para que la enfermera Joy los sane.
CREATE TABLE cliente (
  id_cliente INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  telefono VARCHAR(20),
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
 
-- 4 Insertamos algunos clientes de ejemplo en la tabla cliente
INSERT INTO cliente (nombre, email, telefono) VALUES
  ('Ash Ketchum',  'ash@pueblopaleta.cl',    '+56911111111'),
  ('Misty',        'misty@ciudadcelestre.cl','+56922222222'),
  ('Brock',        'brock@plomo.cl',         '+56933333333');
