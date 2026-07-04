import { useCart } from "../../context/CartContext";
import { productVariants } from "../../data/productVariants";
import styles from "../../styles/CartDrawer.module.scss";

function CartDrawer() {
    const {
        cartItems,
        removeFromCart,
        updateQuantity,
        closeCart,
        isCartOpen,
    } = useCart();

    if (!isCartOpen) {
        return null;
    }

    const total = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <>
            <div
                className={styles.drawerBackdrop}
                onClick={closeCart}
            />

            <div className={styles.cartDrawer}>
                <div className={styles.drawerHeader}>
                    <h2>My Cart</h2>

                    <button onClick={closeCart}>
                        X
                    </button>
                </div>

                {cartItems.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <>
                        {cartItems.map((item) => {
                            const variant =
                                productVariants.sizes.find(
                                    (size) =>
                                        size.id === item.selectedSize
                                );

                            const stock =
                                variant?.stock || 0;

                            return (
                                <div
                                    key={`${item.id}-${item.selectedColor}-${item.selectedSize}`}
                                    className={styles.cartItem}
                                >
                                    <img
                                        className={styles.productImage}
                                        src={item.image}
                                        alt={item.title}
                                    />

                                    <div
                                        className={styles.itemDetails}
                                    >
                                        <h4>{item.title}</h4>

                                        <p>
                                            $
                                            {item.price.toFixed(
                                                2
                                            )}
                                        </p>

                                        <p>
                                            Color:{" "}
                                            {
                                                item.selectedColor
                                            }
                                        </p>

                                        <p>
                                            Size:{" "}
                                            {item.selectedSize.toUpperCase()}
                                        </p>

                                        <div
                                            className={
                                                styles.quantityControls
                                            }
                                        >
                                            <button
                                                disabled={item.quantity === 1}
                                                onClick={() =>
                                                    updateQuantity(
                                                        item.id,
                                                        item.selectedColor,
                                                        item.selectedSize,
                                                        "decrement"
                                                    )
                                                }
                                            >
                                                -
                                            </button>

                                            <span>
                                                {item.quantity}
                                            </span>

                                            <button
                                                disabled={
                                                    item.quantity >=
                                                    stock
                                                }
                                                onClick={() =>
                                                    updateQuantity(
                                                        item.id,
                                                        item.selectedColor,
                                                        item.selectedSize,
                                                        "increment"
                                                    )
                                                }
                                            >
                                                +
                                            </button>
                                        </div>

                                        {item.quantity >=
                                            stock &&
                                            stock > 0 && (
                                                <p>
                                                    Maximum
                                                    available stock
                                                    reached
                                                </p>
                                            )}

                                        <button
                                            className={
                                                styles.removeBtn
                                            }
                                            onClick={() =>
                                                removeFromCart(
                                                    item.id,
                                                    item.selectedColor,
                                                    item.selectedSize
                                                )
                                            }
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            );
                        })}

                        <div
                            className={styles.cartTotal}
                        >
                            <h3>
                                Total: $
                                {total.toFixed(2)}
                            </h3>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default CartDrawer;