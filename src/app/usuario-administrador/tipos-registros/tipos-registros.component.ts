import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-tipos-registros',
  templateUrl: './tipos-registros.component.html',
  styleUrls: ['./tipos-registros.component.css']
})
export class TiposRegistrosComponent {

  constructor(public dialog: MatDialog) { }

  openDialog() {
    const dialogRef = this.dialog.open(ModalTiposRegistros1,{ disableClose: true ,
      height: '400px',
      width: '700px',})
    /*   this.dialog.open(DialogContentExampleDialog, { disableClose: true }); */
      
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
   
  });

  }
  
openDialog2() {
  const dialogRef = this.dialog.open(ModalTiposRegistros2, {
    height: '400px',
    width: '700px',
    });

/*   dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
  }); */
}
}

@Component({
  selector: 'modal-tipos-registros-1',
  templateUrl: './modal-tipos-registros-1.html',
  styleUrls: ['./tipos-registros.component.css']
})

export class ModalTiposRegistros1 {}

@Component({
  selector: 'modal-tipos-registros-2',
  templateUrl: './modal-tipos-registros-2.html',
  styleUrls: ['./tipos-registros.component.css']
})

export class ModalTiposRegistros2 {}
