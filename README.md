# DelilahResto
Crear archivo, ir a la carpeta del mismo e inicializarlo con el ccomando	
npm init
Luego instalar librerias a usar con
npm install express  o npm i express 
cualquiera de las dos formas es válidad.
Instale todas las librerias

instalar moment
npm install moment --save
npm install --save express-validator


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