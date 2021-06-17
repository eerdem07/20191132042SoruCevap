import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Kategori } from 'src/app/models/Kategori';
import { Soru } from 'src/app/models/Soru';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-soru-dialog',
  templateUrl: './soru-dialog.component.html',
  styleUrls: ['./soru-dialog.component.css'],
})
export class SoruDialogComponent implements OnInit {
  dialogBaslik: string;
  islem: string;
  yeniKayit: Soru;
  frm: FormGroup;

  kategoriler: Kategori[] = [];

  Jconfig = {};

  constructor(
    public dialogRef: MatDialogRef<SoruDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public frmBuild: FormBuilder,
    public apiServis: ApiService
  ) {
    this.islem = data.islem;

    if (this.islem == 'ekle') {
      this.dialogBaslik = 'Soru Ekle';
      this.yeniKayit = new Soru();
    } else if (this.islem == 'duzenle') {
      this.dialogBaslik = 'Soru Düzenle';
      this.yeniKayit = data.kayit;
    } else if (this.islem == 'detay') {
      this.dialogBaslik = 'Soru Detay';
      this.yeniKayit = data.kayit;
    }
    this.frm = this.FormOlustur();
  }

  ngOnInit() {
    this.KategoriListele();
  }

  KategoriListele() {
    this.apiServis.kategoriListele().subscribe((d: Kategori[]) => {
      this.kategoriler = d;
    });
  }

  FormOlustur() {
    return this.frmBuild.group({
      baslik: [this.yeniKayit.baslik],
      katId: [this.yeniKayit.katId],
      icerik: [this.yeniKayit.icerik],
    });
  }
}
