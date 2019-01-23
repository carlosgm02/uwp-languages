// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509

module ProgressiveWebApp {
    "use strict";

    let Application = WinJS.Application;
    let activation = Windows.ApplicationModel.Activation;
    let isFirstActivation = true;
    let utilities = WinJS.Utilities;
    let appView = Windows.UI.ViewManagement.ApplicationView;
    let displayProps = Windows.Graphics.Display.DisplayProperties;
    // let sched = WinJS.Utilities.Scheduler;
    const ui = WinJS.UI;
    const nav = WinJS.Navigation;

    /* export let navigator: PageControlNavigator = null;

       export class PageControlNavigator {

        public element = <HTMLElement>null;
        public home = "";
        public lastViewstate = 0;

        constructor(element: Element, options: { home: string; }) {
            this.element = <HTMLElement>(element || document.createElement("div"));
            this.element.appendChild(this._createPageElement());

            this.home = options.home;
            this.lastViewstate = appView.value;

            nav.onnavigated = <any>this._navigated.bind(this);
            window.onresize = <any>this._resized.bind(this);

            document.body.onkeyup = <any>this._keyupHandler.bind(this);
            document.body.onkeypress = <any>this._keypressHandler.bind(this);
            document.body.onmspointerup = <any>this._mspointerupHandler.bind(this);

            ProgressiveWebApp.navigator = this;
       } */

     /* private get pageControl() { return this.pageElement && this.pageElement.winControl; }
        private get pageElement() { return this.element.firstElementChild; }

        // This function creates a new container for each page.
        private _createPageElement() {
            var element = <HTMLElement>document.createElement("div");
            element.style.width = "100%";
            element.style.height = "100%";
            return element;
        }

        // This function responds to keypresses to only navigate when
        // the backspace key is not used elsewhere.
        private _keypressHandler(args) {
            if (args.key === "Backspace") {
                nav.back();
            }
        }

        private _keyupHandler(args) {
            if ((args.key === "Left" && args.altKey) || (args.key === "BrowserBack")) {
                nav.back();
            } else if ((args.key === "Right" && args.altKey) || (args.key === "BrowserForward")) {
                nav.forward();
            }
        }

        private _mspointerupHandler(args) {
            if (args.button === 3) {
                nav.back();
            } else if (args.button === 4) {
                nav.forward();
            }
        }

        private _fwdbackHandler(e: KeyboardEvent) {
            if (e.altKey) {
                switch (e.keyCode) {
                    case utils.Key.leftArrow: nav.back(); break;
                    case utils.Key.rightArrow: nav.forward(); break;
                }
            }
        }

        //private _viewstatechanged(e) {
        //    this._updateLayout()(this.pageElement, e.layout, displayProps.currentOrientation);
        //}

        // This function responds to navigation by adding new pages
        // to the DOM.
        private _navigated(args) {
            var oldElement = <HTMLElement>this.pageElement;
            var newElement = this._createPageElement();
            var parentedComplete;
            var parented = new WinJS.Promise(function(c) { parentedComplete = c; });

            args.detail.setPromise(
                WinJS.Promise.timeout().then(function() {
                    if (oldElement.winControl && oldElement.winControl.unload) {
                        oldElement.winControl.unload();
                    }
                    return WinJS.UI.Pages.render(args.detail.location, newElement, args.detail.state, parented);
                }).then((control) => {
                    this.element.appendChild(newElement);
                    this.element.removeChild(oldElement);
                    oldElement.innerText = "";
                    this.navigated();
                    parentedComplete();
                })
            );
        }

        private _resized(args) {
            if (this.pageControl && this.pageControl.updateLayout) {
                this.pageControl.updateLayout.call(this.pageControl, this.pageElement, appView.value, this.lastViewstate);
            }
            this.lastViewstate = appView.value;
        }

        //private _updateLayout() { return (this.pageControl() && this.pageControl().updateLayout) || function() { }; }

        // This function updates application controls once a navigation
        // has completed.
        public navigated() {
            // Do application specific on-navigated work here
            var backButton = <HTMLElement>this.pageElement.querySelector("header[role=banner] .win-backbutton");
            if (backButton != null) {
                backButton.onclick = function() { nav.back(); };

                if (nav.canGoBack) {
                    backButton.removeAttribute("disabled");
                }
                else {
                    backButton.setAttribute("disabled", "disabled");
                }
            }
        }

    }
    WinJS.Utilities.markSupportedForProcessing(PageControlNavigator);

    export function navigateHome() {
        var home = <string>document.querySelector("#contenthost").winControl.home;
        var loc = nav.location;
        if (loc !== "" && loc !== home) {
            nav.navigate(home);
        }
    }
    WinJS.Utilities.markSupportedForProcessing(navigateHome);

    export function refresh() {
        var control = (<any>document.querySelector("#contenthost")).winControl;
        if (control && control.pageControl && control.pageControl.refreshCurrent) {
            control.pageControl.refreshCurrent(control.element);
        }
    }
    WinJS.Utilities.markSupportedForProcessing(refresh);

    export function addFavorite() {
        var control = (<any>document.querySelector("#contenthost")).winControl;
        if (control && control.pageControl && control.pageControl.refreshCurrent) {
            var elem: Element = control.element.querySelector(".itemDetailPage header[role=banner] .pagetitle");
            var title = elem.textContent;
            Data.addFavorite(title);
        }
    }
    WinJS.Utilities.markSupportedForProcessing(addFavorite);

    export function removeFavorite() {
        var control = (<any>document.querySelector("#contenthost")).winControl;
        if (control && control.pageControl && control.pageControl.refreshCurrent) {
            var title = control.element.querySelector(".itemDetailPage header[role=banner] .pagetitle").textContent;
            Data.removeFavorite(title);
        }
    }
    WinJS.Utilities.markSupportedForProcessing(removeFavorite);

    export function addToTile(text: string, imgSrc: string) {
        var tileUpdater = Windows.UI.Notifications.TileUpdateManager.createTileUpdaterForApplication();
        var template = Windows.UI.Notifications.TileTemplateType.tileWideImageAndText01;
        var tileXml = Windows.UI.Notifications.TileUpdateManager.getTemplateContent(template);
        var tileTextAttributes = tileXml.getElementsByTagName("text");
        tileTextAttributes.forEach(function(value, index) {
            value.appendChild(tileXml.createTextNode("textField " + (index + 1)));
        });
        var tileImageAttributes = tileXml.getElementsByTagName("image");
        var imgUri = new Windows.Foundation.Uri(Windows.Storage.ApplicationData.current.localFolder.path + "/").combineUri(imgSrc);
        var elem = <Windows.Data.Xml.Dom.IXmlElement>tileImageAttributes.getAt(0);
        elem.setAttribute("src", imgUri.absoluteUri);
        elem.setAttribute("alt", "graphic");
        elem.setAttribute("id", "1");
        var tileNotification = new Windows.UI.Notifications.TileNotification(tileXml);
        tileUpdater.enableNotificationQueue(true);
        tileUpdater.update(tileNotification);
    } */

