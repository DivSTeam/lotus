import Link from "next/link";
import React, { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import Layout from "../components/Layout";
import { getError } from "../utils/error";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import axios from "axios";

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
    getValues,
    formState: { errors },
  } = useForm();
  const submitHandler = async ({ name, email, password }) => {
    try {
      await axios.post("/api/auth/signup", {
        name,
        email,
        password,
      });

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
    <Layout title="Create Account">
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mt-16 mb-14 text-4xl font-bold text-center">
          Регистрация
        </h1>
        <div className="mb-6 mx-auto w-full max-w-md">
          <label className="block mb-2 text-xs" htmlFor="name">
            Имя *
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 rounded-lg"
            id="name"
            autoFocus
            {...register("name", {
              required: "Пожалуйста, введите имя",
            })}
          />
          {errors.name && (
            <div className="text-red-500">{errors.name.message}</div>
          )}
        </div>
        <div className="mb-6 mx-auto w-full max-w-md">
          <label className="block mb-2 text-xs" htmlFor="lastName">
            Фамилия *
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 rounded-lg"
            id="lastName"
            autoFocus
            {...register("lastName", {
              required: "Пожалуйста, введите фамилию",
            })}
          />
          {errors.name && (
            <div className="text-red-500">{errors.lastName.message}</div>
          )}
        </div>
        <div className="mb-6 mx-auto w-full max-w-md">
          <label className="block mb-2 text-xs" htmlFor="phoneNumber">
            Телефон *
          </label>
          <input
            type="text"
            {...register("phoneNumber", {
              required: "Пожалуйста, введите номер телефона",
              pattern: {
                value:
                  /^[\\+]?[(]?[0-9]{3}[)]?[-\s\\.]?[0-9]{3}[-\s\\.]?[0-9]{4,6}$/im,
                message: "Пожалуйста введите правильный номер телефона",
              },
            })}
            className="w-full px-4 py-2 rounded-lg"
            id="phoneNumber"
          ></input>
          {errors.phoneNumber && (
            <div className="text-red-500">{errors.phoneNumber.message}</div>
          )}
        </div>

        <div className="mb-6 mx-auto w-full max-w-md">
          <label className="block mb-2 text-xs" htmlFor="email">
            Email *
          </label>
          <input
            type="email"
            {...register("email", {
              required: "Пожалуйста, введите адрес электронной почты",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                message:
                  "Пожалуйста, введите действительный адрес электронной почты",
              },
            })}
            className="w-full px-4 py-2 rounded-lg"
            id="email"
          ></input>
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}
        </div>
        <div className="mb-6 mx-auto w-full max-w-md">
          <label className="block mb-2 text-xs" htmlFor="birthday">
            Дата рождения *
          </label>
          <input
            type="date"
            {...register("birthday", {
              required: "Пожалуйста, введите свой день рождения",
            })}
            className="w-full px-4 py-2 rounded-lg"
            id="birthday"
          />
          {errors.birthday && (
            <div className="text-red-500">{errors.birthday.message}</div>
          )}
        </div>
        <div className="mb-6 mx-auto w-full max-w-md text-xs">
          <label className="block mb-2 text-xs">Пол *</label>
          <div className="flex justify-evenly">
            <div className="flex items-center">
              <input
                type="checkbox"
                {...register("gender", {
                  required: "Пожалуйста, выберите пол",
                })}
                value="Мужской"
                id="male"
              />
              <label className="ml-2" htmlFor="male">
                Мужской
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                {...register("gender", {
                  required: "Пожалуйста, выберите пол",
                })}
                value="Женский"
                id="female"
              />
              <label className="ml-2" htmlFor="female">
                Женский
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                {...register("gender", {
                  required: "Пожалуйста, выберите пол",
                })}
                value="I AM GAY"
                id="gay"
              />
              <label className="ml-2" htmlFor="gay">
                I AM GAY
              </label>
            </div>
            {errors.gender && (
              <div className="text-red-500">{errors.gender.message}</div>
            )}
          </div>
        </div>
        <div className="mb-6 mx-auto w-full max-w-md">
          <label className="block mb-2 text-xs" htmlFor="password">
            Пароль *
          </label>
          <input
            type="password"
            {...register("password", {
              required: "Пожалуйста введите пароль",
              minLength: {
                value: 6,
                message: "Пароль должен содержать не менее 6 символов",
              },
              pattern: {
                value:
                  /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+-=])[A-Za-z\d!@#$%^&*()_+-=]{6,}$/,
                message:
                  "Пароль должен содержать хотя бы одну заглавную букву, одну цифру и один специальный символ",
              },
            })}
            className="w-full px-4 py-2 rounded-lg"
            id="password"
            autoFocus
          ></input>
          {errors.password && (
            <div className="text-red-500 ">{errors.password.message}</div>
          )}
        </div>
        <div className="mb-20 mx-auto w-full max-w-md">
          <label className="block mb-2 text-xs" htmlFor="confirmPassword">
            Подтвердите пароль *
          </label>
          <input
            className="w-full px-4 py-2 rounded-lg"
            type="password"
            id="confirmPassword"
            {...register("confirmPassword", {
              required: "Пожалуйста, введите пароль для подтверждения",
              validate: (value) => value === getValues("password"),
              minLength: {
                value: 6,
                message: "Подтвердите пароль более 5 символов",
              },
            })}
          />
          {errors.confirmPassword && (
            <div className="text-red-500 ">
              {errors.confirmPassword.message}
            </div>
          )}
          {errors.confirmPassword &&
            errors.confirmPassword.type === "validate" && (
              <div className="text-red-500 ">Пароль не подходит</div>
            )}
        </div>

        <div className="mb-4 m-full max-w-md mx-auto ">
          <button className="w-full bg-black text-white font-medium rounded-lg text-sm h-10">
            Регистрация
          </button>
        </div>
        <div className="mb-36 flex space-x-10 text-xs items-center mx-auto m-full max-w-md">
          <p className="ml-28">Уже регистрировались?</p>
          <Link href="/login">Вход</Link>
        </div>
      </form>
    </Layout>
  );
}
