//  The Blank Page item template is documented at http://go.microsoft.com/fwlink/?LinkId=402352&clcid=0x409

namespace WebView;

interface

uses
  System,
  System.Collections.Generic,
  System.ComponentModel,
  System.IO,
  System.Linq,
  System.Runtime.InteropServices.WindowsRuntime,
  Windows.ApplicationModel.Core,
  Windows.Foundation,
  Windows.Foundation.Collections,
  Windows.Media.Core,
  Windows.UI.Core,
  Windows.UI.Popups,
  Windows.UI.ViewManagement,
  Windows.UI.Xaml,
  Windows.UI.Xaml.Controls,
  Windows.UI.Xaml.Controls.Primitives,
  Windows.UI.Xaml.Data,
  Windows.UI.Xaml.Input,
  Windows.UI.Xaml.Media,
  Windows.UI.Xaml.Navigation;

type
  MainPage = partial class(Page)
  public
    constructor;
  end;

implementation

constructor MainPage;
begin
  self.InitializeComponent();
  WebView.ContainsFullScreenElementChanged += WebView_ContainsFullScreenElementChanged;
  // SystemNavigationManager.GetForCurrentView().BackRequested += SystemNavigationManager_BackRequested;
end;

method WebView_ContainsFullScreenElementChanged(sender: WebView; args: Object);
begin
  var applicationView := ApplicationView.GetForCurrentView();
  if sender.ContainsFullScreenElement then begin
    applicationView.TryEnterFullScreenMode();
  end
  else begin
    if applicationView.IsFullScreenMode then begin
      applicationView.ExitFullScreenMode();
    end;
  end;
end;

/*
method SystemNavigationManager_BackRequested(sender: Object; e: BackRequestedEventArgs);
begin
  var frame: Frame := Frame(Window.Current.Content);
  if frame.CanGoBack or WebView.CanGoBack then begin
    e.Handled := true;
    if WebView.CanGoBack then begin
      WebView.GoBack();
    end;
    if frame.CanGoBack then begin
      frame.GoBack();
    end;
  end;
end;

method WebView_NavigationCompleted(sender: WebView; args: WebViewNavigationCompletedEventArgs);
begin
  SystemNavigationManager.GetForCurrentView().AppViewBackButtonVisibility := (if WebView.CanGoBack then (AppViewBackButtonVisibility.Visible) else (AppViewBackButtonVisibility.Collapsed));
end;
*/

end.