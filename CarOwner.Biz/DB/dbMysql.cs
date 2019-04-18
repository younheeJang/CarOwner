using Dapper;
using MySql.Data.MySqlClient;
using System;
using System.Data;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CarOwner.Biz.DB
{
    public class dbMysql : Idb
    {
        public dbMysql(DBInformation account)
        {
            ConnString =
                string.Format(
                    "Data Source={0};port={1};Initial catalog={2};User ={3};Password={4};charset=utf8",
                    account.IP, account.Port, account.ServiceName, account.ID, account.Password
                );
        }
        
        public string ConnString { get; set; }

        private IDbConnection db;

        private IDbTransaction Tran { get; set; }

        private IDbConnection BeginTransaction()
        {
            Tran = Connection.BeginTransaction();
            return db;
        }

        public void RollBack()
        {
            Tran.Rollback();
        }

        public void Commit()
        {
            Tran.Commit();
        }

        public IDbConnection Connection
        {
            get
            {
                db = new MySqlConnection(ConnString);
                if(db.State == ConnectionState.Closed) db.Open();
                return db;
            }
        }

        public int Execute(string sql, object param = null, IDbTransaction transaction = null, int? commandTimeout = default(int?), CommandType? commandType = default(CommandType?))
        {
            return db.Execute(sql, param, transaction, commandTimeout, commandType);
        }

        public DataTable ExecuteReader(string sql, object param = null, IDbTransaction transaction = null, int? commandTimeout = default(int?), CommandType? commandType = default(CommandType))
        {
            return db.ExecuteReader(sql, param, transaction, commandTimeout, commandType).ToDataTable();
        }

        public IEnumerable<T> Query<T>(string sql, object param = null, IDbTransaction transaction = null, bool buffered = true, int? commandTimeout = default(int?), CommandType? commandType = default(CommandType?))
        {
            return db.Query<T>(sql, param, transaction, buffered, commandTimeout, commandType);
        }

        public void Transaction(Action actions)
        {
            try
            {
                using (var context = Connection.BeginTransaction())
                {
                    actions.Invoke();
                    context.Commit();
                }
            }
            finally
            {
                db.Close();
            }
        }

        public void Dispose()
        {
            if (db != null)
                db.Dispose();
        }
    }
}