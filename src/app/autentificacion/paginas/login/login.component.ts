import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { login } from 'src/app/interfaces/login/login.interface';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  FormularioLogin!: FormGroup;
  listalogin: login[] = [];

  constructor(private router: Router, private loginServise: LoginService, private fb: FormBuilder
              , private activatedRouter: ActivatedRoute) { 

    this.FormularioLogin = this.fb.group({

      correo_usuario  : [, [Validators.required, Validators.minLength(3)]],
      contrasena      : [, [Validators.required, Validators.minLength(3)]],

    });

  }

  ngOnInit(): void {
  }

  login() {

    this.loginServise.login(this.FormularioLogin.value).subscribe(
      {
        next: (resp: any) => {
          
          if ( resp.resultado[0].login == 1 && resp.elusuarioes[0].fk_id_rol == 3){
              this.router.navigate(['usuario-responsable/ver-evidencias'])
              /* this.router.navigate(['usuario-director/mis-evidencias']); */
              /* console.log("sdasdfghjklñskasskdksjdksdjskld", resp[0].login) */
              console.log("sdasdfghjklñskasskdksjdksdjskld", resp.resultado[0].login)
              Swal.fire('exitosamente', "USER AND PASSWORD SUCCESS", 'success');
          }
         

        }, error: error => {
          Swal.fire('Error', "Error al ingresar, el codigo debe ser UNICO", 'error');
          console.log(error)
          /* console.log(this.miFormulario.value) */
        }
      })

  }

}
