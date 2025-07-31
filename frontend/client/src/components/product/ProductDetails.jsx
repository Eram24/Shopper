import {useState, useEffect} from "react"
import {toast} from "sonner"
import ProductGrid from "./ProductGrid";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetails, fetchSimilarProducts } from "../../redux/slices/productSlice";
import { addToCart } from "../../redux/slices/cartSlice";



const ProductDetails = ({ productId }) => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { selectedProduct, loading , error , similarProducts } = useSelector(
        (state) => state.products
    );

    const { user, guestId } = useSelector((state) => state.auth);
    const [mainImage, setMainImage] = useState("");
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const productFetchId = productId || id;

    useEffect(() => {
        if(productFetchId){
            dispatch(fetchProductDetails(productFetchId));
            dispatch(fetchSimilarProducts({ id : productFetchId}));
        }
    }, [dispatch, productFetchId] );

    useEffect(() => {
      if(selectedProduct?.images?.length > 0){
        setMainImage(selectedProduct.images[0].url)
      }
    },[selectedProduct]);

    const handleQuantity=(value)=>{
         if(value==="minus" && quantity>1) setQuantity(prev => prev-1);
         if(value==="plus")  setQuantity(prev => prev+1);
    }
    
    const handleAddToCart = ()=>{
        if(!selectedColor || !selectedSize){ toast.error("Please select a size and color before adding to cart",{
            duration: 1000,
        });
           return;
        }

        setIsButtonDisabled(true);

        dispatch(
          addToCart({
           productId: productFetchId,
           quantity,
           size: selectedSize,
           color: selectedColor,
           guestId,
           userId: user?._id,
        })
    )
    .then(() => {
        toast.success("Product added to cart!",{
            duration: 1000,
        });
    })
    .finally(() =>{
        setIsButtonDisabled(false);
    });
    };

    if(loading ){
       return <p>Loading...</p>;
    }

    if(error){
        return <p> Error: {error}</p>;
    }

  return (
    <div className="p-6 ">
        { selectedProduct && (
         <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg ">
            <div className="flex flex-col md:flex-row ">
        
                <div className="hidden md:flex flex-col space-y-4 mr-6 ">
                    {  
                        selectedProduct.images.map((image,index)=>(
                            <img 
                            key={index}
                            src={image.url}
                            alt={image.altText} 
                            className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${image.url===mainImage ? "border-black" : "border-gray-300"}`}
                            onClick={()=>setMainImage(image.url)}/>
                        ))
                    }
                </div>

                {/* main image */}
                <div className="md:w-1/2 ">
                    <div className="mb-4 h-full ">
                      <img 
                      src={mainImage} alt={selectedProduct.images[0]?.altText} 
                      className="w-full h-full object-cover rounded-lg"/>
                    </div> 
                </div>

                {/* mobile thumbnail */}
                <div className=" md:hidden flex overflow-x-scroll space-x-4 mb-4">
                    {
                        selectedProduct.images.map((image,index)=>(
                            <img 
                            key={index}
                            src={image.url}
                            alt={image.altText} 
                            onClick={()=>setMainImage(image.url)}
                            className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${image.url===mainImage ? "border-black" : "border-gray-300"}`}/>
                        ))
                    }
                </div>

                {/* Right Side */}
                <div className="md:w-1/2 md:ml-10">
                    <h1 className="text-2xl md:text-3xl font-semibold mb-2">{selectedProduct.name}</h1>
                    <p className="text-lg text-gray-600 mb-1 line-through">$ {Math.floor(selectedProduct.price * (1.2 + Math.random() * 0.3))}</p>
                    <p className="text-xl text-gray-500 mb-2">$ {selectedProduct.price}</p> 
                    <p className="text-gray-600 mb-4">{selectedProduct.description}</p>

                    <div className="mb-4">
                        <p 
                        className="text-gray-700">Color: </p>
                        <div className="flex gap-2 mt-2">
                            {selectedProduct.colors.map((color)=>(
                                <button
                                key={color}
                                onClick={()=>setSelectedColor(color)}
                                className={`w-8 h-8 border rounded-full ${selectedColor===color ? "border-2 border-gray-900": "border border-gray-200"}`}
                                style={{
                                    backgroundColor: color.toLocaleLowerCase(),

                                    filter: "brightness(0.5)"}}> 
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mb-4">
                        <p className="text-gray-700">Size:</p>
                        <div className="flex gap-2 mt-2">
                            { selectedProduct.sizes.map((size)=> (
                                <button 
                                key={size}
                                onClick={()=> setSelectedSize(size)}
                                className={`px-4 py-2 rounded border ${selectedSize===size ? "bg-black text-white" : ""}`}>{size}</button>
                                ))
                            }
                        </div>
                    </div>

                 <div className="mb-6">
                    <p className="text-gray-700">Quantity:</p>
                    <div className="flex items-center gap-4 mt-2">
                    <button
                     onClick={()=>handleQuantity("minus")} 
                     className="border px-2 py-1 rounded text-lg hover:bg-gray-200">-</button>
                    <span className="text-lg">{quantity}</span>
                    <button 
                    onClick={()=>handleQuantity("plus")} 
                    className="border px-2 py-1 rounded text-lg hover:bg-gray-200">+</button>
                    </div>
                 </div>

                 <button 
                 onClick={handleAddToCart}
                 disabled={isButtonDisabled}
                 className={`bg-black text-white  py-2 px-6 rounded-lg w-full mb-4 ${isButtonDisabled ? "cursor-progress bg-gray-500" : "hover:bg-gray-900"}`}>
                    {isButtonDisabled ? "Adding..." : "ADD TO CART"}
                 </button>
                
                <div className="text-gray-700 mt-10">
                    <h3 className="text-xl font-bold mb-4">Characteristics: </h3>
                    <table className="w-full text-left text-sm text-gray-600">
                        <tbody>
                            <tr>
                                <th className="py-1">Brand</th>
                                <td>{selectedProduct.brand}</td>
                            </tr>
                            <tr>
                                <th className="py-1">Material</th>
                                <td>{selectedProduct.material}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                </div>
            </div>

                        {/* new arrivals */}
         <div className="mt-20 ">
            <h2 className="text-2xl text-center font-medium mb-4">You May Also Like</h2>
           <ProductGrid products={similarProducts} loading={loading} error={error}/>
         </div>

        </div>
        )}
    </div>
  );
};

export default ProductDetails
