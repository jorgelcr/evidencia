import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-procesos',
  templateUrl: './procesos.component.html',
  styleUrls: ['./procesos.component.css']
})
export class ProcesosComponent {

  constructor(public dialog: MatDialog) { }

  openDialog() {
    const dialogRef = this.dialog.open(ModalProcesos1,{ disableClose: true ,
      height: '400px',
      width: '700px',})
    /*   this.dialog.open(DialogContentExampleDialog, { disableClose: true }); */
      
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
   
  });

  }
  
openDialog2() {
  const dialogRef = this.dialog.open(ModalProcesos2, {
    height: '400px',
    width: '700px',
  });

/*   dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
  }); */
}
}

@Component({
  selector: 'modal-Procesos-1',
  templateUrl: './modal-Procesos-1.html',
  styleUrls: ['./Procesos.component.css']
})

export class ModalProcesos1 {}

@Component({
  selector: 'modal-Procesos-2',
  templateUrl: './modal-Procesos-2.html',
  styleUrls: ['./Procesos.component.css']
})

export class ModalProcesos2 {}
