import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import StatCard from './components/StatCard';
import { WeeklyEarnings, CommercialHub } from './components/Charts';
import OrderStore from './components/OrderStore';
import OrderTable from './components/OrderTable';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
import OrderList from './components/OrderList';
import SupplierList from './components/SupplierList';
import CustomerList from './components/CustomerList';
import Analytics from './components/Analytics';
import Invoice from './components/Invoice';
import Message from './components/Message';
import Help from './components/Help';
import Setting from './components/Setting';
import Logout from './components/Logout';
import Login from './components/Login';
import { MoreVertical } from 'lucide-react';
import { ThemeProvider, useTheme } from './context/ThemeContext';

function DashboardHome({ products }) {
  const uniqueProductCount = React.useMemo(() => {
    return new Set(products?.map(p => p.name?.trim().toLowerCase()) || []).size;
  }, [products]);
  const totalProducts = uniqueProductCount.toLocaleString();

  return (
    <div className="space-y-4 md:space-y-6 animate-in fade-in duration-500  md:px-6">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6">
        <div
          className="xl:col-span-2 p-6 md:p-10 rounded-[48px] shadow-premium border min-w-0 transition-all duration-500 hover:shadow-2xl"
          style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
        >
          <div className="flex justify-between items-center mb-10 px-2">
            <h3 className="text-xl md:text-2xl font-black tracking-[-0.02em]" style={{ color: 'var(--text-primary)' }}>Overview</h3>
            <button style={{ color: 'var(--text-muted)' }} className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-zinc-100 dark:hover:bg-white/5 transition-all">
              <MoreVertical size={20} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <StatCard title="Total Order" value="4,584" trend="up" trendValue="+8.5%" color="green" />
            <StatCard title="Cancel Order" value="124" trend="up" trendValue="+2.5%" color="red" />
            <StatCard title="Product" value={totalProducts} trend="up" trendValue="+2.5%" color="yellow" />
            <StatCard title="Refunds" value="84" trend="down" trendValue="-4.5%" color="green" />
          </div>
        </div>
        <div className="xl:col-span-1">
          <WeeklyEarnings />
        </div>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6">
        <div className="xl:col-span-2">
          <CommercialHub />
        </div>
        <div className="xl:col-span-1">
          <OrderStore />
        </div>
      </div>
      <div className="w-full">
        <OrderTable />
      </div>
    </div>
  );
}

