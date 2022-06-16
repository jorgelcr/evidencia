import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { map} from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { Unidad } from '../interfaces/administrador/unidad.inteface';
import { Usuario } from '../interfaces/administrador/usuario.interface';
import { Criterio } from '../interfaces/administrador/criterios.interface';
import { Procesos } from '../interfaces/administrador/procesos.interface';
import { tipoRegistros } from '../interfaces/administrador/tiposRegistros.intefrace';
import { ambitoAcademico } from '../interfaces/administrador/ambitoAcademico.interface';

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

/* ###################### tiposRegistros #####################################################*/

guardartiposRegistros(unidad: Unidad): Observable<tipoRegistros>{

  const url = `${ this.urlBackend}/tiporegistro`;
  return this.http.post<tipoRegistros>(url, unidad).
  pipe(
    tap(() =>{
      this._refresh$.next();
    })
  )

}

obtenertiposRegistros(): Observable<tipoRegistros[]>{

  const url = `${ this.urlBackend}/tiporegistro`;
  return this.http.get<tipoRegistros[]>(url)
}

borrartiposRegistros(id: string): Observable<tipoRegistros>{

  const url = `${ this.urlBackend}/tiporegistro/`;
  return this.http.delete<tipoRegistros>(url + id);
  /*   return this.http.delete<Unidad>(`${ url }/${id}`). */
}

obtenertiposRegistrosId(id: string): Observable<tipoRegistros>{

  const url = `${ this.urlBackend}/tiporegistro/${id}`;
  return this.http.get<tipoRegistros>(url)
  }

actualizartiposRegistros(id: string, unidad: tipoRegistros): Observable<tipoRegistros>{

  const url = `${ this.urlBackend}/tiporegistro/${id}`;
  return this.http.put<tipoRegistros>(url, unidad).
  pipe(
    tap(() =>{
      this._refresh$.next();
    })
  )
  }


buscartiposRegistros(termino: string): Observable<tipoRegistros[]>{

  const url = `${ this.urlBackend}/tiporegistro/${termino}`;
  return this.http.get<tipoRegistros[]>(url)
  .pipe(
    map((resp: any) => resp.resultado

  ))
}

/* ######################   AMBITO ACADEMICO  #####################################################*/

guardarAmbitoAcademico(ambitoAcademico: ambitoAcademico): Observable<ambitoAcademico>{

  const url = `${ this.urlBackend}/ambitoacademico`;
  return this.http.post<ambitoAcademico>(url, ambitoAcademico).
  pipe(
    tap(() =>{
      this._refresh$.next();
    })
  )

}

obtenerAmbitoAcademico(): Observable<ambitoAcademico[]>{

  const url = `${ this.urlBackend}/ambitoacademico`;
  return this.http.get<ambitoAcademico[]>(url)
}

borrarAmbitoAcademico(id: string): Observable<ambitoAcademico>{

  const url = `${ this.urlBackend}/ambitoacademico/`;
  return this.http.delete<ambitoAcademico>(url + id);
  /*   return this.http.delete<Unidad>(`${ url }/${id}`). */
}

obtenerAmbitoAcademicoId(id: string): Observable<ambitoAcademico>{

  const url = `${ this.urlBackend}/ambitoacademico/${id}`;
  return this.http.get<ambitoAcademico>(url)
  }

actualizarAmbitoAcademico(id: string, ambitoAcademico: ambitoAcademico): Observable<ambitoAcademico>{

  const url = `${ this.urlBackend}/ambitoacademico/${id}`;
  return this.http.put<ambitoAcademico>(url, ambitoAcademico).
  pipe(
    tap(() =>{
      this._refresh$.next();
    })
  )
  }


buscarAmbitoAcademico(termino: string): Observable<ambitoAcademico[]>{

  const url = `${ this.urlBackend}/ambitoacademico/${termino}`;
  return this.http.get<ambitoAcademico[]>(url)
  .pipe(
    map((resp: any) => resp.resultado

  ))
}

/* ###################### USUARIO #####################################################*/

guardarUsuario(usuario: Usuario): Observable<Usuario>{

  const url = `${ this.urlBackend}/usuario`;
  return this.http.post<Usuario>(url, usuario).
  pipe(
    tap(() =>{
      this._refresh$.next();
    })
  )

}

obtenerUsuario(): Observable<Usuario[]>{

  const url = `${ this.urlBackend}/usuario/usuario`;
  return this.http.get<Usuario[]>(url)
}

borrarUsuario(id: string): Observable<Usuario>{

  const url = `${ this.urlBackend}/usuario/`;
  return this.http.delete<Usuario>(url + id);
  /*   return this.http.delete<Unidad>(`${ url }/${id}`). */
}

obtenerUsuarioId(id: string): Observable<Usuario>{

  const url = `${ this.urlBackend}/usuario/${id}`;
  return this.http.get<Usuario>(url)
  }

actualizarUsuario(id: string, usuario: Usuario): Observable<Usuario>{

  const url = `${ this.urlBackend}/usuario/${id}`;
  return this.http.put<Usuario>(url, usuario).
  pipe(
    tap(() =>{
      this._refresh$.next();
    })
  )
  }


buscarUsuario(termino: string): Observable<Usuario[]>{

  const url = `${ this.urlBackend}/usuario/${termino}`;
  return this.http.get<Usuario[]>(url)
  .pipe(
    map((resp: any) => resp.resultado

  ))
}

obtenerUnidadIdUsuario(id: string): Observable<Unidad>{

  const url = `${ this.urlBackend}/usuario/`;
  return this.http.get<Unidad>(url)
  }

obtenerUnidadUsuario(): Observable<Unidad[]>{

  const url = `${ this.urlBackend}/usuario`;
  return this.http.get<Unidad[]>(url)
  }  
obtenerRolUsuario(): Observable<any[]>{

  const url = `${ this.urlBackend}/usuario/rol/rol`;
  return this.http.get<any[]>(url)
  }    
}