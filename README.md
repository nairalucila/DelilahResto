# DelilahResto

## Comenzando
Lo primero que ud. debe hacer es instalar Node Js. en su sistema local. Esto se hace por medio de la consola.

### Si esta en Linux o Mac
### Si está en Windows


## Iniciar programa 
Este programa se entrega con todas las dependencias agregadas en el archivo package json. Pero ud. deberá instalarlas. en su entorno local.
Instale a continuación por medio de la consola de su sistema operativo, con el siguiente comando:

### Si está en Linux o Mac:
	npm start
### Si esta en Windows:
	averiguar

instalar moment
npm install moment --save
npm install --save express-validator

## Lo que se entrega
En este proyecto se entrega un conjunto de archivos en donde figuran los archivos js, Readme, 

ENDOPOINTS

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
