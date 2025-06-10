"use client";

import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Lock, EyeOffIcon, EyeIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ReactNode, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import Header from '@/components/blocks/header/Header';
import { useAuth } from '@/context/AuthContext';
import { toastStyle } from '@/styles/toastStyle';
import { SignInType } from '@/types/auth/types';
import { SignIn } from '@/utils/api/auth';
import { SignInValidation } from '@/utils/validations/auth';

export default function SignInPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<SignInType>({
    mode: 'onSubmit',
    resolver: zodResolver(SignInValidation)
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { setUser } = useAuth();
  const router = useRouter();

  const formSubmit = async ({ email, password }: SignInType) => {
    const loadingToast = toast.loading("処理中です...");
    try {
      const res = await SignIn(email, password);
      const user = res.data;
      if (!res.error) {
        toast.success("ログインに成功しました！", {
          duration: 1200,
          id: loadingToast
        });
        setTimeout(() => {
          toast.remove();
          setUser(user);
          router.push("/dashboard");
        }, 1200);
      } else {
        toast.error("メールアドレスまたはパスワードが正しくありません。", {
          style: toastStyle,
          id: loadingToast
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("ログインに失敗しました。", { id: loadingToast });
    }
  };

  return (
    <>
      <Header />
      <div className="h-screen flex items-center justify-center bg-emerald-50">
        <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-xl mt-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">おかえりなさい</h2>
          </div>

          <form onSubmit={handleSubmit(formSubmit)} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-gray-700">
                メールアドレス
              </label>
              <div className="mt-1 relative">
                <div className="absolute top-1/3 left-3 -translate-y-[45%] pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  className="block w-full pl-10 py-2 border border-gray-300 rounded-md shadow-sm"
                  placeholder="carrer@compiler.com"
                  autoComplete="username"
                />
                <p className="text-red-400 min-h-[1rem] text-xs my-1 ml-2">{errors.email?.message as ReactNode}</p>
              </div>
            </div>

            <div>
              <label htmlFor="password" className="text-sm font-bold text-gray-700">
                パスワード
              </label>
              <div className="mt-1 relative">
                <div className="absolute top-1/3 left-3 -translate-y-[50%] pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <div >
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                    className="w-full pl-10 py-2 border border-gray-300 rounded-md shadow-sm"
                    placeholder="••••••"
                    autoComplete="current-password"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)} 
                    className="absolute top-1/3 -translate-y-[50%] right-0 pr-5 text-slate-400"
                  >
                    {showPassword ? (
                      <EyeOffIcon className='h-5 w-5' />
                    ) : (
                      <EyeIcon className='h-5 w-5' />
                    )}
                  </button>
                  <p className="text-red-400 min-h-[1rem] text-xs my-1 ml-2">{errors.password?.message as ReactNode}</p>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2 shadow-lg rounded-md text-sm font-bold text-white bg-emerald-700"
            >
              ログイン
            </button>

            <p className="text-center">
              <Link href="/signUp" className="text-sm text-emerald-600 underline">
                新規ユーザー登録はこちら
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};