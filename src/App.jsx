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
import { MoreVertical } from 'lucide-react';
import { ThemeProvider, useTheme } from './context/ThemeContext';

function DashboardHome({ products }) {
  const uniqueProductCount = React.useMemo(() => {
    return new Set(products?.map(p => p.name?.trim().toLowerCase()) || []).size;
  }, [products]);
  const totalProducts = uniqueProductCount.toLocaleString();
  
  return (
    <div className="space-y-4 md:space-y-6 animate-in fade-in duration-500">
      {/* Top Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6">
        {/* Overview Section */}
        <div
          className="xl:col-span-2 p-4 md:p-6 rounded-3xl shadow-xl border min-w-0"
          style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
        >
          <div className="flex justify-between items-center mb-6 px-1 md:px-2">
            <h3 className="text-lg md:text-xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>Overview</h3>
            <button style={{ color: 'var(--text-muted)' }} className="hover:opacity-70 transition-opacity">
              <MoreVertical size={20} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <StatCard title="Total Order" value="4,584" trend="up" trendValue="+8.5%" color="green" />
            <StatCard title="Cancel Order" value="124" trend="up" trendValue="+2.5%" color="red" />
            <StatCard title="Product" value={totalProducts} trend="up" trendValue="+2.5%" color="yellow" />
            <StatCard title="Refunds" value="84" trend="down" trendValue="-4.5%" color="green" />
          </div>
        </div>

        {/* Weekly Earnings */}
        <div className="xl:col-span-1">
           <WeeklyEarnings />
        </div>
      </div>

      {/* Middle Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6">
        {/* Commercial Hub */}
        <div className="xl:col-span-2">
          <CommercialHub />
        </div>

        {/* Order Store */}
        <div className="xl:col-span-1">
          <OrderStore />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="w-full">
        <OrderTable />
      </div>
    </div>
  );
}

