import {useState} from "react"
import {Link, useLocation, useNavigate} from "react-router-dom"
import login from "../assets/login.webp"
import { loginUser } from "../redux/slices/authSlice";
import { useDispatch, useSelector  } from "react-redux";
import { useEffect } from "react";
import { mergeCart } from "../redux/slices/cartSlice";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword ] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { user, guestId } = useSelector((state) => state.auth);
    const { cart } = useSelector((state) => state.cart);
    

    // Get redirect parameter and check if it's checkout
  const redirect = new URLSearchParams(location.search).get("redirect") || "/";
  const isCheckoutRedirect = redirect.includes("checkout");

  useEffect(() => {
    if (user) {
      if (cart?.products?.length > 0 && guestId) {
        dispatch(mergeCart({ guestId, user })).then(() => {
          navigate(isCheckoutRedirect ? "/checkout" : "/");
        });
      } else {
        navigate(isCheckoutRedirect ? "/checkout" : "/");
      }
    }
  }, [user, guestId, cart, navigate, isCheckoutRedirect, dispatch]);

   const handleOnSubmit =(e)=>{
        e.preventDefault();
        console.log("user info ", { email, password});
        dispatch(loginUser({ email, password}));
    }

  return (
    <div className="flex bg-gray-200">
         <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12">
            <form onSubmit={handleOnSubmit} className="w-full max-w-md bg-white p-8 rounded-lg border shadow-sm">
               <div className="flex justify-center mb-6">
                <h2 className="text-xl font-medium">Shopper</h2>
               </div>
               <h2 className="text-2xl font-bold text-center mb-6">Hey there! 👋</h2>
               <p className="text-center mb-6">
                Enter Your username and password to Login.
               </p>

               {/* email */}
               <div className="mb-4">
                <label htmlFor="Email" className="block text-sm font-semibold mb-2">Email</label>
                <input 
                type="email" 
                value={email}
                id="Email"
                onChange={(e)=>setEmail(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Enter your email address"/>
               </div>

               {/* password */}
               <div className="mb-4">
                <label 
                htmlFor="Password"
                 className="block text-sm font-semibold mb-2">Password</label>

                <input 
                type="password" 
                id="Password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Enter your password"/>
               </div>

               <button type="submit" className="w-full bg-black text-white p-2 rounded-lg font-semibold hover:bg-gray-800 transition">
                  Sign In
               </button>
               <p className="mt-6 text-center text-sm">
                Don't have an account?{" "}
                <Link to={`/register?redirect=${encodeURIComponent(redirect)}`} className="text-blue-500">
                Register
                </Link>
               </p>
            </form>
         </div>

         {/* image */}
         <div className="hidden md:block w-1/2 bg-gray-800">
            <div className="h-full flex flex-col justify-center items-center">
                <img src={login} alt="login to Account" className="h-[750px] w-full object-cover" />
            </div>
         </div>
    </div>
  )
}

export default Login
