// Para obtener una introducción a la plantilla En blanco, consulte la siguiente documentación:
// https://go.microsoft.com/fwlink/?LinkId=232509

(function () {
	"use strict";

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;
    var utilities = WinJS.Utilities;
    // var isFirstActivation = true;
    var ui = WinJS.UI;
    var nav = WinJS.Navigation;
    var MainPage = "https://example.com/";
    // app.start();

    window.reset = function () {
        document.querySelector("x-ms-webview").src = MainPage;
    };

    window.contentLoaded = function () {
        var frame = document.querySelector("x-ms-webview");
        if (frame.src.indexOf(MainPage) !== -1) {
            Array.prototype.forEach.call(frame.contentDocument.querySelectorAll("a[target]"), function (a) {
                a.target = "";
            });
        }
    };

    window.onerror = function () {
        var errorMessage = '';
        var errorName = '';
        if (customEventObject.detail.error) {
            errorMessage = customEventObject.detail.error.message;
            errorName = customEventObject.detail.error.name;
        }
        else {
            errorMessage = customEventObject.detail.exception.message;
            errorName = 'Exception';
        }
        var optionsObject = { errName: errorName, errMsg: errorMessage };
        nav.navigate("/msapp-error.html", optionsObject);
        return true;
    };

    document.addEventListener("DOMContentLoaded", function () {
        var frame = document.querySelector("x-ms-webview");
        frame.src = MainPage;
    });

})();
