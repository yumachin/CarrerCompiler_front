"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Building2, CalendarDays, Globe, Presentation } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
import DatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

import "react-datepicker/dist/react-datepicker.css";

import { toastStyle } from "@/styles/toastStyle";
import { UpdateCompany } from "@/utils/api/company";
import { UpdateMeeting } from "@/utils/api/meeting";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";

export default function EditMeeting(props: EditMeetingProps) {
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const { register, handleSubmit, control, setValue, formState: { errors } } = useForm<MeetingType>({
    mode: "onSubmit",
    defaultValues: {
      companyName: props.meeting.companyName,
      date: props.meeting.date ? new Date(props.meeting.date) : null, 
      meetingType: props.meeting.meetingType, 
      onlineUrl: props.meeting.onlineUrl 
    },
    resolver: zodResolver(MeetingValidation)
  });

  const formSubmit = async ({ companyName, date, meetingType, onlineUrl }: MeetingType) => {
    toast.dismiss();
    const loadingToast = toast.loading("編集中です...");

    try {
      await UpdateCompany(props.meeting.companyId, companyName);
      
      const res = await UpdateMeeting(
        props.meeting.id,
        props.meeting.companyId,
        date,
        meetingType,
        onlineUrl
      );
      
      if (!res.error) {
        toast.success("面談・説明会の編集に成功しました！", {
          duration: 1200,
          id: loadingToast,
        });
        setTimeout(() => {
          toast.remove();
          setOpen(false);
          window.location.reload();
        }, 1200);
      } else {
        if (res.error === "トークン切れ") {
          toast.error("アクセス権がありません。ログインしなおしてください。", {
            style: toastStyle,
            duration: 1200,
            id: loadingToast,
          });
        } else {
          toast.error("ユーザーが見つかりません。ログインしなおしてください。", {
            style: toastStyle,
            duration: 1200,
            id: loadingToast,
          });
        }
        setTimeout(() => {
          toast.remove();
          setOpen(false);
          router.push("/signIn");
        }, 1200);
      }
    } catch (error) {
      console.error("面談・説明会編集エラー", error);
      toast.error("面談・説明会の編集に失敗しました。", {
        id: loadingToast,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="px-2.5 py-1.5 text-xs font-bold rounded-sm shadow-md bg-emerald-600 text-white cursor-pointer hover:translate-y-0.5">
          編集
        </button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px] bg-white"
        aria-describedby="dialog-description"
      >
        <div className="space-y-4">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-lg">面談・説明会を編集</DialogTitle>
            <DialogDescription className="text-xs flex gap-1 items-center">
              <span className="text-red-500">*</span>
              <span className="text-gray-500">は必須項目</span>
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(formSubmit)}>
            <div>
              <label htmlFor="companyName" className="text-sm font-bold text-gray-700 flex items-center gap-1">
                会社名 <span className="text-red-500 font-bold">*</span>
              </label>
              <div className="mt-1 relative">
                <div className="absolute top-1/3 left-3 -translate-y-[45%] pointer-events-none">
                  <Building2 className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="companyName"
                  type="text"
                  {...register("companyName")}
                  placeholder="株式会社CareerCompiler"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm"
                />
                <p className="text-red-400 min-h-[1rem] text-xs mt-1 mb-2 ml-2">
                  {errors.companyName?.message as ReactNode}
                </p>
              </div>
            </div>          
            <div>
              <div className="flex justify-between items-end">
                <label className="text-sm font-bold text-gray-700">
                  実施日
                </label>
                <button
                  type="button"
                  onClick={() => setValue("date", null)}
                  className="mr-2 text-xs font-bold text-red-400 cursor-pointer"
                >
                  クリア
                </button>
              </div>
              <div className="mt-1 relative">
                <div className="absolute top-1/3 left-3 -translate-y-[45%] pointer-events-none">
                  <CalendarDays className="h-5 w-5 text-gray-400" />
                </div>
                <Controller
                  control={control}
                  name="date"
                  render={({ field }) => (
                    <DatePicker
                      selected={field.value}
                      onChange={(selectedDate) => field.onChange(selectedDate)}
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={30}
                      dateFormat="yyyy/MM/dd HH:mm"
                      className="w-full pl-10 py-2 border border-gray-300 rounded-md shadow-sm cursor-pointer"
                      wrapperClassName="w-full"
                    />
                  )}
                />
                <p className="text-red-400 min-h-[1rem] text-xs mt-1 mb-2 ml-2">
                  {errors.date?.message as ReactNode}
                </p>
              </div>
            </div>
            <div>
              <label
                htmlFor="meetingType"
                className="text-sm font-bold text-gray-700"
              >
                実施形態・場所
              </label>
              <div className="mt-1 relative">
                <div className="absolute top-1/3 left-3 -translate-y-[45%] pointer-events-none">
                  <Presentation className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="meetingType"
                  type="text"
                  {...register("meetingType")}
                  placeholder="対面 / 東京本社"
                  className="w-full pl-10 py-2 border border-gray-300 rounded-md shadow-sm"
                />
                <p className="text-red-400 min-h-[1rem] text-xs mt-1 mb-2 ml-2">
                  {errors.meetingType?.message as ReactNode}
                </p>
              </div>
            </div>
            <div>
              <label
                htmlFor="onlineUrl"
                className="text-sm font-bold text-gray-700"
              >
                提出先URL
              </label>
              <div className="mt-1 relative">
                <div className="absolute top-1/3 left-3 -translate-y-[45%] pointer-events-none">
                  <Globe className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="onlineUrl"
                  type="text"
                  {...register("onlineUrl")}
                  placeholder="https://career.com"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm"
                />
                <p className="text-red-400 min-h-[1rem] text-xs mt-1 mb-2 ml-2">
                  {errors.onlineUrl?.message as ReactNode}
                </p>
              </div>
            </div>
            <button className="w-full mt-6 py-2 rounded-md text-sm font-bold text-white bg-emerald-700">
              編集完了
            </button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

type EditMeetingProps = {
  meeting: MeetingTypeProps;
};

type MeetingTypeProps = {
  id: number;
  companyId: number;
  companyName: string;
  date?: string | null | undefined;
  meetingType: string;
  onlineUrl: string;
};

type MeetingType = {
  companyName: string;
  date?: Date | null | undefined;
  meetingType: string;
  onlineUrl: string;
};

const MeetingValidation = z.object({
  companyName: z.string().min(1, "必須項目です。").max(30, "30文字以内で入力して下さい。"),
  date: z.date().nullable().optional(),
  meetingType: z.string(),
  onlineUrl: z.string().refine(
    (value) => value === "" || z.string().url().safeParse(value).success, { message: "URLが無効です。" }
  )
});