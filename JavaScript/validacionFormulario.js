function validarFechaNacimiento(){
    var fecha = document.getElementById("fechaNacimiento").value;
    var fechaNacimiento = new Date(fecha);
    var fechaActual = new Date();
    var edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
    if(edad < 18){
        alert("Debes ser mayor de edad para registrarte");
        return false;
    }
    return true;
}

function validarNick(){
    var nick=document.getElementById("nick").value;
    if(nick.length-1!=NaN){
        alert("El nick debe acabar en un número");
        return false;
    }
    return true;
}

function validarCorreo(){
    var email=document.getElementById("email").value;
    if(email.indexOf("@itb.cat")==-1){
        alert("El correo debe ser del ITB");
        return false;
    }
}