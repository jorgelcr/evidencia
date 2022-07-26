import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ambitoAcademico } from 'src/app/interfaces/administrador/ambitoAcademico.interface';
import { ambitoGeografico } from 'src/app/interfaces/administrador/ambitoGeografico.interface';
import { Criterio } from 'src/app/interfaces/administrador/criterios.interface';
import { Debilidad } from 'src/app/interfaces/administrador/debilidad.interface';
import { Procesos } from 'src/app/interfaces/administrador/procesos.interface';
import { tipoRegistros } from 'src/app/interfaces/administrador/tiposRegistros.intefrace';
import { Unidad } from 'src/app/interfaces/administrador/unidad.inteface';
import { Usuario } from 'src/app/models/usuario.model';
import { ResponsableService } from 'src/app/services/responsable.service';
import Swal from 'sweetalert2';
import { evidenciaResponsable } from '../../interfaces/responsable/evidenciaResponsable.interface';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-crear-evidencia',
  templateUrl: './crear-evidencia.component.html',
  styleUrls: ['./crear-evidencia.component.css']
})
export class CrearEvidenciaComponent implements OnInit {

  FormularioResponsable!: FormGroup;
  listaEvidenciaResponsable: evidenciaResponsable[] = [];

  listaUnidad: Unidad[] = [];
  listatiposRegistros: tipoRegistros[] = [];
  listaAmbitoAcademico: ambitoAcademico[] = [];
  listaCriterio: Criterio[] = [];
  listaProcesos: Procesos[] = [];
  listaAmbitoGeografico: ambitoGeografico[] = [];
  listaDebilidad: Debilidad[] = [];

  disabledInput: boolean = false;

  titulo = 'Ver evidencias';
  id: string;
  estadoEvidencia: boolean = false;
  estadoEvidenciaActualizar: boolean = false;
  fechaActual? : Date ;
  obtenerNombreFolio: string = ''; 
   id_rol : number = 0;
 public borrar: number = 1; 
 public borrar2: number = 2; 
  public usuario!  : Usuario  ; 
  constructor(private fb: FormBuilder, private responsableService: ResponsableService,
              private usuarioService: LoginService,  private router: Router, private activatedRouter: ActivatedRoute) {


    this.FormularioResponsable = this.fb.group({

      numero_folio                  : [{value: '', disabled: true}, [Validators.required, Validators.minLength(3)]],
      fecha_evidencia               : [{value: '', disabled: true}, [Validators.required, Validators.minLength(3)]],
      numero_mejoras                : [{value: '', disabled: true}, [Validators.required, Validators.minLength(3)]],
      descripcion                   : [{value: '', disabled: true}, [Validators.required, Validators.minLength(3)]],
      resultado                     : [{value: '', disabled: true}, [Validators.required, Validators.minLength(3)]],
      almacenamiento                : [{value: '', disabled: true}, [Validators.required, Validators.minLength(3)]],
      unidades_personas_evidencias  : [{value: '', disabled: true}, [Validators.required, Validators.minLength(3)]],
      palabra_clave                 : [{value: '', disabled: true}, [Validators.required, Validators.minLength(3)]],
      nombre_corto_evidencia        : [{value: '', disabled: true}, [Validators.required, Validators.minLength(3)]],
      fk_id_usuario                 : [{value: '', disabled: true},],
      fk_id_debilidades             : [{value: '', disabled: true}, Validators.required],
      fk_id_unidad                  : [{value: '', disabled: true}, Validators.required],
      fk_id_criterios               : [{value: '', disabled: true}, Validators.required],
      fk_id_registros               : [{value: '', disabled: true}, Validators.required],
      fk_id_procesos                : [{value: '', disabled: true}, Validators.required],
      fk_id_estado                  : [{value: '', disabled: true}, Validators.required],
      fk_id_ambito_academico        : [{value: '', disabled: true}, Validators.required],
      fk_id_ambito_geografico       : [{value: '', disabled: true}, Validators.required],
      rut                           : [{value: '', disabled: true}, Validators.required],
      correo_usuario                : [{value: '', disabled: true}, Validators.required],
      observaciones_responsable                : [{value: '', disabled: false}, [Validators.required, Validators.minLength(3)]],
      fk_id_usuario_responsable                : [{value: '', disabled: false}, Validators.required],
      correo_conectado               : [{value: '', disabled: true}, Validators.required],
      /*  id_rol :['', {disabled: this.id_rol === 5}] */
    });
    
    this.id = this.activatedRouter.snapshot.paramMap.get('id')!;
//console.log("AAAAAAAAAAAAAAAAAA", this.id )

    this.usuario = usuarioService.usuario!
console.log("EL USUARIO ES: ",this.usuario)
  }

  ngOnInit(): void {


    this.FormularioResponsable.patchValue({
     
      fk_id_usuario_responsable: this.usuario.rut, 
      correo_conectado: this.usuario.correo_usuario 
    })
    

    this.mostrarEvidenciasIdResponsable();
    this.obtenerUnidad();
    this.obtenerTiposRegistros();
    this.obtenerAmbitoAcademico();
    this.obtenerCriterio();
    this.obtenerProcesos();
    this.obtenerAmbitoGeografico();
    this.obtenerDebilidad();
  }
 
