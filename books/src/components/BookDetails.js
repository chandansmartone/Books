// BookDetails.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Loading from './Loading/Loading';
import './BookDetails.css';

const BookDetails = () => {
  const { id } = useParams(); // Get the book ID from the URL params
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`https://softwium.com/api/books/${id}`);
        setBook(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="book-details">
    <h1>{book.title}</h1>
    <p>ISBN: {book.isbn}</p>
    <p>Page Count: {book.pageCount}</p>
    <p>Authors: {book.authors.join(', ')}</p>
  </div>
  );
};

export default BookDetails;
