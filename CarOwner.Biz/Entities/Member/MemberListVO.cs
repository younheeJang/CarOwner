using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CarOwner.Biz.Entities.Member
{
    public class MemberListVO
    {
        /// <summary>
        /// 사용자 아이디
        /// </summary>
        public string UserId { get; set; }

        /// <summary>
        /// 마일리지 잔액
        /// </summary>
        public int Mileage { get; set; }

        /// <summary>
        /// 사용자 성명(상호)
        /// </summary>
        public string UserName { get; set; }

    }
}