  formResponsabledisable() {

  /*   this.FormularioResponsable.disable();
    console.log("QQQQQQQQQQQQQQQQQQ")    */
   /*  this.FormularioResponsable.controls['observaciones_responsable'].enable(); */
    
}

campoNoEsValido(campo: string) {
  return this.FormularioResponsable.controls[campo].errors &&
    this.FormularioResponsable.controls[campo].touched
}

guardar(){

  if (this.id) {
    this.responsableService.actualizarAprobarEvidenciaResponsable(this.id, this.FormularioResponsable.value)
      .subscribe({
        next: data => {
          console.log( this.usuario.id_usuarios)
          Swal.fire(`La Evidencia ${this.id} Fue Aprobada`, "Evidencia Aprobada Con EXITO ", 'success');
          this.router.navigate(['usuario-responsable/ver-evidencias']);
                   
          this.FormularioResponsable.reset({
   
            fk_id_usuario_responsable: this.usuario.id_usuarios
          })
         /*  this.estadoEvidenciaActualizar = true; */
        }, error: error => {
          Swal.fire('Error', "Error al APROBAR LA EVIDENCIA", 'error');
          console.log(error)
        }
      })

  } 
}

rechazara(){

  if ( this.FormularioResponsable.invalid ){
    this.FormularioResponsable.markAllAsTouched();
    Swal.fire('Error', "Llene el campo observaciones Responsable", 'error');
console.log("asdfghjklñ");
    return;
  }

  if (this.id) {
   
    this.responsableService.actualizarRechazarEvidenciaResponsable(this.id, this.FormularioResponsable.value)
      .subscribe({
        next: data => {
          
          Swal.fire('Evidencia RECHAZADA', "Evidencia RECHAZADA con EXITO ", 'info');
          console.log("'Evidencia RECHAZADA', Evidencia RECHAZADA con EXITO , 'info'")
          this.router.navigate(['usuario-responsable/ver-evidencias']);
          this.FormularioResponsable.reset({
   
            fk_id_usuario_responsable: this.usuario.id_usuarios
          })
         /*  this.estadoEvidenciaActualizar = true; */
        }, error: error => {
          Swal.fire('Error', "Error al RECHAZAR LA EVIDENCIA", 'error');
          console.log(error)
        }
      })

  } 

}

  obtenerUnidad() {
    this.responsableService.obtenerUnidad().subscribe((data: any) => {
       console.log("DATSOS DE LA UNIDAD: ",data.resultado);
      this.listaUnidad = data.resultado;
      this.listaUnidad.reverse()
    })
  }

  obtenerTiposRegistros() {
    this.responsableService.obtenertiposRegistros().subscribe(data => {
      /*  console.log(data); */
      this.listatiposRegistros = data;
      this.listatiposRegistros.reverse()

    })
  }

  obtenerAmbitoAcademico() {
    this.responsableService.obtenerAmbitoAcademico().subscribe(data => {
       console.log(data);
      this.listaAmbitoAcademico = data;
      this.listaAmbitoAcademico.reverse()

    })
  }

  obtenerCriterio() {
    this.responsableService.obtenerCriterio().subscribe(data => {
      /*  console.log(data); */
      this.listaCriterio = data;
      this.listaCriterio.reverse()
    })
  }


  obtenerProcesos() {
    this.responsableService.obtenerProcesos().subscribe(data => {
      /*  console.log(data); */
      this.listaProcesos = data;
      this.listaProcesos.reverse()



    })
  }

  obtenerAmbitoGeografico() {
    this.responsableService.obtenerAmbitoGeografico().subscribe(data => {
      /*  console.log(data); */
      this.listaAmbitoGeografico = data;
      this.listaAmbitoGeografico.reverse()

    })
  }

  obtenerDebilidad() {
    this.responsableService.obtenerDebilidad().subscribe(data => {
      /*  console.log(data); */
  this.listaDebilidad = data;
      this.listaDebilidad.reverse()

    })
  }


  mostrarEvidenciasIdResponsable() {

    if (this.id !== null) {

      this.estadoEvidencia = true;
      this.titulo = 'Editar Evidencia';
  
      this.responsableService.obtenerEvidenciaIdResponsable(this.id).subscribe({
        next: (data: any) => {
         console.log("LOS DATOS SON: ",data)
          this.obtenerNombreFolio = data[0].numero_folio,
          this.fechaActual        = data[0].fecha_evidencia,
           this.id_rol            = data[0].id_rol
          this.FormularioResponsable.patchValue({
            numero_folio                 : data[0].numero_folio,
            fecha_evidencia              : data[0].fecha_evidencia,
            numero_mejoras               : data[0].numero_mejoras,
            descripcion                  : data[0].descripcion,
            resultado                    : data[0].resultado,
            almacenamiento               : data[0].almacenamiento,
            unidades_personas_evidencias : data[0].unidades_personas_evidencias,
            palabra_clave                : data[0].palabra_clave,
            nombre_corto_evidencia       : data[0].nombre_corto_evidencia,
            fk_id_debilidades            : data[0].fk_id_debilidades,
            fk_id_unidad                 : data[0].fk_id_unidad,
            fk_id_criterios              : data[0].fk_id_criterios,
            fk_id_registros              : data[0].fk_id_registros,
            fk_id_procesos               : data[0].fk_id_procesos,
            fk_id_estado                 : data[0].fk_id_estado,
            fk_id_ambito_academico       : data[0].fk_id_ambito_academico,
            fk_id_ambito_geografico      : data[0].fk_id_ambito_geografico,
            rut                          : data[0].rut,
            correo_usuario               : data[0].correo_usuario,
          })

        }, error: error => {
          console.log("EL ERROSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSsR ES: ", error)
        }
      })
    }
  }
}
