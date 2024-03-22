
        function validarFormulario() {
            var fecha = document.getElementById("fecha").value;
            var fechaNacimiento = new Date(fecha);
            var fechaActual = new Date();
            var edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
            if (edad < 18) {
                mostrarError("Debes ser mayor de edad para registrarte");
                return false;
            }

            var nick = document.getElementById("nickname").value;
            if (!isNaN(nick.charAt(nick.length - 1))) {
                mostrarError("El nick debe acabar en un número");
                return false;
            }

            var email = document.getElementById("correo").value;
            if (email.indexOf("@itb.cat") == -1) {
                mostrarError("El correo debe ser del ITB");
                return false;
            }
            return true;
        }

        function mostrarError(mensaje) {
            var mensajeError = document.getElementById("mensajeError");
            mensajeError.innerHTML = mensaje;
        }
