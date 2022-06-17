import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Evidencias, GuardarEvidencias } from 'src/app/interfaces/usuario-normal/evidencias.interface';
import { UsuarioNormalService } from 'src/app/services/usuario-normal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-evidencias',
  templateUrl: './crear-evidencias.component.html',
  styleUrls: ['./crear-evidencias.component.css']
})
export class CrearEvidenciasComponent implements OnInit {
  formularioEvidencias!: FormGroup;

  guardarEvidencias: GuardarEvidencias[]=[];

  public listaGetCriterio : any[] = [];
  public listaGetUsuario : any[] = [];
  public listaGetUnidad : any[] = [];
  public listaGetRegistro : any[] = [];
  public listaGetAmbitoAcademico : any[] = [];
  public listaGetProceso : any[] = [];
  public listaGetDebilidad : any[] = [];

  constructor(private fb: FormBuilder, public dialog: MatDialog, private UsuarioNormalService: UsuarioNormalService,private aRouter: ActivatedRoute) {
      this.formularioEvidencias = this.fb.group({
        nombre_cliente          : ['', Validators.required],
        fk_id_usuario           : ['', Validators.required],
        fk_id_debilidades       : ['', Validators.required],
        fk_id_unidad            : ['', Validators.required],
        fk_id_criterios         : ['', Validators.required], 
        fk_id_registros         : ['', Validators.required],
        fk_id_procesos          : ['', Validators.required],
        fk_id_estado            : ['', Validators.required],
        fk_id_ambito_academico  : ['', Validators.required],
      })
    }
    


  miFormulario: FormGroup = this.fb.group({
    codigo      : ['', [Validators.required, Validators.minLength(3)]],

  });

  /////guardar evidencias

  //this.UsuarioNormalService.guardarEvidencia(Evidenci).subscribe(data => {

  //})

  ////fin evidencias////

  


  ngOnInit(): void {
    //this.obtenerGetEvidencias();
    this.obtenerGetUsuario();
    this.obtenerGetUnidad();
    this.obtenerGetRegistro();
    this.obtenerGetAmbitoAcademico();
    this.obtenerGetCriterio();
    this.obtenerGetProceso();
    this.obtenerGetDebilidad();
    
  }

  guardarevidencia(){
    
  }
  

  obtenerGetUsuario(){
    this.UsuarioNormalService.obtenerGetUsuario().subscribe(data =>{
     /*  console.log(data); */
      this.listaGetUsuario = data;
      this.listaGetUsuario.reverse()
      
    })
  }

  obtenerGetUnidad(){
    this.UsuarioNormalService.obtenerGetUnidad().subscribe(data =>{
     /*  console.log(data); */
      this.listaGetUnidad = data;
      this.listaGetUnidad.reverse()
      
    })
  }

  obtenerGetRegistro(){
    this.UsuarioNormalService.obtenerGetRegistro().subscribe(data =>{
     /*  console.log(data); */
      this.listaGetRegistro = data;
      this.listaGetRegistro.reverse()
      
    })
  }

  obtenerGetAmbitoAcademico(){
    this.UsuarioNormalService.obtenerGetAmbitoAcademico().subscribe(data =>{
     /*  console.log(data); */
      this.listaGetAmbitoAcademico = data;
      this.listaGetAmbitoAcademico.reverse()
      
    })
  }

  obtenerGetCriterio(){
    this.UsuarioNormalService.obtenerGetCriterio().subscribe(data =>{
     /*  console.log(data); */
      this.listaGetCriterio = data;
      this.listaGetCriterio.reverse()
      
    })
  }

  obtenerGetProceso(){
    this.UsuarioNormalService.obtenerGetProceso().subscribe(data =>{
     /*  console.log(data); */
      this.listaGetProceso = data;
      this.listaGetProceso.reverse()
      
    })
  }

  obtenerGetDebilidad(){
    this.UsuarioNormalService.obtenerGetDebilidad().subscribe(data =>{
     /*  console.log(data); */
      this.listaGetDebilidad = data;
      this.listaGetDebilidad.reverse()
      
    })
  }
  
}
