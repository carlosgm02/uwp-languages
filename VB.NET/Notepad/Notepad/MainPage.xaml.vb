Imports System.Collections.Generic
Imports System.Threading.Tasks
Imports Windows.Storage
Imports Windows.Storage.Pickers
Imports Windows.Storage.Provider
Imports Windows.UI
Imports Windows.UI.Popups
Imports Windows.UI.Text
Imports System
Imports Windows.UI.Core
Imports Windows.UI.Xaml
Imports Windows.UI.Xaml.Controls
Imports Windows.UI.Xaml.Navigation
Imports System.Globalization
Imports Windows.UI.ViewManagement
Imports Windows.ApplicationModel
Imports Windows.ApplicationModel.Core
Imports Windows.ApplicationModel.Activation
' La plantilla de elemento Página en blanco está documentada en https://go.microsoft.com/fwlink/?LinkId=402352&clcid=0xc0a

''' <summary>
''' Página vacía que se puede usar de forma independiente o a la que se puede navegar dentro de un objeto Frame.
''' </summary>
Public NotInheritable Class MainPage
    Inherits Page
    Public Library As New Library()

    'Private Sub MainPage_Loaded(sender As Object, e As RoutedEventArgs)
    '    CoreApplication.GetCurrentView.TitleBar.ExtendViewIntoTitleBar = True
    '    Window.Current.SetTitleBar(CustomTitleBur)
    'End Sub

    Private Sub MenuFlyoutItem_Click(sender As Object, e As RoutedEventArgs)
        Library.[New](display)
    End Sub

    Private Sub MenuFlyoutItem_Click_1(sender As Object, e As RoutedEventArgs)
        Library.Open(display)
    End Sub

    Private Sub MenuFlyoutItem_Click_2(sender As Object, e As RoutedEventArgs)
        Library.Save(display)
    End Sub

End Class
