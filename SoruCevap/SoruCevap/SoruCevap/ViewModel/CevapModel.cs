using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SoruCevap.ViewModel
{
    public class CevapModel
    {
        public int Id { get; set; }
        public string icerik { get; set; }
        public int soruId { get; set; }

        public string uyeId { get; set; }
    }
}