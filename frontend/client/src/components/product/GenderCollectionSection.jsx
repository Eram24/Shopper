import {Link } from "react-router-dom";
import  women from "../../assets/women's collection.jpg";
import men from "../../assets/men's collection.jpg";


const GenderCollectionSection = () => {
  return (
    <section className="py-16 px-4 lg:px-8 ">
        
        <div className="container mx-auto flex flex-col md:flex-row gap-8">

            {/* women collection  */}
            <div className="relative flex-1 ">
                <img 
                src={women} 
                alt="Women's collection" 
                className="w-full h-[400px] md:h-[600px] object-cover rounded-2xl" />

                <div className="absolute bottom-10 left-4 bg-white bg-opacity-90 p-4">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Women's Collection</h2>
                    <Link to="/collections/all?gender=Women" 
                    className="text-gray-900 underline hover:text-gray-500">
                        Shop Now
                    </Link>
                </div>
            </div>
       
      
      {/* men collection */}
            <div className="relative flex-1 ">
                <img 
                src={men} 
                alt="Men's collection" 
                className="w-full h-[400px] md:h-[600px] object-cover rounded-2xl" />

                <div className="absolute bottom-10 left-4 bg-white bg-opacity-90 p-4">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Men's Collection</h2>
                    <Link to="/collections/all?gender=Men" 
                    className="text-gray-900 underline hover:text-gray-500">
                        Shop Now
                    </Link>
                </div>
            </div>
         </div>
    </section>
  )
}

export default GenderCollectionSection
