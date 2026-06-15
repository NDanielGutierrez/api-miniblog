# MiniBlog API

API REST desarrollada en Node.js + Express conectada a PostgreSQL para gestionar autores y posts.

---

## Requisitos

- Node.js v18+
- PostgreSQL instalado y corriendo

---

## Instalación local

1. Clona el repositorio:
   git clone https://github.com/tuusuario/api-miniblog.git
   cd api-miniblog

2. Instala dependencias:
   npm install

3. Crea el archivo .env basado en .env.example:
   cp .env.example .env

4. Completa las variables en .env:
   PORT=3000
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=miniblog_db
   DB_USER=miniblog_user
   DB_PASSWORD=tupassword

5. Crea la base de datos en PostgreSQL:
   CREATE DATABASE miniblog_db;

6. Ejecuta el script de setup:
   psql -U miniblog_user -d miniblog_db -f sql/setup.sql

7. Ejecuta el seed con datos de prueba:
   psql -U miniblog_user -d miniblog_db -f sql/seed.sql

8. Inicia el servidor:
   npm run dev

---

## Ejecutar tests

npm test

---

## Documentación OpenAPI

Abre el archivo docs/openapi.yaml en https://editor.swagger.io para ver la documentación interactiva de todos los endpoints.

---

## Decisiones técnicas

- Arquitectura en capas: routes → services → db, para mantener la estructura simple.
- Middleware global de errores en vez de manejar el 500 en cada route individualmente.
- Códigos de error de PostgreSQL manejados centralmente: 23505 (email duplicado → 409), 23503 (foreign key inválida → 400).
- Validaciones de campos requeridos en las routes (400) separadas de los errores inesperados del servidor (500).
- Usuario de base de datos específico (miniblog_user) en vez de postgres por seguridad.
- afterEach en tests borra registros creados para evitar conflictos de email duplicado.
- afterAll con pool.end() cierra la conexión limpiamente al terminar los tests.

---

## Uso de IA

Este proyecto fue desarrollado con asistencia de Claude (Anthropic) como herramienta de apoyo para:
- Estructurar la arquitectura del proyecto.
- Resolver errores durante el desarrollo.
- Repasar conceptos como middleware, async/await y manejo de errores en Express.

Todos los prompts fueron realizados de forma iterativa, revisando y entendiendo cada fragmento de código antes de continuar.

---

## Deploy en Railway

1. Crea una cuenta en https://railway.app
2. Nuevo proyecto → Deploy from GitHub → selecciona tu repositorio
3. Agrega un plugin de PostgreSQL en Railway
4. En Variables agrega las mismas del .env usando la Internal URL de Railway como DB_HOST
5. Railway desplegará automáticamente con cada push a main

Variables necesarias en Railway:
- PORT (Railway lo asigna automáticamente)
- DB_HOST
- DB_PORT
- DB_NAME
- DB_USER
- DB_PASSWORD