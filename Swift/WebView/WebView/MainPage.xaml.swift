import System
import System.Collections.Generic
import System.ComponentModel
import System.IO
import System.Linq
import System.Runtime.InteropServices.WindowsRuntime
import Windows.ApplicationModel.Core
import Windows.Foundation
import Windows.Foundation.Collections
import Windows.Media.Core
import Windows.UI.Xaml
import Windows.UI.Xaml.Controls
import Windows.UI.Xaml.Controls.Primitives
import Windows.UI.Core
import Windows.UI.Popups
import Windows.UI.ViewManagement
import Windows.UI.Xaml.Data
import Windows.UI.Xaml.Input
import Windows.UI.Xaml.Media
import Windows.UI.Xaml.Navigation

// The Blank Page item template is documented at http://go.microsoft.com/fwlink/?LinkId=402352&clcid=0x409

/// <summary>
/// An empty page that can be used on its own or navigated to within a Frame.
/// </summary>
internal __partial class MainPage : Page {

	public init() {

		self.InitializeComponent()
                WebView.ContainsFullScreenElementChanged += WebView_ContainsFullScreenElementChanged
		// WebView.NavigationStarting += WebView_NavigationStarting
		SystemNavigationManager.GetForCurrentView().BackRequested += SystemNavigationManager_BackRequested
	}

        private func WebView_ContainsFullScreenElementChanged(_ sender: WebView!, _ args: Object!) {
		var applicationView = ApplicationView.GetForCurrentView()
		if sender.ContainsFullScreenElement {
			applicationView.TryEnterFullScreenMode()
		} else {
			if applicationView.IsFullScreenMode {
				applicationView.ExitFullScreenMode()
			}
		}
	}

    /*  private func Button_Click(_ sender: Object!, _ e: RoutedEventArgs!) {
		var functionString: String! = String.Format("document.getElementById(\'nameDiv\').innerText = \'Hello, {0}\';", nameTextBox.Text)
		__await webView1.InvokeScriptAsync("eval", ([functionString] as? String![]))
        }  */

    /*  private func WebView_NavigationStarting(_ sender: WebView!, _ args: WebViewNavigationStartingEventArgs!) {
		if args.Uri.Host == "www.elementscompiler.com" {
			WebView.AddWebAllowedObject("nativeObject", MyClass())
		}
        }  */

        private func SystemNavigationManager_BackRequested(_ sender: Object!, _ e: BackRequestedEventArgs!) {
		var frame: Frame! = (Window.Current.Content as? Frame)
		if frame.CanGoBack | WebView.CanGoBack {
			e.Handled = true
			if WebView.CanGoBack {
				WebView.GoBack()
			}
			if frame.CanGoBack {
				frame.GoBack()
			}
		}
        }

        private func WebView_NavigationCompleted(_ sender: WebView!, _ args: WebViewNavigationCompletedEventArgs!) {
		SystemNavigationManager.GetForCurrentView().AppViewBackButtonVisibility = (WebView.CanGoBack ? AppViewBackButtonVisibility.Visible : AppViewBackButtonVisibility.Collapsed)
        }
}
