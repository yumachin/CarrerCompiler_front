import { format } from "date-fns";
import { ja } from "date-fns/locale";
import Link from "next/link";

import { InterviewType, MeetingType,SubmissionType } from "@/types/others/types";
import { GetDashboardData } from "@/utils/api/dashboard";

export default async function DashboardCard(props: DashboardCardProps) {
  // const meetings = [
  //   {
  //     company: "株式会社テクノロジー",
  //     date: "2024年4月1日 14:00 - 1次面接"
  //   },
  //   {
  //     company: "グローバル株式会社",
  //     date: "2024年4月3日 10:00 - カジュアル面談"
  //   }
  // ];
  // const interviews = [
  //   {
  //     company: "株式会社テクノロジー",
  //     date: "2024年4月1日 14:00 - 1次面接"
  //   },
  //   {
  //     company: "グローバル株式会社",
  //     date: "2024年4月3日 10:00 - カジュアル面談"
  //   },
  //   {
  //     company: "グローバル株式会社",
  //     date: "2024年4月3日 10:00 - カジュアル面談"
  //   }
  // ];
  // const submissions = [
  //   {
  //     name: "履歴書・職務経歴書",
  //     company: "株式会社テクノロジー",
  //     deadline: "2024年3月31日まで"
  //   },
  //   {
  //     name: "エントリーシート",
  //     company: "グローバル株式会社",
  //     deadline: "2024年4月5日まで"
  //   }
  // ];

  let dashboardContents;
  try {
    
    dashboardContents = await GetDashboardData();
  } catch (error) {
    console.error(error);
  }

  const getSubmissionTypeBadge = (submissionType: number) => {
    switch (submissionType) {
      case 1: return <>ES</>
      case 2: return <>履歴書</>
      case 3: return <>適性検査</>
      case 4: return <>SPI</>
      case 5: return <>コーディングテスト</>
      case 6: return <>アンケート</>
      default: return;
    }
  };

  return (
    <div className="bg-white border shadow rounded-lg p-4 sm:p-6">
      <h3 className="text-md font-bold text-gray-700">{props.title}</h3>
      <ul className="-my-4 divide-y divide-gray-200 mt-1">
        {props.id === 0 ? 
          dashboardContents.meetings.map((meeting: MeetingType, index: number) => (
            <li key={index} className="flex items-center justify-between">
              <div className="flex flex-col justify-center py-4">
                <Link href={`company/${meeting.companyId}`} className="mb-1 text-sm font-bold text-indigo-600">{meeting.companyName}</Link>
                <p className="text-xs text-gray-500">
                {meeting.date !== null &&
                  <>{format(meeting.date, "yyyy年MM月dd日(E) HH:mm", { locale: ja })}</>
                }
                </p>
              </div>
              <Link href={meeting.onlineUrl} className="mr-2 text-xs text-indigo-500 underline">開始する</Link>
            </li>
          )) : props.id === 1 ?
          dashboardContents.interviews.map((interview: InterviewType, index: number) => (
            <li key={index} className="flex items-center justify-between">
              <div className="flex flex-col justify-center py-4">
                <Link href={`company/${interview.companyId}`} className="mb-1 text-sm font-bold text-indigo-600">{interview.companyName}</Link>
                <p className="text-xs text-gray-500">
                {interview.date !== null &&
                  <>{format(interview.date, "yyyy年MM月dd日(E) HH:mm", { locale: ja })}</>
                }
                </p>
              </div>
              <Link href={interview.onlineUrl} className="mr-2 text-xs text-indigo-500 underline">開始する</Link>
            </li>
          )) :
          dashboardContents.submissions.map((submission: SubmissionType, index: number) => (
            <li key={index} className="flex items-center justify-between">
              <div className="flex flex-col justify-center py-4">
                <Link href={`company/${submission.companyId}`} className="mb-1 text-sm font-bold text-gray-700">
                  {getSubmissionTypeBadge(submission.submissionType)}
                </Link>
                <p className="text-xs text-gray-500">
                {submission.companyName} --- {submission.deadline !== null &&
                  <>{format(submission.deadline, "yyyy年MM月dd日(E) HH:mm", { locale: ja })}</>
                }
                </p>
              </div>
              <Link href={submission.submissionUrl} className="mr-2 text-xs text-indigo-500 underline">提出する</Link>
            </li>
          ))
        }
      </ul>
    </div>
  );
}

type DashboardCardProps = {
  id: number;
  title: string;
};
