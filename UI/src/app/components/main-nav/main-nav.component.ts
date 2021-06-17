import { Soru } from 'src/app/models/Soru';
import { Kategori } from './../../models/Kategori';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { SoruDialogComponent } from '../dialogs/soru-dialog/soru-dialog.component';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css'],
})
export class MainNavComponent implements OnInit {
  kadi: string;
  kategoriler: Kategori[];
  uid: string;

  yeniSoru: Soru = new Soru();

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    public apiServis: ApiService,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.KategoriListe();
    if (this.apiServis.oturumKontrol) {
      this.kadi = localStorage.getItem('kadi');
      this.uid = localStorage.getItem('uid');
    }
  }

  KategoriListe() {
    this.apiServis.kategoriListele().subscribe((d: Kategori[]) => {
      this.kategoriler = d;
    });
  }

  OturumKapat() {
    localStorage.clear();
    location.href = '/';
  }

  SoruEkle() {
    const dialogRef = this.dialog.open(SoruDialogComponent, {
      data: {
        islem: 'ekle',
      },
    });
    dialogRef.afterClosed().subscribe(async (result) => {
      this.yeniSoru = result;
      console.log(this.yeniSoru);
      await this.apiServis.soruEkle(this.yeniSoru).toPromise();
    });
  }
}
