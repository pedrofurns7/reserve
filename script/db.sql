create extension if not exists "uuid-ossp"

create table usuarios (
    id uuid primary key,
    nome varchar (255) not null,
    email varchar (255) not null,
    senha varchar (255) not null,
    role varchar (20) not null
);


create table mesas(
    id uuid primary key,
    nome varchar (255) not null,
    capacidade INTEGER not null,
    status varchar (20) not null DEFAULT 'disponivel'
)



CREATE TABLE reservas (
  id uuid PRIMARY KEY,
  usuario_id uuid NOT NULL,
  mesa_id uuid NOT NULL,
  data_reserva TIMESTAMP NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'ativo',
  CONSTRAINT fk_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
  CONSTRAINT fk_mesa FOREIGN KEY (mesa_id) REFERENCES mesas(id)
);


