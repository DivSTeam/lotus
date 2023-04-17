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

import SlideLotus from '../components/Slider.js';

import FilterPanel from '../components/FilterPanel';
import { useRouter } from 'next/router';

const filterList = [
  {
    id: 1,
    name: "Popularity"
  },
  {
    id: 2,
    name: "Upper by price"
  },
  {
    id: 3,
    name: "Lower by price"
  },
  {
    id: 4,
    name: "Highest rating"
  },
  {
    id: 5,
    name: "New product"
  },
  {
    id: 6,
    name: "Sample brand"
  }
]

export default function Home({ products, featuredProducts }, Brand, Popularity) {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  // filter function
 


  const router = useRouter();
  const filterSortBy = ({
    popularity,
    upper,
    lower,
    rating,
    newProduct,
    sampleBrand,
  }) => {
    const { query } = router;
    if (popularity) query.popularity = popularity;
    if (upper) query.upper = upper;
    if (lower) query.lower = lower;
    if (rating) query.rating = rating;
    if (newProduct) query.newProduct = newProduct;
    if (sampleBrand) query.sampleBrand = sampleBrand;

    router.push({
      pathname: router.pathname,
      query: query,
    })
  }
  const sampleHandler = (e) => {
    filterSearch({ sampleBrand: e.target.value });
  };

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
      return toast.error('Sorry. Product is out of stock');
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });

    toast.success('Product added to the cart');
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
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2 gap-3 xl:grid-cols-4 2xl:grid-cols-5">
            {products.map((product) => (
              <div className='productItem pl-8'>
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
