import React from "react";

const FooterLotus = () => {
  return (
    <footer className="h-full bg-[#000000] py-12 ">
      <div
        className="container flex 
            flex-col 
            md:flex-row 
            justify-between h-full mx-auto px-5 text-white
            text-center
            md:text-left
            space-y-7
            md: space-y-0
            "
      >
        <div>
          <h1 className=" text-3x1 font-bold mb-10">SOON</h1>
        </div>
        <div>
          <h1 className=" text-3x1 font-bold mb-10">Информация</h1>
          <ul className="space-y-5">
            <li>
              <a href="#">Оплата и доставка</a>
            </li>
            <li>
              <a href="#">О компании</a>
            </li>
            <li>
              <a href="#">Дисконтная карта</a>
            </li>
            <li>
              <a href="#">Рецепты</a>
            </li>
            <li>
              <a href="#">Оптовикам</a>
            </li>
            <li>
              <a href="#">Контакты</a>
            </li>
          </ul>
        </div>
        <div>
          <h1 className=" text-3x1 font-bold mb-10">Магазин</h1>
        </div>
        <div>
          <h1 className=" text-3x1 font-bold mb-10">Контакты</h1>
          <ul className="space-y-5 mb-7">
            <li>+7 (123) 456 78 90</li>
            <li>abcxyz123456@gmail.com</li>
          </ul>
          <h1 className=" text-3x1 font-bold mb-10">Наши магазины</h1>
        </div>
      </div>
    </footer>
  );
};

export default FooterLotus;
