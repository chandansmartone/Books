// Books.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loading from './Loading/Loading';
import './Books.css'; 

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(''); 
  const booksPerPage = 14; 

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://softwium.com/api/books`);
        const start = (currentPage - 1) * booksPerPage;
        const end = start + booksPerPage;
        const slicedBooks = response.data.slice(start, end);
        setBooks(slicedBooks);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchBooks();
  }, [currentPage]);

  // Filter books based on search query
  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle search input change
  const handleSearchInputChange = event => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="books-container">
      <h1 className="page-title">Books</h1>
      <div className="search-container">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchInputChange}
          placeholder="Search books..."
          className="search-input"
        />
      </div>
      {loading && <Loading />}
      {error && <p className="error-message">Error: {error}</p>}
      <ul className="books-list">
        {filteredBooks.map(book => (
          <li key={book.id} className="book-item">
            <Link to={`/books/${book.id}`} className="book-link">
              <div className="book-detail">
                <h2 className="book-title">{book.title}</h2>
                <p className="book-author">by {book.authors.join(', ')}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <div className="pagination">
        <button
          onClick={() => setCurrentPage(prevPage => Math.max(prevPage - 1, 1))}
          disabled={currentPage === 1}
          className={currentPage === 1 ? "next-button disabled" : "next-button"}
        >
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button
          onClick={() => setCurrentPage(prevPage => prevPage + 1)}
          disabled={currentPage === 4}
          className={currentPage === 4 ? "next-button disabled" : "next-button"}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Books;
