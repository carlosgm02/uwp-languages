import System
import System.Collections.Generic
import System.IO
import System.Linq
import System.Runtime.InteropServices.WindowsRuntime
import Windows.ApplicationModel
import Windows.ApplicationModel.Activation
import Windows.Foundation
import Windows.Foundation.Collections
import Windows.UI.Xaml
import Windows.UI.Xaml.Controls
import Windows.UI.Xaml.Controls.Primitives
import Windows.UI.Xaml.Data
import Windows.UI.Xaml.Input
import Windows.UI.Xaml.Media
import Windows.UI.Xaml.Navigation

/// <summary>
/// Provides application-specific behavior to supplement the default Application class.
/// </summary>
internal __partial class App : Application {

	/// <summary>
	/// Initializes the singleton application object.  This is the first line of authored code
	/// executed, and as such is the logical equivalent of main() or WinMain().
	/// </summary>
	public init() {

		self.InitializeComponent()
		self.Suspending += OnSuspending
	}

	/// <summary>
	/// Invoked when the application is launched normally by the end user.  Other entry points
	/// will be used such as when the application is launched to open a specific file.
	/// </summary>
	/// <param name="e">Details about the launch request and process.</param>
	public override func OnLaunched(_ e: LaunchActivatedEventArgs!) {

#if DEBUG
		if (System.Diagnostics.Debugger.IsAttached)    {

			self.DebugSettings.EnableFrameRateCounter = true
		}
#endif

		var rootFrame: Frame! = Window.Current.Content as? Frame

		// Do not repeat app initialization when the Window already has content,
		// just ensure that the window is active
		if rootFrame == nil {

			// Create a Frame to act as the navigation context and navigate to the first page
			rootFrame = Frame()

			rootFrame.NavigationFailed += OnNavigationFailed

			if e.PreviousExecutionState == ApplicationExecutionState.Terminated {

				//TODO: Load state from previously suspended application
			}

			// Place the frame in the current Window
			Window.Current.Content = rootFrame
		}

		if rootFrame.Content == nil {

			// When the navigation stack isn't restored navigate to the first page,
			// configuring the page by passing required information as a navigation
			// parameter
			rootFrame.Navigate(dynamicType(MainPage), e.Arguments)
		}
		// Ensure the current window is active
		Window.Current.Activate()
	}

	/// <summary>
	/// Invoked when Navigation to a certain page fails
	/// </summary>
	/// <param name="sender">The Frame which failed navigation</param>
	/// <param name="e">Details about the navigation failure</param>
	func OnNavigationFailed(sender: Object, _ e: NavigationFailedEventArgs) {

		throw Exception("Failed to load Page " + e.SourcePageType.FullName)
	}

	/// <summary>
	/// Invoked when application execution is being suspended.  Application state is saved
	/// without knowing whether the application will be terminated or resumed with the contents
	/// of memory still intact.
	/// </summary>
	/// <param name="sender">The source of the suspend request.</param>
	/// <param name="e">Details about the suspend request.</param>
	private func OnSuspending(sender: Object, _ e: SuspendingEventArgs)    {

		var deferral = e.SuspendingOperation.GetDeferral()
		//TODO: Save application state and stop any background activity
		deferral.Complete()
	}
}