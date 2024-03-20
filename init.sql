
CREATE DATABASE Biblioteca;


USE Biblioteca;


CREATE TABLE Categorias (
    idCategoria INT AUTO_INCREMENT PRIMARY KEY,
    categoria VARCHAR(100) NOT NULL
);


CREATE TABLE Subcategorias (
    idSubcategoria INT AUTO_INCREMENT PRIMARY KEY,
    subcategoria VARCHAR(100) NOT NULL,
    idCategoria INT,
    FOREIGN KEY (idCategoria) REFERENCES Categorias(idCategoria)
);

CREATE TABLE Autores (
    idAutor INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    nacionalidad VARCHAR(100),
    correoElectronico VARCHAR(100)
);

CREATE TABLE Titulos (
    idTitulo INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    editorial VARCHAR(100),
    isbn VARCHAR(100),
    fechaPublicacion DATE,
    noEjemplares INT,
    idSubcategoria INT,
    FOREIGN KEY (idSubcategoria) REFERENCES Subcategorias(idSubcategoria)
);

CREATE TABLE TitulosAutores (
    idAutor INT,
    idTitulo INT,
    PRIMARY KEY (idAutor, idTitulo),
    FOREIGN KEY (idAutor) REFERENCES Autores(idAutor),
    FOREIGN KEY (idTitulo) REFERENCES Titulos(idTitulo)
);
