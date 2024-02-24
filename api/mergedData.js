import { getSingleBook, getBooks, deleteBook } from './bookData';
import { getSingleAuthor, getAuthorBooks, getAuthors } from './authorData';

// for merged promises
const getBookDetails = async (firebaseKey) => { // the async keyword let's JS know this is asynchronous function (promise)
  const bookObject = await getSingleBook(firebaseKey); // await stops the code in this function and waits for the response. This is like using .then
  const authorObject = await getSingleAuthor(bookObject.author_id); // this function uses the data response from the bookObject

  return { ...bookObject, authorObject };
};

const getAuthorDetails = async (firebaseKey) => { // the async keyword let's JS know this is asynchronous function (promise)
  console.warn(firebaseKey);
  const authorObject = await getSingleAuthor(firebaseKey); // await stops the code in this function and waits for the response. This is like using .then
  const authorBooks = await getAuthorBooks(firebaseKey);
  console.warn(authorBooks);
  return { ...authorObject, books: authorBooks };
};

const deleteAuthorBooksRelationship = async (authorFirebaseKey) => {
  const authorBooks = await getAuthorBooks(authorFirebaseKey);
  const deleteBookPromises = await authorBooks.map((abObj) => deleteBook(abObj.firebaseKey));

  await Promise.all(deleteBookPromises).then(() => deleteAuthorBooksRelationship(authorFirebaseKey));
};

// TODO: STRETCH...SEARCH BOOKS
const searchStore = async (searchValue) => {
  const allBooks = await getBooks();
  const allAuthors = await getAuthors();
  const filteredBooks = await allBooks.filter((book) => (
    book.title.toLowerCase().includes(searchValue)
    || book.description.toLowerCase().includes(searchValue)));

  const filteredAuthors = await allAuthors.filter((author) => (
    author.first_name.toLowerCase().includes(searchValue)
    || author.last_name.toLowerCase().includes(searchValue)
    || author.email.toLowerCase().includes(searchValue)
  ));
  return { authors: filteredAuthors, books: filteredBooks };
};

export {
  getBookDetails,
  getAuthorDetails,
  searchStore,
  deleteAuthorBooksRelationship
};
