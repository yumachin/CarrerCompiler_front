import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function InterviewCard(props: InterviewCardProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'scheduled':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">予定</span>;
      case 'completed':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-800">完了</span>;
      case 'cancelled':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-800">キャンセル</span>;
      default:
        return null;
    }
  };

  return (
    <li key={props.id} className='p-5'>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <p className="text-sm font-bold text-indigo-600">{props.company}</p>
          <p className="ml-4">{getStatusBadge(props.status)}</p>
        </div>
        <p className="px-2 text-xs font-bold rounded-full bg-green-100 text-green-800">
          {props.type}
        </p>
      </div>
      <div className="mt-3 sm:flex sm:justify-between text-sm text-gray-500">
        <div className="flex space-x-3">
          <p>{format(props.date, 'yyyy年MM月dd日(E) HH:mm', { locale: ja })}</p>
          <p>/</p>
          <p>{props.location}</p>
        </div>
        <Link href="/" className="flex items-center text-sm text-indigo-500 underline">
          面接を始める
          <ArrowRight className="h-4 w-4 ml-2" />
        </Link>
      </div>
    </li>
  );
};

type InterviewCardProps = {
  id: number;
  company: string;
  type: string;
  date: Date;
  status: string;
  location: string;
}