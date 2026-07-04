import { createContext, useContext, useEffect, useState} from "react";

import { productVariants } from "../data/productVariants";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem("cartItems");

        if (!savedCart) {
            return [];
        }

        try {
            return JSON.parse(savedCart);
        } catch {
            return [];
        }
    });
    const [isCartOpen, setIsCartOpen] = useState(false);
    useEffect(() => {
        localStorage.setItem(
            "cartItems",
            JSON.stringify(cartItems)
        );
    }, [cartItems]);

    const addToCart = (product) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find(
                (item) => item.id === product.id &&
                    item.selectedColor === product.selectedColor &&
                    item.selectedSize === product.selectedSize
            );

            if (existingItem) {
                return prevItems.map((item) =>
                    item.id === product.id &&
                        item.selectedColor === product.selectedColor &&
                        item.selectedSize === product.selectedSize
                        ? {
                            ...item,
                            quantity: item.quantity + 1,
                        }
                        : item
                );
            }

            return [
                ...prevItems,
                {
                    ...product,
                    quantity: 1,
                },
            ];
        });
    };

    const removeFromCart = (
        id,
        selectedColor,
        selectedSize
    ) => {
        setCartItems((prevItems) =>
            prevItems.filter(
                (item) =>
                    !(
                        item.id === id &&
                        item.selectedColor === selectedColor &&
                        item.selectedSize === selectedSize
                    )
            )
        );
    };

    const updateQuantity = (
  id,
  selectedColor,
  selectedSize,
  action
) => {
  setCartItems((prevItems) =>
    prevItems.map((item) => {
      const isTargetItem =
        item.id === id &&
        item.selectedColor === selectedColor &&
        item.selectedSize === selectedSize;

      if (!isTargetItem) {
        return item;
      }

      const variant =
        productVariants.sizes.find(
          (size) =>
            size.id === selectedSize
        );

      const stock =
        variant?.stock || 0;

      if (action === "increment") {
        if (item.quantity >= stock) {
          return item;
        }

        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }

      return {
        ...item,
        quantity: Math.max(
          1,
          item.quantity - 1
        ),
      };
    })
  );
};

    const openCart = () => {
        setIsCartOpen(true);
    };

    const closeCart = () => {
        setIsCartOpen(false);
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                updateQuantity,
                isCartOpen,
                openCart,
                closeCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);