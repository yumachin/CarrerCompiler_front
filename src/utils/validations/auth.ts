import { z } from "zod";

export const SignUpValidation = z.object({
  name: z.string().min(1, "必須項目です。").max(10, "10文字以内で入力して下さい。"),
  email: z.string().min(1, "必須項目です。").email("正しい形式でメールアドレスを入力して下さい。"),
  password: z.string().min(1, "必須項目です。").min(6, "6文字以上で入力して下さい。").max(15, "15文字以内で入力して下さい")
});

export const SignInValidation = z.object({
  email: z.string().min(1, "必須項目です。").email("正しい形式でメールアドレスを入力して下さい。"),
  password: z.string().min(1, "必須項目です。").min(6, "6文字以上で入力して下さい。").max(15, "15文字以内で入力して下さい")
});