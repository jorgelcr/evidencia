import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { map} from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { Unidad } from '../interfaces/unidad.inteface';
import { Usuario } from '../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

  private urlBackend: string = environment.urlBackend;
  private _refresh$ = new Subject<void>()


  constructor(private http: HttpClient) { }

  get refresh$(){
    return this._refresh$;
  }
/* ###################### UNIDADES #####################################################*/

  guardarUnidad(unidad: Unidad): Observable<Unidad>{

    const url = `${ this.urlBackend}/unidad`;
    return this.http.post<Unidad>(url, unidad).
    pipe(
      tap(() =>{
        this._refresh$.next();
      })
    )

  }

  obtenerUnidad(): Observable<any>{

    const url = `${ this.urlBackend}/unidad`;
    return this.http.get(url)
  }

  borrarUnidad(id: string): Observable<any>{

    const url = `${ this.urlBackend}/unidad/`;
    return this.http.delete(url + id);
    /*   return this.http.delete<Unidad>(`${ url }/${id}`). */
  }

  obtenerUnidadId(id: string){

    const url = `${ this.urlBackend}/unidad/${id}`;
    return this.http.get(url)
    }


  buscarUnidad(termino: string): Observable<any>{

    const url = `${ this.urlBackend}/unidad/${termino}`;
    return this.http.get(url )
    .pipe(
      map((resp: any) => resp.resultados
 
    ))
  }
/* ###################### CRITERIOS #####################################################*/

guardarCriterio(unidad: Unidad): Observable<Unidad>{

  const url = `${ this.urlBackend}/criterio`;
  return this.http.post<Unidad>(url, unidad).
  pipe(
    tap(() =>{
      this._refresh$.next();
    })
  )

}

obtenerCriterio(): Observable<any>{

  const url = `${ this.urlBackend}/criterio`;
  return this.http.get(url)
}

borrarCriterio(id: string): Observable<any>{

  const url = `${ this.urlBackend}/criterio/`;
  return this.http.delete(url + id);
  /*   return this.http.delete<Unidad>(`${ url }/${id}`). */
}

obtenerCriterioId(id: string){

  const url = `${ this.urlBackend}/criterio/${id}`;
  return this.http.get(url)
  }


buscarCriterio(termino: string): Observable<any>{

  const url = `${ this.urlBackend}/criterio/${termino}`;
  return this.http.get(url )
  .pipe(
    map((resp: any) => resp.resultados

  ))
}

/* ###################### Usuario #####################################################*/

obtenerRolUsuario(): Observable<any[]>{

  const url = `${ this.urlBackend}/usuario/rol`;
  return this.http.get<any[]>(url)
}

obtenerUnidadUsuario(): Observable<any[]>{

  const url = `${ this.urlBackend}/usuario/unidad`;
  return this.http.get<any[]>(url)
}

guardarUsuario(usuario: Usuario): Observable<Usuario>{

  const url = `${ this.urlBackend}/usuario`;
  return this.http.post<Usuario>(url, usuario).
  pipe(
    tap(() =>{
      this._refresh$.next();
    })
  )

}

}