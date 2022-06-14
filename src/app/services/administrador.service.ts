import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { map} from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { Unidad } from '../interfaces/administrador/unidad.inteface';
import { Usuario } from '../interfaces/administrador/usuario.interface';
import { Criterio } from '../interfaces/administrador/criterios.interface';
import { Procesos } from '../interfaces/administrador/procesos.interface';

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

  obtenerUnidad(): Observable<Unidad[]>{

    const url = `${ this.urlBackend}/unidad`;
    return this.http.get<Unidad[]>(url)
  }

  borrarUnidad(id: string): Observable<Unidad>{

    const url = `${ this.urlBackend}/unidad/`;
    return this.http.delete<Unidad>(url + id);
    /*   return this.http.delete<Unidad>(`${ url }/${id}`). */
  }

  obtenerUnidadId(id: string): Observable<Unidad>{

    const url = `${ this.urlBackend}/unidad/${id}`;
    return this.http.get<Unidad>(url)
    }

  actualizarUnidad(id: string, unidad: Unidad): Observable<Unidad>{

    const url = `${ this.urlBackend}/unidad/${id}`;
    return this.http.put<Unidad>(url, unidad).
    pipe(
      tap(() =>{
        this._refresh$.next();
      })
    )
    }
  

  buscarUnidad(termino: string): Observable<Unidad[]>{

    const url = `${ this.urlBackend}/unidad/${termino}`;
    return this.http.get<Unidad[]>(url)
    .pipe(
      map((resp: any) => resp.resultado
 
    ))
  }
/* ###################### CRITERIOS #####################################################*/

guardarCriterio(unidad: Criterio): Observable<Criterio>{

  const url = `${ this.urlBackend}/criterio`;
  return this.http.post<Criterio>(url, unidad).
  pipe(
    tap(() =>{
      this._refresh$.next();
    })
  )

}

obtenerCriterio(): Observable<Criterio[]>{

  const url = `${ this.urlBackend}/criterio`;
  return this.http.get<Criterio[]>(url)
}

borrarCriterio(id: string): Observable<Criterio>{

  const url = `${ this.urlBackend}/criterio/`;
  return this.http.delete<Criterio>(url + id);
  /*   return this.http.delete<Unidad>(`${ url }/${id}`). */
}

obtenerCriterioId(id: string): Observable<Criterio>{

  const url = `${ this.urlBackend}/criterio/${id}`;
  return this.http.get<Criterio>(url)
  }

  actualizarCriterio(id: string, criterio: Criterio): Observable<Criterio>{

    const url = `${ this.urlBackend}/criterio/${id}`;
    return this.http.put<Criterio>(url, criterio).
    pipe(
      tap(() =>{
        this._refresh$.next();
      })
    )
    }
buscarCriterio(termino: string): Observable<Criterio[]>{

  const url = `${ this.urlBackend}/criterio/${termino}`;
  return this.http.get<Criterio[]>(url)
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

/* ###################### Evidencias #####################################################*/

obtenerEvidencias(): Observable<any>{

  const url = `${ this.urlBackend}/evidencias`;
  return this.http.get(url)
}


/* ###################### Procesos #####################################################*/

guardarProcesos(proceso: Procesos): Observable<Procesos>{

  const url = `${ this.urlBackend}/proceso`;
  return this.http.post<Procesos>(url, proceso).
  pipe(
    tap(() =>{
      this._refresh$.next();
    })
  )

}

obtenerProcesos(): Observable<Procesos[]>{

  const url = `${ this.urlBackend}/proceso`;
  return this.http.get<Procesos[]>(url)
}

borrarProcesos(id: string): Observable<Procesos>{

  const url = `${ this.urlBackend}/proceso/`;
  return this.http.delete<Procesos>(url + id);
  /*   return this.http.delete<Unidad>(`${ url }/${id}`). */
}

obtenerProcesosId(id: string): Observable<Procesos>{

  const url = `${ this.urlBackend}/proceso/${id}`;
  return this.http.get<Procesos>(url)
  }

actualizarProcesos(id: string, proceso: Procesos): Observable<Procesos>{

  const url = `${ this.urlBackend}/proceso/${id}`;
  return this.http.put<Procesos>(url, proceso).
  pipe(
    tap(() =>{
      this._refresh$.next();
    })
  )
  }


buscarProcesos(termino: string): Observable<Procesos[]>{

  const url = `${ this.urlBackend}/proceso/${termino}`;
  return this.http.get<Procesos[]>(url)
  .pipe(
    map((resp: any) => resp.resultado

  ))
}


}