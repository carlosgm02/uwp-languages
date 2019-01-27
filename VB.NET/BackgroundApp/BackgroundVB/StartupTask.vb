Imports System
Imports System.Collections.Generic
Imports System.Linq
Imports System.Text
Imports System.Net.Http
Imports Windows.ApplicationModel.Background

' The Background Application template is documented at http://go.microsoft.com/fwlink/?LinkID=533884&clcid=0x409

Public NotInheritable Class StartupTask
    Implements IBackgroundTask

    Public Sub Run(taskInstance As IBackgroundTaskInstance) Implements IBackgroundTask.Run

        ' If you start any asynchronous methods here, prevent the task
        ' from closing prematurely by using BackgroundTaskDeferral as
        ' described in http://aka.ms/backgroundtaskdeferral

        ' Simple variables
        Dim five As Integer = 5
        Dim ten As Integer = 10
        Dim zero As Integer = 0
        zero = 2 * five - ten

        ' Square roots
        Dim x As Integer = 4
        Dim total As Integer = 49
        total = 15 * System.Math.Sqrt(9) + x

        ' This is Windows 10 IoT
        Const targetplatform As String = "IoT"
        Dim hero As Integer
        hero = targetplatform

    End Sub
End Class
