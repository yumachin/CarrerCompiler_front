import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import DeleteSubmission from '@/components/modals/DeleteSubmission';
import EditSubmission from '@/components/modals/EditSubmission';
import { SubmissionType } from '@/types/others/types';
import { ToggleSubmission } from '@/utils/api/toggle';

export default function SubmissionCard(props: SubmissionCardProps) {
  const getStatusBadge = (status: boolean) => {
    return status ? (
      <p className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-800">
        提出済
      </p>
    ) : (
      <p className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
        未提出
      </p>
    );
  };

  const getSubmissionTypeBadge = (submissionType: number) => {
    switch (submissionType) {
      case 1: return   (
        <p className="px-2.5 py-0.5 text-xs rounded-full font-bold bg-stone-200 text-stone-800">
          ES
        </p>
      )
      case 2: return   (
        <p className="px-2.5 py-0.5 text-xs rounded-full font-bold bg-teal-200 text-teal-800">
          履歴書
        </p>
      )
      case 3: return   (
        <p className="px-2.5 py-0.5 text-xs rounded-full font-bold bg-lime-200 text-lime-800">
          適性検査
        </p>
      )
      case 4: return   (
        <p className="px-2.5 py-0.5 text-xs rounded-full font-bold bg-amber-200 text-amber-800">
          SPI
        </p>
      )
      case 5: return  (
        <p className="px-2.5 py-0.5 text-xs rounded-full font-bold bg-red-200 text-red-800">
          コーディングテスト
        </p>
      )
      case 6: return  (
        <p className="px-2.5 py-0.5 text-xs rounded-full font-bold bg-fuchsia-200 text-fuchsia-800">
          アンケート
        </p>
      )
      default: return;
    }
  };

  return (
    <li className={`p-5 flex items-center ${props.submission.status ? "bg-rose-100 text-red-500" : "bg-white"}`}>
      <input
        type="checkbox"
        checked={props.submission.status}
        onChange={() => {
          ToggleSubmission(props.submission.id, props.submission.status)
          window.location.reload();
        }}
        className="mr-6 w-4 h-4 accent-emerald-600 cursor-pointer"
      />

      <div className="flex-1 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href={`/company/${props.submission.companyId}`} className="text-sm font-bold text-indigo-600">{props.submission.companyName}</Link>
            <button className="ml-4">{getStatusBadge(props.submission.status)}</button>
          </div>
          <div className='flex space-x-6'>
            <EditSubmission submission={props.submission} />
            <DeleteSubmission id={props.submission.id} />
          </div>
        </div>
        <div className="mt-3 sm:flex sm:justify-between text-sm text-gray-500">
          <div className="flex space-x-3">
            {props.submission.deadline !== null &&
              <p>{format(props.submission.deadline, "yyyy年MM月dd日(E) HH:mm", { locale: ja })}</p>
            }
            {props.submission.deadline !== null && (props.submission.submissionType !== 0 || props.submission.contactMedia !== "")  && <p>/</p>}
            {props.submission.contactMedia !== "" &&
              <p>{props.submission.contactMedia}</p>
            }
            {props.submission.contactMedia !== "" && props.submission.submissionType !== 0 && <p>/</p>}
            {getSubmissionTypeBadge(props.submission.submissionType)}
          </div>
          {props.submission.submissionUrl !== "" && props.submission.status === false && (
            <Link
              href={props.submission.submissionUrl}
              className="flex items-center text-sm mr-3 text-indigo-500 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              提出する
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          )}
        </div>
      </div>
    </li>

  );
};

type SubmissionCardProps = {
  submission: SubmissionType; 
};