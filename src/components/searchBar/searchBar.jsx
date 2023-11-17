// SearchComponent.js
import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [orderNumber, setOrderNumber] = useState('');

  const handleInputChange = (e) => {
    setOrderNumber(e.target.value);
  };

  const handleSearch = () => {
    onSearch(orderNumber);
  };

  return (
    
    <div>
      <input
        type="text"
        placeholder="Número de orden"
        value={orderNumber}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch}>Buscar</button>
    </div>
  );
};

export default SearchBar;
