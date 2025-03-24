import { zodResolver } from "@hookform/resolvers/zod";
import { FolderPen, Mail, Settings } from "lucide-react";
import { ReactNode, useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

import { SettingType } from "@/types/setting/types";
import { SettingValidation } from "@/utils/validations/setting";

import SignOut from "./SignOut";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";

export default function Setting() {
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<SettingType>({
    mode: 'onSubmit',
    resolver: zodResolver(SettingValidation)
  });

  const formSubmit = async ({ name, email }: SettingType) => {
    console.log(name, email);
    toast.dismiss();
    const loadingToast = toast.loading("処理中です...");

    try {
      // await SignUp(name, email);
      toast.success("ユーザー情報を更新しました！", {
        duration: 1700,
        id: loadingToast
      });
    } catch (error) {
      console.error("ユーザー情報更新エラー", error);
      toast.error("ユーザー情報の更新に失敗しました。", { id: loadingToast });
    }
  };

  return (
    <>
      <Toaster />
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
                  />
                  <p className="text-red-400 min-h-[1rem] text-xs mt-1 ml-2">{errors.name?.message as ReactNode}</p>
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
                  <p className="text-red-400 min-h-[1rem] text-xs mt-1 ml-2">{errors.email?.message as ReactNode}</p>
                </div>
              </div>
              <button
                type="submit"
                className="w-full mt-6 py-2 rounded-md text-sm font-bold text-white bg-emerald-700"
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
            className="w-full mt-3 py-2 rounded-md text-sm font-bold text-white bg-red-500"
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