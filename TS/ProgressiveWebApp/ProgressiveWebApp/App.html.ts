// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509

module ProgressiveWebApp {
	"use strict";

        let app = WinJS.Application;
        let activation = Windows.ApplicationModel.Activation;
        let utilities = WinJS.Utilities;
	let isFirstActivation = true;
        const ui = WinJS.UI;
        const nav = WinJS.Navigation;
        const MainPage = "https://www.microsoft.com/";

	app.onactivated = function (args) {
		/* if (args.detail.kind === activation.ActivationKind.search) {
			// TODO: Handle relevant ActivationKinds. For example, if your app can be started by search,
			// this is a good place to decide whether to populate an input field or choose a different initial view.
		}
		else if (args.detail.kind === activation.ActivationKind.launch) {
			// A Launch activation happens when the user launches your app via the tile
			// or invokes a toast notification by clicking or tapping on the body.
			if (args.detail.arguments) {
				// TODO: If the app supports toasts, use this value from the toast payload to determine where in the app
				// to take the user in response to them invoking a toast notification.
			}
			else if (args.detail.previousExecutionState === activation.ApplicationExecutionState.terminated) {
				// TODO: This application had been suspended and was then terminated to reclaim memory.
				// To create a smooth user experience, restore application state here so that it looks like the app never stopped running.
				// Note: You may want to record the time when the app was last suspended and only restore state if they've returned after a short period.
			}
		}

		if (!args.detail.prelaunchActivated) {
			// TODO: If prelaunchActivated were true, it would mean the app was prelaunched in the background as an optimization.
			// In that case it would be suspended shortly thereafter.
			// Any long-running operations (like expensive network or disk I/O) or changes to user state which occur at launch
			// should be done here (to avoid doing them in the prelaunch case).
			// Alternatively, this work can be done in a resume or visibilitychanged handler.
		} */

		if (isFirstActivation) {
			// TODO: The app was activated and had not been running. Do general startup initialization here.
			document.addEventListener("visibilitychange", onVisibilityChanged);
			// args.setPromise(WinJS.UI.processAll());
		}

		isFirstActivation = false;
	};

      //  app.addEventListener("activated", function (args) {
        //	if (args.detail.kind === activation.ActivationKind.launch) {

          //  	ui.disableAnimations();
            //	let p = ui.processAll().then(function () {
            //    	return nav.navigate(nav.location || Application.navigator.home, nav.state);
            //	}).then(function () {
            //    	return sched.requestDrain(sched.Priority.aboveNormal + 1);
            //	}).then(function () {
            //    	ui.enableAnimations();
            //	});

          //  	args.setPromise(p);
       // 	}
      //  });

	function onVisibilityChanged(args) {
		if (!document.hidden) {
			// TODO: The app just became visible. This may be a good time to refresh the view.
		}
	}

	app.oncheckpoint = function (args) {
		// TODO: This application is about to be suspended. Save any state that needs to persist across suspensions here.
		// You might use the WinJS.Application.sessionState object, which is automatically saved and restored across suspension.
		// If you need to complete an asynchronous operation before your application is suspended, call args.setPromise().
	};

    /* utilities.isConnected = function () {
         	let connectivity = Windows.Networking.Connectivity;
         	let profile = connectivity.NetworkInformation.getInternetConnectionProfile();
         	if (profile) {
              		return (profile.getNetworkConnectivityLevel() != connectivity.NetworkConnectivityLevel.internetAccess);
         	}
         	else {
             		return false;
         	}
    } */

    window.location.href = MainPage;
    app.start();
}
