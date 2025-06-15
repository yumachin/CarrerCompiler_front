"use client";

import { format } from "date-fns";
import { ja } from "date-fns/locale";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Loading from "@/components/loading";
import { toastStyle } from "@/styles/toastStyle";
import {
  InterviewType,
  MeetingType,
  SubmissionType,
} from "@/types/others/types";
import { GetDashboardData } from "@/utils/api/dashboard";

type DashboardCardProps = {
  id: number;
  title: string;
};


export default function DashboardCard(props: DashboardCardProps) {
  const [dashboardData, setDashboardData] = useState({
    meetings: [] as MeetingType[],
    interviews: [] as InterviewType[],
    submissions: [] as SubmissionType[],
  });
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    const fetchDashboardData = async () => {
      toast.dismiss();
      try {
        const res = await GetDashboardData();
        if (!res.error) {
          setDashboardData(res);
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
        console.error("ダッシュボードデータ取得エラー", error);
        toast.error("ダッシュボードデータの取得に失敗しました。", { id: "3" });
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, [router]);

  const getSubmissionTypeBadge = (submissionType: number) => {
    switch (submissionType) {
      case 1:
        return <>ES</>;
      case 2:
        return <>履歴書</>;
      case 3:
        return <>適性検査</>;
      case 4:
        return <>SPI</>;
      case 5:
        return <>コーディングテスト</>;
      case 6:
        return <>アンケート</>;
      default:
        return;
    }
  };

  return (
    <>
      {loading ? <Loading /> : (
        <div className="bg-white border shadow rounded-lg p-4 sm:p-6">
          <h3 className="text-md font-bold text-gray-700">{props.title}</h3>
          <ul className="-my-4 divide-y divide-gray-200 mt-1">
            {props.id === 0
              ? dashboardData.meetings.length !== 0
                ? dashboardData.meetings.map(
                  (meeting: MeetingType, index: number) => (
                    <li key={index} className="flex items-center justify-between">
                      <div className="flex flex-col justify-center py-4">
                        <Link
                          href={`company/${meeting.companyId}`}
                          className="mb-1 text-sm font-bold text-indigo-600"
                        >
                          {meeting.companyName}
                        </Link>
                        <p className="text-xs text-gray-500">
                          {meeting.date !== null && (
                            <>
                              {format(meeting.date, "yyyy年MM月dd日(E) HH:mm", {
                                locale: ja,
                              })}
                            </>
                          )}
                        </p>
                      </div>
                      <Link
                        href={meeting.onlineUrl}
                        className="mr-2 text-xs text-indigo-500 underline"
                      >
                        開始する
                      </Link>
                    </li>
                  )
                )
                : <li className="ml-2 py-4 text-xs text-gray-500">面談・説明会の予定はありません。</li>
              : props.id === 1
                ? dashboardData.interviews.length !== 0
                  ? dashboardData.interviews?.map(
                    (interview: InterviewType, index: number) => (
                      <li key={index} className="flex items-center justify-between">
                        <div className="flex flex-col justify-center py-4">
                          <Link
                            href={`company/${interview.companyId}`}
                            className="mb-1 text-sm font-bold text-indigo-600"
                          >
                            {interview.companyName}
                          </Link>
                          <p className="text-xs text-gray-500">
                            {interview.date !== null && (
                              <>
                                {format(interview.date, "yyyy年MM月dd日(E) HH:mm", {
                                  locale: ja,
                                })}
                              </>
                            )}
                          </p>
                        </div>
                        <Link
                          href={interview.onlineUrl}
                          className="mr-2 text-xs text-indigo-500 underline"
                        >
                          開始する
                        </Link>
                      </li>
                    )
                  )
                : <li className="ml-2 py-4 text-xs text-gray-500">面接の予定はありません。</li>
              : dashboardData.submissions.length !== 0
                ? dashboardData.submissions?.map(
                    (submission: SubmissionType, index: number) => (
                      <li key={index} className="flex items-center justify-between">
                        <div className="flex flex-col justify-center py-4">
                          <Link
                            href={`company/${submission.companyId}`}
                            className="mb-1 text-sm font-bold text-gray-700"
                          >
                            {getSubmissionTypeBadge(submission.submissionType)}
                          </Link>
                          <p className="text-xs text-gray-500">
                            {submission.companyName} ---{" "}
                            {submission.deadline !== null && (
                              <>
                                {format(
                                  submission.deadline,
                                  "yyyy年MM月dd日(E) HH:mm",
                                  { locale: ja }
                                )}
                              </>
                            )}
                          </p>
                        </div>
                        <Link
                          href={submission.submissionUrl}
                          className="mr-2 text-xs text-indigo-500 underline"
                        >
                          提出する
                        </Link>
                      </li>
                    )
                  )
                : <li className="ml-2 py-4 text-xs text-gray-500">提出物・タスクはありません。</li>
            }
          </ul>
        </div>
      )}
    </>
  );
}
