import { Building2, Calendar, FileText } from "lucide-react";

import { GetCounts } from "@/utils/api/dashboard";

import CountCard from "./CountCard";

export default async function CountCards() {
  let tableCounts;
  try {
    tableCounts = await GetCounts();
    // console.log("APIのレスは:", tableCounts);
  } catch (error) {
    console.error(error);
  }

  const items = [
    {
      link: "/submission",
      icon: FileText,
      name: "提出物",
      count: tableCounts.submissionCount
    },
    {
      link: "/meeting",
      icon: Calendar,
      name: "面談",
      count: tableCounts.meetingCount
    },
    {
      link: "/interview",
      icon: Calendar,
      name: "面接",
      count: tableCounts.interviewCount
    },
    {
      link: "/company",
      icon: Building2,
      name: "企業",
      count: tableCounts.companyCount
    }
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
};