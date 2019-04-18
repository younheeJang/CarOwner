using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CarOwner.Biz.DB
{
    public class BaseConnection : dbMysql
    {
        public BaseConnection() : base(DBAccounts.CarOwner) { }
    }
}