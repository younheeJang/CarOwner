using CarOwner.Biz.Entities.Member;
using CarOwner.Biz.DB;
using System.Linq;
using System;

namespace CarOwner.Biz.Service.Dac
{
    public class MemberDac
    {
        private readonly Idb _db;

        public MemberDac(Idb db)
        {
            this._db = db;
        }

        public MemberListVO LoginById(string loginId, string password)
        {
            try
            {
                const string sql =
                @"SELECT
                        NAME, MILEAGE
                  FROM
                        FS_DRIVER
                  WHERE LOGINID = :loginId
                       AND LOGINPW = :password
                ";

                return _db.Query<MemberListVO>(sql, new { loginId, password }).FirstOrDefault();
            }
            catch(Exception ex)
            {
                return null;
            }

        }

        public MemberListVO LoginByIdWithProcessMD5(string loginId, string password)
        {
            try
            {
                const string sql =
                @"SELECT
                        NAME, MILEAGE
                  FROM
                        FS_DRIVER
                  WHERE LOGINID = :loginId
                       AND LOGINPW_ENCODE = :password
                ";

                return _db.Query<MemberListVO>(sql, new { loginId, password }).FirstOrDefault();
            }
            catch (Exception ex)
            {
                return null;
            }

        }
    }
}