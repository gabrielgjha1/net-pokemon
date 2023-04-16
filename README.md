<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo

1. clonar el repositorio 
2. Ejecutar
```
npm i
```
3. tener nest CLI instalado
```
npm i -g @nestjs/cli
```
4. Levantar la base de datos
```
docker-compose up -d 
```
5. Clonar el archivo .env.template y renombrar la copia a .env```

7. Ejecupar la aplicacion con npm run start:dev
```
npm run start:dev
```
6. Reconstruir la base de datos con la semilla 
```
http://localhost:3000/api/v2/seed
```
## stack usado 
* MongoDB
* Nest
