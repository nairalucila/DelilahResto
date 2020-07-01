# DelilahResto

## Comenzando
Lo primero que ud. debe hacer es instalar Node Js. en su sistema local. Esto se hace por medio de la consola.

### Si esta en Linux o Mac
Desde la consola, introducir el siguiente comando:

	- sudo apt-get install -y nodejs
	
### Si está en Windows
Ingrese al sitio oficial de NodeJs y descargue e instale manualmente.

 
### Lista de librerías que se requieren
	- npm i bcrypt
    	- npm i body-parser
    	- npm i express
    	- npm i express-validator
    	- npm i jsonwebtoken
    	- npm i moment
    	- npm i mysql
    	- npm i sequelize
	- npm i nodemon
    
Este programa se entrega con todas las dependencias agregadas en el archivo package json. Pero ud. deberá instalarlas en su entorno local en caso de no tenerlas. El comando de instalación es **npm i lib** o **npm install lib**

## Iniciar programa
Para iniciar el servidor, ejecute en la consola el siguiente comando, deberá ver en la misma un mensaje como el siguiente: "Servidor Funcionando".
	
	npm start
	
## Lo que Ud. podrá encontrar
En este proyecto ud. encontrará los siguientes archivos:

	- archivos js. incluyendo, package.json y package-lock.json
	- archivo sql con querys de la base de datos.
	- archivo Readme.md
	- archivo YAML con Documentación. 

## Endpoints
A continuación Ud. podrá probar las rutas en las que podrá hacer peticiones por medio de Postman o de cualquier otra herramienta similar. Los Endpoinst están especificados en la documentación realizada con Swagger.
	
	[https://app.swaggerhub.com/apis-docs/nairalucila/Delilah-Resto/1.0.0#/](https://app.swaggerhub.com/apis-docs/nairalucila/Delilah-Resto/1.0.0#/) 

## Base de Datos
La Base de datos cuenta con 3 modelos de tabla; la tabala Usuarios, Platos y Pedidos. Estas son relacionales, especialmente en la tabla Pedidos que es en donde se almacena el Id del usuario que hace el pedido, con el Id del plato que pidió.

### Comenzar a probar rutas
En Postman ingrese, las siguientes rutas para hacer peticiones a la base de datos.

## Importante
# ¿Cómo probar nuestras rutas?
Cuando ud. necesite hacer una petición para traer información, por ejemplo en Postman, necesitará poner el verbo **GET, POST, PUT, DELETE** seguido la ruta _localhost:3000/platos_ (por ejemplo).
Todas las rutas (excepto la de registro), le pedirán a ud. que pase el token que se creó cuando se logueo en el sistema. La manera en que pasamos este token será asi:
En la pestaña **Headers** pondremos los siguientes valores:
	
	Key: Authorization
	Value: token que recibió en el loguin

De esta manera, podremos manejarnos en todas las rutas en las que ese usuario tenga acceso.

Cuando ud quiera hacer un **Post, Put o Delete** la manera correcta es utilizar los modelos brindados en este documento y pasarlos en la pestaña **Body** **raw** con formato JSON.


#### Rutas de registro e inicio de sesión:
	
	- post:/registro
	- post:/login
	

#### Rutas para traer información de Usuarios.
Estas rutas solo podrán ser solicitadas por un adminsitrador.
	
	- get: /usuarios
	- get: /usuarios/:id
	- put: /usuarios/:id
	- delete: /usuarios/:id


#### Rutas para traer información de Platos.
La ruta get de platos no necesita autorización para ser solicitada.

	- get:/platos 
	- post: /platos
	- put: /platos/:id
	- delete: /platos/:id

#### Rutas para traer información de Pedidos.
La ruta get de pedidos: si es solicitada por un usuario, devolverá los pedidos que ese usuario haya hecho, pero si lo solicita un administrador, devolverá todos los pedidos que haya en la base de datos. La ruta post, puede ser solicitada por un usuario logeado.

	- get:/pedidos
	- post: /pedidos
	- put: /pedidos/:id
	- delete: /pedidos/:id
	
### Autenticación
Los usuarios que sean adminsitradores, es decir que sean valor 1 en la base de datos usuarios, serán aquellos que pueden eliminar, actualizar y traer información de algunas rutas.
Los usuarios adminsitradores podrán:
	
	- Eliminar y actualizar: Pedidos, Platos y Usuarios
	- Podrán crear platos nuevos
	- Podrán acceder a la información de la base de datos de usuarios

Los usuarios comunes, es decir, que su valor sea 0 en la base de datos mencionada podrán:
	
	- Crear un pedido
	- Ver sus pedidos
	- Ver los platos existentes
	- Registrarse e iniciar sesión

### Cómo funciona
Cuando un usuario ingresa al sistema por medio de la ruta login, en el cuerpo del body se devuelve un código al que llamamos token. Cada usuario (sea administrador o no) recibirá uno. Por medio de este podrá acceder a las rutas especificadas. La manera correcta de usar este token es por medio del header.

	authorization: token
	Content-Type: application/json

## Pruebas

Para crear/registrar o modificar un usuario, utilice este modelo de objeto en el body.
Recuerde que al modificar un usuario, deberá ingresar el id del usuario por "path".

	{
		"nombreUsuario": "example",
    		"nombreCompleto": "example completo",
    		"email": "example@gmail.com",
    		"tel": 3512525025,
    		"direccion_envio": "San Martin 255",
    		"contraseña": "255contraseña"
    	}
	
Para iniciar sesión con un usuario, utilice este modelo de objeto en el body.

	{
	
          "email": "example@gmail.com",
          "contraseña": "examplecontraseña"

     	 }

Para crear un plato utilice este modelo de objeto en el body.

    {
    	"nombre": "example",
    	"descripcion": "descripción",
    	"precio": "100"
    }


Para crear un pedido utilizar este modelo de objeto en el body.


 	{
 		"usuarioId": 25,
    		"platoId": 2,
    		"cantidad": 1,
    		"total": 290,
    		"estado": "nuevo"
      	}

Para obtener inforación, modificar o eliminar un Usuario, Plato o Pedido según su Id, ingrese el mismo de esta manera:
	
	Example:
		localhost:3000/usuarios/25  =  localhost:3000/usuarios/id

### Para ver documentación de las rutas, ingrese en este link
Esta documentación se adjunta en la carpeta del proyecto.
	
[https://app.swaggerhub.com/apis-docs/nairalucila/Delilah-Resto/1.0.0#/](https://app.swaggerhub.com/apis-docs/nairalucila/Delilah-Resto/1.0.0#/) 
      
      
     
