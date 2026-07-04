import { useEffect, useState } from "react";
import { getProducts } from "../../services/ProductService";
import ProductDetail from "../ProductDetail/ProductDetails";
import ProductCard from "../../components/ProductCard/ProductCard";
import styles from "../../styles/ProductListing.module.scss";

function ProductListing() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
                // console.log(data);
            } catch (err) {
                setError("Failed to fetch products")
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [])

    if (loading) return <div>Loading...</div>
    if (error) return <div>{error}</div>

    return (
        <div className={styles.page}>
            <h1> Product Listing</h1>
            <p>Total products: {products.length}</p>
            <div className={styles.productsGrid}>
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                    />
                ))}
            </div>
        </div>
    );
}

export default ProductListing;