function MainLayout({ onLogout }) {
  const { isDark } = useTheme();
  const [activeItem, setActiveItem] = useState('Dashboard');
  const [activeSubItem, setActiveSubItem] = useState('List Product');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);

  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('mentx_products');
    return saved ? JSON.parse(saved) : [
      { id: '#69SFF669', name: 'Apple MacBook Air laptop', price: '₹1050.00', sold: '1k', date: '10 Dec 2023', status: 'Low stock', category: "TV & Home Appliances", images: ['https://images.unsplash.com/photo-1611186871348-b1ec696e5237'] },
      { id: '#69SWE23', name: 'INBOOK Y2 PLUS Intel', price: '₹530.23', sold: '5k', date: '02 Nov 2023', status: 'In Stock', category: "Electronic Accessories", images: ['https://images.unsplash.com/photo-1588872657578-7efd1f1555ed'] },
      { id: '#2FSD8D4', name: 'Men Luxury Stainless Steel', price: '₹300.85', sold: '3k', date: '10 Nov 2023', status: 'In Stock', category: "Watches, Bags, Jewellery", images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30'] },
      { id: '#70SDF4F8', name: 'Stainless Steel Analog Watch', price: '₹800.00', sold: '1k', date: '26 Oct 2023', status: 'In Stock', category: "Watches, Bags, Jewellery", images: ['https://images.unsplash.com/photo-1524592094714-0f0654e20314'] },
      { id: '#70SD6D46', name: 'MI Airdots Wireless Earbuds', price: '₹620.00', sold: '1.5k', date: '17 Jun 2023', status: 'In Stock', category: "Electronic Accessories", images: ['https://images.unsplash.com/photo-1590658268037-6bf12165a8df'] },
      { id: '#72ERTW2', name: 'Sleeve Hoodie For Men', price: '₹2200.40', sold: '1.2k', date: '19 Aug 2023', status: 'In Stock', category: "Women's & Girls' Fashion", images: ['https://images.unsplash.com/photo-1556821840-3a63f95609a7'] },
      { id: '#70SDW25', name: 'Travel Bags For Boys & Girls', price: '₹2400.00', sold: '2k', date: '08 Jun 2023', status: 'In Stock', category: "Watches, Bags, Jewellery", images: ['https://images.unsplash.com/photo-1553062407-98eeb94c6a62'] },
    ];
  });

  useEffect(() => {
    localStorage.setItem('mentx_products', JSON.stringify(products));
  }, [products]);

  const handleAddProduct = (newProduct) => {
    setProducts(prev => [newProduct, ...prev]);
    setActiveSubItem('List Product');
  };

  const handleDeleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setActiveItem('Products');
    setActiveSubItem('Add Product');
  };

  const handleUpdateProduct = (updatedProduct) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    setEditingProduct(null);
    setActiveSubItem('List Product');
  };

  const handleImportProducts = (data) => {
    const newProducts = data.map(p => {
      const nameKey = Object.keys(p).find(k => k.toLowerCase().includes('name') || k.toLowerCase().includes('product'));
      let name = nameKey ? p[nameKey] : 'Imported Product';
      const priceKey = Object.keys(p).find(k => k.toLowerCase().includes('price') || k.toLowerCase().includes('cost'));
      let price = priceKey ? p[priceKey] : '₹0.00';
      return {
        id: `#${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
        name,
        price: typeof price === 'number' ? `₹${price.toFixed(2)}` : price,
        sold: '0',
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'Short', year: '4-digit' }),
        status: 'In Stock',
        category: p.category || "Uncategorized",
        images: p.image ? [p.image] : ['https://images.unsplash.com/photo-1523275335684-37898b6baf30']
      };
    });
    setProducts(prev => [...newProducts, ...prev]);
  };

  return (
    <div className="flex min-h-screen font-sans selection:bg-blue-500/30 overflow-x-hidden transition-colors duration-300" style={{ backgroundColor: 'var(--bg-root)', color: 'var(--text-primary)' }}>
      <Sidebar activeItem={activeItem} setActiveItem={setActiveItem} activeSubItem={activeSubItem} setActiveSubItem={setActiveSubItem} isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <main className={`flex-1 transition-all duration-300 min-h-screen flex flex-col min-w-0 max-w-full ${isSidebarOpen ? 'lg:ml-64' : 'lg:ml-64 ml-0'}`}>
        <Header onMenuClick={() => setIsSidebarOpen(true)} searchQuery={globalSearch} setSearchQuery={setGlobalSearch} />
        <div className="flex-1 p-3 md:p-6 min-w-0 max-w-full overflow-y-auto">
          {activeItem === 'Dashboard' ? <DashboardHome products={products} /> :
            activeItem === 'Products' && activeSubItem === 'List Product' ? (
              <ProductList products={products} searchQuery={globalSearch} setSearchQuery={setGlobalSearch} onAddProduct={() => { setEditingProduct(null); setActiveSubItem('Add Product'); }} onDelete={handleDeleteProduct} onEdit={handleEditClick} onImport={handleImportProducts} />
            ) : activeItem === 'Products' && activeSubItem === 'Add Product' ? (
              <AddProduct editingProduct={editingProduct} onSave={editingProduct ? handleUpdateProduct : handleAddProduct} onBack={() => { setEditingProduct(null); setActiveSubItem('List Product'); }} />
            ) : activeItem === 'Orders' ? (
              <OrderList onCreateOrder={() => { setActiveItem('Products'); setActiveSubItem('Add Product'); }} />
            ) : activeItem === 'People' && activeSubItem === 'Supplier List' ? (
              <SupplierList />
            ) : activeItem === 'People' && activeSubItem === 'Customer List' ? (
              <CustomerList />
            ) : activeItem === 'Analytics' ? (
              <Analytics />
            ) : activeItem === 'Invoice' ? (
              <Invoice />
            ) : activeItem === 'Message' ? (
              <Message />
            ) : activeItem === 'Help' ? (
              <Help />
            ) : activeItem === 'Setting' ? (
              <Setting />
            ) : activeItem === 'Logout' ? (
              <Logout onLogout={onLogout} />
            ) : (
              <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
                <MoreVertical size={40} className="text-brand-blue" />
                <h2 className="text-2xl font-bold">{activeItem} Coming Soon!</h2>
              </div>
            )}
        </div>
      </main>
    </div>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('mentx_auth') === 'true';
  });

  const handleLogin = () => {
    localStorage.setItem('mentx_auth', 'true');
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('mentx_auth');
    setIsAuthenticated(false);
  };

  return (
    <ThemeProvider>
      {isAuthenticated ? <MainLayout onLogout={handleLogout} /> : <Login onLogin={handleLogin} />}
    </ThemeProvider>
  );
}

export default App;
