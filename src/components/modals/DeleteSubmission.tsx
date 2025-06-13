"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

import { toastStyle } from "@/styles/toastStyle";
import { DestroySubmission } from "@/utils/api/submission";

import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";

export default function DeleteSubmission({ id }: { id: number }) {
  const [confirm, setConfirm] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    toast.dismiss();
    const loadingToast = toast.loading("削除中です...");

    try {
      const res = await DestroySubmission(id);
      if (!res.error) {
        toast.success("提出物・タスクの削除に成功しました！", {
          duration: 1200,
          id: loadingToast,
        });
        setTimeout(() => {
          toast.remove();
          setConfirm(false);
          window.location.reload();
        }, 1200);
      } else {
        if (res.error === "トークン切れ") {
          toast.error("アクセス権がありません。ログインしなおしてください。", {
            style: toastStyle,
            duration: 1200,
            id: loadingToast,
          });
        } else if (res.error === "ユーザーが見つかりません") {
          toast.error("ユーザーが見つかりません。ログインしなおしてください。", {
            style: toastStyle,
            duration: 1200,
            id: loadingToast,
          });
        } else {
          toast.error("削除に失敗しました。", {
            style: toastStyle,
            duration: 1200,
            id: loadingToast,
          });
        }
        router.push("/signIn");
      }
    } catch (error) {
      console.error("削除失敗", error);
    }
  };

  return (
    <Dialog open={confirm} onOpenChange={setConfirm}>
      <DialogTrigger asChild>
        <button className="px-2.5 py-1.5 text-xs font-bold rounded-sm shadow-md bg-red-400 text-white cursor-pointer hover:translate-y-0.5">
          削除
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="mb-8">
          <DialogTitle className="text-2xl mb-4">削除の確認</DialogTitle>
          <DialogDescription className="ml-4">
            本当に削除しますか？
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setConfirm(false)}>
            キャンセル
          </Button>
          <Button 
            onClick={handleDelete}
            className="bg-red-500 cursor-pointer"
          >
            削除する
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};