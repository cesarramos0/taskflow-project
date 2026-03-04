//VARIABLES
const formulario = document.getElementById("formulario-tareas");
const input = document.getElementById("input-tarea");
const contenedorLista = document.querySelector(".lista-propuestas");
const inputBusqueda = document.getElementById("input-busqueda");


input.addEventListener("input", function() {
    this.style.height = "auto";
    this.style.height = (this.scrollHeight) + "px";
});

//RECUPERACIÓN DE ELEMENTOS
document.addEventListener("DOMContentLoaded", () => {
    const almacenadas = JSON.parse(localStorage.getItem("tareas-mkt23"));
    if (almacenadas) {
        almacenadas.forEach(texto => {
            crearElemento(texto);
        });
    }
});

//ESCUCHA DE EVENTOS (Añadir tarea)
formulario.addEventListener("submit", function(event) {
    event.preventDefault(); 
    
    if (input.value.trim() == "") return;

    crearElemento(input.value);

    input.value = "";
    input.style.height = "auto";
    guardarTareas();
});

//BUSQUEDA DE PROPUESTAS
inputBusqueda.addEventListener("input", function() {
    const filtro = inputBusqueda.value.toLowerCase().trim();
    const propuestas = document.querySelectorAll(".lista-propuestas .tarea-item");

    if (filtro === "") {
        propuestas.forEach(p => p.style.display = "flex");
        return;
    }

    const reglaExacta = new RegExp(`\\b${filtro}\\b`, 'i');

    propuestas.forEach(propuesta => {
        const textoPropuesta = propuesta.querySelector("span").textContent;

        if (reglaExacta.test(textoPropuesta)) {
            propuesta.style.display = "flex";
        } else {
            propuesta.style.display = "none";
        }
    });
});

//FUNCIONES AUXILIARES
function crearElemento(texto) {
    const nuevaTarea = document.createElement("div");
    nuevaTarea.classList.add("tarea-item");

    nuevaTarea.innerHTML = `
        <span>${texto}</span>
        <button class="btn-borrar"><img src="cerrar.png" alt="eliminar-propuesta"></button>
    `;

    const botonEliminar = nuevaTarea.querySelector(".btn-borrar");
    botonEliminar.addEventListener("click", function() {
        nuevaTarea.remove();
        guardarTareas();
    });

    contenedorLista.appendChild(nuevaTarea);
}

function guardarTareas(){
    const todasTareas = [];
    const elementosTarea = document.querySelectorAll(".lista-propuestas span");

    elementosTarea.forEach(tarea => {
        todasTareas.push(tarea.textContent);
    });

    localStorage.setItem("tareas-mkt23", JSON.stringify(todasTareas));
    console.log("Guardado con éxito", todasTareas);
}