import { Sonuc } from './../../models/Sonuc';
import { MyAlertService } from './../../services/myAlert.service';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(public apiServis: ApiService, public alert: MyAlertService) {}

  ngOnInit() {}
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
