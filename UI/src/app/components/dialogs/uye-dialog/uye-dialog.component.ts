import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Uye } from 'src/app/models/Uye';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-uye-dialog',
  templateUrl: './uye-dialog.component.html',
  styleUrls: ['./uye-dialog.component.scss'],
})
export class UyeDialogComponent implements OnInit {
  dialogBaslik: string;
  islem: string;
  yeniKayit: Uye = new Uye();
  frm: FormGroup;
  Jconfig = {};
  kayit: Uye = new Uye();

  constructor(
    public dialogRef: MatDialogRef<UyeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public frmBuild: FormBuilder,
    public apiServis: ApiService
  ) {
    this.islem = data.islem;
    this.yeniKayit = data.kayit;

    this.frm = this.FormOlustur();
  }

  ngOnInit() {}

  FormOlustur() {
    return this.frmBuild.group({
      ad: [this.yeniKayit.ad],
      soyad: [this.yeniKayit.soyad],
      email: [this.yeniKayit.email],
      rol: [this.yeniKayit.rol],
    });
  }
}
