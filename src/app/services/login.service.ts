import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { login } from '../interfaces/login/login.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  private urlBackend: string = environment.urlBackend;

  constructor(private http: HttpClient) { }

     
      login(login: login): Observable<login>{

        const url = `${ this.urlBackend}/login`;
        return this.http.post<login>(url, login)
        /* .    pipe(
          tap(() =>{
            this._refresh$.next();
          })
        ) */
    
      }
    }
  

