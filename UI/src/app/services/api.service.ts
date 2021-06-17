import { Cevap } from '../models/Cevap';
import { Uye } from './../models/Uye';
import { Soru } from '../models/Soru';
import { Kategori } from './../models/Kategori';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiUrl = 'https://localhost:44360/api/';

  constructor(public readonly http: HttpClient) {}

  /* Oturum İşlemleri Başla */

  tokenAl(kadi: string, parola: string) {
    var data =
      'username=' + kadi + '&password=' + parola + '&grant_type=password';
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    return this.http.post(this.apiUrl + '/token', data, { headers: reqHeader });
  }

  oturumKontrol() {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }

  yetkiKontrol(yetkiler) {
    var uyeYetkileri: string[] = JSON.parse(
      localStorage.getItem('uyeYetkileri')
    );
    var sonuc: boolean = false;
    if (uyeYetkileri) {
      yetkiler.forEach((element) => {
        if (uyeYetkileri.indexOf(element) > -1) {
          sonuc = true;
          return false;
        }
      });
    }

    return sonuc;
  }

  /* Oturum İşlemleri Bitiş */

  /*  API */

  // Kategori API Başlangıç

  kategoriListele() {
    return this.http.get(this.apiUrl + 'kategori-listele/');
  }
  kategoriById(katId: number) {
    return this.http.get(this.apiUrl + 'kategori-listele-by-id/' + katId);
  }
  kategoriEkle(kat: Kategori) {
    return this.http.post(this.apiUrl + 'kategori-ekle/', kat);
  }
  kategoriDuzenle(kat: Kategori) {
    return this.http.put(this.apiUrl + 'kategori-duzenle/', kat);
  }
  kategoriSil(katId: number) {
    return this.http.delete(this.apiUrl + 'kategori-sil/' + katId);
  }

  // Kategori API Bitiş

  // Soru API Başlangıç

  soruListe() {
    return this.http.get(this.apiUrl + 'soru-liste');
  }
  soruListeByKatId(katId: number) {
    return this.http.get(this.apiUrl + 'soru-listele-by-kat-id/' + katId);
  }
  soruListeByUyeId(uyeId: string) {
    return this.http.get(this.apiUrl + 'soru-listele-by-uye-id/' + uyeId);
  }
  soruById(soruId: any) {
    return this.http.get(this.apiUrl + 'soru-liste-by-id/' + soruId);
  }
  soruEkle(soru: Soru) {
    soru.tarih = new Date(Date.now()).toLocaleString('tr');
    soru.uyeId = localStorage.getItem('uid');
    return this.http.post(this.apiUrl + 'soru-ekle/', soru);
  }
  soruDuzenle(soru: Soru) {
    return this.http.put(this.apiUrl + 'soru-duzenle/', soru);
  }
  soruSil(soruId: number) {
    return this.http.delete(this.apiUrl + 'soru-sil/' + soruId);
  }

  // Soru API Bitiş

  // Üye API Başlangıç

  uyeListe() {
    return this.http.get(this.apiUrl + 'uye-liste/');
  }

  uyeById(uyeId: string) {
    return this.http.get(this.apiUrl + 'uye-by-id/' + uyeId);
  }
  uyeEkle(uye: Uye) {
    console.log(uye);
    return this.http.post(this.apiUrl + 'uye-ekle/', uye);
  }
  uyeDuzenle(uye: Partial<Uye>) {
    console.log(uye);
    return this.http.put(this.apiUrl + 'uye-duzenle/', uye);
  }
  uyeSil(uyeId: string) {
    return this.http.delete(this.apiUrl + 'uye-sil/' + uyeId);
  }

  // Üye API Bitiş

  // Cevap API Başlangıç

  cevapListeBySoruId(soruId: number) {
    return this.http.get(this.apiUrl + 'cevap-liste-by-soru-id/' + soruId);
  }

  cevapEkle(cevap: Cevap) {
    return this.http
      .post(this.apiUrl + 'cevap-ekle/', cevap)
      .subscribe((d) => {});
  }
  cevapDuzenle(cevap: Cevap) {
    return this.http.put(this.apiUrl + 'cevap-duzenle/', cevap);
  }
  cevapSil(cevapId: number) {
    return this.http.delete(this.apiUrl + 'cevap-sil/' + cevapId);
  }

  // Cevap API Bitiş
}
