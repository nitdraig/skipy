# Spiky Backend
## Project Structure
Spiky's backend structure follows an organized design to facilitate maintainability and scalability. The main folders and files of the project are described below:

- index.js: Main entry point for the backend application.

- src/: Directory that contains all the source code of the application.

- controllers/: Controllers that manage the business logic of the application.

- linkController.js: Controller in charge of managing operations related to link manipulation, including the generation of slugs and storage in the database.
models/: Data models that define the structure of the database.

- linkModel.js: MongoDB model that defines the schema for the link collection, with fields such as originalUrl, slug and createdAt.

- routes/: Application routes defined to handle HTTP requests.

- linkRoutes.
js: Defines the routes related to creating and obtaining links in the application, using the HTTP POST and GET methods.

- utils/: Utilities that contain reusable functions.

- slugGenerator.js: Generate unique identifiers (slugs) for URLs using "nanoid".

- urlValidator.
js: URL validator that uses the URL module to verify the validity of URLs.

## Contributions
Contributions are welcome! If you wish to contribute, follow the guidelines outlined in the CONTRIBUTING.md file to ensure effective collaboration.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.




---------------------------------------
---------------------------------------
---------------------------------------

# Backend de Spiky
## Estructura del Proyecto
La estructura del backend de Spiky sigue un diseño organizado para facilitar la mantenibilidad y escalabilidad. A continuación, se describen las principales carpetas y archivos del proyecto:

- index.js: Punto de entrada principal para la aplicación backend.

- src/: Directorio que contiene todo el código fuente de la aplicación.

- controllers/: Controladores que manejan la lógica de negocio de la aplicación.

- linkController.js: Controlador encargado de gestionar las operaciones relacionadas con la manipulación de enlaces, incluyendo la generación de slugs y el almacenamiento en la base de datos.
models/: Modelos de datos que definen la estructura de la base de datos.

- linkModel.js: Modelo de MongoDB que define el esquema para la colección de enlaces, con campos como originalUrl, slug y createdAt.
routes/: Rutas de la aplicación definidas para manejar las solicitudes HTTP.

- linkRoutes.js: Define las rutas relacionadas con la creación y obtención de enlaces en la aplicación, utilizando los métodos HTTP POST y GET.
utils/: Utilidades que contienen funciones reutilizables.

- slugGenerator.js: Genera identificadores únicos (slugs) para las URLs utilizando "nanoid".

- urlValidator.js: Validador de URL que utiliza el módulo URL para verificar la validez de las URLs.


## Contribuciones
¡Las contribuciones son bienvenidas! Si deseas contribuir, sigue las pautas descritas en el archivo CONTRIBUTING.md para asegurar una colaboración efectiva.

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo LICENSE para obtener más detalles.