import Link from "next/link";

import getIndustrialBadge from "@/components/budge/Industrial";
import { CompanyType } from "@/types/others/types";

export default function CompanyCard(props:CompanyCardProps) {
  return (
    <li className="bg-white rounded-lg shadow divide-y divide-gray-200">
      <div className="flex items-center justify-between p-6">
        <div className="flex flex-col">
          <div className="flex items-center space-x-3">
            <h3 className="text-gray-900 text-sm font-bold">{props.company.name}</h3>
            {getIndustrialBadge(props.company.industry)}
          </div>
          {props.company.address ? (
            <p className="mt-2 text-gray-500 text-xs">{props.company.address}</p>
          ) : (
            <p className="mt-2 text-gray-500 text-xs">所在地が設定されていません。</p>
          )}
        </div>
        
      </div>
      <Link href={`company/${props.company.id}`} className="flex items-center justify-center py-4 text-sm text-gray-700 font-bold">
        詳細を見る
      </Link>
    </li>
  );
};

type CompanyCardProps = {
  company: CompanyType;
};