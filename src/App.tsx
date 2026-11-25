import { useLayoutEffect, useState } from 'react';
import { MotionConfig } from 'motion/react';
import { Header, type ActiveDrawer } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryShowcase } from './components/CategoryShowcase';
import { EditorialShowcase } from './components/EditorialShowcase';
import { PerformanceTriptych } from './components/PerformanceTriptych';
import { ExploreFaceWash } from './components/ExploreFaceWash';
import { ExploreSunscreens } from './components/ExploreSunscreens';
import { ValuesAccordion } from './components/ValuesAccordion';
import { NewsletterGuarantees } from './components/NewsletterGuarantees';
import { Footer } from './components/Footer';
import { ProductDetailPage, type AddToCartOptions } from './components/ProductDetailPage';
import { StoreDrawers, type CartItem } from './components/StoreDrawers';
import { AgeGateModal } from './components/AgeGateModal';
import type { ProductCategory, SkincareProduct } from './data/products';
import { LanguageProvider } from './i18n';

function StorefrontApp() {
  const [activeDrawer, setActiveDrawer] = useState<ActiveDrawer>('none');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('All');
  const [activeProduct, setActiveProduct] = useState<SkincareProduct | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const scrollToTopInstant = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  useLayoutEffect(() => {
    scrollToTopInstant();
    const rafId = window.requestAnimationFrame(scrollToTopInstant);
    return () => window.cancelAnimationFrame(rafId);
  }, [activeProduct?.id]);

  const handleOpenShop = (category: ProductCategory = 'All') => {
    setSelectedCategory(category);
    setActiveDrawer('shop');
  };

  const handleSelectProduct = (product: SkincareProduct) => {
    setActiveProduct(product);
    setActiveDrawer('none');
    scrollToTopInstant();
  };

  const handleBackHome = () => {
    setActiveProduct(null);
    setActiveDrawer('none');
    scrollToTopInstant();
  };

  const handleAddToCart = (product: SkincareProduct, options?: AddToCartOptions) => {
    const color = options?.color ?? product.colors[0] ?? product.variant.en;
    const packSize = options?.packSize ?? product.packSizes[0] ?? '1 BOTTLE';
    const quantity = Math.max(1, options?.quantity ?? 1);
    const key = `${product.id}__${color}__${packSize}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.key === key);
      if (existing) {
        return prev.map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { key, product, color, packSize, quantity }];
    });

    if (options?.openCart) {
      setActiveDrawer('cart');
    }
  };

  const handleUpdateQty = (itemKey: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.key === itemKey
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (itemKey: string) => {
    setCart((prev) => prev.filter((item) => item.key !== itemKey));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const activeProductInCartCount = activeProduct
    ? cart
        .filter((item) => item.product.id === activeProduct.id)
        .reduce((sum, item) => sum + item.quantity, 0)
    : 0;

  return (
    <MotionConfig reducedMotion="user">
      <div id="top" className="min-h-screen w-full bg-white text-[#1E1624] flex flex-col">
        <Header
          cartCount={cartCount}
          onOpenShop={handleOpenShop}
          onOpenDrawer={setActiveDrawer}
          onResetHome={handleBackHome}
        />

        <main className="flex-1 w-full">
          {activeProduct ? (
            <ProductDetailPage
              key={activeProduct.id}
              product={activeProduct}
              inCartCount={activeProductInCartCount}
              onBackHome={handleBackHome}
              onSelectProduct={handleSelectProduct}
              onOpenShop={handleOpenShop}
              onOpenDrawer={setActiveDrawer}
              onAddToCart={handleAddToCart}
            />
          ) : (
            <>
              <Hero onExploreProducts={() => handleOpenShop('All')} />
              <CategoryShowcase onOpenShop={handleOpenShop} />
              <EditorialShowcase onOpenShop={handleOpenShop} />
              <PerformanceTriptych onOpenShop={handleOpenShop} />
              <ExploreFaceWash
                onOpenShop={handleOpenShop}
                onSelectProduct={handleSelectProduct}
                onAddToCart={handleAddToCart}
              />
              <ExploreSunscreens
                onOpenShop={handleOpenShop}
                onSelectProduct={handleSelectProduct}
                onAddToCart={handleAddToCart}
              />
              <ValuesAccordion onOpenShop={handleOpenShop} />
              <NewsletterGuarantees onOpenDrawer={setActiveDrawer} />
            </>
          )}
        </main>

        <Footer onOpenShop={handleOpenShop} onOpenDrawer={setActiveDrawer} />

        <StoreDrawers
          activeDrawer={activeDrawer}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onSelectProduct={handleSelectProduct}
          onClose={() => setActiveDrawer('none')}
          onSwitchDrawer={setActiveDrawer}
          cart={cart}
          onAddToCart={handleAddToCart}
          onUpdateQty={handleUpdateQty}
          onRemoveItem={handleRemoveItem}
          onClearCart={handleClearCart}
        />

        <AgeGateModal />
      </div>
    </MotionConfig>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <StorefrontApp />
    </LanguageProvider>
  );
}
