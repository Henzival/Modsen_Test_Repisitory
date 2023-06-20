import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/App.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import axios from 'axios';
import './Main.js';

const App = function() {
  const [book, setBook] = useState('');
  const [result, setResult] = useState([]);
  const [apiKey, setApiKey] = useState('AIzaSyABr3qUyULawkxgjZDk3HwgwdbwhImINDg');
  const [quantity, setQuantity] = useState('');
  const [count, setCount] = useState(0);

  const handleChange = (event) => {
    const book = event.target.value;
    setBook(book);
  }
  const handleSubmit = async(event) => {
    event.preventDefault();
    setCount(0);
    await axios.get('https://www.googleapis.com/books/v1/volumes?q='+book+'&key='+apiKey+'&maxResults=30')
    .then(data => {
      console.log(data);
      console.log(data.data.items);
      setResult(data.data.items);
      setQuantity(data);
    });
  }

  const handlePaginationPrev = async() => {
    if ((count - 30) < 0) {
      alert('This is the first page.');
    }
    else {
      setCount(count => count - 30);
      await axios.get('https://www.googleapis.com/books/v1/volumes?q='+book+'&key='+apiKey+'&maxResults=30'+'&startIndex='+count.toString())
      .then(data => {
      console.log(data);
      console.log(data.data.items);
      setResult(data.data.items);
    });
  }
}

  const handlePaginationNext = async() => {
    setCount(count => count + 30);
    if (book === '') {
      alert('Nothing was prompted.');
    }
    else {
      console.log(count)
      await axios.get('https://www.googleapis.com/books/v1/volumes?q='+book+'&key='+apiKey+'&maxResults=30'+'&startIndex='+count.toString())
      .then(data => {
      console.log(data);
      console.log(data.data.items);
      setResult(data.data.items);
    });
    }
  }
  return (
    <section className="header">
      <div className="navbar navbar-dark bg-dark">
        <div className="navbar_text">
          <h1 className="greeting">
            Search for books
          </h1>
        </div>
        <form action="#" id="navbar-search" className="navbar_search" onSubmit={handleSubmit}>
          <input type="search" name="search" className="input navbar_input" onChange={handleChange} placeholder="Enter your book name here..." />
          <span className="input-group-text border-0" id="search-addon" onClick={handleSubmit}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
          </svg>
          </span>
        </form>
        <div className='filtration'>
          <span className='categories-text'>Categories</span>
          <div className="dropdown dropdown-1">
            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              all
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a className="dropdown-item" href="#">Art</a>
              <a className="dropdown-item" href="#">Sci-fi</a>
              <a className="dropdown-item" href="#">History</a>
            </div>
          </div>
          <span className='sorting-text'>Sorting by</span>
          <div className="dropdown dropdown-2">
            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              relevance
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a className="dropdown-item" href="#">Most popular</a>
              <a className="dropdown-item" href="#">Newest</a>
              <a className="dropdown-item" href="#">Name</a>
            </div>
          </div>
        </div> 
      </div>
      {result.length !== 0 ? <div className='result'> <h2 className="results">Found {quantity.data.totalItems} results</h2></div> : ''}
      <div className='cards'>
        {result.map((book, index) => (
          <a target='_blank' href={book.volumeInfo.previewLink} className='book-card' key={book.id}>
            <h3 className='book-category'>{book.volumeInfo.categories + ''}</h3>
            <img src={book.volumeInfo.imageLinks !== undefined ? book.volumeInfo.imageLinks.thumbnail : ''} alt={book.title} width={250} height={350}/>
            <h3 className='book-title'>{book.volumeInfo.title}</h3>            
            <h3 className='book-author'>{book.volumeInfo.authors + ''}</h3>
          </a>
      ))}
        </div>
        <div className='pagination'>
          <button className='pagination-button' onClick={handlePaginationPrev}>Previous page</button>
          <button className='pagination-button' onClick={handlePaginationNext}>Next page</button>
        </div>
    </section>
  );
}

export default App;
