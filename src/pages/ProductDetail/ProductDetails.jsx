import { useEffect, useState } from "react";
import { useParams,useSearchParams} from "react-router-dom";

import { useCart } from "../../context/CartContext";
import { productVariants } from "../../data/productVariants";
import styles from "../../styles/ProductDetail.module.scss";

function ProductDetail() {
  const { id } = useParams();

  const [searchParams, setSearchParams] =
    useSearchParams();

  const { addToCart, cartItems } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedColor, setSelectedColor] =
    useState(
      searchParams.get("color") ||
        productVariants.colors[0]
    );

  const [selectedSize, setSelectedSize] =
    useState(
      searchParams.get("size") ||
        productVariants.sizes[0].id
    );

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://fakestoreapi.com/products/${id}`
        );

        const data = await response.json();

        setProduct(data);
      } catch (err) {
        console.error(
          "Failed to fetch product",
          err
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    setSearchParams({
      color: selectedColor,
      size: selectedSize,
    });
  }, [
    selectedColor,
    selectedSize,
    setSearchParams,
  ]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!product) {
    return <h2>Product not found</h2>;
  }

  const selectedVariant =
    productVariants.sizes.find(
      (size) => size.id === selectedSize
    );

  const stock = selectedVariant?.stock || 0;

  const cartItem = cartItems.find(
    (item) =>
      item.id === product.id &&
      item.selectedColor === selectedColor &&
      item.selectedSize === selectedSize
  );

  const currentQuantityInCart =
    cartItem?.quantity || 0;

  const handleAddToCart = () => {
    if (currentQuantityInCart >= stock) {
      setError(
        `Only ${stock} item(s) available in stock`
      );

      return;
    }

    setError("");

    addToCart({
      ...product,
      selectedColor,
      selectedSize,
    });
  };

  return (
    <div className={styles.productDetail}>
      <div className={styles.productContainer}>
        <div>
          <img
            className={styles.productImage}
            src={product.image}
            alt={product.title}
          />
        </div>

        <div className={styles.productInfo}>
          <h1>{product.title}</h1>

          <p>
            <strong>Category:</strong>{" "}
            {product.category}
          </p>

          <h2>${product.price}</h2>

          <p>{product.description}</p>

          <h3>Select Color</h3>

          <div className={styles.variantButtons}>
            {productVariants.colors.map(
              (color) => (
                <button
                  key={color}
                  className={`${styles.variantButton} ${
                    selectedColor === color
                      ? styles.selectedVariant
                      : ""
                  }`}
                  onClick={() =>
                    setSelectedColor(color)
                  }
                >
                  {color}
                </button>
              )
            )}
          </div>

          <h3>Select Size</h3>

          <div className={styles.variantButtons}>
            {productVariants.sizes.map(
              (size) => (
                <button
                  key={size.id}
                  className={`${styles.variantButton} ${
                    selectedSize === size.id
                      ? styles.selectedVariant
                      : ""
                  }`}
                  onClick={() =>
                    setSelectedSize(size.id)
                  }
                >
                  {size.label}
                </button>
              )
            )}
          </div>

          <p>
            Selected Variant:
            {" "}
            {selectedColor}
            {" / "}
            {selectedSize.toUpperCase()}
          </p>

          <div className={styles.stockMessage}>
            {stock === 0 && (
              <p>Sold Out</p>
            )}

            {stock > 0 &&
              stock <= 3 && (
                <p>
                  Only {stock} left in stock
                </p>
              )}

            {stock > 3 && (
              <p>In Stock</p>
            )}
          </div>

          {currentQuantityInCart > 0 && (
            <p>
              Already in cart:{" "}
              {currentQuantityInCart}
            </p>
          )}

          {error && (
            <p className={styles.error}>
              {error}
            </p>
          )}

          <button
            disabled={
              stock === 0 ||
              currentQuantityInCart >= stock
            }
            onClick={handleAddToCart}
          >
            Add To Cart
          </button>

          {currentQuantityInCart >= stock &&
            stock > 0 && (
              <p>
                Maximum available stock
                reached
              </p>
            )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;