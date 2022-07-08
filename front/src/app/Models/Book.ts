import { Genre } from './Genre';

export interface Book{
    id: String,
    name: String,
    author: String,
    pageNumber: Number,
    publisher: String,
    publicationDate: Date,
    genre: Array<String>;
}