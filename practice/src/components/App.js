import React, {useState, useEffect, Component, useContext, createContext} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/App.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const App = function() {
  const [book, setBook] = useState('flowers');
  const [result, setResult] = useState([]);
  const [quantity, setQuantity] = useState('');
  const [count, setCount] = useState(0);
  const [reload, setReload] = useState();
  const [loading, setLoading] = useState(false);
  let [categ, setCateg] = useState([]);

const navigate = useNavigate();

const navigation = (title, category, authors, thumbnail, description, link, countState) => {
  navigate('/more', {
    state: {passedInfo: [title, category, authors, thumbnail, description, link, countState]} 
  });
}

  const handleChange = (event) => {
    const book = event.target.value;
    setBook(book);
  }
  const handleSubmit = async(event) => {
    event.preventDefault();
    setLoading(true);
    setCount(0);
    await axios.get('https://www.googleapis.com/books/v1/volumes?q='+book+'&key='+process.env.REACT_APP_API_KEY+'&maxResults=30')
    .then(data => {
      console.log(data);
      console.log(data.data.items);
      setResult(data.data.items);
      setQuantity(data);
      setLoading(false);
    });
  }


  const handlePaginationPrev = async() => {
    if ((count - 30) < 0) {
      alert('This is the first page.');
    }
    else {
      setLoading(true);
      setCount(count => count - 30);
      await axios.get('https://www.googleapis.com/books/v1/volumes?q='+book+'&key='+process.env.REACT_APP_API_KEY+'&maxResults=30'+'&startIndex='+count.toString())
      .then(data => {
      console.log(data);
      console.log(data.data.items);
      setResult(data.data.items);
      setLoading(false);
    });
  }
}

  const handlePaginationNext = async(event) => {
    if (book === '') {
      alert('Nothing was prompted.');
    }
    else {
      event.preventDefault();
      setLoading(true);
      setCount(count => count + 30);
      console.log(count)
      await axios.get('https://www.googleapis.com/books/v1/volumes?q='+book+'&key='+process.env.REACT_APP_API_KEY+'&maxResults=30'+'&startIndex='+count.toString())
      .then(data => {
      console.log(data);
      console.log(data.data.items);
      setResult(data.data.items);
      setLoading(false);
    });
    }
  }

  const sortBookNewest = (event) => {
    event.preventDefault();
    result.map(book => {
      if (book.volumeInfo.hasOwnProperty('publishedDate') === false) book.volumeInfo.publishedDate = '0000'; 
    });
    result.sort((a, b) => {
      return parseInt(b.volumeInfo.publishedDate.substring(0,4) - a.volumeInfo.publishedDate.substring(0,4))});
    setReload({});
    }

    const sortBookArt = (event) => {
      event.preventDefault();
      result.map((book, idx = result.length()) => {
          setCateg(book.volumeInfo.categories);
          console.log(categ);
          if (categ !== 'Art') {
          result.splice(idx, 1);
          idx--;
          }
      });
      console.log(result);
      setReload({});
    }
      const sortBookBiography = (event) => {
        event.preventDefault();
        result.map((book, idx = result.length()) => {
          setCateg(book.volumeInfo.categories);
          console.log(categ);
          if (categ !== 'Biography') {
          result.splice(idx, 1);
          idx--;
          }
      });
      console.log(result);
      setReload({});
        }

        const sortBookComputers = (event) => {
          event.preventDefault();
      result.map((book, idx = result.length()) => {
          setCateg(book.volumeInfo.categories);
          console.log(categ);
          if (categ !== 'Computers') {
          result.splice(idx, 1);
          idx--;
          }
      });
      console.log(result);
      setReload({});
          }

          const sortBookHistory = (event) => {
            event.preventDefault();
      result.map((book, idx = result.length()) => {
          setCateg(book.volumeInfo.categories);
          console.log(categ);
          if (categ !== 'History') {
          result.splice(idx, 1);
          idx--;
          }
      });
      console.log(result);
      setReload({});
            }
            const sortBookMedical = (event) => {
              event.preventDefault();
      result.map((book, idx = result.length()) => {
          setCateg(book.volumeInfo.categories);
          console.log(categ);
          if (categ !== 'Medical') {
          result.splice(idx, 1);
          idx--;
          }
      });
      console.log(result);
      setReload({});
                }

                const sortBookPoetry = (event) => {
                  event.preventDefault();
          result.map((book, idx = result.length()) => {
              setCateg(book.volumeInfo.categories);
              console.log(categ);
              if (categ !== 'Poetry') {
              result.splice(idx, 1);
              idx--;
              }
          });
          console.log(result);
          setReload({});
                    }
    const sortBookAll = (event) => {
        setLoading(true);
        event.preventDefault();
        axios.get('https://www.googleapis.com/books/v1/volumes?q='+book+'&key='+process.env.REACT_APP_API_KEY+'&maxResults=30'+'&startIndex='+count.toString()+'&orderBy=relevance')
        .then(data => {
        console.log(data);
        console.log(data.data.items);
        setResult(data.data.items);
        });
        setLoading(false);
        setReload({});
      }

    const sortBookName = (event) => {
      event.preventDefault();
      result.sort((a, b) => {
      return (a.volumeInfo.title.localeCompare(b.volumeInfo.title))});
      setReload({});
    }
      
      const sortBookPopularity = (event) => {
        setLoading(true);
        event.preventDefault();
        axios.get('https://www.googleapis.com/books/v1/volumes?q='+book+'&key='+process.env.REACT_APP_API_KEY+'&maxResults=30'+'&startIndex='+count.toString()+'&orderBy=relevance')
        .then(data => {
        console.log(data);
        console.log(data.data.items);
        setResult(data.data.items);
        });
        setLoading(false);
        setReload({});
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
              Filter
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a className="dropdown-item" onClick={sortBookAll}>All</a>
              <a className="dropdown-item" onClick={sortBookArt}>Art</a>
              <a className="dropdown-item" onClick={sortBookBiography}>Biography</a>
              <a className="dropdown-item" onClick={sortBookComputers}>Computers</a>
              <a className="dropdown-item" onClick={sortBookHistory}>History</a>
              <a className="dropdown-item" onClick={sortBookMedical}>Medical</a>
              <a className="dropdown-item" onClick={sortBookPoetry}>Poetry</a>
            </div>
          </div>
          <span className='sorting-text'>Sorting by</span>
          <div className="dropdown dropdown-2">
            <button className="btn btn-secondary dropdown-toggle dropdown-button-2" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Sort by
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a className="dropdown-item" onClick={sortBookPopularity}>Relevance</a>
              <a className="dropdown-item" onClick={sortBookNewest}>Newest</a>
              <a className="dropdown-item" onClick={sortBookName}>Name</a>
            </div>
          </div>
        </div> 
      </div>
      {result.length !== 0 ? <div className='result'> <h2 className="results">Found {quantity.data.totalItems} results</h2></div> : ''}
      <div className='cards'>
        {loading ? (
        <div className="loader-container">
      	  <div className="spinner">
          </div>
        </div>
      ) : result.map((book, index) => (
          <a target='_blank' className='book-card' key={book.id} onClick={() => {navigation(book.volumeInfo.title, book.volumeInfo.categories, book.volumeInfo.authors, book.volumeInfo.imageLinks.thumbnail, book.volumeInfo.description, book.volumeInfo.previewLink, count);}}>
            <h3 className='book-category'>{book.volumeInfo.categories + ''}</h3>
            <img src={book.volumeInfo.imageLinks !== undefined ? book.volumeInfo.imageLinks.thumbnail : ''} alt={book.title} width={250} height={350}/>
            <h3 className='book-title'>{book.volumeInfo.title}</h3>            
            <h3 className='book-author'>{book.volumeInfo.authors + ''}</h3>
            </a>
      ))
      }
        </div>
        <div className='pagination'>
          <button className='pagination-button-left' onClick={handlePaginationPrev}>Previous page</button>
          <button className='pagination-button' onClick={handlePaginationNext}>Next page</button>
        </div>
    </section>
  );
}

export default App;
