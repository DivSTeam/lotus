/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React, { useState } from 'react';
import { HeartIcon } from '@heroicons/react/outline';

export default function ProductItem({ product, addToCartHandler }) {
  const [fill, setFill] = useState(false);

  return (
    <div className="card w-52 h-auto ">
      <div className='w-auto h-44 relative'>
        <button className='h-6 w-6 absolute right-1 top-1' onClick={() => setFill(!fill)}>
          <HeartIcon className={fill ? 'fill-black' : ''} />
        </button>
        <Link href={`/product/${product.slug}`}>
          <a>
            <img
              src={product.image}
              alt={product.name}
              className="rounded-0 shadow-sm w-full h-full object-cover p-6 "
            />
          </a>
        </Link>
      </div>

      <div className="flex flex-col items-center justify-center p-2">
        <Link href={`/product/${product.slug}`}>
          <div className='  w-full h-12 text-center'>
            <a>
              <h2 className=" text-inherit font-semibold">{product.name}</h2>
            </a>
          </div>

        </Link>
        <div className="w-full text-center">
          <p className='text-[#1D912C] font-bold text-auto mb-2'>{product.price} ₽</p>
        </div>

        <div className='w-full flex justify-center mb-4'>
          <button
            className={
              (product.countInStock)
                ? "available-button text-white font-medium flex justify-center items-center h-8"
                : "unavailable-button text-[#666666] font-medium flex justify-center items-center h-8"
            }
            type="button"
            onClick={() => addToCartHandler(product)}
          >
            {
              (product.countInStock)
                ? <span className=" text-xs">В корзину</span>
                : <span className=" text-xs">Нет в наличии</span>
            }
          </button>
        </div>
      </div>
    </div>
  );
}
