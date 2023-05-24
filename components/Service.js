/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from "react";

const Service = () => {
  return (
    <div
      className="flex 
        flex-col
        items-center
        justify-center
        md:flex-row
        md:justify-between
        p-4  mt-3"
    >
      <div className="w-[267px] flex flex-col items-center md:items-start space-y-2 ">
        <div>
          <img src="/images/heart.png" />
        </div>
        <div>
          <h1 className="text-3x1 font-bold">Выгодные условия</h1>
        </div>
        <div>
          <p>для оптовых клиентов</p>
        </div>
      </div>
      <div className=" w-[267px] flex flex-col items-center md:items-start space-y-2 ">
        <div>
          <img src="/images/car.png" />
        </div>
        <div>
          <h1 className="text-3x1 font-bold">Бесплатная доставка</h1>
        </div>
        <div>
          <p>по Санкт-Петербургу от 1800 руб</p>
        </div>
      </div>
      <div className=" w-[267px] flex flex-col items-center md:items-start  space-y-2 ">
        <div className>
          <img src="/images/shop.png" />
        </div>
        <div>
          <h1 className="text-3x1 font-bold">Бесплатный самовывоз</h1>
        </div>
        <div>
          <p>из 14 розничных магазинов</p>
        </div>
      </div>
      <div className="w-[267px] flex flex-col items-center md:items-start space-y-2 ">
        <div>
          <img src="/images/click.png" />
        </div>
        <div>
          <h1 className="text-3x1 font-bold">Дисконтная карта</h1>
        </div>
        <div>
          <p>на скидку 7% при покупке от 3000 руб</p>
        </div>
      </div>
    </div>
  );
};
export default Service;
