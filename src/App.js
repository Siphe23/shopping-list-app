import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';

import ShoppingList from './components/ShoppingList';
import ShoppingForm from './components/ShoppingForm';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>Shopping List</h1>
        <ShoppingForm />
        <ShoppingList />
      </div>
    </Provider>
  );
}

export default App;
