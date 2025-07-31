
import { IoMdClose } from "react-icons/io";
import CartContents from "../cart/CartContents";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CartDrawer = ({openCart,handleCart}) => {

  const navigate = useNavigate();
  const { user, guestId } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const userId = user ? user._id : null;

  const handleCheckout = () =>{
    handleCart();
    if(!user){
    navigate("/login?redirect=checkout");
    }else{
      navigate("/checkout");
    }
  }
   
    
  return (
    <div
     className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-[25rem] h-full bg-white shadow-lg transform transition-transform duration-300 flex flex-col z-50 ${openCart ? "translate-x-0":"translate-x-full"} `}>

        {/* close button */}
      <div className="flex justify-end p-4">
        <button onClick={handleCart}>
          <IoMdClose className="h-6 w-6 text-gray-600" />
        </button>
      </div>
       <h2 className="pr-4 pl-4 pt-4 text-xl font-semibold mb-4">Your Cart</h2>
       
      {/* scrollable area */}
      <div className="flex-grow pr-4 pl-4 pb-4 overflow-y-auto ">
        {cart && cart?.products?.length > 0 ? (
        <CartContents cart={cart} userId={userId} guestId={guestId}/>
      ) : (
          <p>Your cart is empty.</p>
        )}
        
      </div>

      {/* checkout button fixed at the bottom*/}
      <div className="p-4 bg-white sticky bottom-0 ">
        {cart && cart?.products?.length > 0 && (
        <>
        <button onClick={handleCheckout} className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition ">Checkout</button>
        <p className="text-sm tracking-tighter text-gray-500 mt-2 text-center">Shipping, taxes, and discount codes calculated at checkout.</p>
        </>
        )}
      </div>
    </div>
  )
}

export default CartDrawer;
