"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { BadgeJapaneseYen, Building2, CalendarHeart, Clock, Globe, ListCollapse, MapPin, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

import "react-datepicker/dist/react-datepicker.css";

import { toastStyle } from "@/styles/toastStyle";
import { UpdateCompany } from "@/utils/api/company";

import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";

export default function EditCompany(props: EditCompanyProps){
  const [open, setOpen] = useState(false);

  const [name, setName] = useState(props.company.name);
  const [industry, setIndustry] = useState(props.company.industry);
  const [formIndustry, setFormIndustry] = useState("");
  const [employees, setEmployees] = useState(props.company.employees === 0 ? "" : props.company.employees);
  const [website, setWebsite] = useState(props.company.website);
  const [address, setAddress] = useState(props.company.address);
  const [income, setIncome] = useState(props.company.income === 0 ? "" : props.company.income);
  const [holidays, setHolidays] = useState(props.company.holidays === 0 ? "" : props.company.holidays);
  const [workingHours, setWorkingHours] = useState(props.company.workingHours);
  const [other, setOther] = useState(props.company.other);

  const router = useRouter();

  useEffect(() => {
    switch (industry) {
      case 0:
        setFormIndustry("");
        break;
      case 1:
        setFormIndustry("ソフトウェア・通信");
        break;
      case 2:
        setFormIndustry("メーカー");
        break;
      case 3:
        setFormIndustry("商社");
        break;
      case 4:
        setFormIndustry("流通・小売");
        break;
      case 5:
        setFormIndustry("金融");
        break;
      case 6:
        setFormIndustry("サービス・インフラ");
        break;
      case 7:
        setFormIndustry("広告・出版・マスコミ");
        break;
      case 8:
        setFormIndustry("官公庁・公社・団体");
        break;
    }
  }, [industry]);

  const { register, handleSubmit, control, setValue, formState: { errors } } = useForm<CompanyFormType>({
    mode: "onSubmit",
    defaultValues: {
      name: props.company.name,
      industry: props.company.industry,
      employees: props.company.employees === 0 ? "" : props.company.employees,
      website: props.company.website,
      address: props.company.address,
      income: props.company.income === 0 ? "" : props.company.income,
      holidays: props.company.holidays === 0 ? "" : props.company.holidays,
      workingHours: props.company.workingHours,
      other: props.company.other
    },
    resolver: zodResolver(CompanyValidation)
  });

  const formSubmit = async ({ name, industry, employees, website, address, income, holidays, workingHours, other }: CompanyFormType) => {
    toast.dismiss();
    const loadingToast = toast.loading("編集中です...");

    try {
      const res = await UpdateCompany(
        props.company.id,
        name,
        industry,
        typeof employees === "string" ? "" : employees,
        website,
        address,
        income,
        holidays,
        workingHours,
        other
      );
      if (!res.error) {
        toast.success("会社情報の編集に成功しました！", {
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
      console.error("会社編集エラー", error);
      toast.error("会社情報の編集に失敗しました。", {
        id: loadingToast,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="mr-8 text-white hover:text-white bg-emerald-600 hover:bg-emerald-700">編集</Button> 
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[800px] bg-white"
        aria-describedby="dialog-description"
      >
        <div className="space-y-4">
          <DialogHeader>
            <DialogTitle className="text-center text-lg">
              会社の詳細情報を入力
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(formSubmit)}>
            <div className="grid grid-cols-2 space-x-2 gap-8 text-sm">
              <div className="flex flex-col col-span-1">
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
                      業種
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setIndustry(0)
                        setValue("industry", 0)
                      }}
                      className="mr-2 text-xs font-bold text-red-400 cursor-pointer"
                    >
                      クリア
                    </button>
                  </div>
                  <div className="mt-1 relative">
                    <div className="absolute top-1/3 left-3 -translate-y-[45%] pointer-events-none">
                      <ListCollapse className="h-5 w-5 text-gray-400" />
                    </div>
                    <Controller
                      control={control}
                      name="industry"
                      render={({ field }) => (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button
                              id="industry"
                              className="flex min-h-[2.4rem] w-full pl-10 py-2 border border-gray-300 rounded-md shadow-sm font-normal cursor-pointer"
                            >
                              {formIndustry}
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem
                              onClick={() => {
                                setIndustry(1);
                                field.onChange(1);
                              }}
                            >
                              ソフトウェア・通信
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setIndustry(2);
                                field.onChange(2);
                              }}
                            >
                              メーカー
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setIndustry(3);
                                field.onChange(3);
                              }}
                            >
                              商社
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setIndustry(4);
                                field.onChange(4);
                              }}
                            >
                              流通・小売
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setIndustry(5);
                                field.onChange(5);
                              }}
                            >
                              金融
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setIndustry(6);
                                field.onChange(6);
                              }}
                            >
                              サービス・インフラ
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setIndustry(7);
                                field.onChange(7);
                              }}
                            >
                              広告・出版・マスコミ
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setIndustry(8);
                                field.onChange(8);
                              }}
                            >
                              官公庁・公社・団体
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    />
                    <p className="text-red-400 min-h-[1rem] text-xs mt-1 mb-2 ml-2">
                      {errors.industry?.message as ReactNode}
                    </p>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="employees"
                    className="text-sm font-bold text-gray-700"
                  >
                    従業員数
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute top-1/3 left-3 -translate-y-[45%] pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="employees"
                      type="number"
                      {...register("employees", {
                        setValueAs: (value) => isNaN(Number(value)) ? "" : Number(value)
                      })}
                      placeholder="100"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm"
                      value={employees === 0 ? "" : employees}
                      onChange={(e) => setEmployees(Number(e.target.value))}
                    />
                    <p className="text-red-400 min-h-[1rem] text-xs mt-1 mb-2 ml-2">
                      {errors.employees?.message as ReactNode}
                    </p>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="website"
                    className="text-sm font-bold text-gray-700"
                  >
                    ホームページURL
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute top-1/3 left-3 -translate-y-[45%] pointer-events-none">
                      <Globe className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="website"
                      type="text"
                      {...register("website")}
                      placeholder="https://career.com"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                    />
                    <p className="text-red-400 min-h-[1rem] text-xs mt-1 mb-2 ml-2">
                      {errors.website?.message as ReactNode}
                    </p>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="address"
                    className="text-sm font-bold text-gray-700"
                  >
                    所在地
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute top-1/3 left-3 -translate-y-[45%] pointer-events-none">
                      <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="address"
                      type="text"
                      {...register("address")}
                      placeholder="大阪府大阪市北区梅田X-X-X"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                    <p className="text-red-400 min-h-[1rem] text-xs mt-1 mb-2 ml-2">
                      {errors.address?.message as ReactNode}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col col-span-1">
                <div>
                  <label
                    htmlFor="income"
                    className="text-sm font-bold text-gray-700"
                  >
                    月収（万円）
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute top-1/3 left-3 -translate-y-[45%] pointer-events-none">
                      <BadgeJapaneseYen className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="income"
                      type="number"
                      {...register("income", {
                        setValueAs: (value) => isNaN(Number(value)) ? "" : Number(value)
                      })}
                      placeholder="25"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm"
                      value={income === 0 ? undefined : income}
                      onChange={(e) => setIncome(Number(e.target.value))}
                    />
                    <p className="text-red-400 min-h-[1rem] text-xs mt-1 mb-2 ml-2">
                      {errors.income?.message as ReactNode}
                    </p>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="holidays"
                    className="text-sm font-bold text-gray-700"
                  >
                    休日数
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute top-1/3 left-3 -translate-y-[45%] pointer-events-none">
                      <CalendarHeart className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="holidays"
                      type="number"
                      {...register("holidays", {
                        setValueAs: (value) => isNaN(Number(value)) ? "" : Number(value)
                      })}
                      placeholder="126"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm"
                      value={holidays === 0 ? undefined : holidays}
                      onChange={(e) => setHolidays(Number(e.target.value))}
                    />
                    <p className="text-red-400 min-h-[1rem] text-xs mt-1 mb-2 ml-2">
                      {errors.holidays?.message as ReactNode}
                    </p>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="workingHours"
                    className="text-sm font-bold text-gray-700"
                  >
                    勤務時間
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute top-1/3 left-3 -translate-y-[45%] pointer-events-none">
                      <Clock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="workingHours"
                      type="text"
                      {...register("workingHours")}
                      placeholder="10:00~19:00"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm"
                      value={workingHours}
                      onChange={(e) => setWorkingHours(e.target.value)}
                    />
                    <p className="text-red-400 min-h-[1rem] text-xs mt-1 mb-2 ml-2">
                      {errors.workingHours?.message as ReactNode}
                    </p>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="other"
                    className="text-sm font-bold text-gray-700"
                  >
                    その他
                  </label>
                  <div className="mt-1 relative">
                    <textarea
                      id="other"
                      {...register("other")}
                      rows={5}
                      placeholder="フレックス制度あり"
                      className="w-full p-4 py-2 border border-gray-300 rounded-md shadow-sm"
                      value={other}
                      onChange={(e) => setOther(e.target.value)}
                    />
                    <p className="text-red-400 min-h-[1rem] text-xs mt-1 mb-2 ml-2">
                      {errors.other?.message as ReactNode}
                    </p>
                  </div>
                </div>
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

type EditCompanyProps = {
  company: CompanyTypeProps;
};

type CompanyTypeProps = {
  id: number;
  userId: number;
  name: string;
  industry: number;
  employees: number;
  website: string;
  address: string;
  income: number;
  holidays: number;
  workingHours: string;
  other: string;
  favorite: boolean;
  created_at: string;
  updated_at: string;
};

type CompanyFormType = {
  name: string;
  industry: number;
  employees: number | string;
  website: string;
  address: string;
  income: number | string;
  holidays: number | string;
  workingHours: string;
  other: string;
};

const CompanyValidation = z.object({
  name: z.string().min(1, "必須項目です。").max(30, "30文字以内で入力して下さい。"),
  industry: z.number(),
  employees: z.union([z.number(), z.string()]),
  website: z.string().refine(
    (value) => value === "" || z.string().url().safeParse(value).success, { message: "URLが無効です。" }
  ),
  address: z.string().max(50, "50文字以内で入力して下さい。"),
  income: z.union([z.number(), z.string()]),
  holidays: z.union([z.number(), z.string()]),
  workingHours: z.string().max(30, "30文字以内で入力して下さい。"),
  other: z.string().max(100, "100文字以内で入力して下さい。")
});