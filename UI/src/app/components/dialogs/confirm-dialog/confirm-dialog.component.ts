import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css'],
})
export class ConfirmDialogComponent implements OnInit {
  dialogMesaj: string;
  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>) {}

  ngOnInit() {}
}
