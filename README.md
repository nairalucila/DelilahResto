# DelilahResto

## Comenzando
Lo primero que ud. debe hacer es instalar Node Js. en su sistema local. Esto se hace por medio de la consola.

### Si esta en Linux o Mac
### Si está en Windows

 
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
	- archivo YMEL cn Documentaciónd. 

### Endpoints
A continuación Ud. podrá probar las rutas en las que podrá hacer peticiones por medio de Postman o de cualquier otra herramienta similar.

## Base de Datos
La Base de datos cuenta con 3 modelos de tabla; la tabala Usuarios, Platos y Pedidos. Estas son relacionales, especialmente en la tabla Pedidos que es en donde se almacena el Id del usuario que hace el pedido, con el Id del plato que pidió.

### Endpoints
En postman ingrese, las siguientes rutas para hacer peticiones a la base de datos.

#### Rutas de registro e inicio de sesión:
	
	- post:/registro
	- post:/login
	

/registro --> crea nuevo usuario  -ok
/eliminarregistro/:id --> borrar usuario -- ok
/usuarios --> trae todos los usuarios de la db -- ok
/usuarios/:id --> trae usuario segun id  --ok
/actualizar/:id --> falta


/explorador --> trae todos los platos -- ok
/crearplatos --> crea platos nuevos -- ok
/:platosid  -->elimina platos por id  --ok
/actualizar --> actualizar platos --falta

/carrito --> crea un pedido nuevo  --OK - falla la fecha y hora




Para crear un usuario utilizar esta plantilla de json

{
	"nombreUsuario": "example",
    "nombreCompleto": "exampel completo",
    "email": "exampel@gmail.com",
    "tel": 3512525025,
    "direccion_envio": "San Martin 255",
    "contraseña": "255contraseña"
    
}

Para modificar un usuario / id
{
    
	"nombreUsuario": "example",
    "nombreCompleto": "exampel completo",
    "email": "exampel@gmail.com",
    "tel": 3512525025,
    "direccion_envio": "San Martin 255",
    "contraseña": "255contraseña"

}

Para crear un plato utilice esta plantilla
    {
    "nombre": "pizza super especial",
    "descripcion": "salsa, muzza, jamon, huevo",
    "precio": "290"
    }

Para crear un pedido utilizar esta plantilla de json


 {
 	"usuarioId": 5,
    "platoId": 8,
    "cantidad": 1,
    "total": 200,
    "estado": "nuevo"
    
    
      }

      para logear un usuario

      {
          "email": "example@gmail.com",
          "contraseña": "examplecontraseña"

      }
