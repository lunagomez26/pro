import { Injectable } from '@angular/core';
import { BehaviorSubject  } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class StorageService {

    private auth = new BehaviorSubject<{}>(null);
    // auth$ -> Estamos indicando que es una variable reactiva.
    auth$ = this.auth.asObservable(); 
    // Indica que nos podemos suscribir, ósea escuchar los cambios de la variable.

  constructor() {
    this.auth.next(this.dataUser())
   }

  saveToken(token){
      localStorage.setItem('session', token)
      this.auth.next(this.dataUser())//Actualiza la variable auth
  }

  getToken(){
    return localStorage.getItem('session')
  }

  dataUser(){
    const token = this.getToken()
    if(!token){
      return null
    }

    let urlBase64 = token.split('.')[1]
    let b64 = urlBase64.replace('-', '+').replace('_', '/') // Facilitarle al algoritmo de encriptación la decodificación de la información.

    return JSON.parse(this.decodeData(b64))
  }

  decodeData(string){
    return decodeURIComponent( atob(string).split('').map(
      function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16) ).slice(-2)
      }
    ).join('') )
  }

  removeSession(){
    localStorage.removeItem('session')
    this.auth.next(null)
  }
}
