"use client";

import { Building2, Calendar, FileText } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Loading from "@/components/loading";
import { toastStyle } from "@/styles/toastStyle";
import { GetCounts } from "@/utils/api/dashboard";

import CountCard from "./CountCard";

export default function CountCards() {
  const [tableCounts, setTableCounts] = useState({
    submissionCount: 0,
    meetingCount: 0,
    interviewCount: 0,
    companyCount: 0,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    const fetchCounts = async () => {
      toast.dismiss();
      try {
        const res = await GetCounts();
        if (!res.error) {
          setTableCounts(res);
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
        console.error("各テーブルレコード数取得エラー", error);
        toast.error("各テーブルレコード数取得に失敗しました。", { id: "3" });
      } finally {
        setLoading(false);
      }
    };
    fetchCounts();
  }, [router]);

  const items = [
    {
      link: "/submission",
      icon: FileText,
      name: "提出物",
      count: tableCounts.submissionCount,
    },
    {
      link: "/meeting",
      icon: Calendar,
      name: "面談",
      count: tableCounts.meetingCount,
    },
    {
      link: "/interview",
      icon: Calendar,
      name: "面接",
      count: tableCounts.interviewCount,
    },
    {
      link: "/company",
      icon: Building2,
      name: "企業",
      count: tableCounts.companyCount,
    },
  ];

  return (
    <>
      {loading ? <Loading /> : (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mt-4">
          {items.map((item, index) => (
            <CountCard
              key={index}
              link={item.link}
              icon={<item.icon className="text-gray-400" />}
              name={item.name}
              count={item.count}
            />
          ))}
        </div>
      )}
    </>
  );
}