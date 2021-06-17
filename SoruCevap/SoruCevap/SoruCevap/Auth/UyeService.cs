using SoruCevap.Models;
using SoruCevap.ViewModel;
using System.Linq;

namespace SoruCevap.Auth
{
    public class UyeService
    {
        Database1Entities db = new Database1Entities();
        public UyeModel UyeOturumAc(string email, string parola)
        {
            UyeModel uye = db.Uye.Where(s => s.email == email && s.sifre == parola).Select(x => new UyeModel()
            {
                ad = x.ad,
                soyad = x.soyad,
                userId = x.userId,
                email = x.email,
                rol = x.rol,
                sifre = x.sifre,

            }).SingleOrDefault();
            return uye;
        }
    }
}
