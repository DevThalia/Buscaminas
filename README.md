# Archivos
Este repositorio contiene la interpretación del clásico juego del 'Buscaminas'. He utulizado Html para definir el esqueleto del proyecto, Css para darle color al juego y finalmente la guinda del pastel con JavaScript

## Autores
- Thalia2603 🐵
  
## Índice ⭐
1. [La Estructura](#La-Estructura)
2. [Clases](#Clases)
4. [Archivos](#Archivos)

## La Estructura
- [Css](Css): Esta carpeta contiene los diferentes estilos de las páginas: [Style](Css/Style.css),  [formularioStyle](Css/formularioStyle.css) y [reset](Css/reset.css)
- [Html](Html): Esta carpeta contiene los diferentes archivos Html:  [buscaminas](Html/buscaminas.html),[formulario](Html/formulario.html)  
- [files](src/main/kotlin/files): Contiene user.txt
- [models](src/main/kotlin/models): Contiene todas las clases

## Clases
- [Client.kt](src/main/kotlin/models/Client.kt): Clase Cliente
- [ClientManager.kt](src/main/kotlin/models/ClientManager.kt): Clase Manager de Cliente

## Utilidades
- [utilities.kt](src/main/kotlin/utilities/utilities.kt)
- [consoleColors.kt](src/main/kotlin/utilities/consoleColors.kt)
- [messages.kt](src/main/kotlin/utilities/messages.kt)

## Archivos
Al iniciar el programa, si el directorio de archivos no existe, se crea. Y lo mismo sucede con users.txt
- [users.txt](src/main/files/users.txt): Este archivo de texto contiene todos los usuarios y si no existe, se crea.
