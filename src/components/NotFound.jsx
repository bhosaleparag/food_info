import React from 'react';
import notFoundImg from '../assets/notFound.png';

export default function NotFound() {
  return (
    <div className="not-found">
      <img src={notFoundImg} alt="No results found" />
      <h2>No Results Found</h2>
      <p>Try adjusting your search or filters to find what you're looking for.</p>
    </div>
  );
} 