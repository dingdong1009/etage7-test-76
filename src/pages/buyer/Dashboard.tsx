
import ScrollToTop from "@/components/ScrollToTop";
import { useEffect, useState, useRef, useCallback } from "react";

// Sample product data for demonstration
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

const PRODUCTS_PER_PAGE = 8;

const BuyerDashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  const observer = useRef<IntersectionObserver | null>(null);
  const loadingRef = useCallback((node: HTMLDivElement) => {
    if (!hasMore) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    
    if (node) observer.current.observe(node);
  }, [hasMore]);
  
  // Mock product data generation
  useEffect(() => {
    const mockProducts = Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      name: `Product ${i + 1}`,
      price: 50 + Math.floor(Math.random() * 100),
      image: "https://via.placeholder.com/150",
      category: ['Clothing', 'Accessories', 'Footwear'][Math.floor(Math.random() * 3)]
    }));
    
    setProducts(mockProducts);
  }, []);
  
  // Load more products when page changes
  useEffect(() => {
    const startIndex = 0;
    const endIndex = page * PRODUCTS_PER_PAGE;
    
    setVisibleProducts(products.slice(startIndex, endIndex));
    setHasMore(endIndex < products.length);
  }, [page, products]);
  
  // Show/hide scroll-to-top button based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 200);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-semibold mb-6">Your Dashboard</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {visibleProducts.map(product => (
          <div 
            key={product.id} 
            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="h-48 bg-gray-200">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-medium">{product.name}</h3>
              <p className="text-sm text-gray-500 mb-2">{product.category}</p>
              <p className="text-lg font-semibold">${product.price}</p>
            </div>
          </div>
        ))}
      </div>
      
      {hasMore && (
        <div ref={loadingRef} className="py-8 text-center text-gray-500">
          Loading more products...
        </div>
      )}
      
      {!hasMore && products.length > 0 && (
        <p className="py-8 text-center text-gray-500">No more products to load</p>
      )}

      {showScrollTop && (
        <button 
          className="fixed bottom-8 right-8 bg-black text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition-colors duration-300 z-50"
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default BuyerDashboard;
