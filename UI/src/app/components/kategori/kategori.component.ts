import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Soru } from 'src/app/models/Soru';
import { ApiService } from 'src/app/services/api.service';
import { Kategori } from 'src/app/models/Kategori';

@Component({
  selector: 'app-kategori',
  templateUrl: './kategori.component.html',
  styleUrls: ['./kategori.component.css'],
})
export class KategoriComponent implements OnInit {
  katId: number;
  kat: Kategori;
  sorular: Soru[];
  constructor(public apiServis: ApiService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((p) => {
      if (p.katId) {
        this.katId = p.katId;
        this.MakaleListeByKatId();
        this.KategoriById();
      }
    });
  }
  KategoriById() {
    this.apiServis.kategoriById(this.katId).subscribe((d: Kategori) => {
      this.kat = d;
    });
  }
  MakaleListeByKatId() {
    this.apiServis.soruListeByKatId(this.katId).subscribe((d: Soru[]) => {
      this.sorular = d;
    });
  }
}
