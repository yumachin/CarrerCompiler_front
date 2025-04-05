import camelcaseKeys from "camelcase-keys";
import { Building2, Calendar, FileText } from "lucide-react";
import { cookies } from "next/headers";

import CountCard from "./CountCard";

export default async function CountCards() {
  let tableCounts;
  try {
    tableCounts = await GetCounts();
  } catch (error) {
    console.error(error);
  }

  const items = [
    {
      link: "/submission",
      icon: FileText,
      name: "提出物",
      count: tableCounts.submissionCount,
    },
    {
      link: "/meeting",
      icon: Calendar,
      name: "面談",
      count: tableCounts.meetingCount,
    },
    {
      link: "/interview",
      icon: Calendar,
      name: "面接",
      count: tableCounts.interviewCount,
    },
    {
      link: "/company",
      icon: Building2,
      name: "企業",
      count: tableCounts.companyCount,
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mt-4">
      {items.map((item, index) => (
        <CountCard
          key={index}
          link={item.link}
          icon={<item.icon className="text-gray-400" />}
          name={item.name}
          count={item.count}
        />
      ))}
    </div>
  );
}

export const GetCounts = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access-token')?.value;
  const client = cookieStore.get('client')?.value;
  const email = cookieStore.get('email')?.value;
  const uid = cookieStore.get('uid')?.value;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/counts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "access-token": accessToken || "",
        "client": client || "",
        "email": email || "",
        "uid": uid || ""
      }
    });
    const data = await res.json();
    return camelcaseKeys(data, { deep: true });
  } catch (error) {
    console.error(error);
    throw new Error("各テーブル数の取得に失敗");
  }
};