import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { login } from '../interfaces/login/login.interface';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  private urlBackend: string = environment.urlBackend;

  public  usuario? : Usuario;
  constructor(private http: HttpClient) { }

     
      login(login: login): Observable<login>{

        const url = `${ this.urlBackend}/login`;
        return this.http.post<login>(url, login)
        .pipe(
          tap((resp: any) =>{
            console.log("LA RESPUESA ES: ",resp);

            const {id_usuarios, rut, nombres_usuario, correo_usuario } = resp.elusuarioes[0]
            this.usuario = new Usuario( id_usuarios, rut, nombres_usuario, correo_usuario)
            this.usuario.imprimirUsuario();
          })
        )
    
      }
    }
  

