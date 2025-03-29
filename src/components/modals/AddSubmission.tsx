"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Building2, CalendarDays, ClipboardCheck, Globe, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import "react-datepicker/dist/react-datepicker.css";

import { toastStyle } from "@/styles/toastStyle";
import { PostCompany } from "@/utils/api/company";
import { PostSubmission } from "@/utils/api/submission";
import { SubmissionValidation } from "@/utils/validations/post";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";

export default function AddSubmission() {
  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");
  const [deadline, setDeadline] = useState<Date | null | undefined>(null);
  const [submission, setSubmission] = useState("");
  const [submissionType, setSubmissionType] = useState(0);
  const [contactMedia, setContactMedia] = useState("");
  const [submissionURL, setSubmissionURL] = useState("");

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

  const { register, handleSubmit, control, formState: { errors } } = useForm<SubmissionType>({
    mode: "onSubmit",
    defaultValues: { deadline: null, submissionId: 0, contactMedia: "", submissionURL: "" },
    resolver: zodResolver(SubmissionValidation),
  });

  const formSubmit = async ({ name, deadline, submissionURL }: SubmissionType) => {
    toast.dismiss();
    const loadingToast = toast.loading("処理中です...");

    try {
      const company = await PostCompany(name);
      const res = await PostSubmission(company.id, deadline, submissionType, contactMedia, submissionURL);
      if (!res.error) {
        toast.success("面談・説明会の予定を追加しました！", {
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
      console.error("面談・説明会予定追加エラー", error);
      toast.error("面談・説明会の予定の追加に失敗しました。", {
        id: loadingToast,
      });
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button className="mr-12 px-4 py-3 shadow-lg rounded-md text-sm font-bold text-white bg-emerald-700">
            提出物・タスクを追加
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
                    提出物・タスク
                  </label>
                  <button
                    type="button"
                    onClick={() => setSubmissionType(0)}
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
                    name="submissionId"
                    render={({ field }) => (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button
                            id="submissionId"
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
                    {errors.submissionId?.message as ReactNode}
                  </p>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-end">
                  <label className="text-sm font-bold text-gray-700">
                    提出期限
                  </label>
                  <button
                    type="button"
                    onClick={() => setDeadline(null)}
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
              <div>
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
                <label
                  htmlFor="submissionURL"
                  className="text-sm font-bold text-gray-700"
                >
                  提出先URL
                </label>
                <div className="mt-1 relative">
                  <div className="absolute top-1/3 left-3 -translate-y-[45%] pointer-events-none">
                    <Globe className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="submissionURL"
                    type="text"
                    {...register("submissionURL")}
                    placeholder="https://career.com"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm"
                    value={submissionURL}
                    onChange={(e) => setSubmissionURL(e.target.value)}
                  />
                  <p className="text-red-400 min-h-[1rem] text-xs mt-1 mb-2 ml-2">
                    {errors.submissionURL?.message as ReactNode}
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

type SubmissionType = {
  name: string;
  deadline?: Date | null | undefined;
  submissionId: number;
  contactMedia: string;
  submissionURL: string;
};