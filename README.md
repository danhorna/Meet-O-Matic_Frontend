Este proyecto es para el curso de Ingenieria de Aplicaciones Web 2020.

## Sobre la aplicacion

Se va a diseñar e implementar una app para la coordinacion de reuniones(Date Matchers).<br />
Paginas similares: [Dudle](https://dudle.inf.tu-dresden.de/) & [LetsMeetOn](https://letsmeeton.com/)

## ¿Cómo funciona?

El coordinador de la reunión propone un conjunto de días y horarios para un evento, una vez confirmado se le otorga un link el cual 
puede usar para distribuirlo entre sus contactos.<br />
Luego, cada invitado puede seleccionar cual/es dia/s puede asistir a la reunion.<br />
Además, el coordinador de una reunion es capaz de revisar un resumen de las respuestas.

## Características adicionales

- **Las reuniones puede ser creadas sin necesidad de estar registrado**<br />

En este caso, al confirmar el evento, se otorgan dos links

1. Link para distribuir (Se debe generar una clave privada).<br />
2. Link para visualizar resultados.

- **Es posible registrarse en el sitio** <br />
Ésto es de utilidad para poder ver y administrar los eventos creados.<br />
Se podrá ver la cantidad de respuestas, además de poder desactivar el formulario y/o clonarlo.<br />
En principio solo se pueden tener asociados 10 formularios.

- **Existe un usuario administrador** <br />
Es capaz de realizar tareas de mantenimiento, por ej: acceder a la lista de usuarios y formularios.

## Implementaciones adicionales

- **Integración con plataformas single sign on** <br />
Por ej: Auth0.

- **Integración con medio de pago**<br />
Para lograr un plan corporativo en el cual es posible ampliar la cantidad de formularios creados. MercadoPago.

- **Integración con plataforma para el envio de correo**<br />
Utilizando el servidor de correos de Gmail mediante el protocolo IMAP
