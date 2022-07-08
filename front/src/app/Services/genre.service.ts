import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Genre } from '../Models/Genre';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  apiURL:String = 'https://keycodebookluna.herokuapp.com';

  constructor(
    private http: HttpClient
  ) { }

  createGenre(formData){
    return this.http.post<Genre>(`${this.apiURL}/genre/create`, formData);
  }

  getAll(){
    return this.http.get(`${this.apiURL}/genre/getAll`)
  }

}
