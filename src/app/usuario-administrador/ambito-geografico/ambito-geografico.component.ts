import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-ambito-geografico',
  templateUrl: './ambito-geografico.component.html',
  styleUrls: ['./ambito-geografico.component.css']
})
export class AmbitoGeograficoComponent {

  constructor(public dialog: MatDialog) { }

  openDialog() {
    const dialogRef = this.dialog.open(ModalAmbitoGeografico1,{ disableClose: true ,
      height: '600px',
      width: '700px',})
    /*   this.dialog.open(DialogContentExampleDialog, { disableClose: true }); */
      
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
   
  });

  }
  
openDialog2() {
  const dialogRef = this.dialog.open(ModalAmbitoGeografico2, {
    height: '600px',
    width: '700px',
  });

/*   dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
  }); */
}
}

@Component({
  selector: 'modal-ambito-geografico-1',
  templateUrl: './modal-ambito-geografico-1.html',
  styleUrls: ['./ambito-geografico.component.css']
})

export class ModalAmbitoGeografico1 {}

@Component({
  selector: 'modal-ambito-geografico-2',
  templateUrl: './modal-ambito-geografico-2.html',
  styleUrls: ['./ambito-geografico.component.css']
})

export class ModalAmbitoGeografico2 {}
