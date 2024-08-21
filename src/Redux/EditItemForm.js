import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editItemToDb, setEditIndex } from '../features/shoppingSlice';
import '../Redux/EditItemForm.css';


const EditItemForm = () => {
  const dispatch = useDispatch();
  const editIndex = useSelector((state) => state.shopping.editIndex);
  const shoppingList = useSelector((state) => state.shopping.shoppingList);
  const [item, setItem] = useState('');
  const [price, setPrice] = useState('');
  const [kg, setKg] = useState('');

  useEffect(() => {
    if (editIndex !== null && shoppingList[editIndex]) {
      const editItem = shoppingList[editIndex];
      setItem(editItem.item);
      setPrice(editItem.price);
      setKg(editItem.kg);
    }
  }, [editIndex, shoppingList]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updatedItem = {
        item,
        price: parseFloat(price),
        kg: parseFloat(kg),
      };
      dispatch(editItemToDb({ id: shoppingList[editIndex].id, updatedItem }));
      dispatch(setEditIndex(null)); // Clear edit index after updating
    }
  };

  return (
    <div className="edit-item-form">
      {editIndex !== null && (
        <form onSubmit={handleSubmit}>
          <label>
            Item:
            <input
              type="text"
              value={item}
              onChange={(e) => setItem(e.target.value)}
              required
            />
          </label>
          <label>
            Price:
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              step="0.01"
              required
            />
          </label>
          <label>
            Weight (kg):
            <input
              type="number"
              value={kg}
              onChange={(e) => setKg(e.target.value)}
              step="0.01"
              required
            />
          </label>
          <button type="submit">Update</button>
          <button type="button" onClick={() => dispatch(setEditIndex(null))}>Cancel</button>
        </form>
      )}
    </div>
  );
};

export default EditItemForm;
