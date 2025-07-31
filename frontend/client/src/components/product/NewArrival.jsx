import { FaArrowLeft,FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useRef, useState, useEffect} from "react";
import axios from "axios";


const NewArrival = () => {

    const scrollRef = useRef(null);
    const [isDragging, setDragging] = useState(false);   //to check whether we can drag the container or not
    const [startX, setStartX] = useState(0);  //starting value of container
    const [scrollLeft, setScrollLeft] = useState(false);  //initial scroll position of container
    const [canScrollRight, setCanScrollRight] = useState(true); //if the container can be scroll to right 
    const [canScrollLeft, setCanScrollLeft] = useState(true); //if to the left




    const [newArrivals, setNewArrivals] = useState([]);

    useEffect(() => {
        const fetchNewArrivals = async () =>{
            try{
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrivals`);
                setNewArrivals(response.data);
            }catch(error){
            console.log(error);
            }
            
        };
        fetchNewArrivals();
    },[]);

    const handleMouseDown = (e) =>{
        setDragging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
    }

    const handleMouseMove = (e) =>{
        if(!isDragging) return ;
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = x-startX;
        scrollRef.current.scrollLeft = scrollLeft - walk;

    };

    const handleMouseUpOrLeave = () => {
       setDragging(false);
    };

    const scroll = (direction) =>{
        const scrollAmount = direction=== "left" ? -350 : 350;
        scrollRef.current.scrollBy({left: scrollAmount, behaviour: "smooth" });
    };

    // update scroll button
    const updateScrollButton=()=>{
        const container = scrollRef.current;
        // console.log("container ",container);

        if(container){
            const  leftScroll = container.scrollLeft;
            // console.log(leftScroll);
            
            const rightScrollable = container.scrollWidth > Math.ceil(leftScroll + container.clientWidth) ;
            // console.log(rightScrollable);

            console.log({
                scrollwidth : container.scrollWidth,
                d2: leftScroll + container.clientWidth,
            })

            setCanScrollLeft(leftScroll>0);
            setCanScrollRight(rightScrollable);
        }

        // console.log({
        //     scrollLeft: container.scrollLeft,
        //     clientWidth: container.clientWidth,
        //     containerScrollWidth: container.scrollWidth,
        // });
    };

    useEffect(()=>{
        // console.log("scrollref ",scrollRef);
        const container= scrollRef.current;   //reference of the container
        if(container){
            container.addEventListener("scroll",updateScrollButton);
            updateScrollButton();

            return ()=> container.removeEventListener("scroll", updateScrollButton);

        }
    },[newArrivals]);

  return (
    <section className="py-16 px-6 lg:px-6">
     <div className="container mx-auto text-center mb-10 relative ">
        <h2 className="text-3xl font-bold mb-4">Explore New Arrivals</h2>
        <p className="text-lg text-gray-600 mb-8">
            Discover the latest styles straight off the runway, freshly added to keep your wardrobe on the cutting edge of fashion.
        </p>

        {/* scroll buttons */}
        <div className="absolute right-0 bottom-[-30px] flex space-x-2 " >
            <button
             onClick={()=>scroll("left")}
             disabled={!canScrollLeft}
             className={`border border-gray-400 p-2 rounded-xl ${canScrollLeft ? " bg-white hover:bg-gray-100": "bg-gray-200 text-gray-400 cursor-not-allowed"}`}>
                <FaArrowLeft  />
            </button>
            <button 
            onClick={()=>scroll("right")}
            disabled={!canScrollRight}
            className={`border border-gray-400 p-2 rounded-xl ${canScrollRight ? " bg-white hover:bg-gray-100": "bg-gray-200 text-gray-400 cursor-not-allowed"}`}>
               <FaArrowRight />
            </button> 
        </div>
     </div>

     {/* scrollable content */}
     
     <div ref={scrollRef} 
     className={` container mx-auto overflow-x-scroll flex space-x-6 lg:space-x-8 relative ${isDragging ? "cursor-pointer" : "cursor-grab"}`}
     onMouseDown={handleMouseDown}
     onMouseMove={handleMouseMove}
     onMouseUp={handleMouseUpOrLeave}
     onMouseLeave={handleMouseUpOrLeave}>
        {newArrivals.map((product) => ( 
           <div
            key={product._id}
            className="min-w-[70%] sm:min-w-[40%] lg:min-w-[30%] relative">

             <img 
             src={product.images[0]?.url} 
             alt={product.images[0]?.altText || product.name}
             className="w-full h-[400px] lg:h-[500px] object-cover rounded-2xl"
             draggable="false" />

             <div className="absolute bottom-0  left-0 right-0  bg-opacity-50 backdrop-blur-md text-white p-4 rounded-b-2xl ">
             <Link to={`/product/${product._id}`} className="block">
                <h4 className="font-medium">{product.name}</h4>
                <p className="mt-1">$ {product.price}</p>
            </Link>
             </div>
           </div>
        ))}
     </div>

    </section>
  )
}

export default NewArrival
