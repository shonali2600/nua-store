import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";

import styles from "../../styles/ProductCard.module.scss";

function ProductCard({ product }) {
    const { addToCart } = useCart();

    return (
        <div className={styles.card}>
            <Link to={`/product/${product.id}`}>
                <img
                    className={styles.image}
                    src={product.image}
                    alt={product.title}
                />

                <h3 className={styles.title}>
                    {product.title}
                </h3>
            </Link>

            <p className={styles.price}>
                ${product.price}
            </p>

            <button
                className={styles.button}

            >
                <Link to={`/product/${product.id}`}>
                    View Details
                </Link>
            </button>
        </div>
    );
}

export default ProductCard;