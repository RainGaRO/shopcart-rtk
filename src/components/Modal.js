import { useDispatch } from "react-redux";
import { clearCart } from "../features/cart/cartSlice";
import { closeModal } from "../features/modal/modalSlice";

export const Modal = () => {
  const dispatch = useDispatch();

  const modalHandler = () => {
    dispatch(clearCart());
    dispatch(closeModal());
  };

  return (
    <aside className="modal-container">
      <div className="modal">
        <h4>Очистить корзину?</h4>
        <div className="btn-container">
          <button
            type="button"
            className="btn confirm-btn"
            onClick={modalHandler}
          >
            Да
          </button>
          <button
            type="button"
            className="btn clear-btn"
            onClick={() => dispatch(closeModal())}
          >
            Нет
          </button>
        </div>
      </div>
    </aside>
  );
};
