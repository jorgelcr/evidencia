import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ambitoAcademico } from '../interfaces/administrador/ambitoAcademico.interface';
import { Criterio } from '../interfaces/administrador/criterios.interface';
import { Procesos } from '../interfaces/administrador/procesos.interface';
import { tipoRegistros } from '../interfaces/administrador/tiposRegistros.intefrace';
import { Unidad } from '../interfaces/administrador/unidad.inteface';
import { evidenciaResponsable } from '../interfaces/responsable/evidenciaResponsable.interface';
import { ambitoGeografico } from '../interfaces/administrador/ambitoGeografico.interface';
import { Debilidad } from '../interfaces/administrador/debilidad.interface';

@Injectable({
  providedIn: 'root'
})
export class ResponsableService {


  private urlBackend: string = environment.urlBackend;
  private _refresh$ = new Subject<void>()

  constructor(private http: HttpClient) { }

  get refresh$() {
    return this._refresh$;
  }

  obtenerEvidenciasResponsable(): Observable<evidenciaResponsable[]> {

    const url = `${this.urlBackend}/ver-responsable`;
    return this.http.get<evidenciaResponsable[]>(url)
  }

  obtenerEvidenciaIdResponsable(id: string): Observable<evidenciaResponsable> {

    const url = `${this.urlBackend}/guardarEvidenciasResponsable/id/${id}`;
    return this.http.get<evidenciaResponsable>(url)
  }
  obtenerUnidad(): Observable<Unidad[]> {

    const url = `${this.urlBackend}/guardarEvidenciasResponsable/unidad`;
    return this.http.get<Unidad[]>(url)
  }

 
  obtenertiposRegistros(): Observable<tipoRegistros[]>{

    const url = `${ this.urlBackend}/guardarEvidenciasResponsable/tiporegistro`;
    return this.http.get<tipoRegistros[]>(url)
  }
  
  obtenerAmbitoAcademico(): Observable<ambitoAcademico[]>{
  
    const url = `${ this.urlBackend}/guardarEvidenciasResponsable/ambitoacademico`;
    return this.http.get<ambitoAcademico[]>(url)
  }

  obtenerCriterio(): Observable<Criterio[]>{

    const url = `${ this.urlBackend}/guardarEvidenciasResponsable/criterio`;
    return this.http.get<Criterio[]>(url)
  }
  
  obtenerProcesos(): Observable<Procesos[]>{
  
    const url = `${ this.urlBackend}/guardarEvidenciasResponsable/proceso`;
    return this.http.get<Procesos[]>(url)
  }

  obtenerAmbitoGeografico(): Observable<ambitoGeografico[]>{
  
    const url = `${ this.urlBackend}/guardarEvidenciasResponsable/ambitogeografico`;
    return this.http.get<ambitoGeografico[]>(url)
  }

  obtenerDebilidad(): Observable<Debilidad[]>{

    const url = `${ this.urlBackend}/guardarEvidenciasResponsable/debilidad`;
    return this.http.get<Debilidad[]>(url)
  } 

  actualizarAprobarEvidenciaResponsable(id: string, evidenciaDirector: evidenciaResponsable): Observable<evidenciaResponsable>{

    const url = `${ this.urlBackend}/guardarEvidenciasResponsable/aprobar/${id}`;
    return this.http.put<evidenciaResponsable>(url, evidenciaDirector)
    /* .pipe(
      tap(() =>{
        this._refresh$.next();
      })
    ) */
}

actualizarRechazarEvidenciaResponsable(id: string, evidenciaDirector: evidenciaResponsable): Observable<evidenciaResponsable>{

  const url = `${ this.urlBackend}/guardarEvidenciasResponsable/rechazar/${id}`;
  return this.http.put<evidenciaResponsable>(url, evidenciaDirector)
  /* .pipe(
    tap(() =>{
      this._refresh$.next();
    })
  ) */
}
}
