iOS-WebView-App
===============

------------------------------------------
## Out of date

This repo is a bit old, so you'll want a more recent webview app to use in XCode. Perhaps [geocolumbus/wkwebview](https://github.com/geocolumbus/wkwebview) or [coffellas-cto/GDWebViewController](https://github.com/coffellas-cto/GDWebViewController) may work well. (Currently untested by me.)

Pull requests to update this repo/readme very welcome.

-------------------------------------

-------------------------------------

Simple iOS app that loads a web page created to ease debugging a `uiWebView`. 

Unfortunately you cannot directly debug [Chrome on iOS](https://developer.chrome.com/multidevice/ios/overview) as debugging hooks are not available in published apps. This is the next best thing. If your issue reproduces the same in Mobile Safari, you can debug there. It's easier.

You'll need to [install XCode][3].

1. "Download Zip" or clone this project
2. Open XCode, open existing project, and choose the project you just downloaded.
3. Open WebViewAppDelegate.m and change the `urlString` to be the URL you want to test.
4. Run the app in the iOS Simulator.
5. Open Safari, Open the *Develop* Menu, Choose *iOS Simulator* and select your webview.
6. Safari Inspector will now be inspecting your uiWebView.

![enter image description here][5]

![enter image description here][6]

![enter image description here][7]


  [1]: http://stackoverflow.com/a/12607124
  [2]: http://stackoverflow.com/a/22047495
  [3]: https://developer.apple.com/xcode/downloads/
  [4]: https://github.com/paulirish/iOS-WebView-App
  [5]: http://i.stack.imgur.com/w3n8I.png
  [6]: http://i.stack.imgur.com/H4Fbw.png
  [7]: http://i.stack.imgur.com/5YUnq.png


Directions above are from http://stackoverflow.com/a/25817718/89484
