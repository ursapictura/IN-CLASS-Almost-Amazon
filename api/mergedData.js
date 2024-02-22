import { getSingleBook } from './bookData';
import { getSingleAuthor, getAuthorBooks } from './authorData';

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

export { getBookDetails, getAuthorDetails };
