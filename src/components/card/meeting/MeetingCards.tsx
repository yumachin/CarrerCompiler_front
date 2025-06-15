"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Loading from "@/components/loading";
import { toastStyle } from "@/styles/toastStyle";
import { MeetingType } from "@/types/others/types";
import { GetMeetings } from "@/utils/api/meeting";

import MeetingCard from "./MeetingCard";

export default function MeetingCards() {
  const [meetings, setMeetings] = useState<MeetingType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    const fetchMeetings = async () => {
      toast.dismiss();
      try {
        const res = await GetMeetings();
        if (!res.error) {
          setMeetings(res);
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
        console.error("面談・説明会予定取得エラー", error);
        toast.error("面談・説明会予定の取得に失敗しました。", { id: "3" });
      } finally {
        setLoading(false);
      }
    };
    fetchMeetings();
  }, [router]);

  return (
    <>
      {loading ? <Loading /> : (
        <>
          {meetings.length > 0 ? (
            <>
              <div className="ml-2 text-gray-600 font-mono text-sm mb-2">
                面談・説明会予定: {meetings.length}件
              </div>
              <ul className="bg-white shadow-lg rounded-lg divide-y divide-gray-200">
                {meetings.map((meeting) => (
                  <MeetingCard key={meeting.id} meeting={meeting} />
                ))}
              </ul>
            </>
          ) : (
            <div className="ml-2 text-gray-400 font-mono text-sm">
              面談・説明会の予定はありません。
            </div>
          )}
        </>
      )}
    </>
  );
};