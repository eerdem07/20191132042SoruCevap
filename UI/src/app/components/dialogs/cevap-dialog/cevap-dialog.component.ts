import { Cevap } from './../../../models/Cevap';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Kategori } from 'src/app/models/Kategori';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-cevap-dialog',
  templateUrl: './cevap-dialog.component.html',
  styleUrls: ['./cevap-dialog.component.css'],
})
export class CevapDialogComponent implements OnInit {
  dialogBaslik: string;
  islem: string;
  yeniKayit: Cevap;
  frm: FormGroup;

  Jconfig = {};

  constructor(
    public dialogRef: MatDialogRef<CevapDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public frmBuild: FormBuilder,
    public apiServis: ApiService
  ) {
    this.dialogBaslik = 'Cevap Ekle';
    this.yeniKayit = new Cevap();

    this.frm = this.FormOlustur();
  }

  ngOnInit() {}

  FormOlustur() {
    return this.frmBuild.group({
      icerik: [this.yeniKayit.icerik],
    });
  }
}
