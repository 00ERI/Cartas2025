// --- LOGIN ---
// Verificamos si existe el botón con id "enviar"
if(document.getElementById("enviar")) {
    // Agregamos un evento al botón "enviar"
    document.getElementById("enviar").addEventListener("click", function() {
        // Obtenemos los valores de usuario y contraseña
        const user = document.getElementById("username").value;
        const pass = document.getElementById("password").value;

        // Validamos usuario y contraseña
        if(user === "admin" && pass === "1234") {
            // Si son correctos, redirigimos a la página de cartas
            window.location.href = "cartas.html";
        } else {
            // Si no, mostramos un mensaje de error
            const alerta = document.getElementById("alerta");
            alerta.style.display = "block"; // Mostramos el div
            alerta.textContent = "Usuario o contraseña incorrectos"; // Texto de error
        }
    });
}

// --- FUNCION AUXILIAR ---
// Función que agrega una carta a la tabla
function registrarCarta(numero, nombre) {
    const tbody = document.getElementById("listado"); // Cuerpo de la tabla
    let filaExistente = null; // Variable para revisar si ya existe la carta

    // Recorremos las filas de la tabla para buscar si la carta ya está
    Array.from(tbody.rows).forEach(row => {
        if(row.cells[0].textContent.trim() === numero) {
            filaExistente = row; // Guardamos la fila existente
        }
    });

    // Si la carta ya existe, incrementamos la cantidad
    if(filaExistente) {
        let cant = parseInt(filaExistente.cells[2].textContent);
        filaExistente.cells[2].textContent = cant + 1; // Sumamos 1
    } else {
        // Si no existe, creamos una nueva fila
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <th scope="row">${numero}</th> <!-- Número de carta -->
            <td>${nombre}</td> <!-- Nombre de carta -->
            <td>1</td> <!-- Cantidad inicial -->
            <td>
                <!-- Botón para eliminar individualmente -->
                <button class="btn btn-danger btn-sm eliminar-individual">Eliminar</button>
            </td>
        `;
        tbody.appendChild(fila); // Agregamos la fila a la tabla

        // Agregamos evento al botón "Eliminar" de la nueva fila
        fila.querySelector(".eliminar-individual").addEventListener("click", function() {
            if(confirm("¿Estás seguro de eliminar esta carta?")) {
                fila.remove(); // Eliminamos la fila si confirma
            }
        });
    }
}

// --- FORMULARIO ---
// Verificamos si existe el botón "registrar"
if(document.getElementById("registrar")) {
    // Agregamos evento de click
    document.getElementById("registrar").addEventListener("click", function() {
        const numero = document.getElementById("numero").value.trim(); // Número ingresado
        const carta = document.getElementById("carta").value.trim();   // Descripción ingresada

        // Validamos que ambos campos tengan datos
        if(numero && carta) {
            registrarCarta(numero, carta); // Registramos la carta
            // Limpiamos los campos
            document.getElementById("numero").value = "";
            document.getElementById("carta").value = "";
        } else {
            alert("Debes ingresar número y descripción de carta."); // Validación
        }
    });
}

// --- CLIC EN CARTAS ---
// Seleccionamos todos los elementos con clase "btncarta"
if(document.querySelectorAll(".btncarta")) {
    const cartas = document.querySelectorAll(".btncarta");
    cartas.forEach(c => {
        // A cada carta le asignamos un evento click
        c.addEventListener("click", function() {
            const num = this.getAttribute("data-carta"); // Número de carta desde atributo
            const nombreCarta = "Carta " + num;          // Nombre genérico
            registrarCarta(num, nombreCarta);            // Registramos la carta
        });
    });
}

// --- ELIMINAR TODAS LAS CARTAS ---
// Verificamos si existe el botón "eliminarTodo"
if(document.getElementById("eliminarTodo")) {
    document.getElementById("eliminarTodo").addEventListener("click", function() {
        // Confirmación antes de eliminar
        if(confirm("¿Estás seguro de eliminar todas las cartas?")) {
            document.getElementById("listado").innerHTML = ""; // Vaciamos la tabla
        }
    });
}