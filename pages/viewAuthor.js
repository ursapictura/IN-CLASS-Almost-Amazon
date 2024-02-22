import clearDom from '../utils/clearDom';
import renderToDOM from '../utils/renderToDom';

const viewAuthor = (obj) => {
  clearDom();

  let domString = `
    <h5>${obj.first_name} ${obj.last_name} ${obj.favorite ? '<span class="badge bg-danger"><i class="fa fa-heart" aria-hidden="true"></i></span>' : ''}</h5>
    Author Email: <a href="mailto:${obj.email}">${obj.email}</a>
    <hr>`;

  obj.books.forEach((book) => {
    domString += `
      <div class="mt-5 d-flex flex-wrap">
        <div class="d-flex flex-column">
          <img src=${book.image} alt=${book.title} style="width: 300px;">
          <div class="mt-5">
            <i id="edit-book-btn--${book.firebaseKey}" class="fas fa-edit btn btn-info"></i>
            <i id="delete-book--${book.firebaseKey}" class="btn btn-danger fas fa-trash-alt"></i>
          </div>
        </div>
      </div>
    `;
  });

  renderToDOM('#view', domString);
};

export default viewAuthor;
