using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Net.Http;
using System.Diagnostics;
using System.IO;
using System.Threading.Tasks;
using Windows.Storage;
using Windows.ApplicationModel.Background;

// The Background Application template is documented at http://go.microsoft.com/fwlink/?LinkID=533884&clcid=0x409

namespace BackgroundCS
{
    public sealed class StartupTask : IBackgroundTask
    {
        private BackgroundTaskDeferral _deferal;

        public void Run(IBackgroundTaskInstance taskInstance)
        {
            // If you start any asynchronous methods here, prevent the task
            // from closing prematurely by using BackgroundTaskDeferral as
            // described in http://aka.ms/backgroundtaskdeferral

            Debug.WriteLine("StartupTask.Run()");
            _deferal = taskInstance.GetDeferral();
            taskInstance.Canceled += TaskInstance_Canceled;
        }

        private void TaskInstance_Canceled(IBackgroundTaskInstance sender, BackgroundTaskCancellationReason reason)
        {
            Debug.WriteLine("StartupTask.TaskInstance_Canceled() - {0}", reason.ToString());
            _deferal.Complete();
        }
    }
}
