import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../Services/storage.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  user
  constructor(
    private storageService: StorageService,
    private router : Router
  ) {
    this.storageService.auth$.subscribe(
      (userAuth) =>{
          this.user = userAuth
      }  
    )
   }

  ngOnInit(): void {
  }

  destroySession(){
    this.storageService.removeSession()
    this.router.navigate(['/'])
  }
}
