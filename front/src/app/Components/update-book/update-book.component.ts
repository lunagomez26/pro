import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { BookService } from '../../Services/book.service';
import { GenreService } from '../../Services/genre.service';
import * as moment from 'moment';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css']
})

export class UpdateBookComponent implements OnInit {
  allBooks: any;
  bookForm: FormGroup;
  allGenre
  genreBook: Array<any> = []
  idBook
  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookService,
    private genreService: GenreService,
    private route: Router,
    private routeParams: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getAll()
  }

  validator(){
    this.idBook = this.routeParams.snapshot.paramMap.get('id')
    let storageBook = localStorage.getItem(`book-${this.idBook}`)
    let dataBook = JSON.parse(storageBook)

    /** Se guardan los generos que tiene el libro en la variable genreBook  */
    dataBook.genre.forEach(genre => {
        this.genreBook.push(genre._id)
    });

    const date = moment(dataBook.publicationDate).format('YYYY-MM-DD')

    this.bookForm = this.formBuilder.group({
      name: [dataBook.name, Validators.required],
      author: [dataBook.author, Validators.required],
      pageNumber: [dataBook.pageNumber],
      publisher: [dataBook.publisher, Validators.required],
      publicationDate: [date, Validators.required],
      genre: [this.genreBook, Validators.required]
    })
  }

  saveBook(){
    if (this.bookForm.valid){
      this.bookService.updateBook(this.bookForm.value, this.idBook).subscribe(
        (bookCreated) => {
          alert('El libro se modificó correctamente')
          this.route.navigate(['/'])
        },
        (error) => {
          console.error('Error -> ', error)
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

  getAll(){
    this.bookService.getAll().subscribe(
      (books) => {
         this.allBooks = books
      },
      (error) => {
        console.error('Error -> ', error)
      }
    )
  }

  saveGenre(event){
    console.log(event.target.value)
    if( this.genreBook.includes(event.target.value) ){
      const index = this.genreBook.indexOf(event.target.value)
      this.genreBook.splice(index, 1)
    }else{
      this.genreBook.push(event.target.value)
    }

    let valueInput: any = ''
    if(this.genreBook.length > 0){
      valueInput = this.genreBook
    }

    this.bookForm.get('genre').setValue(valueInput)
  }
  
  

}
