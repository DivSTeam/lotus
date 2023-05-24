/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import axios from 'axios';
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import Layout from '../components/Layout';
import ProductItem from '../components/ProductItem';
import Product from '../models/Product';
import db from '../utils/db';
import { Store } from '../utils/Store';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Link from 'next/link';
// import Image from 'next/image';
import SlideLotus from '../components/SlideShow';

import FilterPanel from "../components/FilterPanel";
// import Service from "../components/Service";
// import Search from "./search";
// import { useRouter } from 'next/router';

// const filterList = [
//   {
//     id: 1,
//     name: "Popularity"
//   },
//   {
//     id: 2,
//     name: "Upper by price"
//   },
//   {
//     id: 3,
//     name: "Lower by price"
//   },
//   {
//     id: 4,
//     name: "Highest rating"
//   },
//   {
//     id: 5,
//     name: "New product"
//   },
//   {
//     id: 6,
//     name: "Sample brand"
//   }
// ]

export default function Home({ products, featuredProducts }) {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  // filter function

  const [checked, setCheked] = useState([]);
  const handleChecked = (e) => {
    setCheked(prev => {
      const isChecked = checked.includes(e)
      if (isChecked)
        return checked.filter(item => item != e)
      else
        return [...prev, e]
    })
  }

  //---------------------------------------------------------

  const addToCartHandler = async (product) => {
    const existItem = cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      return toast.error("Sorry. Product is out of stock");
    }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });

    toast.success("Product added to the cart");
  };


  return (
    <Layout title="Home Page">
      <SlideLotus />
      <Carousel showThumbs={false} autoPlay>
        {featuredProducts.map((product) => (
          <div key={product._id}>
            <Link href={`/product/${product.slug}`} passHref>
              <a className="flex">
                <img src={product.banner} alt={product.name} />
              </a>
            </Link>
          </div>
        ))}
      </Carousel>
      <h2 className="h2 my-4">Latest Products</h2>
      {/* <Search products={products} /> */}
      <div className=" flex w-full">

        <div className='hidden sm:block'>
          <FilterPanel
            Brand={"Brand"}
            Popularity={"Popularity"}
            handleChecked={handleChecked}
          >
          </FilterPanel>
        </div>

        <div className="w-full px-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 xl:grid-cols-5 2xl:grid-cols-4">
            {products.map((product) => (
              <div className='productItem pl-8' key={`${product.slug}-container`}>
                <ProductItem
                  product={product}
                  key={product.slug}
                  addToCartHandler={addToCartHandler}
                ></ProductItem>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Лучшие предложения */}
      <div>
        <img
          className=" w-full h-44 mt-7 mb-7 object-cover rounded-2xl"
          src='/images/banner1.jpg'
          alt="img"
        />
      </div>
      <div className='flex justify-center font-bold text-2xl text-gray-500 mb-7'>
        Лучшие предложения
      </div>
      <div className="w-full py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 xl:grid-cols-4 2xl:grid-cols-5 first-child:pl-0">
          {products.map((product) => (

            <div className='productItem' key={`${product.slug}-container-best`}>
              <ProductItem
                product={product}
                key={product.slug}
                addToCartHandler={addToCartHandler}
              ></ProductItem>
            </div>
          ))}
        </div>
      </div>

      {/* Новинки */}
      <div>
        <img
          className=" w-full h-44 mt-7 mb-7 object-cover rounded-2xl"
          src='/images/banner2.jpg'
          alt="img"
        />
      </div>
      <div className='flex justify-center font-bold text-2xl text-gray-500 mb-7'>
        Новинки
      </div>
      <div className="w-full py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 xl:grid-cols-4 2xl:grid-cols-5">
          {products.map((product) => (
            <div className='productItem' key={`${product.slug}-container-new`}>
              <ProductItem
                product={product}
                key={product.slug}
                addToCartHandler={addToCartHandler}
              ></ProductItem>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find().lean();
  const featuredProducts = await Product.find({ isFeatured: true }).lean();
  return {
    props: {
      featuredProducts: featuredProducts.map(db.convertDocToObj),
      products: products.map(db.convertDocToObj),
    },
  };
}
