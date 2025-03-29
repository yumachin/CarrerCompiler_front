"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { toastStyle } from "@/styles/toastStyle";
import { CompanyType } from "@/types/others/types";
import { GetCompanies } from "@/utils/api/company";

import CompanyCard from "./CompanyCard";

export default function CompanyCards() {
  const [companies, setCompanies] = useState<CompanyType[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCompanies = async () => {
      toast.dismiss();
      try {
        const res = await GetCompanies();
        if (!res.error) {
          setCompanies(res);
        } else {
          if (res.error === "トークン切れ") {
            toast.error("アクセス権がありません。ログインしなおしてください。", {
              style: toastStyle,
              duration: 1200,
              id: "1",
            });
          } else {
            toast.error("ユーザーが見つかりません。ログインしなおしてください。", {
              style: toastStyle,
              duration: 1200,
              id: "2",
            });
          }
          router.push("/signIn");
        }
      } catch (error) {
        console.error("面接予定取得エラー", error);
        toast.error("面接予定の取得に失敗しました。", { id: "3" });
      }
    };
    fetchCompanies();
  }, [router]);

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {companies.map((company) => (
        <CompanyCard key={company.id} company={company} />
      ))}
    </ul>
  );
}
