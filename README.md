• Dar un correcto formato a la información desplegada por las interfaces de usuario. Formato de fechas, horas, campos numéricos, información tabulada, descripciones de ID's para claves foráneas, etc
    ◦ Ej1: Las fechas deben mostrarse en formato DD-MM-AAAA y no en formato YYYY-MM-DD. Lo mismo opera para el ingreso de información en los formularios.
    ◦ Ej2: Sustituir ID's por las respectivas Descripciones, No se vale desplegar Estado: 1 , lo correcto es Estado: Registrado
    ◦ Ingreso de datos utilizando drops - combo box - select de HTML según corresponda.
    ◦ Ej1: Si existen registros asociados a una clave foránea para el almacenamiento de la información para determinados formularios, se debe hacer referencia y mostrar la descripción asociada a la clave foránea y no simplemente mostrar los ID's, o un campo de texto/drop para que usuario ingrese ID's numéricos.
• Para las estructuras/tablas de la Base de Datos, que tengan identificadores (Clave Primaria) numéricos, o autoincrementales, el ingreso de este campo no debe ser solicitado por la interfaz web al usuario.
• Diseño de la Interfaz: uso de espacio, organización y nombres estandarizadas a lo largo de la aplicación
    ◦ UI unificada con el resto de integrantes del grupo.
    ◦ en la vista de datos de id no es relevante, 
    ◦ priorizar que datos se ven y organizar la interfaz
    ◦ Incluir placeholder, label de ejemplos o microhelp, títulos descriptivos, migas de pan
• Manejar los errores de ejecución/sistema de forma amigable para el usuario (No desplegar errores de Base de Datos, No desplegar errores o mostrar páginas en blanco).
• Notificar por mensajes las acciones realizadas por el usuario. (Ej: Datos guardados correctamente, Información no válida, Falta ingresar X campo del formulario, Información Enviada Correctamente, etc)
• Validación Campos de formularios: numérico, fechas, horas, strings, email, extensión y mime type de archivos adjuntos, campos requeridos no nulos, etc.
• Capturar fechas, horas, estados de forma automática por el sistema.
    ◦ Ej1: cuando un formulario asociado a uno o más registros de la base de datos necesite guardar la fecha del ingreso del registro, este debe capturarse de forma automática. Cuidar o considerar la diferencia de hora del cliente y del server.
    ◦ Ej2: cuando en un formulario se ingresa información y el registro en la base de datos necesita guardarse con un estado inicial predeterminado, este no debe ser exigido al usuario.
• Validaciones de campos, nombres, título o descripción; que deben ser texto, aunque pueden contener números. revisen expresiones regulares, al menos que antes del 1er espacio la cadena no sea sólo texto. En estos campos se utilizan métodos de normalización del texto, para evitar que queden mal escritos.
• El formateo del rut VISUAL es independiente al formato en la BD, pueden incluir una máscara que puedan configurarle seteando automáticamente los puntos, QUE EL USUARIO no se preocupe si es con punto o sin punto, nosotros lo transformamos y presentamos y si es necesario lo volvemos a transformar para llevar a la BD
• Otro ejemplo es el Teléfono debe incluir una máscara para el formato, pero no permitir caracteres y validar mínimo y máx. caracteres, al menos.
• También el largo de los datos se restringe y validan fácilmente, es ideal indicar x caracteres y en la medida se escribe indicar caracteres restantes.
• Texto explicativo para las opciones, importante un ejemplo y además mencionar mínimos/máximos
• Título descriptivo de las interfaces q siempre recuerden al usuario que está haciendo
• Falta de ortografías en interfaz: títulos, placeholder, text, botones, mensajes, etc.
• Las listas deben estar ordenada, por ejemplo: las ultimas primero, o las primeras en vencer, ese criterio se indica claramente al usuario 
• Las listas NO deben ser sólo el vaciado de una tabla sin ninguna opción de filtro, opciones para ordenar por distintas columnas y buscar por campo o por texto
• Listas desplegables siempre actualizadas desde la base de datos. Ejemplo: revise este código https://select2.org/tagging 
• Validación de formato de archivos de subida, tamaño y optimizar imágenes antes de guardar, consideren que deben ser livianas, hay librerías que optimizan las imágenes con tamaños y resolución.
