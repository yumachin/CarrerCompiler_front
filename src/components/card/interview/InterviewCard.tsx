import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import DeleteInterview from '@/components/modals/DeleteInterview';
import EditInterview from '@/components/modals/EditInterview';
import { InterviewType } from '@/types/others/types';
import { ToggleInterview } from '@/utils/api/toggle';

export default function InterviewCard(props: InterviewCardProps) {
  const getStatusBadge = (status: boolean) => {
    return status ? (
      <p className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-800">
        完了
      </p>
    ) : (
      <p className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
        予定
      </p>
    );
  };

  const getInterviewTypeBadge = (interviewType: number) => {
    switch (interviewType) {
      case 1: return   (
        <p className="px-2.5 py-0.5 text-xs rounded-full font-bold bg-indigo-200 text-indigo-800">
          1次面接
        </p>
      )
      case 2: return   (
        <p className="px-2.5 py-0.5 text-xs rounded-full font-bold bg-teal-200 text-teal-800">
          2次面接
        </p>
      )
      case 3: return   (
        <p className="px-2.5 py-0.5 text-xs rounded-full font-bold bg-lime-200 text-lime-800">
          3次面接
        </p>
      )
      case 4: return   (
        <p className="px-2.5 py-0.5 text-xs rounded-full font-bold bg-amber-200 text-amber-800">
          4次面接
        </p>
      )
      case 10: return  (
        <p className="px-2.5 py-0.5 text-xs rounded-full font-bold bg-red-200 text-red-800">
          最終面接
        </p>
      )
      default: return;
    }
  };

  return (
    <li className={`p-5 flex items-center ${props.interview.status ? "bg-rose-100 text-red-500" : "bg-white"}`}>
      <input
        type="checkbox"
        checked={props.interview.status}
        onChange={() => {
          ToggleInterview(props.interview.id, props.interview.status)
          window.location.reload();
        }}
        className="mr-6 w-4 h-4 accent-emerald-600 cursor-pointer"
      />

      <div className="flex-1 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href={`/company/${props.interview.companyId}`} className="text-sm font-bold text-indigo-600">{props.interview.companyName}</Link>
            <button className="ml-4">{getStatusBadge(props.interview.status)}</button>
          </div>
          <div className='flex space-x-6'>
            <EditInterview interview={props.interview} />
            <DeleteInterview id={props.interview.id} />
          </div>
        </div>
        <div className="mt-3 sm:flex sm:justify-between text-sm text-gray-500">
          <div className="flex space-x-3">
            {props.interview.date !== null &&
              <p>{format(props.interview.date, "yyyy年MM月dd日(E) HH:mm", { locale: ja })}</p>
            }
            {props.interview.date !== null && (props.interview.selectionId !== 0 || props.interview.interviewType !== "")  && <p>/</p>}
            {props.interview.interviewType !== "" &&
              <p>{props.interview.interviewType}</p>
            }
            {props.interview.selectionId !== 0 && props.interview.interviewType !== "" && <p>/</p>}
            {getInterviewTypeBadge(props.interview.selectionId)}
          </div>
          {props.interview.onlineUrl !== "" && (
            <Link
              href={props.interview.onlineUrl}
              className="flex items-center text-sm mr-3 text-indigo-500 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              開始する
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          )}
        </div>
      </div>
    </li>
  );
};

type InterviewCardProps = {
  interview: InterviewType; 
};