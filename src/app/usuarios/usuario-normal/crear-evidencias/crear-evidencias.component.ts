import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-evidencias',
  templateUrl: './crear-evidencias.component.html',
  styleUrls: ['./crear-evidencias.component.css']
})
export class CrearEvidenciasComponent implements OnInit {


  miFormulario: FormGroup = this.fb.group({
    codigo      : ['', [Validators.required, Validators.minLength(3)]],

  });


  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }
  guardar(){
    /*     console.log(this.miFormulario.value); */
        console.log("asdfghjklñ");
      }
}
