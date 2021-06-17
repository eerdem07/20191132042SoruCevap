import { Soru } from 'src/app/models/Soru';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Uye } from 'src/app/models/Uye';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css'],
})
export class ProfilComponent implements OnInit {
  uid: string;
  uye: Uye = new Uye();
  sorular: Soru[] = [];
  frm: FormGroup;
  guncelUye: Uye = new Uye();

  constructor(
    public route: ActivatedRoute,
    public apiServis: ApiService,
    public frmBuild: FormBuilder
  ) {
    this.frm = this.FormOlustur();
  }

  ngOnInit() {
    this.route.params.subscribe(({ id }) => {
      this.uid = id;
    });
    this.profilListele();
    this.KullanicininSorulariniGetir();
  }

  KullanicininSorulariniGetir() {
    this.apiServis
      .soruListeByUyeId(this.uid)
      .subscribe((data: Soru[]) => (this.sorular = data));
  }

  profilListele() {
    this.apiServis.uyeById(this.uid).subscribe((profil: Uye) => {
      this.uye = profil;
      this.guncelUye = profil;
    });
  }

  FormOlustur() {
    return this.frmBuild.group({
      ad: [this.guncelUye.ad],
      soyad: [this.guncelUye.soyad],
      eposta: [this.guncelUye.email],
    });
  }

  ProfiliGuncelle() {
    this.guncelUye.email = this.frm.value.eposta || this.guncelUye.email;
    this.guncelUye.ad = this.frm.value.ad || this.guncelUye.ad;
    this.guncelUye.soyad = this.frm.value.soyad || this.guncelUye.soyad;

    this.apiServis
      .uyeDuzenle({
        userId: this.guncelUye.userId,
        ad: this.guncelUye.ad,
        soyad: this.guncelUye.soyad,
        email: this.guncelUye.email,
      })
      .subscribe();

    localStorage.setItem(
      'kadi',
      `${this.guncelUye.ad} ${this.guncelUye.soyad}`
    );

    location.reload();
  }
}
