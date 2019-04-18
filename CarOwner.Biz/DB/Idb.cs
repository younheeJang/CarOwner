using System;
using System.Data;
using System.Collections.Generic;
using System.Linq;

namespace CarOwner.Biz.DB
{
    public interface Idb
    {
        IDbConnection Connection { get; }
        int Execute(string sql, object param = null, IDbTransaction transaction = null, int? commandTimeout = default(int?), CommandType? commandType = default(CommandType?));
        DataTable ExecuteReader(string sql, object param = null, IDbTransaction transaction = null, int? commandTimeout = default(int?), CommandType? commandType = default(CommandType?));
        IEnumerable<T> Query<T>(string sql, object param = null, IDbTransaction transaction = null, bool buffered = true, int? commandTimeout = default(int?), CommandType? commandType = default(CommandType?));
        void Transaction(Action actions);
        void Commit();
        void RollBack();
        void Dispose();
    }
}
