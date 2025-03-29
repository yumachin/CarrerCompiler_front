import { z } from "zod";

export const InterviewValidation = z.object({
  name: z.string().min(1, "必須項目です。").max(30, "30文字以内で入力して下さい。"),
  date: z.date().nullable().optional(),
  selectionId: z.number(),
  interviewType: z.string().max(30, "30文字以内で入力して下さい。"),
  // refine: ((value) => (条件), { message: "エラーメッセージ" })で、条件を満たさない場合エラー
  // url().safeParse(value).success: valueがURLの形式ならtrue
  onlineURL: z.string().refine(value => value === "" || z.string().url().safeParse(value).success, {
    message: "URLが無効です。"
  })
});

export const MeetingValidation = z.object({
  name: z.string().min(1, "必須項目です。").max(30, "30文字以内で入力して下さい。"),
  date: z.date().nullable().optional(),
  meetingType: z.string().max(30, "30文字以内で入力して下さい。"),
  onlineURL: z.string().refine(value => value === "" || z.string().url().safeParse(value).success, {
    message: "URLが無効です。"
  })
});