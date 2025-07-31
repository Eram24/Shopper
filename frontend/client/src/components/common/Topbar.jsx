
import { TbBrandMeta } from "react-icons/tb";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";

const Topbar = () => {
  return (
    <div className="bg-[#ea2e0e] text-white py-1 md:py-2 ">
        <div className=" container mx-auto flex items-center justify-between ">
            <div className="hidden md:flex items-center space-x-4 ">
                <a href="#" className="hover:text-gray-300">
                 <TbBrandMeta className="h-6 w-6"/>
                </a>

                <a href="#" className="hover:text-gray-300">
                 <IoLogoInstagram className="h-6 w-6" />
                </a>

                <a href="#" className="hover:text-gray-300">
                 <RiTwitterXLine className="h-5 w-5" />
                </a>
            </div>

            <div className="flex-grow text-sm text-center md:text-lg">
                <span>We ship worldwide - fast and reliable shipping!</span>
            </div>

            <div className="text hidden md:block">
                <a href="tel: +12344567890" className="hover:text-gray-300">
                    +91 (123) 456-789
                </a>
            </div>

        </div>
      
    </div>
  )
}

export default Topbar
