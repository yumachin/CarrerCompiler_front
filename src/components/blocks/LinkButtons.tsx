import { Building2, Calendar, FileText } from "lucide-react";
import Link from "next/link";

import Setting from "../modals/Setting";

export default function LinkButtons() {
  const items = [
    {
      link: "/dashboard",
      icon: Calendar,
      name: "ホーム"
    },
    {
      link: "/interview",
      icon: Calendar,
      name: "面接"
    },
    {
      link: "/meeting",
      icon: Calendar,
      name: "面談 / 説明会"
    },
    {
      link: "/submission",
      icon: FileText,
      name: "タスク"
    },
    {
      link: "/company",
      icon: Building2,
      name: "企業情報"
    }
  ];

  return (
    <div className="flex flex-col justify-between h-11/12">
      <ul className="divide-y divide-teal-800">
        {items.map((item, index) => (
          <li key={index}>
            <Link
              href={item.link}
              className="relative flex items-center py-6.5 text-sm text-gray-100 font-bold"
            >
              <item.icon className="absolute left-3.5 w-5 h-5" />
              <span className="mx-auto text-center">{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
      <Setting />
    </div>
  );
};