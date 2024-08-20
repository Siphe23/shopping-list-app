import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, updateItem } from '../features/shoppingSlice';

const AddItemForm = () => {
  const dispatch = useDispatch();
  const { itemToEdit } = useSelector((state) => state.shopping);
  const [item, setItem] = useState(itemToEdit?.item || '');
  const [price, setPrice] = useState(itemToEdit?.price || '');
  const [kg, setKg] = useState(itemToEdit?.kg || '');

  useEffect(() => {
    if (itemToEdit) {
      setItem(itemToEdit.item);
      setPrice(itemToEdit.price);
      setKg(itemToEdit.kg);
    }
  }, [itemToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = { item, price: parseFloat(price), kg: parseFloat(kg) };
    if (itemToEdit) {
      dispatch(updateItem(newItem));
    } else {
      dispatch(addItem(newItem));
    }
    setItem('');
    setPrice('');
    setKg('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Item name"
        value={item}
        onChange={(e) => setItem(e.target.value)}
      />
      <input
        type="number"
        placeholder="Price per kg (Rands)"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        type="number"
        placeholder="Quantity in kg"
        value={kg}
        onChange={(e) => setKg(e.target.value)}
      />
      <button type="submit">{itemToEdit ? 'Update' : 'Add'} Item</button>
    </form>
  );
};

export default AddItemForm;
