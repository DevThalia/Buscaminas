function validarFormulario() {
    var nombre = obtenerValorCampo("nombre");
    var apellido = obtenerValorCampo("apellido");
    var nickname = obtenerValorCampo("nickname");
    var correo = obtenerValorCampo("correo");
    var fecha = obtenerValorCampo("fecha");

    if (!validarCampoLleno(nombre, "nombre")) return false;
    if (!validarCampoLleno(apellido, "apellido")) return false;
    if (!validarCampoLleno(nickname, "nickname")) return false;
    if (!validarCampoLleno(correo, "correo")) return false;
    if (!validarCampoLleno(fecha, "fecha")) return false;
    if (!validarEdadMayorDeEdad(fecha)) return false;
    if (!validarNickAcabaEnNumero(nickname)) return false;
    if (!validarCorreoITB(correo)) return false;

    guardarDatosFormulario(nombre, apellido, nickname, correo, fecha);
    //si todo es correcto nos redirigimos a buscaminas.html
    window.location.href = "buscaminas.html";
    return true;
}

function obtenerValorCampo(idCampo) {
    return document.getElementById(idCampo).value;
}

function validarCampoLleno(valor, nombreCampo) {
    if (valor === "") {
        mostrarError("Por favor, ingrese su " + nombreCampo);
        return false;
    }
    return true;
}

function validarEdadMayorDeEdad(fecha) {
    var fechaNacimiento = new Date(fecha);
    var fechaActual = new Date();
    var edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
    if (edad < 18) {
        mostrarError("Debes ser mayor de edad para registrarte");
        return false;
    }
    return true;
}

function validarNickAcabaEnNumero(nickname) {
    if (!isNaN(nickname.charAt(nickname.length - 1))) {
        mostrarError("El nick debe acabar en un número");
        return false;
    }
    return true;
}

function validarCorreoITB(correo) {
    if (correo.indexOf("@itb.cat") === -1) {
        mostrarError("El correo debe ser del ITB");
        return false;
    }
    return true;
}

function guardarDatosFormulario(nombre, apellido, nickname, correo, fecha) {
    var formData = {
        nombre: nombre,
        apellido: apellido,
        nickname: nickname,
        correo: correo,
        fecha: fecha
    };
    localStorage.setItem('formData', JSON.stringify(formData));
}

function mostrarError(mensaje) {
    var mensajeError = document.getElementById("mensajeError");
    mensajeError.innerHTML = mensaje;
}
