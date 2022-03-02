import { get } from "lodash";
import cover from "../assets/images/cover.jpg";
import { getBookDescription } from "./getBookDescription.js";

export const displayBookList = (books, bookList) => {
  let html = "";

  /*funzione per ogni book*/
  books.map((book) => {
    /*se l'autore è inesistente ritorno come valore "Author Unknown"*/
    let authors = get(book, "authors", "Author Unknown");

    /*se il dato "authors" è un'array, quindi se esiste come dato, ritorno tutti i nomi degli autori separati
    da virgola + spazio. Se gli autori sono troppi (più di 4), ritorno solo i primi 4 + "and others"
    */
    if (Array.isArray(authors)) {
      if (authors.length <= 4) {
        authors = authors
          .map((author) => {
            return author.name;
          })
          .join(", ");
      } else {
        authors = `${authors[0].name}, ${authors[1].name}, ${authors[2].name}, ${authors[3].name} and others`;
      }
    }

    /*se il titolo è inesistente ritorno come valore "Title Unknown"*/
    let title = get(book, "title", "Title Unknown");

    let coverImage;

    /*Se l'immagine del libro esiste, la ritorno, altrimenti metto un'immagine di default*/
    if (book.cover_id) {
      coverImage = `https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`;
    } else {
      coverImage = cover;
    }

    /*faccio il display dei libri*/

    html += `
   
        <div class="book-container" data-id = "${book.key}">
            <div class="book-img">
            <img src= ${coverImage} />
            </div>
            <div class="info-book">
            <h2>Title: ${title}</h2>
            <p>Authors: ${authors}</p>
            <button class="description-btn">Read Description</button>
            </div>
        </div>
    `;
  });

  bookList.innerHTML = html;

  /*chiamo la funzione per visualizzare la descrizione di ogni libro*/
  getBookDescription();
};
