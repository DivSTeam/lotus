/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React from 'react';
import { HeartIcon } from '@heroicons/react/outline';

export default function ProductItem({ product, addToCartHandler }) {
  return (
    <div className="card">
      <div className='relative'>
        <button className='h-6 w-6 absolute right-1 top-1'>
          <HeartIcon/>
        </button>
        <Link href={`/product/${product.slug}`}>
        
          <a>
            <img
              src={product.image}
              alt={product.name}
              className="rounded-xl shadow-sm object-cover h-60 w-full"
            />
          </a>
        </Link>
      </div>

      <div className="flex flex-col items-center justify-center p-2">
        <Link href={`/product/${product.slug}`}>
          <a className='mb-4'>
            <h2 className="text-lg font-semibold">{product.name}</h2>
          </a>
        </Link>
       
        <p className='text-[#1D912C] font-bold text-xl mb-2'>{product.price} ₽</p>
        <div className='w-full flex justify-center'>
          <button
            className="primary-button text-white font-medium text-sm w-36 flex justify-center items-center h-8"
            type="button"
            onClick={() => addToCartHandler(product)}
          >
            В корзину
          </button>
        </div>

      </div>
    </div>
  );
}
