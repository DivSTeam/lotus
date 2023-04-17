import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import Layout from '../../components/Layout';
import Product from '../../models/Product';
import db from '../../utils/db';
import { Store } from '../../utils/Store';
import { HeartIcon, ShoppingCartIcon } from '@heroicons/react/outline';

export default function ProductScreen(props) {
  const [fill, setFill] = useState(false);
  const { product } = props;
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  if (!product) {
    return <Layout title="Produt Not Found">Produt Not Found</Layout>;
  }

  const addToCartHandler = async () => {
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      return toast.error('Sorry. Product is out of stock');
    }

    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    router.push('/cart');
  };

  return (
    <Layout title={product.name}>
      <div className="py-2">
        <Link href="/">Главная</Link> <span>&gt; {product.name}</span>
      </div>
      <div className="container grid grid-cols-2 gap-3">
        <div className=" col-start-1 col-end-2 border-gray-700 rounded-xl">
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            layout="responsive"
            className="object-contain rounded-xl"
          ></Image>
        </div>
        <div className='col-start-1 col-end-2'>preview image</div>

        <div className='col-start-2 col-end-3 row-start-1 row-end-2 p-1'>
          <div className='row-start-1 row-end-2 font-medium text-5xl break-words'>{product.name}</div>
          <div className='row-start-2 row-end-3 font-bold text-2xl text-[#1D912C] pt-4'>{product.price}</div>
          <div className='row-start-3 row-end-4 pt-4'>Доставка из: Вьетнам</div>
          <div className='row-start-4 row-end-5 break-words bg-gray-300 rounded-md p-2 mt-2'>
            <div className='font-medium'>
              Описание:
              shopping-cart
              shopping-cart

              shopping-cart
              shopping-cartshopping-cartshopping-cartshopping-cartshopping-cartshopping-cartshopping-cartshopping-cartshopping-cartshopping-cartshopping-cartshopping-cartshopping-cartshopping-cartshopping-cartshopping-cartshopping-cartshopping-cartshopping-cartshopping-cartshopping-cartshopping-cartshopping-cartshopping-cartshopping-cartshopping-cartshopping-cart
            </div>
            <div>
              mo ta
            </div>
          </div>
          <div className='row-start-5 row-end-6 break-words bg-red-300 rounded-md p-2 flex justify-center gap-20 mt-4 py-4'>
            <div className='font-bold'>Количество: </div>
            <div>choose num</div>
            <div>{product.countInStock}</div>
          </div>
          <div className='row-start-6 row-end-7 break-words bg-blue-300 rounded-md p-2 flex justify-center gap-20 mt-4 py-4'>
            <button className='font-medium text-white bg-[#1D912C] px-3 py-2 flex rounded-md items-center' onClick={addToCartHandler}>
              <ShoppingCartIcon className=' h-6 w-6 mr-2' />
              Add to card 
            </button>
            <button className='font-medium text-white bg-[#1D912C] px-3 rounded-md '>buy rn</button>
            <button className=' h-6 w-6' onClick={() => setFill(!fill)}>
              <HeartIcon className={fill ? 'fill-black ' : ''} /> 
            </button>
          </div>
        </div>

      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();
  return {
    props: {
      product: product ? db.convertDocToObj(product) : null,
    },
  };
}
