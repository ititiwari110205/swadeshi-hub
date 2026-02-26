import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

const initialCategories = [
  { id: 1, name: "Kurta Pyjama", description: "Traditional Indian Kurta Pyjama for Men" },
  { id: 2, name: "Sherwani", description: "Royal Sherwanis for weddings and occasions" },
  { id: 3, name: "Nehru Jackets", description: "Classic Nehru Jackets to layer your ethnic wear" },
  { id: 4, name: "Dhoti Kurta", description: "Authentic Dhoti Kurta sets" }
];

const initialProducts = [
  {
    id: 1,
    name: "Regal Maroon Zardozi Sherwani",
    price: 18500,
    categoryId: 2,
    image: "https://image.pollinations.ai/prompt/Regal%20Maroon%20Silk%20Sherwani%20Indian%20Groom%20fashion?width=800&height=1000&nologo=true",
    description: "An incredibly luxurious raw silk sherwani designed for the modern groomsman. Features heavy zardozi hand embroidery over a deep regal maroon base. Complete with a soft matching pyjama and pocket square.",
    features: ["100% Raw Silk Base", "Authentic Zardozi Craftsmanship", "Includes Soft Pyjama", "Dry Clean Specialist Only"],
    featured: true,
    stock: 8
  },
  {
    id: 2,
    name: "Classic Ivory Cotton Silk Kurta Pyjama",
    price: 2899,
    categoryId: 1,
    image: "https://image.pollinations.ai/prompt/Classic%20Cream%20Kurta%20Pyjama%20Indian%20Men%20fashion?width=800&height=1000&nologo=true",
    description: "An essential staple for every Indian man’s wardrobe. This lightweight ivory cream kurta pyjama set blends premium cotton with pure silk for a subtle sheen and absolute comfort during long pujas and festivals.",
    features: ["Premium Cotton Silk Blend", "Comfortable Mandarin Collar", "Adjustable Drawstring Pyjama", "Gentle Hand Wash"],
    featured: true,
    stock: 35
  },
  {
    id: 3,
    name: "Golden Brocade Woven Nehru Jacket",
    price: 3950,
    categoryId: 3,
    image: "https://image.pollinations.ai/prompt/Golden%20Woven%20Nehru%20Jacket%20over%20white%20kurta%20Indian%20Men%20fashion?width=800&height=1000&nologo=true",
    description: "Elevate your basic kurta with this royal golden woven Nehru jacket. Structured for a sharp fit, featuring an intricate brocade weave and a comfortable satin inner lining.",
    features: ["Intricate Jacquard Brocade", "Smooth Satin Lining", "Classic Three-Pocket Design", "Dry Clean Recommended"],
    featured: true,
    stock: 22
  },
  {
    id: 4,
    name: "Haldi Special Mustard Dhoti Kurta",
    price: 5200,
    categoryId: 4,
    image: "https://image.pollinations.ai/prompt/Festive%20Yellow%20Dhoti%20Kurta%20Indian%20Men%20fashion?width=800&height=1000&nologo=true",
    description: "Perfectly curated for pre-wedding Haldi ceremonies. This bright mustard yellow cotton kurta comes paired with a highly comfortable ready-to-wear woven white dhoti lined with gold.",
    features: ["Breathable Pure Cotton", "Pre-stitched Ready Dhoti", "Vibrant Haldi Yellow", "Machine Washable on Delicate"],
    featured: false,
    stock: 12
  },
  {
    id: 5,
    name: "Midnight Blue Velvet Jodhpuri Suit",
    price: 22000,
    categoryId: 2,
    image: "https://image.pollinations.ai/prompt/Midnight%20Blue%20Velvet%20Sherwani%20Indian%20Groom%20fashion?width=800&height=1000&nologo=true",
    description: "Make a powerful statement at evening receptions. Crafted from ultra-premium midnight blue velvet, this Jodhpuri suit (Bandhgala) features subtle tonal floral embroidery on the collar and cuffs.",
    features: ["Imported Premium Velvet", "Tonal Handcrafted Motifs", "Includes Fitted Trousers", "Professional Dry Clean Only"],
    featured: true,
    stock: 5
  }
];

