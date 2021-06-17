import { Kategori } from './../../../models/Kategori';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-kategori-dialog',
  templateUrl: './kategori-dialog.component.html',
  styleUrls: ['./kategori-dialog.component.css'],
})
export class KategoriDialogComponent implements OnInit {
  dialogBaslik: string;
  islem: string;
  yeniKayit: Kategori;
  frm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<KategoriDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public frmBuild: FormBuilder
  ) {
    this.islem = data.islem;

    if (this.islem == 'ekle') {
      this.dialogBaslik = 'Kategori Ekle';
      this.yeniKayit = new Kategori();
    }
    if (this.islem == 'duzenle') {
      this.dialogBaslik = 'Kategori Düzenle';
      this.yeniKayit = data.kayit;
    }
    this.frm = this.FormOlustur();
  }

  ngOnInit() {}

  FormOlustur() {
    return this.frmBuild.group({
      katAdi: [this.yeniKayit.katAdi],
    });
  }
}