function MainLayout() {
  const { isDark } = useTheme();
  const [activeItem, setActiveItem] = useState('Products');
  const [activeSubItem, setActiveSubItem] = useState('List Product');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');
  
  // Central Product State - Restored to LocalStorage
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

  // Optimized: Debounce LocalStorage to prevent lag when importing/editing many items
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem('mentx_products', JSON.stringify(products));
    }, 1000); // Wait 1 second of inactivity before saving
    return () => clearTimeout(timer);
  }, [products]);

  const [editingProduct, setEditingProduct] = useState(null);

  const handleAddProduct = (newProduct) => {
    const productWithId = {
      ...newProduct,
      id: `#${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
      sold: '0',
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      flag: '📦'
    };
    setProducts([productWithId, ...products]);
    setActiveSubItem('List Product');
  };

  const handleUpdateProduct = (updatedProduct) => {
    setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    setEditingProduct(null);
    setActiveSubItem('List Product');
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const handleImportProducts = (importedProducts) => {
    let lastName = 'Unnamed Product';
    let lastImageUrl = '';

    const newProducts = importedProducts.map(p => {
      // Smart search for Name/Title
      const nameKey = Object.keys(p).find(k => k.includes('name') || k.includes('title') || k.includes('product'));
      let name = nameKey ? p[nameKey] : '';
      if (!name || name.trim() === '') name = lastName;
      else lastName = name;
      
      // Smart search for Image
      const imageKey = Object.keys(p).find(k => k.includes('image') || k.includes('photo') || k.includes('img') || k.includes('url'));
      let imageUrl = imageKey ? p[imageKey] : '';
      if (!imageUrl || imageUrl.trim() === '') imageUrl = lastImageUrl;
      else lastImageUrl = imageUrl;

      const images = imageUrl ? [imageUrl] : [];
      
      // Smart search for Price
      const priceKey = Object.keys(p).find(k => k.includes('price') || k.includes('cost') || k.includes('rate'));
      let price = p[priceKey] || '₹0.00';
      if (price && !price.toString().startsWith('₹')) price = `₹${price}`;

      // Smart search for Size/Color
      const sizeKey = Object.keys(p).find(k => k.includes('size'));
      const colorKey = Object.keys(p).find(k => k.includes('color') || k.includes('colour'));
      const skuKey = Object.keys(p).find(k => k.includes('sku') || k.includes('code') || k.includes('id'));
      const stockKey = Object.keys(p).find(k => k.includes('stock') || k.includes('qty') || k.includes('count'));

      return {
        id: p.id || `#${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
        name: name,
        price: price,
        sold: p.sold || '0',
        date: p.date || new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        status: p.status || 'Active',
        category: p.category || '',
        sku: skuKey ? p[skuKey] : '',
        stock: stockKey ? p[stockKey] : '0',
        brand: p.brand || '',
        size: sizeKey ? p[sizeKey] : '',
        color: colorKey ? p[colorKey] : '',
        images: images,
        flag: images.length > 0 ? '' : '📦'
      };
    });
    
    const uniqueNewProducts = newProducts.filter((v, i, a) => 
      a.findIndex(t => (t.name === v.name && t.price === v.price && t.sku === v.sku && t.size === v.size && t.color === v.color)) === i
    );

    setProducts([...uniqueNewProducts, ...products]);
    alert(`Successfully imported ${uniqueNewProducts.length} products!`);
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setActiveSubItem('Add Product');
  };

  return (
    <div
      className={`flex min-h-screen font-sans selection:bg-blue-500/30 overflow-x-hidden transition-colors duration-300 ${isDark ? 'dark' : 'light'}`}
      style={{ backgroundColor: 'var(--bg-root)', color: 'var(--text-primary)' }}
    >
      <Sidebar 
        activeItem={activeItem} 
        setActiveItem={setActiveItem} 
        activeSubItem={activeSubItem}
        setActiveSubItem={setActiveSubItem}
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen} 
      />
      
      <main className={`flex-1 transition-all duration-300 min-h-screen flex flex-col min-w-0 max-w-full ${isSidebarOpen ? 'lg:ml-64' : 'lg:ml-64 ml-0'}`}>
        <Header 
          onMenuClick={() => setIsSidebarOpen(true)} 
          searchQuery={globalSearch}
          setSearchQuery={setGlobalSearch}
        />
        
        <div className="flex-1 p-3 md:p-6 min-w-0 max-w-full overflow-y-auto">
          {activeItem === 'Dashboard' ? <DashboardHome products={products} /> : 
           activeItem === 'Products' && activeSubItem === 'List Product' ? (
            <ProductList 
              products={products}
              searchQuery={globalSearch}
              setSearchQuery={setGlobalSearch}
              onAddProduct={() => {
                setEditingProduct(null);
                setActiveItem('Products');
                setActiveSubItem('Add Product');
              }} 
              onDelete={handleDeleteProduct}
              onEdit={handleEditClick}
              onImport={handleImportProducts}
            />
           ) : activeItem === 'Products' && activeSubItem === 'Add Product' ? (
            <AddProduct 
              editingProduct={editingProduct}
              onSave={editingProduct ? handleUpdateProduct : handleAddProduct}
              onBack={() => {
                setEditingProduct(null);
                setActiveItem('Products');
                setActiveSubItem('List Product');
              }} 
            />
           ) : activeItem === 'Orders' && activeSubItem === 'Order List' ? (
            <OrderList onCreateOrder={() => {
              setActiveItem('Products');
              setActiveSubItem('Add Product');
            }} />
           ) : activeItem === 'People' && activeSubItem === 'Supplier List' ? (
            <SupplierList />
           ) : activeItem === 'People' && activeSubItem === 'Customer List' ? (
            <CustomerList />
           ) : activeItem === 'Analytics' ? (
            <Analytics />
           ) : activeItem === 'Invoice' ? (
            <Invoice />
           ) : (
            <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
              <div className="p-4 rounded-full bg-brand-blue/10 text-brand-blue">
                <MoreVertical size={40} />
              </div>
              <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                {activeItem} {activeSubItem ? `- ${activeSubItem}` : ''}
              </h2>
              <p style={{ color: 'var(--text-muted)' }}>This page is coming soon!</p>
            </div>
           )}
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <MainLayout />
    </ThemeProvider>
  );
}

export default App;
