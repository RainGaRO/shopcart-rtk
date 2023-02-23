import { CartItem } from "./CartItem";
import { useSelector, useDispatch } from "react-redux";
// import { clearCart } from "../features/cart/cartSlice";
import { openModal } from "../features/modal/modalSlice";

export const CartContainer = () => {
  const dispatch = useDispatch();
  const { cartItems, amount, total } = useSelector((state) => state.cart);

  if (amount < 1) {
    return (
      <section className="cart">
        <header>
          <h2>корзина</h2>
          <h4 className="empty-bag">сейчас пустая</h4>
        </header>
      </section>
    );
  }

  return (
    <section className="cart">
      <header>
        <h2>Корзина</h2>
      </header>
      <div>
        {cartItems.map((item) => {
          return <CartItem key={item.id} {...item} />;
        })}
      </div>
      <footer>
        <hr />
        <div className="cart-total">
          <h4>
            Общая сумма <span>${total.toFixed(2)}</span>
          </h4>
          <button
            className="btn clear-btn"
            onClick={() => dispatch(openModal())}
          >
            Очистить корзину
          </button>
        </div>
      </footer>
    </section>
  );
};
