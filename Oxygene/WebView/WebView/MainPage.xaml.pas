//  The Blank Page item template is documented at http://go.microsoft.com/fwlink/?LinkId=402352&clcid=0x409

namespace WebView;

interface

uses
  System,
  System.Collections.Generic,
  System.IO,
  System.Linq,
  System.Runtime.InteropServices.WindowsRuntime,
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
  MainPage = partial class(Page)
  public
    constructor;
  end;

implementation

constructor MainPage;
begin
  self.InitializeComponent();
end;

end.