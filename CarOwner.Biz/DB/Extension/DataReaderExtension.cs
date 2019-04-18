using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace System.Data
{
    public static class DataReaderExtension
    {
        public static DataTable ToDataTable(this IDataReader reader, string tableName = "table")
        {
            DataTable datatable = new DataTable();
            datatable.Load(reader);
            datatable.TableName = tableName;
            return datatable;
        }
    }
}