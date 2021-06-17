import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Soru } from 'src/app/models/Soru';
import { ApiService } from 'src/app/services/api.service';
import { SoruDialogComponent } from '../dialogs/soru-dialog/soru-dialog.component';

@Component({
  selector: 'app-soru-liste',
  templateUrl: './soru-liste.component.html',
  styleUrls: ['./soru-liste.component.css'],
})
export class SoruListeComponent implements OnInit {
  @Input('sorular') sorular: Soru[] = [];

  constructor(public apiServis: ApiService) {}

  ngOnInit() {}
}
