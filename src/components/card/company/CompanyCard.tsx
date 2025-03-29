import { Building2 } from "lucide-react";
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
          <p className="mt-1 text-gray-500 text-sm">{props.company.address}</p>
        </div>
        <Building2 className="w-10 h-10 text-gray-400" />
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