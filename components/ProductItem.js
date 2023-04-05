/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React from 'react';
import { HeartIcon } from '@heroicons/react/outline';

export default function ProductItem({ product, addToCartHandler }) {
  return (
    <div className="card bg-red-300 w-52 h-auto ">
      <div className='w-auto h-44 bg-yellow-300'>
        <button className='h-6 w-6 absolute right-1 top-1'>
          <HeartIcon />
        </button>
        <Link href={`/product/${product.slug}`}>
          <a>
            <img
              src={product.image}
              alt={product.name}
              className="rounded-xl shadow-sm w-full h-full object-cover"
            />
          </a>
        </Link>
      </div>

      <div className="flex flex-col items-center justify-center p-2">
        <Link href={`/product/${product.slug}`}>
          <div className='mb-4 bg-slate-700 w-full h-16 text-center'>
            <a>
              <h2 className=" text-inherit font-semibold">{product.name}</h2>
            </a>
          </div>

        </Link>
        <div className="bg-blue-200 w-full text-center">
          <p className='text-[#1D912C] font-bold text-auto mb-2'>{product.price} ₽</p>
        </div>

        <div className='w-full flex justify-center bg-green-200'>
          <button
            className="primary-button text-white font-medium flex justify-center items-center h-8"
            type="button"
            onClick={() => addToCartHandler(product)}
          >
            <span className=" text-xs">В корзину</span>
          </button>
        </div>
      </div>
    </div>
  );
}
