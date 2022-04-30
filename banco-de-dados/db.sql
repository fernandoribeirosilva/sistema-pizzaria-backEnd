CREATE TABLE pizza (
	id SERIAL PRIMARY KEY,
	sabor VARCHAR(200) NOT NULL,
	preco NUMERIC(10,2) NOT NULL,
	tamanho CHAR(5) NOT NULL,
	descricao VARCHAR(120) NOT NULL,
	imagem VARCHAR(80) DEFAULT 'default.jpg' NOT NULL
);

CREATE TABLE cliente (
	id SERIAL PRIMARY KEY,
	nome VARCHAR(200) NOT NULL,
	rua VARCHAR(20) NOT NULL,
	numero VARCHAR(20) NOT NULL,
	complemento VARCHAR(20),
	bairro VARCHAR(120)
);

CREATE TABLE adm (
	id SERIAL PRIMARY KEY,
	login VARCHAR(200) DEFAULT 'adm' NOT NULL,
	password VARCHAR(200) NOT NULL
);

drop table cliente;












