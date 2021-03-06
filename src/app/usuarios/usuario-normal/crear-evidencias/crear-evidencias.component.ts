import { CursorError } from '@angular/compiler/src/ml_parser/lexer';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
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
  public listaGetUsuario : Evidencias[] = [];
  public listaGetUnidad : any[] = [];
  public listaGetRegistro : any[] = [];
  public listaGetAmbitoAcademico : any[] = [];
  public listaGetAmbitoGeografico : any[] = [];
  public listaGetProceso : any[] = [];
  public listaGetDebilidad : any[] = [];

  public usuarios = {
    id_usuarios: ''
  }

  
  

  constructor(private fb: FormBuilder, public dialog: MatDialog, private UsuarioNormalService: UsuarioNormalService,private aRouter: ActivatedRoute, private router: Router) {

    function letras_aleatorias(largoCadena: number, letra: string) {

      let text = "";
      for (let i = 0; i < largoCadena; i++) {
        text += letra.charAt(Math.floor(Math.random() * letra.length));
        if (i === 4 || i === 7) {
          let text1 = "-"
          text = text.concat(text1.toString());
          /*  console.log(text," :el texto es: ") */

        }
      }
      /*  console.log("ssssss: ",text) */
      return text;
    }
    let rangoLetras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const largoCadena = 10;
    letras_aleatorias(largoCadena, rangoLetras);

      this.formularioEvidencias = this.fb.group({
        nombre_cliente                : ['pedro', Validators.required],
        e_correo_usuario              : ['hpdroh@gmail.com', Validators.required],
        fk_id_usuario                 : ['41', Validators.required],
        fk_id_debilidades             : ['', Validators.required],
        fk_id_unidad                  : ['', Validators.required],
        fk_id_criterios               : ['', Validators.required], 
        fk_id_registros               : ['', Validators.required],
        fk_id_procesos                : ['', Validators.required],
        fk_id_estado                  : ['1', Validators.required],
        fk_id_ambito_academico        : ['', Validators.required],
        fk_id_ambito_geografico       : ['', Validators.required],
        numero_folio                  : letras_aleatorias(largoCadena, rangoLetras),
        numero_mejoras                : ['', Validators.required],
        descripcion                   : ['', Validators.required],
        resultado                     : ['', Validators.required],
        almacenamiento                : ['', Validators.required],
        unidades_personas_evidencias  : ['', Validators.required],
        palabra_clave                 : ['', Validators.required],
        nombre_corto_evidencia        : ['', Validators.required],
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
    this.obtenerGetAmbitoGeografico();
    this.obtenerGetCriterio();
    this.obtenerGetProceso();
    this.obtenerGetDebilidad();
    
  }

  guardarevidencia(){

    const EVIDENCIAS: GuardarEvidencias = {
      nombre_cliente: this.formularioEvidencias.get('nombre_cliente')?.value,
      e_correo_usuario: this.formularioEvidencias.get('e_correo_usuario')?.value,
      fk_id_usuario: this.formularioEvidencias.get('fk_id_usuario')?.value,
      fk_id_debilidades: this.formularioEvidencias.get('fk_id_debilidades')?.value,
      fk_id_unidad: this.formularioEvidencias.get('fk_id_unidad')?.value,
      fk_id_criterios: this.formularioEvidencias.get('fk_id_criterios')?.value,
      fk_id_registros: this.formularioEvidencias.get('fk_id_registros')?.value,
      fk_id_procesos: this.formularioEvidencias.get('fk_id_procesos')?.value,
      fk_id_estado: this.formularioEvidencias.get('fk_id_estado')?.value,
      fk_id_ambito_academico: this.formularioEvidencias.get('fk_id_ambito_academico')?.value,
      fk_id_ambito_geografico: this.formularioEvidencias.get('fk_id_ambito_geografico')?.value,
      numero_folio: this.formularioEvidencias.get('numero_folio')?.value,
      numero_mejoras: this.formularioEvidencias.get('numero_mejoras')?.value,
      descripcion: this.formularioEvidencias.get('descripcion')?.value,
      resultado: this.formularioEvidencias.get('resultado')?.value,
      almacenamiento: this.formularioEvidencias.get('almacenamiento')?.value,
      unidades_personas_evidencias: this.formularioEvidencias.get('unidades_personas_evidencias')?.value,
      palabra_clave: this.formularioEvidencias.get('palabra_clave')?.value,
      nombre_corto_evidencia: this.formularioEvidencias.get('nombre_corto_evidencia')?.value,
    }

    console.log(EVIDENCIAS);
    this.UsuarioNormalService.guardarEvidencia(EVIDENCIAS).subscribe(data => {
      Swal.fire('exitosamente', "Datos guardados satisfactoriamente", 'success');
      this.router.navigate(['/usuario-normal/ver-evidencias']);
    }, error => {
      console.log(error);
      Swal.fire('Error', "No se ha podido guardar los datos", 'error');
      this.formularioEvidencias.reset();
    });

    
    
  }
  
  obtenerGetUsuario(){
    this.UsuarioNormalService.obtenerGetUsuario('HPDROH@GMAIL.COM','12345').subscribe(data =>{
      console.log(data); 
      this.listaGetUsuario = data;
      //this.usuarios = data.nombres_usuario;
      console.log(data.nombres_usuario);
      //this.listaGetUnidad.reverse()
      //console.log(this.listaGetUsuario);
      
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

  obtenerGetAmbitoGeografico(){
    this.UsuarioNormalService.obtenerGetAmbitoGeografico().subscribe(data =>{
     /*  console.log(data); */
      this.listaGetAmbitoGeografico = data;
      this.listaGetAmbitoGeografico.reverse()
      
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
