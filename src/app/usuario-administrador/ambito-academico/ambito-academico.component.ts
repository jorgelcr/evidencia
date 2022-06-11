import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-ambito-academico',
  templateUrl: './ambito-academico.component.html',
  styleUrls: ['./ambito-academico.component.css']
})
export class AmbitoAcademicoComponent {

  constructor(public dialog: MatDialog) { }

  openDialog() {
    const dialogRef = this.dialog.open(ModalAmbitoAcademico1,{ disableClose: true ,
      height: '300px',
      width: '700px',})
    /*   this.dialog.open(DialogContentExampleDialog, { disableClose: true }); */
      
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
   
  });

  }
  
openDialog2() {
  const dialogRef = this.dialog.open(ModalAmbitoAcademico2, {
    height: '300px',
    width: '700px',
  });

/*   dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
  }); */
}
}

@Component({
  selector: 'modal-ambito-academico-1',
  templateUrl: './modal-ambito-academico-1.html',
  styleUrls: ['./ambito-academico.component.css']
})

export class ModalAmbitoAcademico1 {}

@Component({
  selector: 'modal-ambito-academico-2',
  templateUrl: './modal-ambito-academico-2.html',
  styleUrls: ['./ambito-academico.component.css']
})

export class ModalAmbitoAcademico2 {}
