import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { BookService } from '../../Services/book.service';
import { GenreService } from '../../Services/genre.service';
@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.css']
})
export class CreateBookComponent implements OnInit {

  bookForm: FormGroup
  allGenre
  genreBook: Array<any> = []

  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookService,
    private genreService: GenreService
  ) { 
    this.getGenre()
    this.validator()
  }

  ngOnInit(): void {
  }

  validator(){
    this.bookForm = this.formBuilder.group({
      name: ['', Validators.required],
      author: ['', Validators.required],
      pageNumber: [''],
      publisher: ['', Validators.required],
      publicationDate: ['', Validators.required],
      genre: ['', Validators.required]
    })
  }

  saveBook(){
    if(this.bookForm.valid){
      this.bookService.createBook(this.bookForm.value).subscribe(
        (bookCreated) =>{
          alert('El libro se creó correctamente')
        },
        (error) => {
          console.error(error)
        }
      )
    }else{
      alert('Todos los campos deben estar llenos')
    }
  }

  getGenre(){
    this.genreService.getAll().subscribe(
      (genres) => {
        this.allGenre = genres
      },
      (error) => {
        console.error('Error ->', error)
      }
    )
  }

  saveGenre(event){
    if(this.genreBook.includes(event.target.value) ){
      const index = this.genreBook.indexOf(event.target.value)
      this.genreBook.splice(index, 1)
    }else{
      this.genreBook.push(event.target.value)
    }
    let valueInput : any = ''

    if(this.genreBook.length > 0){
      valueInput = this.genreBook
    }

    this.bookForm.get('genre').setValue(valueInput)
  }
}
