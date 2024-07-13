import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [list, setList] = useState([]);
  const [queryParams, setQueryParams] = useState({
    category: '',
    sort: '',
    search: ''
  });
 
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
    const storedList = localStorage.getItem('list');
    if (storedList) {
      setList(JSON.parse(storedList))
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData)); // Store user data in local storage
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user'); // Remove user data from local storage
  };
  const register = (userData) => {

    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData)); // Store user data in local storage
  };

  // Cart functions
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(item => item.id === product.id);
      let updatedCart;
      if (existingProduct) {
        updatedCart = prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        updatedCart = [...prevCart, { ...product, quantity: 1 }];
      }
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter(item => item.id !== productId);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const updateCartItem = (productId, quantity) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      );
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  // Wishlist functions
  const wishList = (product) => {
    setList((prevList) => {
      const existingProduct = prevList.find(item => item.id === product.id);
      let updatedWishList;
      if (existingProduct) {
        updatedWishList = prevList.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        updatedWishList = [...prevList, { ...product, quantity: 1 }];
      }
      localStorage.setItem('list', JSON.stringify(updatedWishList));
      return updatedWishList;
    });
  };

  const removeFromList = (productId) => {
    setList((prevList) => {
      const updatedWishList = prevList.filter(item => item.id !== productId);
      localStorage.setItem('list', JSON.stringify(updatedWishList));
      return updatedWishList;
    });
  };

  const updateListItem = (productId, quantity) => {
    setList((prevList) => {
      const updatedWishList = prevList.map(item =>
        item.id === productId ? { ...item, quantity } : item
      );
      localStorage.setItem('list', JSON.stringify(updatedWishList));
      return updatedWishList;
    });
  };

  const updateQueryParams = (newParams) => {
    setQueryParams((prevParams) => ({
      ...prevParams,
      ...newParams,
    }));
  };

  return (
    <AppContext.Provider value={{
      user,  login, logout, cart, list, addToCart, removeFromCart,
      updateCartItem, wishList, removeFromList, updateListItem, queryParams, updateQueryParams, register
    }}>
      {children}
    </AppContext.Provider>
  );
};
