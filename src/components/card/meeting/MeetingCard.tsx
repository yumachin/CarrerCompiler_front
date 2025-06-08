import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import DeleteMeeting from '@/components/modals/DeleteMeeting';
import EditMeeting from '@/components/modals/EditMeeting';
import { MeetingType } from '@/types/others/types';
import { ToggleMeeting } from '@/utils/api/toggle';

export default function MeetingCard(props: MeetingCardProps) {
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

  return (
    <li className={`p-5 flex items-center ${props.meeting.status ? "bg-rose-100 text-red-500" : "bg-white"}`}>
      <input
        type="checkbox"
        checked={props.meeting.status}
        onChange={() => {
          ToggleMeeting(props.meeting.id, props.meeting.status)
          window.location.reload();
        }}
        className="mr-6 w-4 h-4 accent-emerald-600 cursor-pointer"
      />

      <div className="flex-1 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href={`/company/${props.meeting.companyId}`} className="text-sm font-bold text-indigo-600">{props.meeting.companyName}</Link>
            <button className="ml-4">{getStatusBadge(props.meeting.status)}</button>
          </div>
          <div className='flex space-x-6'>
            <EditMeeting meeting={props.meeting} />
            <DeleteMeeting id={props.meeting.id} />
          </div>
        </div>
        <div className="mt-3 sm:flex sm:justify-between text-sm text-gray-500">
          <div className="flex space-x-3">
            {props.meeting.date !== null &&
              <p>{format(props.meeting.date, "yyyy年MM月dd日(E) HH:mm", { locale: ja })}</p>
            }
            {props.meeting.date !== null && props.meeting.meetingType !== "" && <p>/</p>}
            <p>{props.meeting.meetingType}</p>
          </div>
          {props.meeting.onlineUrl !== "" && (
            <Link
              href={props.meeting.onlineUrl}
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

type MeetingCardProps = {
  meeting: MeetingType; 
};