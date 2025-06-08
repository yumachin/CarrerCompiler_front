"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { toastStyle } from "@/styles/toastStyle";
import { SubmissionType } from "@/types/others/types";
import { GetSubmissions } from "@/utils/api/submission";

import SubmissionCard from "./SubmissionCard";

export default function SubmissionCards() {
  const [submissions, setSubmissions] = useState<SubmissionType[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchSubmissions = async () => {
      toast.dismiss();
      try {
        const res = await GetSubmissions();
        if (!res.error) {
          setSubmissions(res);
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
        console.error("提出物取得エラー", error);
        toast.error("提出物一覧の取得に失敗しました。", { id: "3" });
      }
    };
    fetchSubmissions();
  }, [router]);

  return (
    <>
      {submissions.length === 0 && <div className="ml-2">提出物・タスクはありません。</div>}
      <ul className="bg-white shadow-lg rounded-lg divide-y divide-gray-200">
        {submissions.map((submission) => (
          <SubmissionCard key={submission.id} submission={submission} />
        ))}
      </ul>
    </>
  );
}