const initialSliders = [
  { id: 1, title: "The Royal Wedding Edit", subtitle: "Impeccably Handcrafted Sherwanis and Bandhgalas for the Modern Groom.", image: "https://image.pollinations.ai/prompt/Royal%20Indian%20Wedding%20Groom%20wearing%20Sherwani%20Palace%20background?width=1600&height=800&nologo=true", active: true },
  { id: 2, title: "Festive Elegance", subtitle: "Dapper Kurta Pyjamas that bring traditions to life.", image: "https://image.pollinations.ai/prompt/Group%20of%20Indian%20Men%20wearing%20Kurta%20Pyjama%20festive%20diwali%20background?width=1600&height=800&nologo=true", active: true }
];

export const AppProvider = ({ children }) => {
  const loadInitial = (key, defaultData) => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultData;
  };

  const [user, setUser] = useState(null); // null if not logged in, object if logged in
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState(() => loadInitial('swadeshi_products_v2', initialProducts));
  const [categories, setCategories] = useState(() => loadInitial('swadeshi_categories_v2', initialCategories));
  const [orders, setOrders] = useState(() => loadInitial('swadeshi_orders_v2', []));
  const [messages, setMessages] = useState(() => loadInitial('swadeshi_messages_v2', []));
  const [slides, setSlides] = useState(() => loadInitial('swadeshi_sliders_v2', initialSliders));
  const [loading, setLoading] = useState(false);

  // Sync back to local storage so admin and user panel share state if on same domain
  useEffect(() => localStorage.setItem('swadeshi_orders_v2', JSON.stringify(orders)), [orders]);
  useEffect(() => localStorage.setItem('swadeshi_messages_v2', JSON.stringify(messages)), [messages]);

  // Authentication
  const login = (email, password) => {
    // Mock login: admin@swadeshi.com = Admin, otherwise normal user
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === "admin@swadeshi.com" && password === "admin123") {
          const adminUser = { id: 1, name: "Admin", email, role: "admin", verified: true };
          setUser(adminUser);
          localStorage.setItem('user', JSON.stringify(adminUser));
          resolve(adminUser);
        } else if (password.length >= 6) {
          // Normal user authentication
          const normalUser = { id: Date.now(), name: email.split('@')[0], email, role: "user", verified: true };
          setUser(normalUser);
          localStorage.setItem('user', JSON.stringify(normalUser));
          resolve(normalUser);
        } else {
          reject(new Error("Invalid credentials"));
        }
      }, 1000);
    });
  };

  const signup = (userData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock sending verification email, auto verify for demo
        const newUser = { id: Date.now(), name: userData.name, email: userData.email, role: "user", verified: false };
        resolve(newUser);
      }, 1500);
    });
  };

  const verifyEmail = (email) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const verifiedUser = { id: Date.now(), name: email.split('@')[0], email, role: "user", verified: true };
        setUser(verifiedUser);
        localStorage.setItem('user', JSON.stringify(verifiedUser));
        resolve(verifiedUser);
      }, 1500);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setCart([]);
  };

  // Cart Management
  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(p => p.id === product.id);
      if (existing) {
        return prev.map(p => p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateCartQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
  };

  const clearCart = () => setCart([]);

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Orders
  const placeOrder = (orderDetails) => {
    const newOrder = {
      id: "ORD" + Date.now(),
      userId: user?.id || "guest",
      items: [...cart],
      total: getCartTotal(),
      address: orderDetails.address,
      paymentId: orderDetails.paymentId,
      status: "Pending", // Pending -> Processing -> Shipped -> Delivered
      date: new Date().toISOString()
    };
    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId, status) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
  };

  // Admin Entities Management
  const addProduct = (product) => setProducts([...products, { ...product, id: Date.now() }]);
  const updateProduct = (id, prod) => setProducts(products.map(p => p.id === id ? { ...p, ...prod } : p));
  const deleteProduct = (id) => setProducts(products.filter(p => p.id !== id));

  const addCategory = (category) => setCategories([...categories, { ...category, id: Date.now() }]);
  const updateCategory = (id, cat) => setCategories(categories.map(c => c.id === id ? { ...c, ...cat } : c));
  const deleteCategory = (id) => setCategories(categories.filter(c => c.id !== id));

  const sendMessage = (msg) => {
    setMessages(prev => [{ ...msg, id: Date.now(), date: new Date().toISOString() }, ...prev]);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  return (
    <AppContext.Provider value={{
      user, login, signup, verifyEmail, logout,
      cart, addToCart, removeFromCart, updateCartQuantity, clearCart, getCartTotal,
      products, setProducts, addProduct, updateProduct, deleteProduct,
      categories, setCategories, addCategory, updateCategory, deleteCategory,
      orders, placeOrder, updateOrderStatus,
      slides, setSlides,
      messages, sendMessage,
      loading, setLoading
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
