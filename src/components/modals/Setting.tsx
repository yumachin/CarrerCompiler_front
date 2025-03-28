"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FolderPen, Mail, Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { toastStyle } from "@/styles/toastStyle";
import { SettingType } from "@/types/setting/types";
import { EditUserProfile } from "@/utils/api/user";
import { SettingValidation } from "@/utils/validations/setting";

import SignOut from "./SignOut";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";

export default function Setting(props: SettingProps) {
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [name, setName] = useState(props.user?.name);
  const [email, setEmail] = useState(props.user?.email);
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm<SettingType>({
    mode: 'onSubmit',
    resolver: zodResolver(SettingValidation)
  });

  const formSubmit = async ({ name, email }: SettingType) => {
    toast.dismiss();
    const loadingToast = toast.loading("処理中です...");

    try {
      const res = await EditUserProfile(name, email);
      console.log("resは", res);
      if (!res.error) {
        toast.success("ユーザー情報を更新しました！", {
          duration: 1200,
          id: loadingToast
        });
        setTimeout(() => {
          toast.remove();
          setOpen(false);
        }, 1200);
      } else if (res.error === "トークン切れ") {
        toast.error("アクセス権がありません。ログインしなおしてください。", {
          style: toastStyle,
          duration: 1200,
          id: loadingToast
        });
        setTimeout(() => {
          toast.remove();
          setOpen(false);
          router.push("/signIn");
        }, 1200);
      } else {
        toast.error("ユーザーが見つかりません。ログインしなおしてください。", {
          style: toastStyle,
          duration: 1200,
          id: loadingToast
        });
        setTimeout(() => {
          toast.remove();
          setOpen(false);
          router.push("/signIn");
        }, 1200);
      }
    } catch (error) {
      console.error("ユーザー情報更新エラー", error);
      toast.error("ユーザー情報の更新に失敗しました。", { id: loadingToast });
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <div className="flex items-center px-5 py-8 text-gray-100 font-bold gap-3 cursor-pointer">
            <Settings />
            設定
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-white">
          <div className="space-y-4">
            <DialogHeader>
              <DialogTitle className="text-lg">プロフィールを編集</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(formSubmit)}>
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <p className="text-red-400 min-h-[1rem] text-xs mt-1 mb-2 ml-2">{errors.name?.message as ReactNode}</p>
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <p className="text-red-400 min-h-[1rem] text-xs mt-1 mb-2 ml-2">{errors.email?.message as ReactNode}</p>
                </div>
              </div>
              <button
                type="submit"
                className="w-full mt-4 py-2 shadow-md rounded-md text-sm font-bold text-white bg-emerald-700"
              >
                保存
              </button>
            </form>
          </div>
          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 text-gray-500 bg-white">または</span>
            </div>
          </div>
          <button
            type="submit"
            className="w-full mt-3 py-2 shadow-md rounded-md text-sm font-bold text-white bg-red-500"
            onClick={() => setConfirm(true)}
          >
            ログアウト
          </button>
          <SignOut confirm={confirm} setConfirm={setConfirm} />
        </DialogContent>
      </Dialog>
    </>
  );
};

type SettingProps = {
  user: UserType | null;
};

type UserType = {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
}