// Para obtener una introducción a la plantilla En blanco, consulte la siguiente documentación:
// https://go.microsoft.com/fwlink/?LinkId=232509

(function () {
	"use strict";

	var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;
    var utilities = WinJS.Utilities;
    var isFirstActivation = true;
    var ui = WinJS.UI;
    var nav = WinJS.Navigation;
    var MainPage = "/MainPage.html";

	app.onactivated = function (args) {
		if (args.detail.kind === activation.ActivationKind.voiceCommand) {
			// TODO: Controlar los elementos ActivationKind pertinentes. Por ejemplo, si la aplicación puede iniciarse mediante comandos de voz,
			// este es un buen lugar para decidir si se va a rellenar un campo de entrada o se va a elegir otra vista inicial.
		}
		else if (args.detail.kind === activation.ActivationKind.launch) {
			// Una activación de inicio se produce cuando el usuario inicia la aplicación mediante el icono
			// o invoca una notificación del sistema al hacer clic o pulsar en el cuerpo.
			if (args.detail.arguments) {
				// TODO: Si la aplicación admite notificaciones del sistema, use este valor de la carga de notificaciones del sistema para determinar a qué punto de la aplicación
				// debe llevarse al usuario como respuesta a su invocación de una notificación del sistema.
			}
			else if (args.detail.previousExecutionState === activation.ApplicationExecutionState.terminated) {
				// TODO: Esta aplicación se suspendió y después se finalizó para reclamar memoria.
				// Para crear una experiencia de usuario fluida, restaure aquí el estado de la aplicación de forma que parezca que la aplicación no ha dejado de ejecutarse nunca.
				// Nota: Es aconsejable registrar la hora a la que la aplicación se suspendió por última vez y restaurar el estado únicamente si se ha devuelto tras un breve período.
			}
		}

		if (!args.detail.prelaunchActivated) {
			// TODO: Si el valor de prelaunchActivated es true, significa que se realizó un inicio previo de la aplicación en segundo plano como optimización.
			// En ese caso, se suspendería poco después.
			// Las operaciones de larga ejecución (como E/S del disco o la red con gran consumo de recursos) o los cambios de estado del usuario que se producen al iniciar,
			// deben realizarse aquí (para evitar que se hagan en caso de inicio previo).
			// Esta tarea también puede realizarse en un controlador reanude o visibilitychanged.
		}

		if (isFirstActivation) {
			// TODO: La aplicación estaba activada pero no se ejecutó. Realice aquí la inicialización general del inicio.
			document.addEventListener("visibilitychange", onVisibilityChanged);
			args.setPromise(WinJS.UI.processAll());
		}

		isFirstActivation = false;
    };

    app.addEventListener("activated", function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {

            ui.disableAnimations();
            var p = ui.processAll().then(function () {
                return nav.navigate(nav.location || Application.navigator.home, nav.state);
            }).then(function () {
                return sched.requestDrain(sched.Priority.aboveNormal + 1);
            }).then(function () {
                ui.enableAnimations();
            });

            args.setPromise(p);
        }
    });

    utilities.isConnected = function () {
        let connectivity = Windows.Networking.Connectivity;
        let profile = connectivity.NetworkInformation.getInternetConnectionProfile();
        if (profile) {
            return profile.getNetworkConnectivityLevel() !== connectivity.NetworkConnectivityLevel.internetAccess;
        }
        else {
            return false;
        }
    };


	function onVisibilityChanged(args) {
		if (!document.hidden) {
			// TODO: La aplicación acaba de hacerse visible. Este puede ser un buen momento para actualizar la vista.
		}
	}

	app.oncheckpoint = function (args) {
		// TODO: esta aplicación está a punto de suspenderse. Guarde aquí cualquier estado que deba conservarse en las suspensiones.
		// Puede utilizar el objeto WinJS.Application.sessionState, que se guarda y se restaura automáticamente en las suspensiones.
		// Si tiene que completar una operación asíncrona antes de que se suspenda su aplicación, llame a args.setPromise().
    };

    window.location.href = MainPage;
    
	app.start();

})();
