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

Public Class Library
    Private Sub focus(ByRef display As RichEditBox)
        display.Focus(FocusState.Keyboard)
    End Sub

    Private Sub [set](ByRef display As RichEditBox, value As String)
        display.Document.SetText(TextSetOptions.FormatRtf, value)
        focus(display)
    End Sub

    Public Function [get](ByRef display As RichEditBox) As String
        Dim value As String = String.Empty
        display.Document.GetText(TextGetOptions.FormatRtf, value)
        Return value
    End Function

    Public Async Function Confirm(content As String, title As String, ok As String, cancel As String) As Task(Of Boolean)
        Dim result As Boolean = False
        Dim dialog As New MessageDialog(content, title)
        dialog.Commands.Add(New UICommand(ok, New UICommandInvokedHandler(Function(cmd) InlineAssignHelper(result, True))))
        dialog.Commands.Add(New UICommand(cancel, New UICommandInvokedHandler(Function(cmd) InlineAssignHelper(result, False))))
        Await dialog.ShowAsync()
        Return result
    End Function

    Public Function Bold(ByRef display As RichEditBox) As Boolean
        display.Document.Selection.CharacterFormat.Bold = FormatEffect.Toggle
        focus(display)
        Return display.Document.Selection.CharacterFormat.Bold.Equals(FormatEffect.[On])
    End Function

    Public Function Italic(ByRef display As RichEditBox) As Boolean
        display.Document.Selection.CharacterFormat.Italic = FormatEffect.Toggle
        focus(display)
        Return display.Document.Selection.CharacterFormat.Italic.Equals(FormatEffect.[On])
    End Function

    Public Function Underline(ByRef display As RichEditBox) As Boolean
        display.Document.Selection.CharacterFormat.Underline = If(display.Document.Selection.CharacterFormat.Underline.Equals(UnderlineType.[Single]), UnderlineType.None, UnderlineType.[Single])
        display.Document.Selection.CharacterFormat.Italic = FormatEffect.Toggle
        focus(display)
        Return display.Document.Selection.CharacterFormat.Underline.Equals(UnderlineType.[Single])
    End Function

    Public Function Left(ByRef display As RichEditBox) As Boolean
        display.Document.Selection.ParagraphFormat.Alignment = ParagraphAlignment.Left
        focus(display)
        Return display.Document.Selection.ParagraphFormat.Alignment.Equals(ParagraphAlignment.Left)
    End Function

    Public Function Centre(ByRef display As RichEditBox) As Boolean
        display.Document.Selection.ParagraphFormat.Alignment = ParagraphAlignment.Center
        focus(display)
        Return display.Document.Selection.ParagraphFormat.Alignment.Equals(ParagraphAlignment.Center)
    End Function

    Public Function Right(ByRef display As RichEditBox) As Boolean
        display.Document.Selection.ParagraphFormat.Alignment = ParagraphAlignment.Right
        focus(display)
        Return display.Document.Selection.ParagraphFormat.Alignment.Equals(ParagraphAlignment.Right)
    End Function

    Public Sub Size(ByRef display As RichEditBox, ByRef value As ComboBox)
        If display IsNot Nothing AndAlso value IsNot Nothing Then
            Dim selected As String = DirectCast(value.SelectedItem, ComboBoxItem).Tag.ToString()
            display.Document.Selection.CharacterFormat.Size = Single.Parse(selected)
            focus(display)
        End If
    End Sub

    Public Sub Colour(ByRef display As RichEditBox, ByRef value As ComboBox)
        If display IsNot Nothing AndAlso value IsNot Nothing Then
            Dim selected As String = DirectCast(value.SelectedItem, ComboBoxItem).Tag.ToString()
            display.Document.Selection.CharacterFormat.ForegroundColor = Color.FromArgb([Byte].Parse(selected.Substring(0, 2), NumberStyles.HexNumber), [Byte].Parse(selected.Substring(2, 2), NumberStyles.HexNumber), [Byte].Parse(selected.Substring(4, 2), NumberStyles.HexNumber), [Byte].Parse(selected.Substring(6, 2), NumberStyles.HexNumber))
            focus(display)
        End If
    End Sub

    Public Async Sub [New](display As RichEditBox)
        If Await Confirm("Create New Document?", "Rich Editor", "Yes", "No") Then
            [set](display, String.Empty)
        End If
    End Sub

    Public Async Sub Open(display As RichEditBox)
        Try
            Dim picker As New FileOpenPicker()
            picker.SuggestedStartLocation = PickerLocationId.DocumentsLibrary
            picker.FileTypeFilter.Add(".rtf")
            Dim file As StorageFile = Await picker.PickSingleFileAsync()
            [set](display, Await FileIO.ReadTextAsync(file))

        Catch
        End Try
    End Sub

    Public Async Sub Save(display As RichEditBox)
        Try
            Dim picker As New FileSavePicker()
            picker.SuggestedStartLocation = PickerLocationId.DocumentsLibrary
            picker.FileTypeChoices.Add("Rich Text", New List(Of String)() From {
                ".rtf"
            })
            picker.DefaultFileExtension = ".rtf"
            picker.SuggestedFileName = "Document"
            Dim file As StorageFile = Await picker.PickSaveFileAsync()
            If file IsNot Nothing Then
                CachedFileManager.DeferUpdates(file)
                Await FileIO.WriteTextAsync(file, [get](display))
                Dim status As FileUpdateStatus = Await CachedFileManager.CompleteUpdatesAsync(file)
            End If

        Catch
        End Try
    End Sub
    Private Shared Function InlineAssignHelper(Of T)(ByRef target As T, value As T) As T
        target = value
        Return value
    End Function
End Class