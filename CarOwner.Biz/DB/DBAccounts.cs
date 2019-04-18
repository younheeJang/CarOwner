using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CarOwner.Biz.DB
{
    public class DBAccounts
    {
        public static DBInformation CarOwner
        {
            get
            {
                return new DBInformation()
                {

                    IP = "localhost",
                    Port = 3306,

                    ID = "onecall_test",
                    Password = "1call",
                    ServiceName = "MYSQL"
                };
            }
        }
    }
}