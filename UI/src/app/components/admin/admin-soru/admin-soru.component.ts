import { ActivatedRoute } from '@angular/router';
import { Soru } from './../../../models/Soru';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SoruDialogComponent } from '../../dialogs/soru-dialog/soru-dialog.component';
import { ApiService } from 'src/app/services/api.service';
import { Sonuc } from 'src/app/models/Sonuc';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Kategori } from 'src/app/models/Kategori';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-admin-soru',
  templateUrl: './admin-soru.component.html',
  styleUrls: ['./admin-soru.component.scss'],
})
export class AdminSoruComponent implements OnInit {
  kategoriler: Kategori[];

  sorular: Soru[];

  katId: number;

  dataSource: any;

  uyeId: string;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatSort;

  displayedColumns = ['Baslik', 'Tarih', 'UyeId', 'Detay'];
  dialogRef: MatDialogRef<SoruDialogComponent>;
  dialogRefConfirm: MatDialogRef<ConfirmDialogComponent>;

  constructor(
    public apiServis: ApiService,
    public alert: MyAlertService,
    public matDialog: MatDialog,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.KategoriListe();
    this.route.params.subscribe((d) => {
      if (d.katId) {
        this.katId = parseInt(d.katId);
        this.SoruListele();
      }
    });

    this.uyeId = localStorage.getItem('uid');
  }

  KategoriSec(katId: any) {
    this.katId = katId;
    this.SoruListele();
  }

  KategoriListe() {
    this.apiServis.kategoriListele().subscribe((d: Kategori[]) => {
      this.kategoriler = d;
    });
  }

  SoruListele() {
    this.apiServis.soruListeByKatId(this.katId).subscribe((d: Soru[]) => {
      this.sorular = d;
      this.dataSource = new MatTableDataSource(this.sorular);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      console.log(this.sorular);
    });
  }

  SoruEkle() {
    let yeniKayit: Soru = new Soru();
    this.dialogRef = this.matDialog.open(SoruDialogComponent, {
      width: '900px',
      data: {
        kayit: yeniKayit,
        islem: 'ekle',
      },
    });
    this.dialogRef.afterClosed().subscribe((d) => {
      if (d) {
        let tarih = new Date();

        yeniKayit.baslik = d.baslik;
        yeniKayit.icerik = d.icerik;
        yeniKayit.katId = d.katId;
        yeniKayit.uyeId = this.uyeId;
        yeniKayit.tarih = tarih.getTime().toString();
        this.apiServis.soruEkle(d).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.SoruListele();
          }
        });
      }
    });
  }

  SoruDuzenle(kayit: Soru) {
    this.dialogRef = this.matDialog.open(SoruDialogComponent, {
      width: '900px',
      data: {
        kayit: kayit,
        islem: 'duzenle',
      },
    });
    this.dialogRef.afterClosed().subscribe((d) => {
      if (d) {
        kayit.baslik = d.baslik;
        kayit.icerik = d.icerik;
        kayit.katId = d.katId;
        this.apiServis.soruDuzenle(kayit).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.SoruListele();
          }
        });
      }
    });
  }

  SoruSil(kayit: Soru) {
    this.dialogRefConfirm = this.matDialog.open(ConfirmDialogComponent, {
      width: '600px',
    });
    this.dialogRefConfirm.componentInstance.dialogMesaj =
      kayit.baslik + 'Adlı Soru silinecektir?';

    this.dialogRefConfirm.afterClosed().subscribe((d) => {
      if (d) {
        this.apiServis.soruSil(kayit.Id).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.SoruListele();
          }
        });
      }
    });
  }

  Detay(kayit: Soru) {
    this.dialogRef = this.matDialog.open(SoruDialogComponent, {
      width: '900px',
      data: {
        kayit: kayit,
        islem: 'detay',
      },
    });
  }
}
