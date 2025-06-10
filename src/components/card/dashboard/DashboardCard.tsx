import camelcaseKeys from "camelcase-keys";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { cookies } from "next/headers";
import Link from "next/link";

import {
  InterviewType,
  MeetingType,
  SubmissionType,
} from "@/types/others/types";

export default async function DashboardCard(props: DashboardCardProps) {
  let dashboardContents;
  try {
    dashboardContents = await GetDashboardData();
    console.log("Dashboard Contents:", dashboardContents);
    dashboardContents.meetings = dashboardContents.meetings || [];
    dashboardContents.interviews = dashboardContents.interviews || [];
    dashboardContents.submissions = dashboardContents.submissions || [];
  } catch (error) {
    console.error(error);
  }

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
    <div className="bg-white border shadow rounded-lg p-4 sm:p-6">
      <h3 className="text-md font-bold text-gray-700">{props.title}</h3>
      <ul className="-my-4 divide-y divide-gray-200 mt-1">
        {props.id === 0
          ? dashboardContents.meetings.length !== 0
            ? dashboardContents.meetings.map(
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
            : <li className="ml-2 py-4 text-xs text-gray-500">面談・説明会の予定はありません</li>
          : props.id === 1
            ? dashboardContents.interviews.length !== 0
              ? dashboardContents.interviews?.map(
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
            : <li className="ml-2 py-4 text-xs text-gray-500">面接の予定はありません</li>
          : dashboardContents.submissions.length !== 0
            ? dashboardContents.submissions?.map(
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
            : <li className="ml-2 py-4 text-xs text-gray-500">提出物・タスクはありません</li>
        }
      </ul>
    </div>
  );
}

export const GetDashboardData = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access-token")?.value;
  const client = cookieStore.get("client")?.value;
  const email = cookieStore.get("email")?.value;
  const uid = cookieStore.get("uid")?.value;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/dashboard`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "access-token": accessToken || "",
        "client": client || "",
        "email": email || "",
        "uid": uid || ""
      }
    });
    const data = await res.json();
    return camelcaseKeys(data, { deep: true });
  } catch (error) {
    console.error(error);
    throw new Error("ダッシュボードデータの取得に失敗");
  }
};

type DashboardCardProps = {
  id: number;
  title: string;
};
