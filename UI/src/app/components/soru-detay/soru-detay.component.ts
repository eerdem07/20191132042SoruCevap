import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Soru } from 'src/app/models/Soru';

@Component({
  selector: 'app-soru-detay',
  templateUrl: './soru-detay.component.html',
  styleUrls: ['./soru-detay.component.css'],
})
export class SoruDetayComponent implements OnInit {
  soruId: string;
  soru: Soru = new Soru();

  constructor(public Route: ActivatedRoute, public apiServis: ApiService) {}

  ngOnInit() {
    this.Route.params.subscribe((p) => {
      this.soruId = p.id;
    });
    this.detayiAl();
  }

  detayiAl() {
    this.apiServis.soruById(this.soruId).subscribe((datas: Soru) => {
      this.soru = datas;
    });
  }
}
