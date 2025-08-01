import { HiHome } from "react-icons/hi2";
import UserLayout from "./components/layout/UserLayout";
import {BrowserRouter,Route,Routes} from "react-router-dom"
import Home from "./pages/Home"
import {Toaster} from "sonner"
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import CollectionPage from "./pages/CollectionPage";
import ProductDetails from "./components/product/ProductDetails";
import Checkout from "./components/cart/Checkout";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import MyOrderPage from "./pages/MyOrderPage";
import AdminLayout from "./components/admin/AdminLayout";
import AdminHomePage from "./pages/AdminHomePage";
import UserManagement from "./components/admin/UserManagement";
import ProductManagement from "./components/admin/ProductManagement";
import EditProductPage from "./components/admin/EditProductPage";
import OrderManagement from "./components/admin/OrderManagement";

import { Provider } from "react-redux";
import store from "./redux/store";
import ProtectedRoute from "./components/common/ProtectedRoute";

const App=()=>{
  return (
    <Provider store={store}>
    <BrowserRouter>
    <Toaster richColors position="top-right"/>
    <Routes>
      <Route path="/" element={<UserLayout/>}>
      {/* UserLayout - parent*/}
           <Route index element={<Home/>}/>
           <Route path='login' element={<Login/>}/>
           <Route path='register' element={<Register/>}/>
           <Route path="profile" element={<Profile/>}/>
           <Route path="collections/:collection" element={<CollectionPage/>}/>
           <Route path="product/:id" element={<ProductDetails/>}/>
           <Route path="checkout" element={<Checkout/>}/>
           <Route path="order-confirmation" element={<OrderConfirmationPage/>}/>
           <Route path="order/:id" element={<OrderDetailsPage/>}/>
           <Route path="my-orders" element={<MyOrderPage/>}/>
       </Route>


      <Route path="/admin" element={
        <ProtectedRoute role="admin">
          <AdminLayout/>
        </ProtectedRoute>
        }>
      <Route index element={<AdminHomePage/>}/>
      <Route path="users" element={<UserManagement/>}></Route>
      <Route path="products" element={<ProductManagement/>}></Route>
      <Route path="products/:id/edit" element={<EditProductPage/>}></Route>
      <Route path="orders" element={<OrderManagement/>}></Route>
      
      </Route>

    </Routes>
    </BrowserRouter>
    </Provider>
  )
}

export default App; 