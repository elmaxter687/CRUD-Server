//Esta variable serán la lista inicial, después de manipularlos
//ya no volverán a cargarse a menos que los crees de manera manual
//Es decir, solo se muestran una vez, si los eliminas o actualizas ya tendran
//sus nuevos valores o simplemente no existirán
var personas = [
  { nombre: "Juan", apellido: "Hernández" },
  { nombre: "Adrian", apellido: "Domínguez" },
  { nombre: "Luis", apellido: "López" },
  { nombre: "Andres", apellido: "Jiménez" },
  { nombre: "Pedro", apellido: "García" },
  { nombre: "Juan", apellido: "Pérez" }
];
//Variable para obtener el index del select o posición en la lista Personas[]
var i;


//Función para limpiar los inputs, esto se hace cada que se ejecuta una función que
//lo necesite o con el botón directamente.
function limpiarForm() {
  document.querySelector("#nombre").value = "";
  document.querySelector("#apellido").value = "";
  
}


//Función que inserta una persona a la lista, esta función recibe 2 parámetros (nombre y apellido)
//lo inserta en la lsita NewPerson y lo manda a guardar a la lista Personas.
function insertarPersona(name, lastname) {
  var NewPerson = {
    nombre: name,
    apellido: lastname
  }
  //Aquí se inserta la nueva persona a la lista Personas.
  personas.push(NewPerson);

  //Aqui guardamos la lista con la persona nueva, recordar que como el almacenamiento local solo
  //guarda strings hay que convertilo con JSON.stringify.
  localStorage.setItem("Personas", JSON.stringify(personas));
  

  //Aquí se vuelven a cargar los datos ya con la nueva persona agrega, se manda a rellenar el select.
  cargarDatos();
}


//Función para cargar los datos de la lista Personas al select con id=panel
function cargarDatos(){
  //Verificamos si tenemos almacenado una key de nombre "Personas"
  //Si en dado que no existe esa key devolverá null y se ejecutará lo
  //que está dentro del if, esto solo ocurrira una vez ya que si no existe se creará
  //y nunca más deberá será null a menos que elimines esa key de forma manual en el navegador
  //o lo elmines desde aquí en el código
  if ((localStorage.getItem("Personas") == null)){
    //Si no existe la key personas se crea con la lista de personas
    //que se le dió al iniciar la aplicación
    localStorage.setItem("Personas", JSON.stringify(personas));
  }
  //Obtenemos esa lista actual y lo guardamos
  personas = JSON.parse(localStorage.getItem("Personas"));
  //Obtenemos el select y lo guradamos en la variable panel para poder acceder a el
  let panel = document.querySelector("#panel");
  panel.textContent = "";
  //Recorrremos la lista Personas con un forEach y vamos rellenando el select
  personas.forEach(x => {
  datos = document.createElement("option");
  datos.innerText = `${x.nombre} ${x.apellido}`;

  //Aquí se rellena el select con cada datos que se va obteniendo
  //Basicamente es como el DataTable en C# que al final se inserta en un DataGridView por decir un ejemplo
  panel.append(datos);
  });
  
}

//Función para mandar a crear una nueva persona pero en realidad esta función
//solo manda a llamar a la función que si crea una nueva persona (insertarpersona())
function crear(){

  //Guardamos los valores (nombre y apellido) de los inputs en estas variables
  var aggNombre = document.getElementById("nombre").value;
  var aggApellido = document.getElementById("apellido").value;

  //Validamos si están en blanco los campos de los inputs
  if (aggNombre=="" || aggApellido==""){
    alert("Los campos no deben estar vacíos");
  }
  //Si no están en blanco, mandamos a llamar a la función insertarPersona() y le
  //mandamos las 2 variables (aggNombre, aggApellido) como paramétros
  else{
    insertarPersona(aggNombre, aggApellido);
    //Limpiamos inputs
    limpiarForm();
  }
}

//Aquí solo manda lo que esta seleccionado en el select, osea mandamos los valores de
//nombre y apellido a los inputs
function pnlClick() {
  i = panel.selectedIndex;
  //Obtenemos la lista guarda en el almacenamiento local
  personas = JSON.parse(localStorage.getItem("Personas"));
  //Con el index guardado en i, se manda los valores respectivos a los inputs (nombre, apellido)
  document.querySelector("#nombre").value = personas[i].nombre;
  document.querySelector("#apellido").value = personas[i].apellido;
}

//Función para actualizar los datos
function actualizar() {
  //Obtenemos los datos actuales seleccionas en el select
  personas[i].nombre = document.querySelector("#nombre").value;
  personas[i].apellido = document.querySelector("#apellido").value;
  //Guardamos los datos en el almacenamiento local despues de actualizar
  //para que se guarden con sus nuevos valores
  localStorage.setItem("Personas", JSON.stringify(personas));
  //Volvemos a rellenar el select con los datos actualizados
  cargarDatos();
  //Limpiamos inputs
  limpiarForm();
}

//Función para elminar un registro
function borrar() {
  //Con el index se obtiene el registro seleccionado y se elmina
  personas.splice(i, 1);
  //Se manda la lista acutal de personas, en este caso ya tendría una
  //persona menos
  localStorage.setItem("Personas", JSON.stringify(personas));
  //Se rellena el select con las personas que no han sido elimanadas
  cargarDatos();
  //Limpiamos inputs
  limpiarForm();
}

/*Al inicializar la página por primera vez se cargan los datos de la lista Personas[] en el select, en dado caso
que hayamos borramos esos datos o los hayamos manipulados se cargarán con los cambios o  en dado caso de que hayamos
borrado toda la lista el select estará vacio hasta que agregues datos.*/
cargarDatos();
