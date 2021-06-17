import { ApiService } from 'src/app/services/api.service';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Soru } from 'src/app/models/Soru';
import { CevapDialogComponent } from '../dialogs/cevap-dialog/cevap-dialog.component';
import { Cevap } from 'src/app/models/Cevap';

@Component({
  selector: 'app-soru',
  templateUrl: './soru.component.html',
  styleUrls: ['./soru.component.css'],
})
export class SoruComponent implements OnInit {
  @Input('soru') soru: Soru;
  constructor(
    public dialog: MatDialog,
    public router: Router,
    private readonly apiService: ApiService
  ) {}

  ngOnInit() {}

  cevapla() {
    const dialogRef = this.dialog.open(CevapDialogComponent, {});
    dialogRef.afterClosed().subscribe(async ({ icerik }) => {
      this.apiService.cevapEkle({
        icerik,
        soruId: this.soru.Id,
        uyeId: localStorage.getItem('uid'),
      } as Cevap);
    });
  }

  detayaGit(id: any) {
    this.router.navigate(['soru-detay', id]);
  }
}
