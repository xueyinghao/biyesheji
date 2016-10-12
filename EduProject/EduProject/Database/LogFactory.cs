using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EduProject.Database
{
    public class LogFactory
    {
        static LogFactory()
        { 
        }
        //public static LogHelper GetLogger(Type type)
        //{
        //    return new LogHelper(LogManager.GetLogger(type));
        //}
        public static LogHelper GetLogger(string str)
        {
            return new LogHelper(LogManager.GetLogger(str));
        }
    }
}