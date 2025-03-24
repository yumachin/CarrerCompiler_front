import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function MeetingCard(props: InterviewCardProps) {
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
    <li key={props.id} className='flex justify-between items p-5'>
      <div>
        <div className="flex items-center">
          <p className="text-sm font-bold text-indigo-600">{props.company}</p>
          <p className="ml-4">{getStatusBadge(props.status)}</p>
        </div>
        <div className="sm:flex sm:justify-between mt-3 space-x-3 text-sm text-gray-500">
          <p>{format(props.date, 'yyyy年MM月dd日(E) HH:mm', { locale: ja })}</p>
          <p>/</p>
          <p>{props.location}</p>
        </div>
      </div>
      <Link href="/" className="flex items-center text-sm text-indigo-500 underline">
        面談を始める
        <ArrowRight className="h-4 w-4 ml-2" />
      </Link>
    </li>
  );
};

type InterviewCardProps = {
  id: number;
  company: string;
  date: Date;
  status: string;
  location: string;
}