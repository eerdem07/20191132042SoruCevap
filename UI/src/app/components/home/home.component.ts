import { ApiService } from 'src/app/services/api.service';
import { Soru } from '../../models/Soru';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SoruDialogComponent } from '../dialogs/soru-dialog/soru-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  sorular: Soru[] = [];

  yeniSoru: Soru = new Soru();
  constructor(public apiServis: ApiService, public dialog: MatDialog) {}

  ngOnInit() {
    this.SoruListele();
  }

  SoruListele() {
    this.apiServis.soruListe().subscribe((sorular: Soru[]) => {
      this.sorular = sorular;
    });
  }

  SoruEkle() {
    const dialogRef = this.dialog.open(SoruDialogComponent, {
      data: {
        islem: 'ekle',
      },
    });
    dialogRef.afterClosed().subscribe(async (result) => {
      console.log(result);
      this.yeniSoru = result;
      await this.apiServis.soruEkle(this.yeniSoru).toPromise();
    });
  }
}
