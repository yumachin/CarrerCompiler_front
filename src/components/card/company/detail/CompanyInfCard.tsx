import { Globe, MapPin, Clock, BadgeJapaneseYen, GitBranch, SlidersHorizontal } from 'lucide-react';
import Link from 'next/link';

import getIndustrialBadge from '@/components/budge/Industrial';

const SelectionFlow = (props: SelectionFlowProps) => (
  <div className="flex items-center space-x-4 mt-1 ml-2 text-sm text-gray-800">
    {props.flow.length > 0 && props.flow.map((selection, index) => (
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
          <span className="text-sm text-gray-500">従業員数: {props.company.employees} 人</span>
        </div>
      </div>
      <div className="border-t border-gray-200 p-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-8">

          <div className="flex flex-col col-span-2">
            <div className="flex items-center text-sm font-bold text-gray-500">
              <Globe className="h-4 w-4 mr-1" />Webサイト
            </div>
            {
              props.company.website === "" ? (
                <span className="mt-1 ml-2 text-sm text-gray-800">設定していません</span>
              ) : (
                <Link 
                  href={props.company.website}
                  className="mt-1 ml-2 text-sm text-indigo-600" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  ホームページを開く
                </Link>
              )
            }
          </div>

          <div className="flex flex-col col-span-5">
            <div className="flex items-center text-sm font-bold text-gray-500">
              <MapPin className="h-4 w-4 mr-1" />所在地
            </div>
            {
              props.company.address === "" ? (
                <span className="mt-1 ml-2 text-sm text-gray-800">設定していません</span>
              ) : (
                <span className="mt-1 ml-2 text-sm text-gray-800 break-all">
                  {props.company.address}
                </span>
              )
            }
          </div>

          <div className="flex flex-col col-span-2">
            <div className="flex items-center text-sm font-bold text-gray-500">
              <BadgeJapaneseYen className="h-4 w-4 mr-1" />月収
            </div>
            {
              props.company.income === 0 ? (
                <span className="mt-1 ml-2 text-sm text-gray-800">設定していません</span>
              ) : (
                <span className="mt-1 ml-2 text-sm text-gray-800">{props.company.income}万円</span>
              )
            }
          </div>

          <div className="flex flex-col col-span-3">
            <div className="flex items-center text-sm font-bold text-gray-500">
              <Clock className="h-4 w-4 mr-1" />休日・勤務時間
            </div>
            <div className='flex'>
              {
                props.company.holidays === 0 && props.company.workingHours === "" ? (
                  <span className="mt-1 ml-2 text-sm text-gray-800">設定していません</span>
                ) : (
                  <>
                    {
                      props.company.holidays !== 0 ? (
                        <span className="mt-1 ml-2 text-sm text-gray-800">{props.company.holidays}日</span>
                      ) : (
                        <span className="mt-1 ml-2 text-sm text-gray-800">設定していません</span>
                      )
                    }
                    <span className="mt-1 ml-2 text-sm text-gray-800">/</span>
                    {
                      props.company.workingHours !== "" ? (
                        <span className="mt-1 ml-2 text-sm text-gray-800">{props.company.workingHours}</span> 
                      ) : (
                        <span className="mt-1 ml-2 text-sm text-gray-800">設定していません</span>
                      )
                    }
                  </>
                )
              }
            </div>
          </div>

        </div>

        <div className="col-span-4">
          <div className="flex items-center text-sm font-bold text-gray-500">
            <GitBranch className="h-4 w-4 mr-1" />
            選考フロー
          </div>
          {
            props.company.selectionFlow.length === 0 ? (
              <span className="mt-1 ml-2 text-sm text-gray-800">設定していません</span>
            ) : (
              <SelectionFlow flow={props.company.selectionFlow} />
            )
          }
        </div>
        <div className="col-span-4">
          <div className="flex items-center text-sm font-bold text-gray-500">
            <SlidersHorizontal className="h-4 w-4 mr-1" />
            その他
          </div>
          {
            props.company.other === "" ? (
              <span className="mt-1 ml-2 text-sm text-gray-800">設定していません</span>
            ) : (
              <span className="mt-1 ml-2 text-sm text-gray-800">{props.company.other}</span>
            )
          }
        </div>
      </div>
    </div>
  );
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
  income: number;
  holidays: number;
  workingHours: string;
  selectionFlow: string[];
  other: string;
  favorite: boolean;
};