import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Uye } from 'src/app/models/Uye';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.css'],
})
export class ProfileUpdateComponent implements OnInit {
  guncelUye: Uye = new Uye();
  frm: FormGroup;
  uye: Uye = new Uye();
  uid: string;
  constructor(
    public readonly apiServis: ApiService,
    public frmBuild: FormBuilder
  ) {
    this.frm = this.FormOlustur();
  }

  ngOnInit() {
    this.uid = localStorage.getItem('uid');
    this.profilListele();
  }

  FormOlustur() {
    return this.frmBuild.group({
      ad: [this.guncelUye.ad],
      soyad: [this.guncelUye.soyad],
      eposta: [this.guncelUye.email],
    });
  }

  profilListele() {
    this.apiServis.uyeById(this.uid).subscribe((profil: Uye) => {
      this.uye = profil;
      this.guncelUye = profil;
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
