import axios from "axios";
import { displayBookList } from "./displayBookList.js";

export const getBookList = async (e, loader) => {
  const bookList = document.getElementById("book-item");

  e.preventDefault();

  const input = e.target.querySelector("#search-input");
  const searchTerm = input.value.trim();

  /*se il valore dell'input è vuoto, non faccio la richiesta API*/
  if (!searchTerm) return;

  try {
    /*Alla chiamata API pulisco la searchbox dal precedente input value*/
    input.value = "";
    /* ... mostro il loader*/
    loader.hidden = false;
    /*...rimuovo la classe notFound, nel caso ci fosse da precedenti ricerche*/
    bookList.classList.remove("notFound");
    /*... e pulisco l'interfaccia dai precedenti libri in display, nel caso ce ne fossero da precedenti ricerche*/
    bookList.innerHTML = "";

    /*creo un messaggio di errore da far vedere all'utente se il termine cercato non esiste in database*/
    let notFoundError = `Book with the subject's name of <span>${searchTerm}</span> not found`;

    const url = `https://openlibrary.org/subjects/${searchTerm}.json`;

    const response = await axios.get(url);

    if (response) {
      /*ricerca andata a buon fine: nascondo il loader*/
      loader.hidden = true;

      /* se l'array di libri è vuoto faccio il display di notFoundError*/
      if (response.data.work_count === 0) {
        bookList.classList.add("notFound");
        bookList.innerHTML = notFoundError;

        return;
      }

      /*...diversamente, chiamo la funzione per fare il display dei libri*/
      let books = response.data.works;

      displayBookList(books, bookList);
    }
  } catch (error) {
    /*ricerca fallita: nascondo il loader*/
    loader.hidden = true;
    /*...aggiungo la classe notFound*/
    bookList.classList.add("notFound");
    /* e faccio il display dell'errore*/
    bookList.innerHTML = error.response.data.message;
  }
};
