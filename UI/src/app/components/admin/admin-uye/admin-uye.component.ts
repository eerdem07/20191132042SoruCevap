import { UyeDialogComponent } from './../../dialogs/uye-dialog/uye-dialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Kategori } from 'src/app/models/Kategori';
import { Sonuc } from 'src/app/models/Sonuc';
import { Soru } from 'src/app/models/Soru';
import { Uye } from 'src/app/models/Uye';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { SoruDialogComponent } from '../../dialogs/soru-dialog/soru-dialog.component';

@Component({
  selector: 'app-admin-uye',
  templateUrl: './admin-uye.component.html',
  styleUrls: ['./admin-uye.component.css'],
})
export class AdminUyeComponent implements OnInit {
  kategoriler: Kategori[];

  uye: Uye[];

  katId: number;

  dataSource: any;

  uyeId: string;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatSort;

  displayedColumns = ['ad', 'soyad', 'eposta', 'userId', 'Detay'];
  dialogRef: MatDialogRef<UyeDialogComponent>;
  dialogRefConfirm: MatDialogRef<ConfirmDialogComponent>;

  constructor(
    public apiServis: ApiService,
    public alert: MyAlertService,
    public matDialog: MatDialog,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.UyeListele();
  }

  UyeListele() {
    this.apiServis.uyeListe().subscribe((d: Uye[]) => {
      console.log(d);
      this.dataSource = new MatTableDataSource(d);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  UyeDuzenle(kayit: Uye) {
    this.dialogRef = this.matDialog.open(UyeDialogComponent, {
      width: '900px',
      data: { kayit },
    });
    this.dialogRef.afterClosed().subscribe((d) => {
      if (d) {
        kayit.ad = d.ad;
        kayit.soyad = d.soyad;
        kayit.email = d.email;
        kayit.rol = d.rol;
        this.apiServis.uyeDuzenle(kayit).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.UyeListele();
          }
        });
      }
    });
  }

  UyeSil(kayit: Uye) {
    this.dialogRefConfirm = this.matDialog.open(ConfirmDialogComponent, {
      width: '600px',
    });
    this.dialogRefConfirm.componentInstance.dialogMesaj =
      kayit.ad + 'Adlı Üye silinecektir?';

    this.dialogRefConfirm.afterClosed().subscribe((d) => {
      if (d) {
        this.apiServis.uyeSil(kayit.userId).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.UyeListele();
          }
        });
      }
    });
  }

  Detay(kayit: Uye) {
    // FIXME
  }
}
