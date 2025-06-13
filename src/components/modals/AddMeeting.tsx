"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Building2, CalendarDays, Globe, Presentation } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
import DatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import "react-datepicker/dist/react-datepicker.css";

import { toastStyle } from "@/styles/toastStyle";
import { PostCompany } from "@/utils/api/company";
import { PostMeeting } from "@/utils/api/meeting";
import { MeetingValidation } from "@/utils/validations/post";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";

export default function AddMeeting() {
  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");
  const [date, setDate] = useState<Date | null | undefined>(null);
  const [meetingType, setMeetingType] = useState("");
  const [onlineURL, setOnlineURL] = useState("");

  const router = useRouter();

  const { register, handleSubmit, control, formState: { errors } } = useForm<MeetingType>({
    mode: "onSubmit",
    defaultValues: { date: null, meetingType: "", onlineURL: "" },
    resolver: zodResolver(MeetingValidation),
  });

  const formSubmit = async ({ name, date, meetingType, onlineURL }: MeetingType) => {
    toast.dismiss();
    const loadingToast = toast.loading("処理中です...");

    try {
      const company = await PostCompany(name);
      const res = await PostMeeting(company.id, date, meetingType, onlineURL);
      if (!res.error) {
        toast.success("面談・説明会の予定を追加しました！", {
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
            id: loadingToast
          });
        } else {
          toast.error("ユーザーが見つかりません。ログインしなおしてください。", {
            style: toastStyle,
            duration: 1200,
            id: loadingToast
          });
        }
        setTimeout(() => {
          toast.remove();
          setOpen(false);
          router.push("/signIn");
        }, 1200);
      }
    } catch (error) {
      console.error("面談・説明会予定追加エラー", error);
      toast.error("面談・説明会の予定の追加に失敗しました。", {
        id: loadingToast
      });
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button className="mr-12 px-4 py-3 shadow-lg rounded-md text-sm font-bold text-white bg-emerald-700 cursor-pointer hover:translate-y-0.5">
            面談・説明会を追加
          </button>
        </DialogTrigger>
        <DialogContent
          className="sm:max-w-[425px] bg-white"
          aria-describedby="dialog-description"
        >
          <div className="space-y-4">
            <DialogHeader className="mb-6">
              <DialogTitle className="text-lg">面談・説明会の予定を入力</DialogTitle>
              <DialogDescription className="text-xs flex gap-1 items-center">
                <span className="text-red-500">*</span>
                <span className="text-gray-500">は必須項目</span>
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(formSubmit)}>
              <div>
                <label htmlFor="name" className="text-sm font-bold text-gray-700 flex items-center gap-1">
                  会社名 <span className="text-red-500 font-bold">*</span>
                </label>
                <div className="mt-1 relative">
                  <div className="absolute top-1/3 left-3 -translate-y-[45%] pointer-events-none">
                    <Building2 className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="name"
                    type="text"
                    {...register("name")}
                    placeholder="株式会社CareerCompiler"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <p className="text-red-400 min-h-[1rem] text-xs mt-1 mb-2 ml-2">
                    {errors.name?.message as ReactNode}
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
                    onClick={() => setDate(null)}
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
                        selected={date}
                        onChange={(selectedDate) => {
                          setDate(selectedDate);
                          field.onChange(selectedDate);
                        }}
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
                    value={meetingType}
                    onChange={(e) => setMeetingType(e.target.value)}
                  />
                  <p className="text-red-400 min-h-[1rem] text-xs mt-1 mb-2 ml-2">
                    {errors.meetingType?.message as ReactNode}
                  </p>
                </div>
              </div>
              <div>
                <label
                  htmlFor="onlineURL"
                  className="text-sm font-bold text-gray-700"
                >
                  面談・説明会URL
                </label>
                <div className="mt-1 relative">
                  <div className="absolute top-1/3 left-3 -translate-y-[45%] pointer-events-none">
                    <Globe className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="onlineURL"
                    type="text"
                    {...register("onlineURL")}
                    placeholder="https://career.com"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm"
                    value={onlineURL}
                    onChange={(e) => setOnlineURL(e.target.value)}
                  />
                  <p className="text-red-400 min-h-[1rem] text-xs mt-1 mb-2 ml-2">
                    {errors.onlineURL?.message as ReactNode}
                  </p>
                </div>
              </div>
              <button className="w-full mt-6 py-2 rounded-md text-sm font-bold text-white bg-emerald-700">
                追加
              </button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

type MeetingType = {
  name: string;
  date?: Date | null | undefined;
  meetingType: string;
  onlineURL: string;
};