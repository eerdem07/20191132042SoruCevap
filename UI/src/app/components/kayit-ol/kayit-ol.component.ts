import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Uye } from 'src/app/models/Uye';
import { Sonuc } from 'src/app/models/Sonuc';
import { MyAlertService } from 'src/app/services/myAlert.service';

@Component({
  selector: 'app-kayit-ol',
  templateUrl: './kayit-ol.component.html',
  styleUrls: ['./kayit-ol.component.css'],
})
export class KayitOlComponent implements OnInit {
  frm: FormGroup;
  yeniUye: Uye = new Uye();

  constructor(
    public frmBuild: FormBuilder,
    private readonly apiServis: ApiService,
    public alert: MyAlertService
  ) {
    this.frm = this.FormOlustur();
  }

  ngOnInit() {}

  FormOlustur() {
    return this.frmBuild.group({
      ad: [this.yeniUye.ad],
      soyad: [this.yeniUye.soyad],
      eposta: [this.yeniUye.email],
      sifre: [this.yeniUye.sifre],
    });
  }

  KayitOl() {
    this.yeniUye.rol = 'Uye';
    this.yeniUye.email = this.frm.value.eposta;
    this.yeniUye.ad = this.frm.value.ad;
    this.yeniUye.soyad = this.frm.value.soyad;
    this.yeniUye.sifre = this.frm.value.sifre;
    this.apiServis.uyeEkle(this.yeniUye).subscribe();
    this.OturumAc(this.yeniUye.email, this.yeniUye.sifre);
  }

  OturumAc(kadi: string, parola: string) {
    this.apiServis.tokenAl(kadi, parola).subscribe(
      (d: any) => {
        console.log(d);
        localStorage.setItem('token', d.access_token);
        localStorage.setItem('uid', d.uyeId);
        localStorage.setItem('kadi', d.uyeIsim);
        localStorage.setItem('uyeYetkileri', d.uyeYetkileri);
        location.href = '/';
      },
      (err) => {
        var s: Sonuc = new Sonuc();
        s.islem = false;
        s.mesaj = 'Kullanıcı Adı veya Parola Geçersizdir!';
        this.alert.AlertUygula(s);
      }
    );
  }
}
