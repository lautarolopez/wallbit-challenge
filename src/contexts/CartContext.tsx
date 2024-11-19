import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { fetchProductById, fetchAllProducts } from "@/services/cart.service";
import { CartItem, Product } from "@/types";
import { ModeType } from "@/types/mode";
import { MODE } from "@/constants/mode";

interface CartContextData {
  cartItems: CartItem[];
  totalItems: number;
  totalCost: number;
  cartCreatedAt: Date | null;
  addProductToCart: (productId: number, quantity: number) => Promise<void>;
  removeProductFromCart: (productId: number) => void;
  updateProductQuantity: (productId: number, quantity: number) => void;
  emptyCart: () => void;
  mode: ModeType;
  toggleMode: () => void;
  products: Product[];
  loadingProducts: boolean;
}

interface CartProviderProps {
  children: React.ReactNode;
}

const CartContext = createContext<CartContextData | undefined>(undefined);

export const useCart = (): CartContextData => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

const loadCartFromStorage = (): CartItem[] => {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : [];
};

const saveCartToStorage = (cartItems: CartItem[]): void => {
  localStorage.setItem("cart", JSON.stringify(cartItems));
};

const loadCartCreatedAtFromStorage = (): Date | null => {
  const storedDate = localStorage.getItem("cartCreatedAt");
  return storedDate ? new Date(storedDate) : null;
};

const saveCartCreatedAtToStorage = (date: Date): void => {
  localStorage.setItem("cartCreatedAt", date.toISOString());
};

const loadModeFromStorage = (): ModeType => {
  const storedMode = localStorage.getItem("mode");
  return storedMode === MODE.JUNIOR ? MODE.JUNIOR : MODE.SENIOR;
};

const saveModeToStorage = (mode: ModeType): void => {
  localStorage.setItem("mode", mode);
};

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(loadCartFromStorage());
  const [cartCreatedAt, setCartCreatedAt] = useState<Date | null>(
    loadCartCreatedAtFromStorage(),
  );
  const [mode, setMode] = useState<ModeType>(loadModeFromStorage());

  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState<boolean>(false);
  const [hasFetchedProducts, setHasFetchedProducts] = useState<boolean>(false);

  useEffect(() => {
    saveCartToStorage(cartItems);
  }, [cartItems]);

  useEffect(() => {
    if (cartCreatedAt) {
      saveCartCreatedAtToStorage(cartCreatedAt);
    } else {
      localStorage.removeItem("cartCreatedAt");
    }
  }, [cartCreatedAt]);

  useEffect(() => {
    saveModeToStorage(mode);
  }, [mode]);

  useEffect(() => {
    if (mode === "junior" && !hasFetchedProducts) {
      fetchProducts();
      setHasFetchedProducts(true);
    }
  }, [mode, hasFetchedProducts]);

  const resetCartCreationDate = () => {
    const now = new Date();
    setCartCreatedAt(now);
    saveCartCreatedAtToStorage(now);
  };

  const addProductToCart = async (
    productId: number,
    quantity: number,
  ): Promise<void> => {
    try {
      if (cartItems.length === 0) {
        resetCartCreationDate();
      }

      const existingItem = cartItems.find((item) => item.id === productId);

      if (existingItem) {
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item.id === productId
              ? { ...item, quantity: item.quantity + quantity }
              : item,
          ),
        );
      } else {
        const productData = await fetchProductById(productId);

        const newCartItem: CartItem = {
          id: productData.id,
          title: productData.title,
          price: productData.price,
          image: productData.image,
          quantity,
        };

        setCartItems((prevItems) => [...prevItems, newCartItem]);
      }
    } catch (err) {
      console.error("Error adding product to cart:", err);
      toast.error("Ups! No se pudo agregar el producto al carrito.");
    }
  };

  const removeProductFromCart = (productId: number): void => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId),
    );

    if (cartItems.length === 1 && cartItems[0].id === productId) {
      setCartCreatedAt(null);
      localStorage.removeItem("cartCreatedAt");
    }
  };

  const updateProductQuantity = (productId: number, quantity: number): void => {
    if (quantity <= 0) {
      removeProductFromCart(productId);
    } else {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === productId ? { ...item, quantity } : item,
        ),
      );
    }
  };

  const emptyCart = (): void => {
    setCartItems([]);
    setCartCreatedAt(null);
    localStorage.removeItem("cart");
    localStorage.removeItem("cartCreatedAt");
  };

  const toggleMode = (): void => {
    setMode((prevMode) => (prevMode === "junior" ? "senior" : "junior"));
  };

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );
  const totalCost = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const fetchProducts = async () => {
    setLoadingProducts(true);
    try {
      const data = await fetchAllProducts();
      setProducts(data);
    } catch (error) {
      toast.error("No se pueden cargar los productos. Intentá como un senior.");
    } finally {
      setLoadingProducts(false);
    }
  };

  const contextValue: CartContextData = {
    cartItems,
    totalItems,
    totalCost,
    cartCreatedAt,
    addProductToCart,
    removeProductFromCart,
    updateProductQuantity,
    emptyCart,
    mode,
    toggleMode,
    products,
    loadingProducts,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};
