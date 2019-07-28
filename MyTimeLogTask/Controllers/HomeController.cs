using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using MyTimeLogTask.Models;

namespace MyTimeLogTask.Controllers
{
    public class HomeController : Controller
    {
        DB_A49893_taskEntities db = new DB_A49893_taskEntities();
        public async Task<ActionResult> Index()
        {
            // get from database //
            ViewBag.TimeLog = await db.TimeLog.Select(t=> t).ToListAsync();
            var TimeLogsHeader = db.TimeLog.Select(x => x.Date.ToString().Substring(0, 11)).Distinct().ToList();

            // descending data //
            List<string> newTimeLogsHeader = new List<string>();
            for (int i = TimeLogsHeader.Count - 1; i >= 0; i--)
            {
                newTimeLogsHeader.Add(TimeLogsHeader[i]);

            }
            ViewBag.TimeLogs = newTimeLogsHeader;

            return View();
            
        }

        [HttpPost]
        public JsonResult JsonTimeLog(TimeLog timeLog)
        {
            // add to database //
            db.TimeLog.Add(timeLog);
            db.SaveChanges();
            return Json(timeLog);
        }
    }
}