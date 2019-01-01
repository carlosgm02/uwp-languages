//  The Blank Application template is documented at http://go.microsoft.com/fwlink/?LinkId=402347&clcid=0x409

namespace WebView;

interface

uses
  System,
  System.Collections.Generic,
  System.IO,
  System.Linq,
  System.Runtime.InteropServices.WindowsRuntime,
  Windows.ApplicationModel,
  Windows.ApplicationModel.Activation,
  Windows.Foundation,
  Windows.Foundation.Collections,
  Windows.UI.Xaml,
  Windows.UI.Xaml.Controls,
  Windows.UI.Xaml.Controls.Primitives,
  Windows.UI.Xaml.Data,
  Windows.UI.Xaml.Input,
  Windows.UI.Xaml.Media,
  Windows.UI.Xaml.Navigation;

type
  App = partial class(Application)
  private
    method OnNavigationFailed(sender: Object; e: NavigationFailedEventArgs);
    method OnSuspending(sender: Object; e: SuspendingEventArgs);
  protected
    method OnLaunched(e: LaunchActivatedEventArgs); override;
  public
    constructor;
  end;

implementation

constructor App;
begin
  self.InitializeComponent();
  self.Suspending += OnSuspending;
end;

method App.OnLaunched(e: LaunchActivatedEventArgs);
begin
  {$ifdef DEBUG}
  if System.Diagnostics.Debugger.IsAttached then begin
    self.DebugSettings.EnableFrameRateCounter := true;
  end;
  {$endif}
  var rootFrame: Frame := Frame(Window.Current.Content);
  //  Do not repeat app initialization when the Window already has content,
  //  just ensure that the window is active
  if rootFrame = nil then begin
    //  Create a Frame to act as the navigation context and navigate to the first page
    rootFrame := new Frame();
    rootFrame.NavigationFailed += OnNavigationFailed;
    if e.PreviousExecutionState = ApplicationExecutionState.Terminated then begin
      // TODO: Load state from previously suspended application
    end;
    //  Place the frame in the current Window
    Window.Current.Content := rootFrame;
  end;
  if rootFrame.Content = nil then begin
    //  When the navigation stack isn't restored navigate to the first page,
    //  configuring the new page by passing required information as a navigation
    //  parameter
    rootFrame.Navigate(typeOf(MainPage), e.Arguments);
  end;
  //  Ensure the current window is active
  Window.Current.Activate();
end;

method App.OnNavigationFailed(sender: Object; e: NavigationFailedEventArgs);
begin
  raise new Exception('Failed to load Page ' + e.SourcePageType.FullName);
end;

method App.OnSuspending(sender: Object; e: SuspendingEventArgs);
begin
  var deferral := e.SuspendingOperation.GetDeferral();
  // TODO: Save application state and stop any background activity
  deferral.Complete();
end;

end.