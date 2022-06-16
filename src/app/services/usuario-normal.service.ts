import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { map} from 'rxjs/operators';
import { environment } from 'src/environments/environment';

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
  
  /* ###################### Obtener Get Evidencias #####################################################*/
  
  obtenerGetEvidencias(): Observable<any>{
  
    const url = `${ this.urlBackend}/evidencias`;
    return this.http.get(url)
  }

  /* ###################### Obtener Get Usuario #####################################################*/
  
  obtenerGetUsuario(): Observable<any>{
  
    const url = `${ this.urlBackend}/evidencias`;
    return this.http.get(url)
  }
  
  /* ###################### Obtener Get Unidad #####################################################*/
  
  obtenerGetUnidad(): Observable<any>{
  
    const url = `${ this.urlBackend}/evidencias`;
    return this.http.get(url)
  }

  /* ###################### Obtener Get Registro #####################################################*/
  
  obtenerGetRegistro(): Observable<any>{
  
    const url = `${ this.urlBackend}/evidencias`;
    return this.http.get(url)
  }
  
  /* ###################### Obtener Get Ambito Academico #####################################################*/
  
  obtenerGetAmbitoAcademico(): Observable<any>{
  
    const url = `${ this.urlBackend}/evidencias`;
    return this.http.get(url)
  }
  
  /* ###################### Obtener Get Criterio #####################################################*/
  
  obtenerGetCriterio(): Observable<any>{
  
    const url = `${ this.urlBackend}/getcriterio/criterios`;
    return this.http.get(url)
  }

  /* ###################### Obtener Get Proceso #####################################################*/
  
  obtenerGetProceso(): Observable<any>{
  
    const url = `${ this.urlBackend}/evidencias`;
    return this.http.get(url)
  }
  
  /* ###################### Obtener Get Debilidad #####################################################*/
  
  obtenerGetDebilidad(): Observable<any>{
  
    const url = `${ this.urlBackend}/evidencias`;
    return this.http.get(url)
  }

  }