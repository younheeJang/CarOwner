using CarOwner.Biz.Service.Biz;
using CarOwner.Biz.Entities.Member;
using System;
using System.Web;
using System.Web.Mvc;

 
namespace CarOwner.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Login(string userid, string userpassword) {
            var res = new MemberBiz().LoginById(userid, userpassword);
            if (res != null)
            {
                Response.Cookies["CarOwnerId"].Value = HttpUtility.UrlEncode(res.UserId);
                Response.Cookies["CarOwnerNm"].Value = HttpUtility.UrlEncode(res.UserNm);
                Response.Cookies["CarOwnerMi"].Value = HttpUtility.UrlEncode(res.Mileage.ToString());
                //Response.Cookies["CarOwnerId"].Expires = DateTime.Now.AddDays(1);
                //Response.Cookies["CarOwnerNm"].Expires = DateTime.Now.AddDays(1);
                //Response.Cookies["CarOwnerMi"].Expires = DateTime.Now.AddDays(1);
                return Json(res);
            }
            else {
                return null;
            }
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}