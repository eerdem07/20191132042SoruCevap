using SoruCevap.Models;
using SoruCevap.ViewModel;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Web.Http;
using System.Linq;


namespace SoruCevap.Controllers
{
    public class ServiceController : ApiController
    {
        SonucModel sonuc = new SonucModel();
        Database1Entities db = new Database1Entities();

        #region Uye

        [HttpGet]
        [Route("api/uye-liste")]
        public List<UyeModel> uyeListele()
        {
            List<UyeModel> uye = db.Uye.Select(x=> new UyeModel
            {
                userId = x.userId,
                ad =x.ad,
                soyad = x.soyad,
                email =x.email,
                rol=x.rol,

            }).ToList();

            return uye;
        }

        [HttpGet]
        [Route("api/uye-by-id/{id}")]
        public UyeModel uyeListeById(string id)
        {
            UyeModel uye = db.Uye.Where(s => s.userId == id).Select(x => new UyeModel()
            {
                ad = x.ad,
                soyad = x.soyad,
                userId = x.userId,
                email = x.email,
                rol = x.rol
            }).SingleOrDefault();

            return uye;
        }

        [HttpPost]
        [Route("api/uye-ekle")]
        public SonucModel uyeEkle(UyeModel uye)
        {
            if(db.Uye.Count(s=> s.userId == uye.userId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Üye hali hazırda kayıtlıdır.";
                return sonuc;
            }

            sonuc.islem = true;
            sonuc.mesaj = "Üye oluşturuldu";

            Uye yeniUye = new Uye();
            yeniUye.userId = Guid.NewGuid().ToString();

            yeniUye.ad = uye.ad;
            yeniUye.soyad = uye.soyad;
            yeniUye.sifre = uye.sifre;
            yeniUye.email = uye.email;
            yeniUye.rol = uye.rol;

            db.Uye.Add(yeniUye);
            db.SaveChanges();

            return sonuc;
        }

        [HttpPut]
        [Route("api/uye-duzenle")]
        public SonucModel uyeDuzenle(UyeModel uye)
        {
            Uye kayittakiUye = db.Uye.Where(s => s.userId == uye.userId).SingleOrDefault();
            
            if(kayittakiUye == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Üye bulunamadı";
                return sonuc;
            }
            kayittakiUye.ad = uye.ad;
            kayittakiUye.soyad = uye.soyad;
            kayittakiUye.email = uye.email;

            if(uye.sifre != null)
            {
                kayittakiUye.sifre = uye.sifre;
            }

            if (uye.rol != null)
            {
                kayittakiUye.rol = uye.rol;
            }


            sonuc.islem = true;
            sonuc.mesaj = "Üye bilgileri düzenlendi.";

            db.SaveChanges();

            return sonuc;
        }

        [HttpDelete]
        [Route("api/uye-sil/{id}")]
        public SonucModel uyeSil(string id)
        {
            Uye kayit = db.Uye.Where(s => s.userId == id).SingleOrDefault();

            if(kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Üye bulunamadı";
                return sonuc;
            }

            if(db.Soru.Count(s=>s.uyeId== id) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Sorusu olan üye silinemez";
                return sonuc;
            }

            sonuc.islem = true;
            sonuc.mesaj = "Üye silinmiştir.";

            db.Uye.Remove(kayit);
            db.SaveChanges();

            return sonuc;
        }


        #endregion

        #region Soru

        [HttpGet]
        [Route("api/soru-liste")]
        public List<SoruModel> soruListele()
        {
            List<SoruModel> sorular = db.Soru.Select(x => new SoruModel
            {
                baslik = x.baslik,
                icerik = x.icerik,
                Id = x.Id,
                katId = x.katId,
                tarih = x.tarih,
                uyeId = x.uyeId
            }).ToList();

            return sorular;
        }

        [HttpGet]
        [Route("api/soru-listele-by-uye-id/{uyeId}")]
        public List<SoruModel> soruListeleByUserId(string uyeId)
        {
            List<SoruModel> soru = db.Soru.Where(s => s.uyeId == uyeId).Select(x => new SoruModel
            {
                baslik = x.baslik,
                icerik = x.icerik,
                Id = x.Id,
                tarih = x.tarih,
                uyeId = x.uyeId,
                katId = x.katId,

            }).ToList();

            return soru;
        }

        [HttpGet]
        [Route("api/soru-liste-by-id/{id}")]
        public SoruModel soruById(int id)
        {
            SoruModel soru = db.Soru.Where(s => s.Id == id).Select(x => new SoruModel()
            {
                baslik = x.baslik,
                Id = x.Id,
                katId = x.katId,
                tarih = x.tarih,
                uyeId = x.uyeId,
                icerik = x.icerik,

            }).SingleOrDefault();

            List<CevapModel> cevaplar = db.Cevap.Where(s => s.soruId == soru.Id).Select(x=> new CevapModel()
            {
                icerik = x.icerik,
                uyeId = x.uyeId,
                Id = x.Id,
            }
            ).ToList();

            UyeModel uye = db.Uye.Where(s => s.userId == soru.uyeId).Select(x => new UyeModel() {
                ad = x.ad,
                soyad = x.soyad
            }).SingleOrDefault();

            soru.cevaplar = cevaplar;
            soru.uye = uye;

            return soru;
        }   

        [HttpGet]
        [Route("api/soru-listele-by-kat-id/{katId}")]
        public List<SoruModel> soruListeleByKatId(int katId)
        {
            List<SoruModel> soru = db.Soru.Where(s => s.katId == katId).Select(x => new SoruModel()
            {
                baslik = x.baslik,
                Id = x.Id,
                icerik = x.icerik,
                tarih = x.tarih,
                uyeId = x.uyeId,
                katId = x.katId,

            }).ToList();

            return soru;
        }


        [HttpPost]
        [Route("api/soru-ekle")]
        public SonucModel soruEkle(SoruModel model)
        {
            if(db.Soru.Count(s=> s.Id == model.Id) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Bu ID'ye soru kayıtlıdır.";
                return sonuc;
            }

            sonuc.islem = true;
            sonuc.mesaj = "Soru kaydedildi";

            Soru yeniSoru = new Soru();

            yeniSoru.baslik = model.baslik;
            yeniSoru.icerik = model.icerik;
            yeniSoru.tarih = model.tarih;
            yeniSoru.katId = model.katId;
            yeniSoru.uyeId = model.uyeId;

            db.Soru.Add(yeniSoru);
            db.SaveChanges();

            return sonuc;
        }

        [HttpPut]
        [Route("api/soru-duzenle")]
        public SonucModel soruDuzenle(SoruModel model)
        {
            Soru soru = db.Soru.Where(s => s.Id == model.Id).SingleOrDefault();

            if(soru == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt bulunamadı";
                return sonuc;
            }

            sonuc.islem = true;
            sonuc.mesaj = "Kayıt güncellendi";

            soru.icerik = model.icerik;
            soru.baslik = model.baslik;
            soru.tarih = model.tarih;
            soru.katId = model.katId;
            soru.uyeId = model.uyeId;

            db.Soru.Add(soru);
            db.SaveChanges();

            return sonuc;
        }

        [HttpDelete]
        [Route("api/soru-sil/{id}")]
        public SonucModel soruSil(int id)
        {
            Soru soru = db.Soru.Where(s => s.Id == id).SingleOrDefault();

            if(soru == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt bulunamadı";
                return sonuc;
            }

            if(db.Cevap.Count(s=>s.soruId == id) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Üzerinde cevap olan soru silinemez";
                return sonuc;
            }

            db.Soru.Remove(soru);
            db.SaveChanges();

            sonuc.islem = false;
            sonuc.mesaj = "Soru silindi";

            return sonuc;
        }

        #endregion

        #region Kategori

        [HttpGet]
        [Route("api/kategori-listele")]
        public List<KategoriModel> kategoriListele()
        {
            List<KategoriModel> kategoriListe = db.Kategori.Select(x => new KategoriModel()
            {
                katAdi = x.katAdi,
                katId = x.katId
            }).ToList();

            return kategoriListe;
        }

        [HttpGet]
        [Route("api/kategori-listele-by-id/{id}")]
        public KategoriModel kategoriById(int id)
        {
            KategoriModel kategori = db.Kategori.Where(s => s.katId == id).Select(x => new KategoriModel()
            {
                katId = x.katId,
                katAdi = x.katAdi

            }).SingleOrDefault();

            return kategori;
        }

        [HttpPost]
        [Route("api/kategori-ekle")]
        public SonucModel kategoriEkle(KategoriModel model) 
        {
            if(db.Kategori.Count(s=> s.katAdi == model.katAdi)>0) 
            {
                sonuc.islem = false;
                sonuc.mesaj = "Verilen isimle kategori vardır";
                return sonuc;
            }


            sonuc.islem = true;
            sonuc.mesaj = "Kategori eklendi";

            Kategori yeni = new Kategori();

            yeni.katAdi = model.katAdi;

            db.Kategori.Add(yeni);
            db.SaveChanges();

            return sonuc;
        }

        [HttpPut]
        [Route("api/kategori-duzenle")]
        public SonucModel kategoriDuzenle(KategoriModel model)
        {
            Kategori kategori = db.Kategori.Where(s => s.katId == model.katId).SingleOrDefault();

            if(kategori == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kategori bulunamadı.";
                return sonuc;
            }

            sonuc.islem = true;
            sonuc.mesaj = "Kategori düzenlendi";

            kategori.katAdi = model.katAdi;

            db.SaveChanges();

            return sonuc;
        }

        [HttpDelete]
        [Route("api/kategori-sil/{id}")]
        public SonucModel kategoriSil(int id)
        {
            Kategori kategori = db.Kategori.Where(s => s.katId == id).SingleOrDefault();
            
            if(kategori == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kategori bulunamadı";
                return sonuc;
            }

            if(db.Soru.Count(s=>s.katId == id) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Üzerinde veri olan kategori silinemez";
                return sonuc;
            }

            sonuc.islem = true;
            sonuc.mesaj = "Kategori silindi";

            db.Kategori.Remove(kategori);
            db.SaveChanges();

            return sonuc;
        }
        #endregion

        #region Cevap

        [HttpGet]
        [Route("api/cevap-liste-by-soru-id/{soruId}")]
        public List<CevapModel> cevapListeleBySoruId(int soruId)
        {
            List<CevapModel> cevaplar = db.Cevap.Where(s => s.soruId == soruId).Select(x=> new CevapModel()
            {
                icerik = x.icerik,
                soruId = x.soruId,
                Id = x.Id,
                uyeId = x.uyeId

            }  ).ToList();

            return cevaplar;
        }

        [HttpPost]
        [Route("api/cevap-ekle")]
        public SonucModel cevapEkle(CevapModel model)
        {
            Cevap yeniCevap = new Cevap();

            yeniCevap.icerik = model.icerik;
            yeniCevap.soruId = model.soruId;
            yeniCevap.uyeId = model.uyeId;

            sonuc.islem = true;
            sonuc.mesaj = "Cevap eklendi";

            db.Cevap.Add(yeniCevap);
            db.SaveChanges();

            return sonuc;
        }

        [HttpPut]
        [Route("api/cevap-duzenle")]
        public SonucModel cevapDuzenle(CevapModel model)
        {
            Cevap cevap = db.Cevap.Where(s => s.Id == model.Id).SingleOrDefault();

            if(cevap == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt bulunamadı";
                return sonuc;
            }

            sonuc.islem = true;
            sonuc.mesaj = "Cevap düzenlendi";

            cevap.icerik = model.icerik;
            db.SaveChanges();

            return sonuc;
        }

        [HttpDelete]
        [Route("api/cevap-sil/{id}")]
        public SonucModel cevapSil(int id)
        {
            Cevap kayit = db.Cevap.Where(s=>s.Id == id).SingleOrDefault();

            if(kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Silinecek kayıt bulunamadı";
                return sonuc;
            }

            sonuc.islem = true;
            sonuc.mesaj = "Cevap silindi";

            db.Cevap.Remove(kayit);
            db.SaveChanges();

            return sonuc;
        }
        #endregion
    }
}
