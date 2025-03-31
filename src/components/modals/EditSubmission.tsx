"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Building2, CalendarDays, ClipboardCheck, Globe, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

import "react-datepicker/dist/react-datepicker.css";

import { toastStyle } from "@/styles/toastStyle";
import { UpdateCompany } from "@/utils/api/company";
import { UpdateSubmission } from "@/utils/api/submission";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";

export default function EditSubmission(props: EditSubmissionProps) {
  const [open, setOpen] = useState(false);

  const [companyName, setCompanyName] = useState(props.submission.companyName);
  const [deadline, setDeadline] = useState<Date | null | undefined>(props.submission.deadline ? new Date(props.submission.deadline) : null);
  const [submission, setSubmission] = useState("");
  const [submissionType, setSubmissionType] = useState(props.submission.submissionType);
  const [contactMedia, setContactMedia] = useState(props.submission.contactMedia);
  const [submissionUrl, setSubmissionUrl] = useState(props.submission.submissionUrl);

  const router = useRouter();

  useEffect(() => {
    switch (submissionType) {
      case 0:
        setSubmission("");
        break;
      case 1:
        setSubmission("ES");
        break;
      case 2:
        setSubmission("履歴書");
        break;
      case 3:
        setSubmission("適性検査");
        break;
      case 4:
        setSubmission("SPI");
        break;
      case 5:
        setSubmission("コーディングテスト");
        break;
      case 6:
        setSubmission("アンケート");
        break;
    }
  }, [submissionType]);

  const { register, handleSubmit, control, setValue, formState: { errors } } = useForm<SubmissionType>({
    mode: "onSubmit",
    defaultValues: {
      deadline: props.submission.deadline ? new Date(props.submission.deadline) : null, 
      submissionType: props.submission.submissionType, 
      contactMedia: props.submission.contactMedia, 
      submissionUrl: props.submission.submissionUrl 
    },
    resolver: zodResolver(SubmissionValidation)
  });

  const formSubmit = async ({ companyName, deadline, submissionUrl }: SubmissionType) => {
    toast.dismiss();
    const loadingToast = toast.loading("編集中です...");

    try {
      await UpdateCompany(props.submission.companyId, companyName);
      const res = await UpdateSubmission(
        props.submission.id,
        props.submission.companyId,
        deadline,
        submissionType,
        contactMedia,
        submissionUrl
      );
      if (!res.error) {
        toast.success("面談・説明会の編集に成功しました！", {
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
      console.error("面談・説明会予定編集エラー", error);
      toast.error("面談・説明会の予定の編集に失敗しました。", {
        id: loadingToast,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="px-2 py-0.5 text-sm rounded-sm shadow-md bg-emerald-700 text-white">
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
              提出物・タスクを入力
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
            <div>
              <div className="flex justify-between items-end">
                <label className="text-sm font-bold text-gray-700">
                  提出期限
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setDeadline(null)
                    setValue("deadline", null)
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
                  name="deadline"
                  render={({ field }) => (
                    <DatePicker
                      selected={deadline}
                      onChange={(selectedDate) => {
                        setDeadline(selectedDate);
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
                  {errors.deadline?.message as ReactNode}
                </p>
              </div>
            </div>
              <label
                htmlFor="contactMedia"
                className="text-sm font-bold text-gray-700"
              >
                連絡媒体
              </label>
              <div className="mt-1 relative">
                <div className="absolute top-1/3 left-3 -translate-y-[45%] pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="contactMedia"
                  type="text"
                  {...register("contactMedia")}
                  placeholder="Gmail / Outlook / レバテック"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm"
                  value={contactMedia}
                  onChange={(e) => setContactMedia(e.target.value)}
                />
                <p className="text-red-400 min-h-[1rem] text-xs mt-1 mb-2 ml-2">
                  {errors.contactMedia?.message as ReactNode}
                </p>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-end">
                <label className="text-sm font-bold text-gray-700">
                  提出物・タスク
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setSubmissionType(0)
                    setValue("submissionType", 0)
                  }}
                  className="mr-2 text-xs font-bold text-red-400 cursor-pointer"
                >
                  クリア
                </button>
              </div>
              <div className="mt-1 relative">
                <div className="absolute top-1/3 left-3 -translate-y-[45%] pointer-events-none">
                  <ClipboardCheck className="h-5 w-5 text-gray-400" />
                </div>
                <Controller
                  control={control}
                  name="submissionType"
                  render={({ field }) => (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button
                          id="submissionType"
                          className="flex min-h-[2.6rem] w-full pl-10 py-2 border border-gray-300 rounded-md shadow-sm text-md font-normal cursor-pointer"
                        >
                          {submission}
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          onClick={() => {
                            setSubmissionType(1);
                            field.onChange(1);
                          }}
                        >
                          ES
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setSubmissionType(2);
                            field.onChange(2);
                          }}
                        >
                          履歴書
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setSubmissionType(3);
                            field.onChange(3);
                          }}
                        >
                          適性検査
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setSubmissionType(4);
                            field.onChange(4);
                          }}
                        >
                          SPI
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setSubmissionType(5);
                            field.onChange(5);
                          }}
                        >
                          コーディングテスト
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setSubmissionType(6);
                            field.onChange(6);
                          }}
                        >
                          アンケート
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                />
                <p className="text-red-400 min-h-[1rem] text-xs mt-1 mb-2 ml-2">
                  {errors.submissionType?.message as ReactNode}
                </p>
              </div>
            </div>
            <div>
              <label
                htmlFor="submissionUrl"
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
                  {...register("submissionUrl")}
                  placeholder="https://career.com"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm"
                  value={submissionUrl}
                  onChange={(e) => setSubmissionUrl(e.target.value)}
                />
                <p className="text-red-400 min-h-[1rem] text-xs mt-1 mb-2 ml-2">
                  {errors.submissionUrl?.message as ReactNode}
                </p>
              </div>
            </div>
            <button className="w-full mt-6 py-2 rounded-md text-sm font-bold text-white bg-emerald-700">
              完了
            </button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

type EditSubmissionProps = {
  submission: SubmissionTypeProps;
};

type SubmissionTypeProps = {
  id: number;
  companyId: number;
  companyName: string;
  deadline?: string | null | undefined;
  submissionType: number;
  contactMedia: string;
  submissionUrl: string;
};

type SubmissionType = {
  companyName: string;
  deadline?: Date | null | undefined;
  submissionType: number;
  contactMedia: string;
  submissionUrl: string;
};

const SubmissionValidation = z.object({
  companyName: z.string().min(1, "必須項目です。").max(30, "30文字以内で入力して下さい。"),
  deadline: z.date().nullable().optional(),
  submissionType: z.number(),
  contactMedia: z.string().max(30, "30文字以内で入力して下さい。"),
  submissionUrl: z.string().refine(
    (value) => value === "" || z.string().url().safeParse(value).success, { message: "URLが無効です。" }
  )
});