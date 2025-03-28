"use client";

import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Lock, EyeOffIcon, EyeIcon, FolderPen } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ReactNode, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import Header from '@/components/blocks/header/Header';
import { toastStyle } from '@/styles/toastStyle';
import { SignUpType } from '@/types/auth/types';
import { SignUp } from '@/utils/api/auth';
import { SignUpValidation }  from '@/utils/validations/auth';

export default function SignUpPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<SignUpType>({
    mode: 'onSubmit',
    resolver: zodResolver(SignUpValidation)
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();

  // react-hook-form により、e.preventDefault() は自動で実行される
  const formSubmit = async ({ name, email, password }: SignUpType) => {
    const loadingToast = toast.loading("処理中です...");

    try {
      const res = await SignUp(name, email, password);
      console.log("resは", res)
      if (res.error) {
        toast.error("そのメールアドレスは既に登録されています。", {
          style: toastStyle,
          id: loadingToast
        });
      } else {
        toast.success("アカウントが作成されました！", {
          duration: 1200,
          id: loadingToast
        });
        setTimeout(() => {
          toast.remove();
          router.push("/dashboard");
        }, 1200);
      }
    } catch (error) {
      console.error(error);
      toast.error("アカウントの作成に失敗しました。", { id: loadingToast });
    }
  };

  return (
    <>
      <Header />
      <div className="h-screen flex items-center justify-center bg-emerald-50">
        <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-2xl mt-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">アカウント作成</h2>
          </div>

          <form onSubmit={handleSubmit(formSubmit)} className="space-y-2">
            <div>
              <label htmlFor="name" className="text-sm font-bold text-gray-700">
                名前
              </label>
              <div className="mt-1 relative">
                <div className="absolute top-1/3 left-3 -translate-y-[45%] pointer-events-none">
                  <FolderPen className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  type="text"
                  {...register("name")} 
                  className="w-full pl-10 py-2 border border-gray-300 rounded-md shadow-sm"
                />
                <p className="text-red-400 min-h-[1rem] text-xs my-1 ml-2">{errors.name?.message as ReactNode}</p>
              </div>
            </div>

            <div>
              <label htmlFor="email" className="text-sm font-bold text-gray-700">
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
                  className="w-full pl-10 py-2 border border-gray-300 rounded-md shadow-sm"
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

            <button
              type="submit"
              className="w-full mt-3 py-2 shadow-lg rounded-md text-sm font-bold text-white bg-emerald-700"
            >
              登録
            </button>

            <p className="text-center">
              <Link href="/signIn" className="text-sm text-emerald-600 underline">
                既にアカウントをお持ちですか？
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};