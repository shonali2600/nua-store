import { useCart } from "../../context/CartContext";
import styles from "../../styles/Navbar.module.scss";

function Navbar() {
  const {
    cartItems,
    openCart
  } = useCart();

  const totalItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <nav className={styles.navbar}>
      <h2>Nua Store</h2>

      <button
        className={styles.cartButton}
        onClick={openCart}
      >
        Cart ({totalItems})
      </button>
    </nav>
  );
}

export default Navbar;