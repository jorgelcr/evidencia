import { Component, ElementRef, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-debilidades',
  templateUrl: './debilidades.component.html',
  styleUrls: ['./debilidades.component.css']
})
export class DebilidadesComponent {

  
  
  constructor(public dialog: MatDialog) { }

  openDialog() {
    const dialogRef = this.dialog.open(ModalDebilidades1,{ disableClose: true ,
      height: '600px',
      width: '700px',})
    /*   this.dialog.open(DialogContentExampleDialog, { disableClose: true }); */
      
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
   
  });

  }
  
}

@Component({
  selector: 'modal-debilidades-1',
  templateUrl: './modal-debilidades-1.html',
  styleUrls: ['./debilidades.component.css']
})

export class ModalDebilidades1 {}

