using CarOwner.Biz.Service.Dac;
using CarOwner.Biz.Service.Biz.Util;
using CarOwner.Biz.DB;
using CarOwner.Biz.Entities.Member;

namespace CarOwner.Biz.Service.Biz
{
    public class MemberBiz : BaseConnection
    {
        MemberDac dac;

        public MemberBiz()
        {
            dac = new MemberDac(this);
        }

        public MemberListVO LoginById(string strLoginID, string strLoginPW)
        {
            if (strLoginID == "") return null;
            if (strLoginPW == "") return null;
            using (Connection)
            {
                return dac.LoginById(strLoginID, strLoginPW);
            }
        }

        public MemberListVO LoginByIdWithProcessMD5(string strLoginID, string strLoginPW)
        {
            if (strLoginID == "") return null;
            if (strLoginPW == "") return null;

            var strMD5LoginPW = MD5.CreateMD5(strLoginPW);

            using (Connection)
            {
                return dac.LoginByIdWithProcessMD5(strLoginID, strMD5LoginPW);
            }
        }
    }
}