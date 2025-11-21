# Proyecto - Trabajo Práctico MongoDB (Node.js + Express + Mongoose)

Este proyecto contiene la solución al trabajo práctico: CRUD y agregaciones para
dos modelos: Tienda de libros (autores, libros) y Plataforma de cursos (estudiantes, cursos).

## Requisitos
- Node.js (v16+ recomendado)
- MongoDB corriendo localmente o una URI en MongoDB Atlas

## Instalación
1. Copiar `.env.example` a `.env` y ajustar `MONGODB_URI` si hace falta.
2. Instalar dependencias:
   ```
   npm install
   ```
3. Cargar datos de ejemplo:
   ```
   npm run seed
   ```
4. Iniciar servidor:
   ```
   npm start
   ```
   o para desarrollo con nodemon:
   ```
   npm run dev
   ```

## Endpoints principales (prefijo `/api`)
- Autores: `/api/autores` (CRUD + agregaciones)
- Libros: `/api/libros` (CRUD; GET devuelve libros con nombre del autor)
- Estudiantes: `/api/estudiantes` (CRUD)
- Cursos: `/api/cursos` (CRUD + agregación de cantidad de estudiantes)

Las rutas de agregaciones están en:
- `/api/autores/aggs/promedio-paginas`
- `/api/autores/aggs/cantidad-libros`
- `/api/cursos/aggs/cantidad-estudiantes`

## Notas
- El proyecto usa Mongoose. Ajustá el archivo `.env` si usás Atlas.
- El seed inserta 3 autores, 5 libros, 4 estudiantes y 3 cursos tal como pide el enunciado.
