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
  public listaGetCriterio : any[] = [];
  constructor(private fb: FormBuilder, public dialog: MatDialog, private UsuarioNormalService: UsuarioNormalService,private aRouter: ActivatedRoute) {}


  miFormulario: FormGroup = this.fb.group({
    codigo      : ['', [Validators.required, Validators.minLength(3)]],

  });


  ngOnInit(): void {
    //this.obtenerGetEvidencias();
    this.obtenerGetUsuario();
    this.obtenerGetUnidad();
    this.obtenerGetRegistro();
    this.obtenerGetCriterio();
    this.obtenerGetProceso();
    this.obtenerGetDebilidad();
  }
  

  obtenerGetUsuario(){
    this.UsuarioNormalService.obtenerGetUsuario().subscribe(data =>{
     /*  console.log(data); */
      this.listaGetEvidencias = data;
      this.listaGetEvidencias.reverse()
      
    })
  }

  obtenerGetUnidad(){
    this.UsuarioNormalService.obtenerGetUnidad().subscribe(data =>{
     /*  console.log(data); */
      this.listaGetEvidencias = data;
      this.listaGetEvidencias.reverse()
      
    })
  }

  obtenerGetRegistro(){
    this.UsuarioNormalService.obtenerGetRegistro().subscribe(data =>{
     /*  console.log(data); */
      this.listaGetEvidencias = data;
      this.listaGetEvidencias.reverse()
      
    })
  }

  obtenerGetAmbitoAcademico(){
    this.UsuarioNormalService.obtenerGetAmbitoAcademico().subscribe(data =>{
     /*  console.log(data); */
      this.listaGetEvidencias = data;
      this.listaGetEvidencias.reverse()
      
    })
  }

  obtenerGetCriterio(){
    console.log("klfjskldjf")
    this.UsuarioNormalService.obtenerGetCriterio().subscribe(data =>{
     /*  console.log(data); */
      this.listaGetCriterio = data;
      this.listaGetCriterio.reverse()
      
    })
  }

  obtenerGetProceso(){
    this.UsuarioNormalService.obtenerGetProceso().subscribe(data =>{
     /*  console.log(data); */
      this.listaGetEvidencias = data;
      this.listaGetEvidencias.reverse()
      
    })
  }

  obtenerGetDebilidad(){
    this.UsuarioNormalService.obtenerGetDebilidad().subscribe(data =>{
     /*  console.log(data); */
      this.listaGetEvidencias = data;
      this.listaGetEvidencias.reverse()
      
    })
  }
  

  
  guardar(){
    /*     console.log(this.miFormulario.value); */
        console.log("asdfghjklñ");
      }
}
