// --- LOGIN ---
if(document.getElementById("enviar")) {
    document.getElementById("enviar").addEventListener("click", function() {
        const user = document.getElementById("username").value;
        const pass = document.getElementById("password").value;

        if(user === "admin" && pass === "1234") {
            window.location.href = "cartas.html";
        } else {
            const alerta = document.getElementById("alerta");
            alerta.style.display = "block";
            alerta.textContent = "Usuario o contraseña incorrectos";
        }
    });
}

// --- FUNCION AUXILIAR ---
function registrarCarta(numero, nombre) {
    const tbody = document.getElementById("listado");
    let filaExistente = null;

    Array.from(tbody.rows).forEach(row => {
        if(row.cells[0].textContent.trim() === numero) {
            filaExistente = row;
        }
    });

    if(filaExistente) {
        let cant = parseInt(filaExistente.cells[2].textContent);
        filaExistente.cells[2].textContent = cant + 1;
    } else {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <th scope="row">${numero}</th>
            <td>${nombre}</td>
            <td>1</td>
        `;
        tbody.appendChild(fila);
    }
}

// --- FORMULARIO ---
if(document.getElementById("registrar")) {
    document.getElementById("registrar").addEventListener("click", function() {
        const numero = document.getElementById("numero").value.trim();
        const carta = document.getElementById("carta").value.trim();

        if(numero && carta) {
            registrarCarta(numero, carta);
            document.getElementById("numero").value = "";
            document.getElementById("carta").value = "";
        } else {
            alert("Debes ingresar número y descripción de carta.");
        }
    });
}

// --- CLIC EN CARTAS ---
if(document.querySelectorAll(".btncarta")) {
    const cartas = document.querySelectorAll(".btncarta");
    cartas.forEach(c => {
        c.addEventListener("click", function() {
            const num = this.getAttribute("data-carta");
            const nombreCarta = "Carta " + num;
            registrarCarta(num, nombreCarta);
        });
    });
}