    WinJS.Namespace.define("ProgressiveWebApp", {
        PageControlNavigator: WinJS.Class.define(
            
            function PageControlNavigator(element, options) {
                this._element = element || document.createElement("div");
                this._element.appendChild(this._createPageElement());

                this.home = options.home;

                this._eventHandlerRemover = [];

                let that = this;
                function addRemovableEventListener(e, eventName, handler, capture) {
                    e.addEventListener(eventName, handler, capture);
                    that._eventHandlerRemover.push(function () {
                        e.removeEventListener(eventName, handler);
                    });
                };

                addRemovableEventListener(nav, 'navigating', this._navigating.bind(this), false);
                addRemovableEventListener(nav, 'navigated', this._navigated.bind(this), false);

                window.onresize = this._resized.bind(this);

                // ProgressiveWebApp.navigator = this;
            }, {
                home: "",
                /// <field domElement="true" />
                _element: null,
                // _lastNavigationPromise: WinJS.Promise.as(),
                _lastViewstate: 0,
                
                pageControl: {
                    get: function () { return this.pageElement && this.pageElement.winControl; }
                },
                
                pageElement: {
                    get: function () { return this._element.firstElementChild; }
                },
                
                dispose: function () {
                    if (this._disposed) {
                        return;
                    }

                    this._disposed = true;
                   /* WinJS.Utilities.disposeSubTree(this._element);
                    for (let i = 0; i < this._eventHandlerRemover.length; i++) {
                        this._eventHandlerRemover[i]();
                    }
                    this._eventHandlerRemover = null; */
                },
                _createPageElement: function () {
                    let element = document.createElement("div");
                    element.setAttribute("dir", window.getComputedStyle(this._element, null).direction);
                    element.style.position = "absolute";
                    element.style.visibility = "hidden";
                    element.style.width = "100%";
                    element.style.height = "100%";
                    return element;
                },
                
                _getAnimationElements: function () {
                    if (this.pageControl && this.pageControl.getAnimationElements) {
                        return this.pageControl.getAnimationElements();
                    }
                    return this.pageElement;
                },

                _navigated: function () {
                  /*  if (args.detail.location.indexOf("nointernet") == -1 && !utilities.isConnected()) {
                        nav.navigate("/msapp-error.html");
                        return;
                    }
                        this.pageElement.style.visibility = "";
                    WinJS.UI.Animation.enterPage(this._getAnimationElements()).done(); */
                },
                 
                _navigating: function (args) {
                    let newElement = this._createPageElement();
                    this._element.appendChild(newElement);

                    this._lastNavigationPromise.cancel();

                    let that = this;

                    function cleanup() {
                        if (that._element.childElementCount > 1) {
                            let oldElement = that._element.firstElementChild;
                            
                            if (oldElement.winControl) {
                                if (oldElement.winControl.unload) {
                                    oldElement.winControl.unload();
                                }
                                oldElement.winControl.dispose();
                            }
                            oldElement.parentNode.removeChild(oldElement);
                            oldElement.innerText = "";
                        }
                    }

                   /* this._lastNavigationPromise = WinJS.Promise.as().then(function () {
                        return WinJS.UI.Pages.render(args.detail.location, newElement, args.detail.state);
                    }).then(cleanup, cleanup);

                    args.detail.setPromise(this._lastNavigationPromise); */
                },

                _resized: function (args) {
                    if (this.pageControl && this.pageControl.updateLayout) {
                        this.pageControl.updateLayout.call(this.pageControl, this.pageElement);
                    }
                },
            }
        )
    });
}