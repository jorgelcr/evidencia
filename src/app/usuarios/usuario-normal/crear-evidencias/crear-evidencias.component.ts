import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Evidencias } from 'src/app/interfaces/usuario-normal/evidencias.interface';
import { UsuarioNormalService } from 'src/app/services/usuario-normal.service';

@Component({
  selector: 'app-crear-evidencias',
  templateUrl: './crear-evidencias.component.html',
  styleUrls: ['./crear-evidencias.component.css']
})
export class CrearEvidenciasComponent implements OnInit {


  public listaGetEvidencias : Evidencias[] = [];
  constructor(private fb: FormBuilder, public dialog: MatDialog, private UsuarioNormalService: UsuarioNormalService,private aRouter: ActivatedRoute) {}


  miFormulario: FormGroup = this.fb.group({
    codigo      : ['', [Validators.required, Validators.minLength(3)]],

  });


  obtenerGetEvidencias(){
    this.UsuarioNormalService.obtenerGetEvidencias().subscribe(data =>{
     /*  console.log(data); */
      this.listaGetEvidencias = data;
      this.listaGetEvidencias.reverse()
      
    })
  }
  

  ngOnInit(): void {
    this.obtenerGetEvidencias();
  }
  guardar(){
    /*     console.log(this.miFormulario.value); */
        console.log("asdfghjklñ");
      }
}
