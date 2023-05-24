/* eslint-disable @next/next/link-passhref */
/* eslint-disable @next/next/no-img-element */
import { signOut, useSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import Cookies from 'js-cookie';
import React, { useContext, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Menu } from '@headlessui/react';
import 'react-toastify/dist/ReactToastify.css';
import { Store } from '../utils/Store';
import DropdownLink from './DropdownLink';
import { useRouter } from 'next/router';
import { SearchIcon } from '@heroicons/react/outline';
import FooterLotus from './FooterLotus.js'

// import FilterPanel from './FilterPanel';


import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PersonIcon from '@mui/icons-material/Person';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import WhereToVoteIcon from '@mui/icons-material/WhereToVote';
import CustomizedMenus from './Menu'

export default function Layout({ title, children }) {
  const { status, data: session } = useSession();

  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);
  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);

  const logoutClickHandler = () => {
    Cookies.remove('cart');
    dispatch({ type: 'CART_RESET' });
    signOut({ callbackUrl: '/login' });
  };

  const [query, setQuery] = useState('');

  const router = useRouter();
  const submitHandler = (e) => {
    e.preventDefault();
    router.push(`/search?query=${query}`);
  };

  return (
    <>
      <Head>
        <title>{title ? title + ' - Lotus' : 'Lotus'}</title>
        <meta name="description" content="lotus" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ToastContainer position="bottom-center" limit={1} />


      <div className="flex min-h-screen flex-col justify-between relative m-auto">


        <header className="sticky top-[-60px] bg-white shadow-md py-2 z-50 ">
          <div className="w-full h-8 flex gap-10 justify-between container m-auto ">
            <div className="mail flex ">
              <MailOutlineIcon />
              <p>lotus@gmail.com</p>
            </div>
            <div className="map flex">
              <WhereToVoteIcon />
              <p>Saint Petersburg</p>
            </div>
            <div className="info lg:flex md:hidden">
              <ul className=" flex gap-2">
                <li>О компании</li>
                <li>Оплата и доставка</li>
                <li>Дисконтная карта</li>
                <li>Рецепты</li>
                <li>Оптовикам</li>
                <li>Контакты</li>
              </ul>
            </div></div>
          <hr className='mx-2' />
          <nav className="flex h-12 items-center  justify-between  w-full m-auto container mt-1">
            <Link href="/" >
              <img
                src={'/images/logo-pdp-1.png'}
                alt={'logo'}
                className="rounded shadow object-cover h-8 w-10 min-w-[150px]"
              />
            </Link>

            <CustomizedMenus className={'bg-green-600'} />

            <form
              onSubmit={submitHandler}
              className="mx-auto hidden w-full justify-center md:flex "
            >
              <input
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                className="rounded-tr-none rounded-br-none p-1 text-sm   min-w-[500px] focus:ring-0"
                placeholder="Search products"
              />
              <button
                className="rounded rounded-tl-none rounded-bl-none bg-green-500 p-1 text-sm dark:text-black"
                type="submit"
                id="button-addon2"
              >
                <SearchIcon className="h-5 w-5"></SearchIcon>
              </button>
            </form>
            <div className='flex w-30'>

              <Link href="/cart">
                <a className="p-2 flex items-center">
                  <FavoriteBorderIcon />
                </a>
              </Link>

              <Link href="/cart">
                <a className="p-2 flex flex-col-reverse">
                  <AddShoppingCartIcon />
                  {cartItemsCount > 0 && (
                    <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                      {cartItemsCount}
                    </span>
                  )}
                </a>
              </Link>

              {status === 'loading' ? (
                'Loading'
              ) : session?.user ? (
                <Menu as="div" className=" relative flex inline-block  align-middle">
                  <Menu.Button className="text-green-600 flex my-auto mx-0" >
                    <PersonIcon /><p className="whitespace-nowrap">{session.user.name}</p>
                  </Menu.Button>
                  <Menu.Items className="absolute right-0 w-56 mt-11 -mr-4 origin-top-right bg-white  shadow-lg rounded-md ">
                    <Menu.Item >
                      <DropdownLink className="dropdown-link" href="/profile">
                        Profile
                      </DropdownLink>
                    </Menu.Item>
                    <Menu.Item>
                      <DropdownLink
                        className="dropdown-link"
                        href="/order-history"
                      >
                        Order History
                      </DropdownLink>
                    </Menu.Item>
                    {session.user.isAdmin && (
                      <Menu.Item>
                        <DropdownLink
                          className="dropdown-link"
                          href="/admin/dashboard"
                        >
                          Admin Dashboard
                        </DropdownLink>
                      </Menu.Item>
                    )}
                    <Menu.Item>
                      <a
                        className="dropdown-link"
                        href="#"
                        onClick={logoutClickHandler}
                      >
                        Logout
                      </a>
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              ) : (
                <Link href="/login">
                  <a className="p-2 flex items-center">Login</a>
                </Link>
              )}
            </div>
          </nav>
        </header>

        <main className="container m-auto mt-4">{children}</main>

        <FooterLotus />
      </div>
    </>
  );
}
