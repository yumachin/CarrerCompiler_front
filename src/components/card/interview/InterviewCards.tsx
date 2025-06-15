"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Loading from "@/components/loading";
import { toastStyle } from "@/styles/toastStyle";
import { InterviewType } from "@/types/others/types";
import { GetInterviews } from "@/utils/api/interview";

import InterviewCard from "./InterviewCard";

export default function InterviewCards() {
  const [interviews, setInterviews] = useState<InterviewType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    const fetchInterviews = async () => {
      toast.dismiss();
      try {
        const res = await GetInterviews();
        if (!res.error) {
          setInterviews(res);
        }
        else {
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
      } finally {
        setLoading(false);
      }
    };
    fetchInterviews();
  }, [router]);

  return (
    <>
      {loading ? <Loading /> : (
        <>
          {interviews.length > 0 ? (
            <>
              <div className="ml-2 text-gray-600 font-mono text-sm mb-2">
                面接予定: {interviews.length}件
              </div>
              <ul className="bg-white shadow-lg rounded-lg divide-y divide-gray-200">
                {interviews.map((interview) => (
                  <InterviewCard key={interview.id} interview={interview} />
                ))}
              </ul>
            </>
          ) : (
            <div className="ml-2 text-gray-400 font-mono text-sm">
              面接の予定はありません。
            </div>
          )}
        </>
      )}
    </>
  );
};