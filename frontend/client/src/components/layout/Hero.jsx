import OneImg from "../../assets/2.jpg"
import {Link} from "react-router-dom";


const Hero = () => {
  return (
    <section className="relative">
      <img src={OneImg} alt="HomePage" 
      className="w-full h-[400px] md:h-[600px] lg:h-[750px] object-cover" />

      <div 
      className="absolute inset-0 bg-black/10 flex items-center justify-center ">
        <div className="text-center text-white p-6 ">
            <h1 className="text-4xl md:text-9xl font-bold tracking-tighter uppercase md-4">
               Vacation <br /> Ready
            </h1>
            <p className="text-sm tracking-tighter md:text-lg mb-6">
                Explore our vacation-ready outfits with fast worldwide shippings. 
            </p>
            <Link to="/collections/all" className="bg-white text-gray-950 hover:text-gray-600 hover:bg-[#f3f3f3] px-6 py-2 rounded-full text-lg">
                Shop Now
            </Link>
        </div>
      </div>
    </section>
  )
}

export default Hero
