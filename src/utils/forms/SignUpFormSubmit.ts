import toast from "react-hot-toast";

import { toastStyle } from "@/styles/toastStyle";
import { SignUpType } from "@/types/auth/types";

import { SignUp } from "../api/auth";

export const SignUpFormSubmit = async ({ name, email, password }: SignUpType) => {
  const loadingToast = toast.loading("処理中です...");

  try {
    const res = await SignUp(name, email, password);
    if (res.error) {
      toast.error(
        "そのメールアドレスは既に登録されています。",
        {
          style: toastStyle,
          duration: 1200,
          id: loadingToast,
        }
      );
      return false;
    } else {
      toast.success(
        "アカウントが作成されました！",
        {
          style: toastStyle,
          duration: 1200,
          id: loadingToast,
        }
      );
      return true;
    }
  } catch (error) {
    toast.error(
      "アカウントの作成に失敗しました。",
      {
        style: toastStyle,
        duration: 1200,
        id: loadingToast
      }
    );
    console.error(error);
    return false;
  }
};
