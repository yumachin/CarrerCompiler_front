import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { InterviewType } from '@/types/others/types';

export default function InterviewCard(props: InterviewCardProps) {
  const getStatusBadge = (status: boolean) => {
    return status ? (
      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-800">
        完了
      </span>
    ) : (
      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
        予定
      </span>
    );
  };

  const getInterviewTypeBadge = (interviewType: number) => {
    switch (interviewType) {
      case 1: return "1次面接";
      case 2: return "2次面接";
      case 3: return "3次面接";
      case 4: return "4次面談";
      case 10: return  "最終面接";
    }
  };

  return (
    <li className='p-5'>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <p className="text-sm font-bold text-indigo-600">{props.interview.companyId}</p>
          <p className="ml-4">{getStatusBadge(props.interview.status)}</p>
        </div>
        <p className="px-2.5 py-0.5 text-xs rounded-full font-bold bg-green-200 text-green-800">
          {getInterviewTypeBadge(props.interview.selectionId)} 
        </p>
      </div>
      <div className="mt-3 sm:flex sm:justify-between text-sm text-gray-500">
        <div className="flex space-x-3">
          <p>{props.interview.date !== null && format(props.interview.date, 'yyyy年MM月dd日(E) HH:mm', { locale: ja })}</p>
          {props.interview.date !== null && props.interview.interviewType !== "" && <p>/</p>}
          <p>{props.interview.interviewType}</p>
        </div>
        <Link 
          href={props.interview.onlineUrl} 
          className="flex items-center text-sm text-indigo-500 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          面接を始める
          <ArrowRight className="h-4 w-4 ml-2" />
        </Link>
      </div>
    </li>
  );
};

type InterviewCardProps = {
  interview: InterviewType; 
};