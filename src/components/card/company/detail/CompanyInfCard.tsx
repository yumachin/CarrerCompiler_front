import { Globe, MapPin, Clock, BadgeJapaneseYen, SlidersHorizontal } from 'lucide-react';
import Link from 'next/link';

import getIndustrialBadge from '@/components/budge/Industrial';
import EditCompany from '@/components/modals/EditCompany';

export default function CompanyInfCard(props: CompanyCardProps) {
  return (
    <div className="bg-white shadow rounded-lg">
      <div className='flex justify-between items-center px-6'>
        <div className="flex flex-col py-2">
          <div className='flex items-center mt-4 space-x-4'>
            <h2 className="text-2xl font-bold text-gray-800">{props.company.name}</h2>
            {getIndustrialBadge(props.company.industry)}
          </div>
          <div className='flex items-center space-x-1 mt-5 text-sm text-gray-500'>
            <p>従業員数：</p>
            <p>{props.company.employees === 0 ? "設定していません" : `${props.company.employees}人`}</p>
          </div>
        </div>
        <EditCompany company={props.company} />
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

          <div className="flex flex-col col-span-4">
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

          <div className="flex flex-col col-span-4">
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
                        <span className="mt-1 ml-2 text-sm text-gray-800">{props.company.holidays}日以上</span>
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

        {/* <div className="col-span-4">
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
        </div> */}
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

type CompanyCardProps = {
  company: TempProps;
};

type TempProps = {
  id: number;
  userId: number;
  name: string;
  industry: number;
  employees: number;
  website: string;
  address: string;
  income: number;
  holidays: number;
  workingHours: string;
  other: string;
  favorite: boolean;
  created_at: string;
  updated_at: string;
};