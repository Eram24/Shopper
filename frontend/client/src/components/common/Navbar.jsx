import { NavLink ,Link} from "react-router-dom"
import { 
    HiOutlineUserCircle,
    HiOutlineShoppingCart,
    HiBars3 } from "react-icons/hi2";

import SearchBar from "./SearchBar";
import { useState } from "react";
import CartDrawer from "./CartDrawer";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux"

const Navbar = () => {

  const [openCart,setOpenCart]=useState(false);
  const [navDrawerOpen, setNavDrawer] =useState(true);
  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const cartItemCount = cart?.products?.reduce((total, product) => total + product.quantity, 0 ) || 0;

  const toggleNavDrawer=()=>{
    setNavDrawer(!navDrawerOpen);
  }

    const handleCart=()=>{
        setOpenCart(!openCart)
    }

  return (
    <div className="">
      <nav className="container mx-auto flex items-center justify-between py-4 px-6 ">
        {/* left - logo */}
        <div>
            <Link 
            to="/" 
            className="text-2xl font-medium">
              Shopper
            </Link>
        </div>

        {/* Center - Navigation links */}

        <div className="hidden md:flex space-x-6">
            <NavLink 
            to="/collections/all?gender=Men"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase">
                Men
            </NavLink>
            <NavLink 
            to="/collections/all?gender=Women"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase">
                Women
            </NavLink>
            <NavLink 
            to="/collections/all?category=Top Wear"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase">
                Top Wear
            </NavLink>
            <NavLink
            to="/collections/all?category=Bottom Wear"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase">
                Bottom Wear
            </NavLink>
        </div>

        {/* right-icons */}
        <div className="flex items-center space-x-4 ">
          {user && user.role ==="admin" && (
            <Link 
            to="/admin" 
            className="block bg-black px-2 rounded text-sm text-white">Admin</Link>
          )}
            
            <Link to="/profile" 
            className="hover:text-[gray]">
               <HiOutlineUserCircle className="h-6 w-6 " />
            </Link>

            <button onClick={handleCart}
            className="relative hover:text-[gray]">
              <HiOutlineShoppingCart
              className="h-6 w-6"/>
              {cartItemCount > 0 && (<span className="absolute -top-1 left-4 bg-[#ea2e0e] text-white rounded-full text-xs px-1 ">{cartItemCount}</span>)}
              
            </button>

            {/* serach */}
            <div className="overflow-hidden">
                <SearchBar className="hover:text-[gray]" />
            </div>
            

            <button className="hover:text-[gray] md:hidden " onClick={toggleNavDrawer}>
              <HiBars3 className="h-6 w-6"/>
            </button>
        </div>
      </nav>
      <CartDrawer openCart={openCart} handleCart={handleCart}/>
     
     {/* Mobile navigation */}
     <div className={`fixed top-0 right-0 w-2/4 sm:w-1/4 md:w-1/3 h-3/4 bg-white shadow-lg transform transition-transform duration-300 z-50 ${navDrawerOpen? "translate-x-full":"-translate-x-0"}`}>
      <div className="flex justify-end p-4">
        <button onClick={toggleNavDrawer}>
           <IoMdClose className="h-6 w-6 text-gray-600" />
        </button>
      </div>

      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Menu</h2>
        <nav className=" space-x-4 flex flex-col gap-3">
          <NavLink 
          to="/collections/all?gender=Men"
          onClick={toggleNavDrawer} 
          className="text-gray-600 hover:text-black uppercase ">
            Men
          </NavLink>
          <NavLink 
          to="/collections/all?gender=Women"
          onClick={toggleNavDrawer}
          className="text-gray-600 hover:text-black uppercase">
            women
          </NavLink>
          <NavLink 
          to="/collections/all?category=Top Wear"
          onClick={toggleNavDrawer}
          className="text-gray-600 hover:text-black uppercase ">
            top wear
          </NavLink>
          <NavLink 
          to="/collections/all?category=Bottom Wear"
          onClick={toggleNavDrawer}
          className="text-gray-600 hover:text-black uppercase">
            bottom wear
          </NavLink>
        </nav>
      </div>

     </div>
    </div>
  )
}

export default Navbar
