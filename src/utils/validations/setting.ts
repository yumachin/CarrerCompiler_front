import { z } from "zod";

export const SettingValidation = z.object({
  name: z.string().min(1, "必須項目です。").max(10, "10文字以内で入力して下さい。"),
  email: z.string().min(1, "必須項目です。").email("正しい形式でメールアドレスを入力して下さい。")
});