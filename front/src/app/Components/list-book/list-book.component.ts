import { Component, OnInit } from '@angular/core';
import { BookService  } from '../../Services/book.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-list-book',
  templateUrl: './list-book.component.html',
  styleUrls: ['./list-book.component.css']
})
export class ListBookComponent implements OnInit {
  allBooks: any;
  constructor(
    private bookService: BookService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.getAll()
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

  updateBook(book){
    localStorage.setItem(`book-${book._id}`, JSON.stringify(book))
    this.route.navigate([`/update-book/${book._id}`])
  }

}
