import axios from "axios";

export const getBookDescription = () => {
  const bookDetailsContent = document.querySelector(".book-details-content");
  const descriptionCloseBtn = document.getElementById("screen-close-btn");
  const descriptionBtn = document.querySelectorAll(".description-btn");

  /* Funzione che renderizza la descrizione del libro nell'html */
  const bookDescriptionModal = (bookData) => {
    console.log(bookData);
    let html = `
    <div class = "book-instruct">
    <h3>Description</h3>
        <p>${
          bookData.description
            ? bookData.description.value || bookData.description
            : "No description for this book"
        }</p>
    </div>
`;
    bookDetailsContent.innerHTML = html;
    bookDetailsContent.parentElement.classList.add("showDescription");
  };

  /*Chiamata API che passa la key del libro per avere i dati sulla descrizione*/
  const getDescription = async (e) => {
    let bookItem = e.target.parentElement.parentElement;

    try {
      let url = `https://openlibrary.org/${bookItem.dataset.id}.json`;

      const response = await axios.get(url);
      if (response.data) {
        bookDescriptionModal(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  /*Al click di ogni bottone per visualizzare la descrizione, chiamo le funzioni che fanno il display della descrizione*/
  descriptionBtn.forEach((btn) => {
    btn.addEventListener("click", getDescription);
  });

  /*Al click dell'icona close, chiudo il div della descrizione*/
  descriptionCloseBtn.addEventListener("click", () => {
    bookDetailsContent.parentElement.classList.remove("showDescription");
  });
};
