#include "pch.h"

// This example code shows how you could implement the required main function
// for a Console UWP Application. You can replace all the code inside main
// with your own custom code.

// You should also change the Alias value in the AppExecutionAlias Extension
// in the package.appxmanifest to a value that you define. To edit this file
// manually, open it with the XML Editor.

int main()
{
    // You can get parsed command-line arguments from the CRT globals.
    wprintf(L"Parsed command-line arguments:\n");
    for (int i = 0; i < __argc; i++)
    {
        wprintf(L"__argv[%d] = %S\n", i, __argv[i]);
    }
    
    // TODO: If you want to use WinRT APIs or components, you must first initialize COM.
    RoInitialize(RO_INIT_MULTITHREADED);

    wprintf(L"Press Enter to continue:");
    getchar();
}
