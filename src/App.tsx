import { Route, Routes } from 'react-router-dom';
import AppShell from './components/layout/AppShell';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmed from './pages/OrderConfirmed';
import CollectionsIndex from './pages/CollectionsIndex';
import CollectionDetail from './pages/CollectionDetail';
import SearchResults from './pages/SearchResults';
import Wishlist from './pages/Wishlist';
import Journal from './pages/Journal';
import JournalPost from './pages/JournalPost';
import Craft from './pages/Craft';
import Lookbook from './pages/Lookbook';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Account from './pages/Account';
import AccountOrders from './pages/AccountOrders';
import AccountOrderDetail from './pages/AccountOrderDetail';
import AccountAddresses from './pages/AccountAddresses';
import AccountProfile from './pages/AccountProfile';
import StaticPage from './pages/StaticPage';
import FindYourSaree from './pages/FindYourSaree';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<Home />} />
        <Route path="/new-arrivals" element={<Shop mode="new" />} />
        <Route path="/best-sellers" element={<Shop mode="bestseller" />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/sarees" element={<Shop />} />
        <Route path="/sarees/:category" element={<Shop />} />
        <Route path="/occasion/:slug" element={<Shop mode="occasion" />} />
        <Route path="/fabric/:slug" element={<Shop mode="fabric" />} />
        <Route path="/color/:slug" element={<Shop mode="color" />} />
        <Route path="/shop/:priceRange" element={<Shop mode="price" />} />
        <Route path="/collections" element={<CollectionsIndex />} />
        <Route path="/collection/:slug" element={<CollectionDetail />} />
        <Route path="/product/:slug" element={<ProductDetail />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-confirmed" element={<OrderConfirmed />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/journal/:slug" element={<JournalPost />} />
        <Route path="/craft" element={<Craft />} />
        <Route path="/lookbook" element={<Lookbook />} />
        <Route path="/campaign/:slug" element={<Lookbook />} />
        <Route path="/about" element={<About />} />
        <Route path="/our-story" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<Login mode="forgot" />} />
        <Route path="/account" element={<Account />} />
        <Route path="/account/orders" element={<AccountOrders />} />
        <Route path="/account/orders/:id" element={<AccountOrderDetail />} />
        <Route path="/account/addresses" element={<AccountAddresses />} />
        <Route path="/account/profile" element={<AccountProfile />} />
        <Route path="/account/preferences" element={<AccountProfile tab="preferences" />} />
        <Route path="/find-your-saree" element={<FindYourSaree />} />
        <Route path="/book-appointment" element={<StaticPage slug="appointment" />} />
        <Route path="/saree-guide" element={<StaticPage slug="saree-guide" />} />
        <Route path="/fabric-guide" element={<StaticPage slug="fabric-guide" />} />
        <Route path="/how-to-drape" element={<StaticPage slug="drape-guide" />} />
        <Route path="/care" element={<StaticPage slug="care" />} />
        <Route path="/faq" element={<StaticPage slug="faq" />} />
        <Route path="/shipping" element={<StaticPage slug="shipping" />} />
        <Route path="/returns-policy" element={<StaticPage slug="returns" />} />
        <Route path="/payment-information" element={<StaticPage slug="payments" />} />
        <Route path="/privacy" element={<StaticPage slug="privacy" />} />
        <Route path="/terms" element={<StaticPage slug="terms" />} />
        <Route path="/accessibility" element={<StaticPage slug="accessibility" />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
