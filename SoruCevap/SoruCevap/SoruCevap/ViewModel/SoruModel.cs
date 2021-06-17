using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SoruCevap.ViewModel
{
    public class SoruModel
    {
        public int Id { get; set; }
        public string baslik { get; set; }
        public string icerik { get; set; }
        public string tarih { get; set; }
        public int katId { get; set; }
        public string uyeId { get; set; }
        public virtual UyeModel uye { get; set; }
        public List<CevapModel> cevaplar { get; set; }


    }
}