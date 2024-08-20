// ShoppingForm.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItemToDb } from '../features/shoppingSlice';

const ShoppingForm = () => {
  const [item, setItem] = useState('');
  const [price, setPrice] = useState('');
  const [kg, setKg] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (item && price && kg) {
      dispatch(addItemToDb({ item, price: parseFloat(price), kg: parseFloat(kg) }));
      setItem('');
      setPrice('');
      setKg('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={item}
        onChange={(e) => setItem(e.target.value)}
        placeholder="Item"
      />
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price"
      />
      <input
        type="number"
        value={kg}
        onChange={(e) => setKg(e.target.value)}
        placeholder="Kg"
      />
      <button type="submit">Add Item</button>
    </form>
  );
};

export default ShoppingForm;
