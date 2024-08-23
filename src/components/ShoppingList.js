import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchShoppingList, deleteItemFromDb, setEditIndex } from '../features/shoppingSlice';
import EditItemForm from '../Redux/EditItemForm';

const ShoppingList = () => {
  const dispatch = useDispatch();
  const shoppingList = useSelector((state) => state.shopping.shoppingList);
  const status = useSelector((state) => state.shopping.status);
  const error = useSelector((state) => state.shopping.error);
  const editIndex = useSelector((state) => state.shopping.editIndex);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchShoppingList());
    }
  }, [status, dispatch]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      dispatch(deleteItemFromDb(id));
    }
  };

  const handleEdit = (index) => {
    dispatch(setEditIndex(index));
  };

  return (
    <div className="shopping-list">
      {status === 'loading' && <div className="loading">Loading...</div>}
      {status === 'failed' && <div className="error">{error}</div>}
      {status === 'succeeded' && shoppingList.length === 0 && (
        <div className="empty">No items found</div>
      )}
      {status === 'succeeded' && shoppingList.map((item, index) => (
        <div key={item.id} className="shopping-item">
          <p>{item.item} - R{item.price} - {item.quantity} units</p>
          <button onClick={() => handleEdit(index)}>Edit</button>
          <button onClick={() => handleDelete(item.id)}>Delete</button>
        </div>
      ))}
      {editIndex !== null && <EditItemForm />} {/* Render the edit form if an item is being edited */}
    </div>
  );
};

export default ShoppingList;
