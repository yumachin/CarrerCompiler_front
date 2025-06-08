"use client";

import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import toast from "react-hot-toast";

import Block from "@/components/blocks/Block";
import CompanyInfCard from "@/components/card/company/detail/CompanyInfCard";
import CompanyMemoCard from "@/components/card/company/detail/CompanyMemoCard";
import { toastStyle } from "@/styles/toastStyle";
import { GetCompany } from "@/utils/api/company";

export default function CompanyDetailPage({ params }: { params: PageParams } ) {
  const [company, setCompany] = useState<TempProps>();
  const router = useRouter();
  const { id } = use(params);

  useEffect(() => {
    const fetchCompany = async () => {
      toast.dismiss();
      try {
        const res = await GetCompany(id);
        if (!res.error) {
          setCompany(res);
        } else {
          if (res.error === "トークン切れ") {
            toast.error(
              "アクセス権がありません。ログインしなおしてください。",
              {
                style: toastStyle,
                duration: 1200,
                id: "1",
              }
            );
          } else {
            toast.error(
              "ユーザーが見つかりません。ログインしなおしてください。",
              {
                style: toastStyle,
                duration: 1200,
                id: "2",
              }
            );
          }
          router.push("/signIn");
        }
      } catch (error) {
        console.error("会社取得取得エラー", error);
        toast.error("会社の取得に失敗しました。", { id: "3" });
      }
    };
    fetchCompany();
  }, [id, router]);

  console.log("CompanyDetailPage", company);

  return (
    <div className="min-h-screen bg-emerald-50 pb-12">
      <Block />
      <main className="space-y-8 p-4 sm:p-8 sm:ml-40 transition-margin duration-200 ease-in-out">
        {company && <CompanyInfCard company={company} />}
        {company && <CompanyMemoCard id={company.id} memo={company.memo} />}
      </main>
    </div>
  );
};

type PageParams = Promise<{
  id: string
}>;

type TempProps = {
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
  // selectionFlow: string[];
  other: string;
  favorite: boolean;
  memo: string;
  created_at: string;
  updated_at: string;
};