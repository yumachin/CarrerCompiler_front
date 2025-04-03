import { Building2, Calendar, FileText } from "lucide-react";
import Link from "next/link";

import { useAuth } from "@/context/AuthContext";

import Setting from "../modals/Setting";

export default function LinkButtons() {
  const { user } = useAuth();
  
  const items = [
    {
      link: "/dashboard",
      icon: Calendar,
      name: "ダッシュボード"
    },
    {
      link: "/submission",
      icon: FileText,
      name: "提出物 / タスク"
    },
    {
      link: "/meeting",
      icon: Calendar,
      name: "面談 / 説明会"
    },
    {
      link: "/interview",
      icon: Calendar,
      name: "面接"
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
        {
          items.map((item, index) => (
            <li key={index}>
              <Link href={item.link} className="flex items-center px-3 py-6 text-sm text-gray-100 font-bold gap-2">
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            </li>
          ))
        }
      </ul>
      <Setting user={user} />
    </div>
  );
};