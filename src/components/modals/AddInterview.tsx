"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Building2, CalendarDays, GitBranch, Globe, Presentation } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import "react-datepicker/dist/react-datepicker.css";

import { toastStyle } from "@/styles/toastStyle";
import { PostCompany } from "@/utils/api/company";
import { PostInterview } from "@/utils/api/interview";
import { InterviewValidation } from "@/utils/validations/post";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";

export default function AddInterview() {
  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");
  const [date, setDate] = useState<Date | null | undefined>(null);
  const [selection, setSelection] = useState("");
  const [selectionId, setSelectionId] = useState(0);
  const [interviewType, setInterviewType] = useState("");
  const [onlineURL, setOnlineURL] = useState("");

  const router = useRouter();

  useEffect(() => {
    switch (selectionId) {
      case 0:
        setSelection("");
        break;
      case 1:
        setSelection("1次面接");
        break;
      case 2:
        setSelection("2次面接");
        break;
      case 3:
        setSelection("3次面接");
        break;
      case 4:
        setSelection("4次面接");
        break;
      case 10:
        setSelection("最終面接");
        break;
    }
  }, [selectionId]);

  const { register, handleSubmit, control, formState: { errors } } = useForm<InterviewType>({
    mode: "onSubmit",
    defaultValues: { date: null, selectionId: 0, interviewType: "", onlineURL: "" },
    resolver: zodResolver(InterviewValidation),
  });

  const formSubmit = async ({ name, date, selectionId, interviewType, onlineURL }: InterviewType) => {
    toast.dismiss();
    const loadingToast = toast.loading("処理中です...");

    try {
      const company = await PostCompany(name);
      const res = await PostInterview(company.id, date, selectionId, interviewType, onlineURL);
      if (!res.error) {
        toast.success("面接の予定を追加しました！", {
          duration: 1200,
          id: loadingToast,
        });
        setOpen(false);
        window.location.reload();
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
        setOpen(false);
        router.push("/signIn");
      }
    } catch (error) {
      console.error("面接予定追加エラー", error);
      toast.error("面接の予定の追加に失敗しました。", { id: loadingToast });
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button className="mr-12 px-4 py-3 shadow-lg rounded-md text-sm font-bold text-white bg-emerald-700">
            面接を追加
          </button>
        </DialogTrigger>
        <DialogContent
          className="sm:max-w-[425px] bg-white"
          aria-describedby="dialog-description"
        >
          <div className="space-y-4">
            <DialogHeader>
              <DialogTitle className="text-lg">面接予定を入力</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(formSubmit)}>
              <div>
                <label
                  htmlFor="name"
                  className="text-sm font-bold text-gray-700"
                >
                  会社名
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
                <div className="flex justify-between items-end">
                  <label className="text-sm font-bold text-gray-700">
                    選考ステータス
                  </label>
                  <button
                    type="button"
                    onClick={() => setSelectionId(0)}
                    className="mr-2 text-xs font-bold text-red-400 cursor-pointer"
                  >
                    クリア
                  </button>
                </div>
                <div className="mt-1 relative">
                  <div className="absolute top-1/3 left-3 -translate-y-[45%] pointer-events-none">
                    <GitBranch className="h-5 w-5 text-gray-400" />
                  </div>
                  <Controller
                    control={control}
                    name="selectionId"
                    render={({ field }) => (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button
                            id="selection"
                            className="flex min-h-[2.6rem] w-full pl-10 py-2 border border-gray-300 rounded-md shadow-sm text-md font-normal cursor-pointer"
                          >
                            {selection}
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectionId(1);
                              field.onChange(1);
                            }}
                          >
                            1次面接
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectionId(2);
                              field.onChange(2);
                            }}
                          >
                            2次面接
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectionId(3);
                              field.onChange(3);
                            }}
                          >
                            3次面接
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectionId(4);
                              field.onChange(4);
                            }}
                          >
                            4次面接
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectionId(10);
                              field.onChange(10);
                            }}
                          >
                            最終面接
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  />
                  <p className="text-red-400 min-h-[1rem] text-xs mt-1 mb-2 ml-2">
                    {errors.selectionId?.message as ReactNode}
                  </p>
                </div>
              </div>
              <div>
                <label
                  htmlFor="interviewType"
                  className="text-sm font-bold text-gray-700"
                >
                  実施形態・場所
                </label>
                <div className="mt-1 relative">
                  <div className="absolute top-1/3 left-3 -translate-y-[45%] pointer-events-none">
                    <Presentation className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="interviewType"
                    type="text"
                    {...register("interviewType")}
                    placeholder="対面 / 東京本社"
                    className="w-full pl-10 py-2 border border-gray-300 rounded-md shadow-sm"
                    value={interviewType}
                    onChange={(e) => setInterviewType(e.target.value)}
                  />
                  <p className="text-red-400 min-h-[1rem] text-xs mt-1 mb-2 ml-2">
                    {errors.interviewType?.message as ReactNode}
                  </p>
                </div>
              </div>
              <div>
                <label
                  htmlFor="onlineURL"
                  className="text-sm font-bold text-gray-700"
                >
                  面接URL
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

type InterviewType = {
  name: string;
  date?: Date | null | undefined;
  selectionId: number;
  interviewType: string;
  onlineURL: string;
};
