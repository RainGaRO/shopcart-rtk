import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import "./App.css";
import { CartContainer } from "./components/CartContainer";
import { Modal } from "./components/Modal";
import { Navbar } from "./components/Navbar";
import { calculateTotals, getCartItems } from "./features/cart/cartSlice";

function App() {
  const dispatch = useDispatch();
  const { cartItems, isLoading, error } = useSelector((state) => state.cart);
  const { isOpen } = useSelector((state) => state.modal);

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems]);

  useEffect(() => {
    dispatch(getCartItems());
  }, []);

  if (isLoading) {
    return (
      <div className="loading">
        <h1>Загрузка...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1>{error}</h1>
      </div>
    );
  }

  return (
    <main className="App">
      {isOpen && <Modal />}
      <Navbar />
      <CartContainer />
    </main>
  );
}

export default App;
