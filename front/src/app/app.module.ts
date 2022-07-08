import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
/* 
  Routes => Me permite crear una constante de tipo Routes
  */
import { AppComponent } from './app.component';
import { MenuComponent } from './Components/menu/menu.component';
import { FooterComponent } from './Components/footer/footer.component';
import { HomeComponent } from './Components/home/home.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { LoginComponent } from './Components/login/login.component';
import { CreateBookComponent } from './Components/create-book/create-book.component';
import { ListBookComponent } from './Components/list-book/list-book.component';

import { AuthGuard } from './Guards/auth.guard';
import { CreateGenreComponent } from './Components/create-genre/create-genre.component';
import { UpdateBookComponent } from './Components/update-book/update-book.component';

const routesApp: Routes =[
  { path: '', component: HomeComponent },
  { path: 'sign-up', component: SignUpComponent},
  {path: 'login', component: LoginComponent},
  {path: 'create-book', canActivate: [AuthGuard], data:{only:'Admin'}, component: CreateBookComponent},
  {path:'list-book', canActivate: [AuthGuard], component: ListBookComponent},
  {path: 'create-genre', canActivate: [AuthGuard], data: {only: 'Admin'}, component: CreateGenreComponent},
  {path: 'update-book/:id', canActivate: [AuthGuard], data: {only: 'Admin'}, component: UpdateBookComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FooterComponent,
    HomeComponent,
    SignUpComponent,
    LoginComponent,
    CreateBookComponent,
    ListBookComponent,
    CreateGenreComponent,
    UpdateBookComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routesApp),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
