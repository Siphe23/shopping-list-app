import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItemToDb } from '../features/shoppingSlice';

const ShoppingForm = () => {
  const [item, setItem] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (item && price && quantity) {
      dispatch(addItemToDb({ item, price: parseFloat(price), quantity: parseFloat(quantity) }));
      setItem('');
      setPrice('');
      setQuantity('');
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
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        placeholder="Quantity"
      />
      <button type="submit">Add Item</button>
    </form>
  );
};

export default ShoppingForm;
