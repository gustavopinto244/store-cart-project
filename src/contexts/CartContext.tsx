/* eslint-disable react-refresh/only-export-components */

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
  type ReactNode,
} from 'react';
import type Product from '../types/Product';
import axios from '../api/axios';

export interface CartItem extends Product {
  quantity: number;
}

interface StorageItem {
  id: number;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
}

const CART_STORAGE_KEY = 'cart_items';

function loadStorage(): StorageItem[] {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

function saveStorage(items: StorageItem[]): void {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch {
    // localStorage full or unavailable
  }
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const initialStorage = loadStorage();
  const [storageItems, setStorageItems] = useState<StorageItem[]>(initialStorage);

  const [productMap, setProductMap] = useState<Map<number, Product>>(new Map());
  const [productsLoaded, setProductsLoaded] = useState(initialStorage.length === 0);

  const [toast, setToast] = useState<{ name: string; visible: boolean }>({
    name: '',
    visible: false,
  });
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (initialStorage.length === 0) return;

    let cancelled = false;

    axios
      .get('/products')
      .then((res) => {
        if (cancelled) return;
        if (res.data.success && Array.isArray(res.data.data)) {
          const map = new Map<number, Product>();
          for (const p of res.data.data as Product[]) {
            map.set(p.id, p);
          }
          setProductMap(map);
        }
        setProductsLoaded(true);
      })
      .catch(() => {
        if (!cancelled) {
          setProductsLoaded(true);
        }
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    saveStorage(storageItems);
  }, [storageItems]);

  const showToast = useCallback((name: string) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ name, visible: true });
    toastTimer.current = setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 3000);
  }, []);

  useEffect(() => {
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);

  const cartItems: CartItem[] = useMemo(() => {
    if (!productsLoaded || productMap.size === 0) return [];
    return storageItems
      .map((si) => {
        const product = productMap.get(si.id);
        if (!product) return null;
        return { ...product, quantity: si.quantity };
      })
      .filter((item): item is CartItem => item !== null);
  }, [storageItems, productMap, productsLoaded]);

  const addToCart = useCallback(
    (product: Product) => {
      setStorageItems((prev) => {
        const existing = prev.find((si) => si.id === product.id);
        if (existing) {
          return prev.map((si) =>
            si.id === product.id ? { ...si, quantity: si.quantity + 1 } : si,
          );
        }
        return [...prev, { id: product.id, quantity: 1 }];
      });
      setProductMap((prev) => {
        if (prev.has(product.id)) return prev;
        const next = new Map(prev);
        next.set(product.id, product);
        return next;
      });
      showToast(product.name);
    },
    [showToast],
  );

  const removeFromCart = useCallback((id: number) => {
    setStorageItems((prev) => prev.filter((si) => si.id !== id));
  }, []);

  const updateQuantity = useCallback((id: number, quantity: number) => {
    if (quantity < 1) {
      setStorageItems((prev) => prev.filter((si) => si.id !== id));
      return;
    }
    setStorageItems((prev) => prev.map((si) => (si.id === id ? { ...si, quantity } : si)));
  }, []);

  const clearCart = useCallback(() => {
    setStorageItems([]);
  }, []);

  const cartTotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.priceValue * item.quantity, 0),
    [cartItems],
  );

  const cartCount = useMemo(
    () => storageItems.reduce((sum, si) => sum + si.quantity, 0),
    [storageItems],
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
      }}
    >
      {children}
      <div className={`cart-toast${toast.visible ? ' cart-toast--visible' : ''}`}>
        <span>{toast.name} added to cart</span>
      </div>
    </CartContext.Provider>
  );
}

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
