import { DatePipe } from '@angular/common';
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
import { evidenciaDirector } from 'src/app/interfaces/director/evidenciaDirector.interface';
import { DirectorService } from 'src/app/services/director.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-crear-evidencias',
  templateUrl: './crear-evidencias.component.html',
  styleUrls: ['./crear-evidencias.component.css']
})
export class CrearEvidenciasComponent implements OnInit {

  FormularioDirector!: FormGroup;
  listaEvidenciaDirector: evidenciaDirector[] = [];

  listaUnidad: Unidad[] = [];
  listatiposRegistros: tipoRegistros[] = [];
  listaAmbitoAcademico: ambitoAcademico[] = [];
  listaCriterio: Criterio[] = [];
  listaProcesos: Procesos[] = [];
  listaAmbitoGeografico: ambitoGeografico[] = [];
  listaDebilidad: Debilidad[] = [];

  fechaActual: string | null;
  disabledInput: boolean = false;

  titulo = 'Ver evidencias';
  id: string;
  estadoEvidencia: boolean = false;
  estadoEvidenciaActualizar: boolean = false;

  obtenerNombreFolio: string = ''; 
   id_rol : number = 0;
  constructor(private fb: FormBuilder, private directorService: DirectorService, private dp: DatePipe,
    private router: Router, private activatedRouter: ActivatedRoute) {



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

    this.fechaActual = this.dp.transform(new Date(), 'yyyy-MM-dd');

    this.FormularioDirector = this.fb.group({

      numero_folio                  : [, [Validators.required, Validators.minLength(3)]],
      fecha_evidencia               : [, [Validators.required, Validators.minLength(3)]],
      numero_mejoras                : [, [Validators.required, Validators.minLength(3)]],
      descripcion                   : [, [Validators.required, Validators.minLength(3)]],
      resultado                     : [, [Validators.required, Validators.minLength(3)]],
      almacenamiento                : [, [Validators.required, Validators.minLength(3)]],
      unidades_personas_evidencias  : [, [Validators.required, Validators.minLength(3)]],
      palabra_clave                 : [, [Validators.required, Validators.minLength(3)]],
      nombre_corto_evidencia        : [, [Validators.required, Validators.minLength(3)]],
      fk_id_usuario                 : [,],
      fk_id_debilidades             : ['', Validators.required],
      fk_id_unidad                  : ['', Validators.required],
      fk_id_criterios               : ['', Validators.required],
      fk_id_registros               : ['', Validators.required],
      fk_id_procesos                : ['', Validators.required],
      fk_id_estado                  : [, Validators.required],
      fk_id_ambito_academico        : ['', Validators.required],
      fk_id_ambito_geografico       : ['', Validators.required],
      id_rol :['', {disabled: this.id_rol === 5}]
    });

    this.id = this.activatedRouter.snapshot.paramMap.get('id')!;
    if (!this.id) {
      this.FormularioDirector.reset({
        numero_folio    : letras_aleatorias(largoCadena, rangoLetras),
        fecha_evidencia : this.fechaActual,
        fk_id_estado    : '1',
        fk_id_usuario   : '64'

      })
    }

  }

  ngOnInit(): void {

    /*   this.FormularioDirector.reset({
        fk_id_usuario   :'51'
        
      }) */
    this.editarId();

    this.obtenerUnidad();
    this.obtenerTiposRegistros();
    this.obtenerAmbitoAcademico();
    this.obtenerCriterio();
    this.obtenerProcesos();
    this.obtenerAmbitoGeografico();
    this.obtenerDebilidad();

  }

  cityNameDisable() {
    if (this.id_rol !== 5){
    this.FormularioDirector.disable();
  }else{
    this.FormularioDirector.enable();
  }
}

  Volver() {

    if (this.id_rol == 5){
      this.router.navigate(['usuario-director/mis-evidencias']);
    }else{
   
    this.router.navigate(['usuario-director/todas-evidencias']);
  }
}

  campoNoEsValido(campo: string) {
    return this.FormularioDirector.controls[campo].errors &&
      this.FormularioDirector.controls[campo].touched
  }

  guardar() {

    if (this.FormularioDirector.invalid) {
      this.FormularioDirector.markAllAsTouched();
      Swal.fire('Error', "Lene los campos de forma correcta", 'error');
      return;
    }

    if (this.id) {
      this.directorService.actualizarEvidencia(this.id, this.FormularioDirector.value)
        .subscribe({
          next: data => {
            Swal.fire('Actualizacion Exitosa', "Datos Actualizados Con Exito ", 'info');
            this.router.navigate(['usuario-director/todas-evidencias']);
            this.estadoEvidenciaActualizar = true;
          }, error: error => {
            Swal.fire('Error', "Error al Actualizar", 'error');
            console.log(error)
          }
        })

    } else {

      this.directorService.guardarEvidencia(this.FormularioDirector.value).subscribe(
        {
          next: resp => {
            console.log("sdasdfghjklñskasskdksjdksdjskld")

            Swal.fire('exitosamente', "Datos guardados satisfactoriamente", 'success');
            this.router.navigate(['usuario-director/mis-evidencias']);
            this.FormularioDirector.reset();

          }, error: error => {
            Swal.fire('Error', "Error al ingresar, el codigo debe ser UNICO", 'error');
            console.log(error)
            /* console.log(this.miFormulario.value) */
          }
        })
    }
  }


  obtenerUnidad() {
    this.directorService.obtenerUnidad().subscribe((data: any) => {
      /*  console.log(data); */
      this.listaUnidad = data.resultado;

    })
  }

  obtenerTiposRegistros() {
    this.directorService.obtenertiposRegistros().subscribe(data => {
      /*  console.log(data); */
      this.listatiposRegistros = data;
      this.listatiposRegistros.reverse()

    })
  }

  obtenerAmbitoAcademico() {
    this.directorService.obtenerAmbitoAcademico().subscribe(data => {
      /*  console.log(data); */
      this.listaAmbitoAcademico = data;
      this.listaAmbitoAcademico.reverse()

    })
  }

  obtenerCriterio() {
    this.directorService.obtenerCriterio().subscribe(data => {
      /*  console.log(data); */
      this.listaCriterio = data;
      this.listaCriterio.reverse()
    })
  }


  obtenerProcesos() {
    this.directorService.obtenerProcesos().subscribe(data => {
      /*  console.log(data); */
      this.listaProcesos = data;
      this.listaProcesos.reverse()



    })
  }

  obtenerAmbitoGeografico() {
    this.directorService.obtenerAmbitoGeografico().subscribe(data => {
      /*  console.log(data); */
      this.listaAmbitoGeografico = data;
      this.listaAmbitoGeografico.reverse()

    })
  }

  obtenerDebilidad() {
    this.directorService.obtenerDebilidad().subscribe(data => {
      /*  console.log(data); */
  this.listaDebilidad = data;
      this.listaDebilidad.reverse()

    })
  }

  editarId() {

    if (this.id !== null) {

      this.estadoEvidencia = true;
      this.titulo = 'Editar Evidencia';
  
      this.directorService.obtenerEvidenciaId(this.id).subscribe({
        next: (data: any) => {
          console.log("La Fecha es es: ", data[0].fecha_evidencia)

          this.obtenerNombreFolio = data[0].numero_folio,
          this.fechaActual        = data[0].fecha_evidencia,
           this.id_rol = data[0].id_rol
          this.FormularioDirector.patchValue({
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
            fk_id_ambito_geografico      : data[0].fk_id_ambito_geografico

          })

        }, error: error => {
          console.log("EL ERROSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSsR ES: ", error)
        }
      })
    }
  }


}
