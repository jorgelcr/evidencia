import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';


import { ambitoAcademico } from '../interfaces/administrador/ambitoAcademico.interface';
import { ambitoGeografico } from '../interfaces/administrador/ambitoGeografico.interface';
import { Criterio } from '../interfaces/administrador/criterios.interface';
import { Debilidad } from '../interfaces/administrador/debilidad.interface';
import { Procesos } from '../interfaces/administrador/procesos.interface';
import { tipoRegistros } from '../interfaces/administrador/tiposRegistros.intefrace';
import { Unidad } from '../interfaces/administrador/unidad.inteface';
import { evidenciaDirector } from '../interfaces/director/evidenciaDirector.interface';

@Injectable({
  providedIn: 'root'
})
export class DirectorService {

  private urlBackend: string = environment.urlBackend;
  private _refresh$ = new Subject<void>()


  constructor(private http: HttpClient) { }

  get refresh$(){
    return this._refresh$;
  }

  /* ###################### UNIDADES #####################################################*/

  obtenerUnidad(): Observable<Unidad[]>{

    const url = `${ this.urlBackend}/director/unidad`;
    return this.http.get<Unidad[]>(url)
  }

  obtenertiposRegistros(): Observable<tipoRegistros[]>{

    const url = `${ this.urlBackend}/director/tiporegistro`;
    return this.http.get<tipoRegistros[]>(url)
  }
  obtenerAmbitoAcademico(): Observable<ambitoAcademico[]>{
  
    const url = `${ this.urlBackend}/director/ambitoacademico`;
    return this.http.get<ambitoAcademico[]>(url)
  }

  obtenerCriterio(): Observable<Criterio[]>{

    const url = `${ this.urlBackend}/director/criterio`;
    return this.http.get<Criterio[]>(url)
  }
  
  obtenerProcesos(): Observable<Procesos[]>{
  
    const url = `${ this.urlBackend}/director/proceso`;
    return this.http.get<Procesos[]>(url)
  }

  obtenerAmbitoGeografico(): Observable<ambitoGeografico[]>{
  
    const url = `${ this.urlBackend}/director/ambitogeografico`;
    return this.http.get<ambitoGeografico[]>(url)
  }

  obtenerDebilidad(): Observable<Debilidad[]>{

    const url = `${ this.urlBackend}/director/debilidad`;
    return this.http.get<Debilidad[]>(url)
  }

  guardarEvidencia(evidencia: evidenciaDirector): Observable<evidenciaDirector>{

    const url = `${ this.urlBackend}/director`;
    return this.http.post<evidenciaDirector>(url, evidencia)
    /* .    pipe(
      tap(() =>{
        this._refresh$.next();
      })
    ) */

  }


  
  obtenerEvidencias(): Observable<evidenciaDirector[]>{

    const url = `${ this.urlBackend}/ver-director/evidencias`;
    return this.http.get<evidenciaDirector[]>(url)
  }

  borrarEvidencia(id: string): Observable<evidenciaDirector>{

    const url = `${ this.urlBackend}/ver-director/`;
    return this.http.delete<evidenciaDirector>(url + id);
    /*   return this.http.delete<Unidad>(`${ url }/${id}`). */
  }

  obtenerEvidenciaId(id: string): Observable<evidenciaDirector>{

    const url = `${ this.urlBackend}/ver-director/${id}`;
    return this.http.get<evidenciaDirector>(url)
    }

  actualizarEvidencia(id: string, evidenciaDirector: evidenciaDirector): Observable<evidenciaDirector>{

      const url = `${ this.urlBackend}/ver-director/${id}`;
      return this.http.put<evidenciaDirector>(url, evidenciaDirector)
      /* .pipe(
        tap(() =>{
          this._refresh$.next();
        })
      ) */
}
}