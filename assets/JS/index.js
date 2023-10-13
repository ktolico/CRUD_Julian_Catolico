console.log("Entro index.js");

let modismos = JSON.parse(localStorage.getItem("modismos")) || [];

const inputModismo = document.getElementById("inputModismo");
const inputPais = document.getElementById("inputPais");
const inputURL = document.getElementById("inputURL");
const inputExplicacion = document.getElementById("inputExplicacion");

const btnGuardar = document.getElementById("btnGuardar");
const btnBorrartodo = document.getElementById("btnBorrartodo");

const divModismos = document.getElementById("divModismos");
const alertSinModismos = document.getElementById("alertSinModismos");

let indexEditar = null;

class Modismo {
    constructor(modismo, pais, url, explicacion) {
        this.modismo = modismo;
        this.pais = pais;
        this.url = url;
        this.explicacion = explicacion;
    }
}

function guardarModismo() {
    let modismoText = inputModismo.value;
    let pais = inputPais.value;
    let url = inputURL.value;
    let explicacion = inputExplicacion.value;
    if (url === "") {
        url = "https://png.pngtree.com/png-vector/20190420/ourmid/pngtree-question-mark-vector-icon-png-image_963976.jpg"
    }

    let nuevoModismo = new Modismo(
        modismoText,
        pais,
        url,
        explicacion
    );
    console.log(nuevoModismo);

    if (indexEditar === null) {
        console.log("Agregar modismo");
        modismos.push(nuevoModismo);
        Swal.fire('¡Modismo agregado correctamente!', '', 'success');
    } else {
        modismos[indexEditar] = nuevoModismo;
        indexEditar = null;
        console.log("Editar modismo");
    }
    limpiarFormularioModismos();
    localStorage.setItem("modismos", JSON.stringify(modismos))
    console.log("Entro funcion guardar modismo");
    mostrarModismos();
}


function borrarTodo() {
    Swal.fire({
        title: '¿Estás seguro?',
        text: '¡No podrás revertir esto!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminalos'
    }).then((result) => {
        if (result.isConfirmed) {
            console.log("Entro a borrar todo");
            localStorage.clear();
            modismos = [];
            mostrarModismos();

            Swal.fire('¡Borrado!', '¡Tus modismos han sido eliminados!', 'success');
        }
    });
}


function editarModismo(index) {
    console.log("Entro editar modismo:" + index);
    let modismoEditar = modismos[index];
    console.log(modismoEditar, "modismoEditar");
    inputModismo.value = modismoEditar.modismo;
    inputPais.value = modismoEditar.pais;
    inputURL.value = modismoEditar.url;
    inputExplicacion.value = modismoEditar.explicacion;
    indexEditar = index;
}

function eliminarModismo(index) {
    console.log("Entro eliminar modismo:" + index);
    modismos.splice(index, 1);
    localStorage.setItem("modismos", JSON.stringify(modismos))
    mostrarModismos();
}

function mostrarModismos() {
    if (modismos.length === 0) {
        divModismos.innerHTML = `
        <div class="alert alert-primary" role="alert" id="alertSinModismos">
            No hay modismos agregados
        </div>`;
    } else {
        divModismos.innerHTML = "";
        modismos.forEach((modismo, index) => {
            divModismos.innerHTML += `
                <div class="card mb-3">
                   <div class="row g-0">
                      <div class="col-md-4">
                         <img src="${modismo.url}" class="img-fluid rounded-start" alt="modismo">
                      </div>
                      <div class="col-md-8">
                         <div class="card-body">
                            <h5 class="card-title">${modismo.modismo}</h5>
                            <h6 class="card-subtitle mb-2 text-body-secondary">${modismo.pais}</h6>
                            <p class="card-text">${modismo.explicacion}</p>
                            <div class="row mb-2">
                               <div class="col">
                                  <button class="btn btn-warning w-100 mt-2" type="button" id="editar-${index}" onclick="editarModismo(${index})">Editar</button>
                               </div>
                               <div class="col">
                                  <button class="btn btn-danger w-100 mt-2" type="button" id="eliminar-${index}" onclick="eliminarModismo(${index})">Eliminar</button>
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
            `;
        });
    }
}


function limpiarFormularioModismos() {
    inputModismo.value = "";
    inputPais.value = "";
    inputURL.value = "";
    inputExplicacion.value = "";
}

btnGuardar.addEventListener("click", guardarModismo);
btnBorrartodo.addEventListener("click", borrarTodo);


mostrarModismos();