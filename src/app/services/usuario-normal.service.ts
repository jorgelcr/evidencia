import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { map} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { GuardarEvidencias } from '../interfaces/usuario-normal/evidencias.interface';


@Injectable({
    providedIn: 'root'
  })
  export class UsuarioNormalService {
  
    private urlBackend: string = environment.urlBackend;
    private _refresh$ = new Subject<void>()
  
  
    constructor(private http: HttpClient) { }
  
    get refresh$(){
      return this._refresh$;
    }

  
  /* ###################### Evidencias #####################################################*/
  
  obtenerEvidencias(): Observable<any>{
  
    const url = `${ this.urlBackend}/evidencias`;
    return this.http.get(url)
  }
  

  /* ###################### Obtener Get Usuario #####################################################*/
  
  obtenerGetUsuario(): Observable<any>{
  
    const url = `${ this.urlBackend}/getusuario/usuario`;
    return this.http.get(url)
  }
  
  /* ###################### Obtener Get Unidad #####################################################*/
  
  obtenerGetUnidad(): Observable<any>{
  
    const url = `${ this.urlBackend}/getunidad/unidad`;
    return this.http.get(url)
  }

  /* ###################### Obtener Get Registro #####################################################*/
  
  obtenerGetRegistro(): Observable<any>{
  
    const url = `${ this.urlBackend}/getregistro/registro`;
    return this.http.get(url)
  }
  
  /* ###################### Obtener Get Ambito Academico #####################################################*/
  
  obtenerGetAmbitoAcademico(): Observable<any>{
  
    const url = `${ this.urlBackend}/getambitoacademico/academico`;
    return this.http.get(url)
  }
  
  /* ###################### Obtener Get Criterio #####################################################*/
  
  obtenerGetCriterio(): Observable<any>{
  
    const url = `${ this.urlBackend}/getcriterio/criterio`;
    return this.http.get(url)
  }

  /* ###################### Obtener Get Proceso #####################################################*/
  
  obtenerGetProceso(): Observable<any>{
  
    const url = `${ this.urlBackend}/getproceso/proceso`;
    return this.http.get(url)
  }
  
  /* ###################### Obtener Get Debilidad #####################################################*/
  
  obtenerGetDebilidad(): Observable<any>{
  
    const url = `${ this.urlBackend}/getdebilidad/debilidad`;
    return this.http.get(url)
  }

  /* ###################### GUARDADO DE EVIDENCIAS #####################################################*/

  /* ###################### evidencias #####################################################*/

  guardarEvidencia(evidencia: GuardarEvidencias): Observable<GuardarEvidencias>{

    const url = `${ this.urlBackend}/postevidencia`;
    return this.http.post<GuardarEvidencias>(url, evidencia).
    pipe(
      tap(() =>{
        this._refresh$.next();
      })
    )
  }
}