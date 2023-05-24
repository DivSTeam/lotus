import Link from "next/link";
import React, { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import Layout from "../components/Layout";
import { getError } from "../utils/error";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export default function LoginScreen() {
  const { data: session } = useSession();

  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || "/");
    }
  }, [router, session, redirect]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const submitHandler = async ({ email, password }) => {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };
  return (
    <Layout title="Login">
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mt-16 mb-14 text-4xl font-bold text-center">Вход</h1>
        <div className="mb-6 mx-auto w-full max-w-md ">
          <label className="block mb-2 text-xs" htmlFor="email">
            Email или Телефон
          </label>
          <input
            type="email"
            {...register("email", {
              required: "Логин обязателен",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                message:
                  "Пожалуйста, введите действительный адрес электронной почты",
              },
            })}
            className="w-full px-4 py-2 rounded-lg"
            id="email"
            autoFocus
          ></input>
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}
        </div>
        <div className=" mx-auto w-full max-w-md">
          <label className="block mb-2 text-xs" htmlFor="password">
            Пароль
          </label>
          <input
            type="password"
            {...register("password", {
              required: "Пароль обязателен",
              minLength: { value: 6, message: "пароль больше 5 символов" },
            })}
            className="w-full px-4 py-2 rounded-lg"
            id="password"
            autoFocus
          ></input>
          <div className="text-right text-xs">
            <Link href="#">Забыли пароль?</Link>
          </div>
          {errors.password && (
            <div className="text-red-500 ">{errors.password.message}</div>
          )}
        </div>
        <div className="mb-6 w-full max-w-md mx-auto flex items-center">
          <input
            type="checkbox"
            className=""
            id="save-password"
            {...register("savePassword")}
          />
          <label
            className="ml-2 text-xs inline-block line-he"
            htmlFor="save-password"
          // style="display: inline-block; line-height: 2px;"
          >
            Запомнить меня
          </label>
        </div>
        <div className="mb-4 m-full max-w-md mx-auto">
          <button className="w-full bg-black text-white font-medium rounded-lg text-sm h-10">
            Войти
          </button>
        </div>
        <div className="mb-36 flex space-x-10 text-xs items-center mx-auto m-full max-w-md">
          <p className="ml-28">Впервые у нас?</p>
          <Link href={`/register?redirect=${redirect || "/"}`}>
            Зарегистрироваться
          </Link>
        </div>
      </form>
    </Layout>
  );
}
