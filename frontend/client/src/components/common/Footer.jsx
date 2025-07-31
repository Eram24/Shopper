import {Link} from "react-router-dom";
import { TbBrandMeta } from "react-icons/tb";
import { IoLogoInstagram } from "react-icons/io";
import { FaXTwitter } from "react-icons/fa6";
import { FiPhoneCall } from "react-icons/fi";
import { toast } from "sonner";
import {useNavigate} from "react-router-dom";


const Footer = () => {
    const navigate = useNavigate();
    const handleSubmit = (e) =>{
        e.preventDefault();
        toast.success("Subscribed!");
        navigate("/");
    }

  return (
    <footer>
        <div className=" border-gray-300 py-12 bg-gray-100">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4 lg:px-0">

                {/* NewsLetter */}
                <div>
                    <h3 className="text-lg text-gray-800  mb-4">Newsletter</h3>
                    <p className="text-gray-500 mb-4">Be the first to hear about new products, exclusive events, and online offers.</p>
                    <p className="font-medium text-sm text-gray-600 mb-6">Sign up and get 10% off on your first order.</p>

                    {/* Newsletter form */}
                    <form onSubmit={handleSubmit} className="flex" >
                        <input 
                        type="email" 
                        placeholder="Enter your email"
                        required
                        className="p-2 w-full text-sm border-t border-l border-b border-gray-300 rounded-l-lg focus:outline-none transition-all"/>
                        <button 
                        type="submit"
                        className="bg-black text-white px-6 py-2 text-sm  rounded-r-lg hover:bg-gray-800 transition-all">Subsrcibe</button>

                    </form>
                </div>

                {/* shop */}
                <div>
                    <h3 className="text-lg text-gray-800 mb-4">Shop</h3>
                    <ul className="space-y-2 text-gray-600">
                        <li><Link 
                        to="#" 
                        className="hover:text-gray-500 transition-colors">Men's Top Wear</Link></li>
                        <li><Link 
                        to="#" 
                        className="hover:text-gray-500 transition-colors">Women's Top Wear</Link></li>
                        <li><Link
                        to="#" 
                        className="hover:text-gray-500 transition-colors">Men's Bottom Wear</Link></li>
                        <li
                        to="#" 
                        className="hover:text-gray-500 transition-colors"><Link>Women's Top Wear</Link></li>
                    </ul>
                </div>
                {/* Support*/}
                <div>
                   <h3 className="text-lg text-gray-800 mb-4">Support</h3>
                    <ul className="space-y-2 text-gray-600">
                        <li><Link 
                        to="#" 
                        className="hover:text-gray-500 transition-colors">Contact Us</Link></li>
                        <li><Link 
                        to="#" 
                        className="hover:text-gray-500 transition-colors">About Us</Link></li>
                        <li><Link
                        to="#" 
                        className="hover:text-gray-500 transition-colors">FAQs</Link></li>
                        <li
                        to="#" 
                        className="hover:text-gray-500 transition-colors"><Link>Features</Link></li>
                    </ul>
                </div>
                {/* follow us */}
                <div>
                    <h3 className="text-lg text-gray-800 mb-4">Follow Us</h3>
                    <div className="flex space-x-4 mb-6 items-center">
                        <a
                         href="https://www.facebook.com"
                         target="_blank"
                         rel="noopener noreferrer"
                         className="hover:text-gray-300">
                            <TbBrandMeta  className="h-6 w-6"/>
                         </a>
                        <a
                         href="https://www.facebook.com"
                         target="_blank"
                         rel="noopener noreferrer"
                         className="hover:text-gray-300">
                            <IoLogoInstagram className="h-6 w-6" />
                         </a>
                        <a
                         href="https://www.facebook.com"
                         target="_blank"
                         rel="noopener noreferrer"
                         className="hover:text-gray-300">
                            <FaXTwitter className="h-5 w-5" />
                         </a> 
                    </div>
                    <p className="text-gray-500 mb-4">Call Us</p>
                    <p>
                       <FiPhoneCall className="h-5 w-5 inline-block mr-2"/> 0123-456-789
                    </p>
                </div>
            </div>
        </div>

        {/* footer bottom */}
        <div className="container mx-auto mt-8 px-4 lg:px-0 border-t border-gray-200 pt-6">
            <p className="text-gray-500 text-sm tracking-tighter text-center">
                &copy; 2025, ShopperWebsite. All Rights Reserved.
            </p>
        </div>
    </footer>
  )
}

export default Footer
