"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { useAuth } from "@/context/AuthContext";
import { toastStyle } from "@/styles/toastStyle";
import { InterviewType } from "@/types/others/types";
import { GetInterviews } from "@/utils/api/interview";
import { GetUser } from "@/utils/api/user";

import InterviewCard from "./InterviewCard";

export default function InterviewCards() {
  const [interviews, setInterviews] = useState<InterviewType[]>([]);
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await GetUser();
      console.log("userは", res);
      setUser(res);
      setLoading(false);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (loading) return;

    const fetchInterviews = async () => {
      toast.dismiss();
      try {
        if (user === null || user === undefined) {
          toast.error("アクセス権がありません。ログインしなおしてください。", {
            style: toastStyle,
            duration: 1200,
            id: "1",
          });
          router.push("/signIn");
        } else {
          const res = await GetInterviews();
          if (!res.error) {
            setInterviews(res);
          } else if (res.error === "トークン切れ") {
            toast.error("アクセス権がありません。ログインしなおしてください。", {
              style: toastStyle,
              duration: 1200,
              id: "2",
            });
            router.push("/signIn");
          } else {
            toast.error("ユーザーが見つかりません。ログインしなおしてください。", {
              style: toastStyle,
              duration: 1200,
              id: "3",
            });
            router.push("/signIn");
          }
        }
      } catch (error) {
        console.error("面接予定取得エラー", error);
        toast.error("面接予定の取得に失敗しました。", { id: "4" });
      }
    };
    fetchInterviews();
  }, [loading]);

  return (
    <ul className="bg-white shadow rounded-lg border divide-y divide-gray-200">
      {interviews.map((interview) => (
        <InterviewCard key={interview.id} interview={interview} />
      ))}
    </ul>
  );
};