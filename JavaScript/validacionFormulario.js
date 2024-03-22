function validarFormulario() {
    var nombre = document.getElementById("nombre").value;
    var apellido = document.getElementById("apellido").value;
    var nickname = document.getElementById("nickname").value;
    var correo = document.getElementById("correo").value;
    var fecha = document.getElementById("fecha").value;

    if (nombre === "") {
        mostrarError("Por favor, ingrese su nombre");
        return false;
    }

    if (apellido === "") {
        mostrarError("Por favor, ingrese su apellido");
        return false;
    }

    if (nickname === "") {
        mostrarError("Por favor, ingrese su nickname");
        return false;
    }

    if (correo === "") {
        mostrarError("Por favor, ingrese su correo");
        return false;
    }

    if (fecha === "") {
        mostrarError("Por favor, ingrese su fecha de nacimiento");
        return false;
    }

    var fechaNacimiento = new Date(fecha);
    var fechaActual = new Date();
    var edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
    if (edad < 18) {
        mostrarError("Debes ser mayor de edad para registrarte");
        return false;
    }

    if (!isNaN(nickname.charAt(nickname.length - 1))) {
        mostrarError("El nick debe acabar en un número");
        return false;
    }

    if (correo.indexOf("@itb.cat") === -1) {
        mostrarError("El correo debe ser del ITB");
        return false;
    }

    var formData = {
        nombre: nombre,
        apellido: apellido,
        nickname: nickname,
        correo: correo,
        fecha: fecha
    };

    localStorage.setItem('formData', JSON.stringify(formData));

    return true;
}

function mostrarError(mensaje) {
    var mensajeError = document.getElementById("mensajeError");
    mensajeError.innerHTML = mensaje;
}
