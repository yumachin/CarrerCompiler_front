import { Globe, MapPin, Clock, BadgeJapaneseYen, GitBranch, SlidersHorizontal } from 'lucide-react';
import Link from 'next/link';
import { ReactNode } from 'react';

import getIndustrialBadge from '@/components/budge/Industrial';

const InfoSection = (props: InfoSectionProps) => (
  <div className="flex flex-col">
    <div className="flex items-center text-sm font-bold text-gray-500">
      {props.label}
    </div>
    {props.link !== undefined && props.value !== "" ? (
      <Link 
        href={props.value} 
        className="mt-1 ml-2 text-sm text-indigo-600" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        ホームページを開く
      </Link>
    ) : ( 
      <span className="mt-1 ml-2 text-sm text-gray-800 break-all">
        {props.value || '設定していません'}
      </span>
    )}
  </div>
);

const SelectionFlow = (props: SelectionFlowProps) => (
  <div className="flex items-center space-x-4 mt-1 ml-2 text-sm text-gray-800">
    {props.flow.map((selection, index) => (
      <div className="flex items-center" key={index}>
        <span className="w-7 h-7 flex items-center justify-center rounded-full bg-emerald-50 text-emerald-600">{index + 1}</span>
        <span className="ml-2">{selection}</span>
        {index < (props.flow.length - 1) && <span className="text-gray-300 ml-4">→</span>}
      </div>
    ))}
  </div>
);

export default function CompanyInfCard(props: CompanyCardProps) {
  return (
    <div className="bg-white shadow rounded-lg">
      <div className="flex flex-col p-5">
        <h2 className="text-2xl font-bold text-gray-800">{props.company.name}</h2>
        <div className="flex items-center mt-2 space-x-2">
          {getIndustrialBadge(props.company.industry)}
          <span className="text-sm text-gray-500">従業員数: {props.company.employees}</span>
        </div>
      </div>
      <div className="border-t border-gray-200 p-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-8">
          <InfoSection label={<><Globe className="h-4 w-4 mr-1" />Webサイト</>} value={props.company.website} link={props.company.website} />
          <InfoSection label={<><MapPin className="h-4 w-4 mr-1" />所在地</>} value={props.company.address} />
          <InfoSection label={<><BadgeJapaneseYen className="h-4 w-4 mr-1" />月収（年収）</>} value={props.company.income} />
          <InfoSection label={<><Clock className="h-4 w-4 mr-1" />休日・勤務時間</>} value={`${props.company.holidays} / ${props.company.workingHours}`} />
        </div>
        <div className="col-span-4">
          <div className="flex items-center text-sm font-bold text-gray-500">
            <GitBranch className="h-4 w-4 mr-1" />
            選考フロー
          </div>
          <SelectionFlow flow={props.company.selectionFlow} />
        </div>
        <div className="col-span-4">
          <div className="flex items-center text-sm font-bold text-gray-500">
            <SlidersHorizontal className="h-4 w-4 mr-1" />
            その他
          </div>
          <span className="mt-1 ml-2 text-sm text-gray-800">{props.company.other}</span>
        </div>
      </div>
    </div>
  );
};

type InfoSectionProps = {
  label: ReactNode;
  value: string;
  link?: string;
};

type SelectionFlowProps = {
  flow: string[];
};

type CompanyCardProps = {
  company: TempProps;
};

type TempProps = {
  id: number;
  name: string;
  industry: number;
  employees: number;
  website: string;
  address: string;
  income: string;
  holidays: string;
  workingHours: string;
  selectionFlow: string[];
  other: string;
  favorite: boolean;
};