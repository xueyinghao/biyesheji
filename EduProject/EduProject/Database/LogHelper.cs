using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using log4net;
using log4net.Config;

namespace EduProject.Database
{
    public class LogHelper
    {
        private ILog logger;
        public LogHelper(ILog log)
        {
            this.logger = log;
        }
        public void Info(object message)
        {
            this.logger.Info(message);
        }
        public void Info(object message, Exception e)
        {
            this.logger.Info(message, e);
        }
        public void  Debug(object message)
        {

            this.logger.Debug(message);
        }
        public void Debug(object message, Exception e)
        {
            this.logger.Debug(message, e);
        }
        public void Warning(object message)
        {
            this.logger.Warn(message);
        }
        public void Warning(object message, Exception e)
        {
            this.logger.Warn(message, e);
        }
        public void Error(object message)
        {
            this.logger.Error(message);
        }
        public void Error(object message, Exception e)
        {
            this.logger.Error(message, e);
        }
        public void Fatal(object message, Exception e)
        {
            this.logger.Fatal(message, e);
        }
    }
}