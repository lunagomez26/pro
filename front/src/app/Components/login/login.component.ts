import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../Services/user.service';
import { StorageService } from '../../Services/storage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private strorageService: StorageService,
    private router : Router
  ) { 
    this.validator()
  }

  ngOnInit(): void {
  }

  validator(){
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  login(){
    if(this.loginForm.valid){
        this.userService.login(this.loginForm.value).subscribe(
          (dataUser) =>{
            this.strorageService.saveToken(dataUser['token'])
            const infoUser = this.strorageService.dataUser()
            if(infoUser.role == 'Admin'){
              this.router.navigate(['/create-book'])
            }else{
              this.router.navigate(['/list-book'])
              //console.log(dataUser['token']) 
            }
            
          },
          (error) =>{
            console.error('Error -> ', error.error.message)
          }
        )
    }else{
      alert('Debes llenar todos los campos.')
    }
  }
}
