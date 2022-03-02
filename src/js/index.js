import "../styles/style.css";
import "../styles/animation.css";
import { getBookList } from "./getBookList.js";

window.addEventListener("DOMContentLoaded", () => {
  /*Nascondo il loader (lo rendo visibile solo durante la richiesta http)*/
  const loader = document.getElementById("load");
  loader.hidden = true;

  const form = document.querySelector(".form");

  /*Al submit del form chiamo la funzione per avere i dati del tipo di libri cercato*/
  form.addEventListener("submit", (e) => {
    getBookList(e, loader);
  });
});
