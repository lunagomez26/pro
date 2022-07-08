import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../Services/storage.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private storageService: StorageService,
    private router : Router
  ){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.storageService.getToken() != null){
      route.data.only
      const infoUser = this.storageService.dataUser()
      if((infoUser.role == 'Admin' && route.data.only == 'Admin') || !route.data.only){
        return true
      }else{
        alert('No tienes Permisos para ingresar a esa página')
        this.router.navigate(['/'])
        return false
      }
    }else{
      this.router.navigate(['/login'])
      return false
    }
  }
}
