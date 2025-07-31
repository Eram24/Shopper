
import Hero from '../components/layout/Hero'
import FeatureCollection from '../components/product/FeatureCollection'
import FeatureSection from '../components/product/FeatureSection'
import GenderCollectionSection from '../components/product/GenderCollectionSection'
import NewArrival from '../components/product/NewArrival'
import ProductDetails from '../components/product/ProductDetails'
import ProductGrid from '../components/product/ProductGrid'
// import { useDispatch, useSelector } from "react-dom";
// import { useDispatch, useSelector } from "react-redux";
import { useDispatch, useSelector } from "react-redux";

import {useState, useEffect} from "react";
import axios from "axios";
import { fetchProductsByFilters } from "../redux/slices/productSlice";


const Home = () => {
  const dispatch = useDispatch();
  const { products, loading , error} = useSelector((state) => state.products);
  const [bestSellerProduct, setBestSellerProduct] = useState(null);

useEffect(() => {
  // Fetch products for a specific collection
  dispatch(
    fetchProductsByFilters({
      gender: "Women",
      category: "Bottom Wear",
      limit: 8,
    })
  );

  // Fetch best seller product
  const fetchBestSeller = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`
      );
      setBestSellerProduct(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  fetchBestSeller();
}, [dispatch]);


  return (
    <section>
      <Hero/>
      <GenderCollectionSection/>
      <NewArrival/>

      {/* Best Seller */}
      <h2 className='text-3xl text-center font-bold mb-4'>Best Seller</h2>
      {bestSellerProduct ? (<ProductDetails productId={bestSellerProduct._id}/>) : (
        <p classname="text-center">Loading best seller product...</p>
      )}
      

      {/* top wears fom women */}
      <div className="container mx-auto ">
        <h2 className='text-3xl text-center font-bold mb-4'>
           Top Wears for Women
        </h2>
        <ProductGrid products={products} loading={loading} error={error}/>
      </div>

      {/* featured collection */}
      <FeatureCollection/>
      <FeatureSection/>
      </section>
  )
}

export default Home
