"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Building2, CalendarDays, GitBranch, Globe, Presentation } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

import "react-datepicker/dist/react-datepicker.css";

import { toastStyle } from "@/styles/toastStyle";
import { UpdateCompany } from "@/utils/api/company";
import { UpdateInterview } from "@/utils/api/interview";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";

export default function EditInterview(props: EditInterviewProps) {
  const [open, setOpen] = useState(false);

  const [companyName, setCompanyName] = useState(props.interview.companyName);
  const [date, setDate] = useState<Date | null | undefined>(props.interview.date ? new Date(props.interview.date) : null);
  const [selection, setSelection] = useState("");
  const [selectionId, setSelectionId] = useState(props.interview.selectionId);
  const [interviewType, setInterviewType] = useState(props.interview.interviewType);
  const [onlineUrl, setOnlineUrl] = useState(props.interview.onlineUrl);

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

  const { register, handleSubmit, control, setValue, formState: { errors } } = useForm<InterviewType>({
    mode: "onSubmit",
    defaultValues: {
      date: props.interview.date ? new Date(props.interview.date) : null,
      selectionId: props.interview.selectionId,
      interviewType: props.interview.interviewType, 
      onlineUrl: props.interview.onlineUrl 
    },
    resolver: zodResolver(InterviewValidation)
  });

  const formSubmit = async ({ companyName, date, onlineUrl }: InterviewType) => {
    toast.dismiss();
    const loadingToast = toast.loading("編集中です...");

    try {
      await UpdateCompany(props.interview.companyId, companyName);
      const res = await UpdateInterview(
        props.interview.id,
        props.interview.companyId,
        date,
        selectionId,
        interviewType,
        onlineUrl
      );
      if (!res.error) {
        toast.success("面接の編集に成功しました！", {
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
            id: loadingToast,
          });
        } else {
          toast.error("ユーザーが見つかりません。ログインしなおしてください。", {
            style: toastStyle,
            duration: 1200,
            id: loadingToast,
          });
        }
        setOpen(false);
        router.push("/signIn");
      }
    } catch (error) {
      console.error("面接編集エラー", error);
      toast.error("面接の編集に失敗しました。", {
        id: loadingToast,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="px-2 py-0.5 text-sm rounded-sm shadow-md bg-emerald-500 text-white">
          編集
        </button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px] bg-white"
        aria-describedby="dialog-description"
      >
        <div className="space-y-4">
          <DialogHeader>
            <DialogTitle className="text-lg">
              面接内容を入力
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(formSubmit)}>
            <div>
              <label
                htmlFor="companyName"
                className="text-sm font-bold text-gray-700"
              >
                会社名
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
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
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
                  onClick={() => {
                    setDate(null)
                    setValue("date", null)
                  }}
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
              <div className="flex justify-between items-end">
                <label className="text-sm font-bold text-gray-700">
                  選考状況
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setSelectionId(0)
                    setValue("selectionId", 0)
                  }}
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
                  id="submissionUrl"
                  type="text"
                  {...register("onlineUrl")}
                  placeholder="https://career.com"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm"
                  value={onlineUrl}
                  onChange={(e) => setOnlineUrl(e.target.value)}
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

type EditInterviewProps = {
  interview: InterviewTypeProps;
};

type InterviewTypeProps = {
  id: number;
  companyId: number;
  companyName: string;
  date?: string | null | undefined;
  selectionId: number;
  interviewType: string;
  onlineUrl: string;
};

type InterviewType = {
  companyName: string;
  date?: Date | null | undefined;
  selectionId: number;
  interviewType: string;
  onlineUrl: string;
};

const InterviewValidation = z.object({
  companyName: z.string().min(1, "必須項目です。").max(30, "30文字以内で入力して下さい。"),
  date: z.date().nullable().optional(),
  selectionId: z.number(),
  interviewType: z.string(),
  onlineUrl: z.string().refine(
    (value) => value === "" || z.string().url().safeParse(value).success, { message: "URLが無効です。" }
  )
});