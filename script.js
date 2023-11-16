let endpoint = "https://6555488e63cafc694fe79f14.mockapi.io/users/";
let inputBuscar = document.getElementById("inputGet1Id");
let btnBuscar = document.getElementById("btnGet1");
let results = document.getElementById("results");

//Alerta error
function showAlert() {
  document.getElementById("alert-error").classList.add("show");
  window.setTimeout(
    () => document.getElementById("alert-error").classList.remove("show"),
    3000
  );
  resultsElement = document.getElementById("results").innerHTML = "";
}

//Pauta 1
function mostrarDatos() {
    results.innerHTML = "";
  fetch(endpoint)
    .then((response) => response.json())
    .then((data) => {
      //Si el campo esta vacío mostrar todos los datos
      if (inputBuscar.value === "") {
        data.forEach((item) => {
          results.innerHTML += `<li class="list-group-item bg-dark text-white">
            ID: ${item.id} <br>
            NAME: ${item.name} <br>
            LASTNAME: ${item.lastname}
        </li>`;
        });
        //Otherwise, mostrar ID ingresado (restamos uno por el índice)
      } else {
        let id = inputBuscar.value - 1;
        results.innerHTML = `<li class="list-group-item bg-dark text-white">
        ID: ${data[id].id} <br>
        NAME: ${data[id].name} <br>
        LASTNAME: ${data[id].lastname}
    </li>`;
      }
    })
    .catch((error) => {
      showAlert();
    });
}

btnBuscar.addEventListener("click", () => {
  mostrarDatos();
});

//Pauta 2
let btnAgregar = document.getElementById("btnPost");
let nombre = document.getElementById("inputPostNombre");
let apellido = document.getElementById("inputPostApellido");

//Activar boton al ingresar texto en los dos campos
nombre.addEventListener("input", () => {
  if (nombre.value && apellido.value) {
    btnPost.removeAttribute("disabled");
  } else {
    btnPost.setAttribute("disabled", true);
  }
});
inputPostApellido.addEventListener("input", () => {
  if (nombre.value && apellido.value) {
    btnPost.removeAttribute("disabled");
  } else {
    btnPost.setAttribute("disabled", true);
  }
});

function agregarDatos() {
  let datos = {
    name: nombre.value,
    lastname: apellido.value,
  };
  console.log();
  //POST
  fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datos),
  })
    .then((response) => response.json())
    .then(() => {
      mostrarDatos();
    })
    .catch((error) => {
      showAlert();
    });
}

btnAgregar.addEventListener("click", () => {
  agregarDatos();
});

//Pauta 3
let inputModificar = document.getElementById("inputPutId");
let btnModificar = document.getElementById("btnPut");
let modalNombre = document.getElementById("inputPutNombre");
let modalApellido = document.getElementById("inputPutApellido");
let btnModal = document.getElementById("btnSendChanges");

//Activar boton de modificar al ingresar texto
inputModificar.addEventListener("input", () => {
  if (inputModificar.value === "") {
    btnModificar.setAttribute("disabled", "disabled");
  } else {
    btnModificar.removeAttribute("disabled");
  }
});

//Activar boton del modal al ingresar texto en los dos campos
modalNombre.addEventListener("input", () => {
  if (modalNombre.value && modalApellido.value) {
    btnModal.removeAttribute("disabled");
  } else {
    btnModal.setAttribute("disabled", true);
  }
});
modalApellido.addEventListener("input", () => {
  if (modalNombre.value && modalApellido.value) {
    btnModal.removeAttribute("disabled");
  } else {
    btnModal.setAttribute("disabled", true);
  }
});

function modificarDatos() {
  let id = endpoint + inputModificar.value;
  let datos = {
    name: modalNombre.value,
    lastname: modalApellido.value,
  };
  //PUT
  fetch(id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datos),
  })
    .then((response) => response.json())
    .then(() => {
      mostrarDatos();
    })
    .catch((error) => {
      showAlert();
    });
}

btnModal.addEventListener("click", () => {
  document.getElementById("closeModal").click();
  modificarDatos();
});

//Pauta 4
let inputEliminar = document.getElementById("inputDelete");
let btnEliminar = document.getElementById("btnDelete");

inputEliminar.addEventListener("input", () => {
  if (inputEliminar.value === "") {
    btnEliminar.setAttribute("disabled", "disabled");
  } else {
    btnEliminar.removeAttribute("disabled");
  }
});

function borrarDatos() {
  let id = endpoint + inputEliminar.value;
  //DELETE
  fetch(id, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then(() => {
      mostrarDatos();
    })
    .catch((error) => {
      showAlert();
    });
}

btnEliminar.addEventListener("click", () => {
  borrarDatos();
});