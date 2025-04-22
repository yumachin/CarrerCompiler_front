import { Calendar, ClipboardList, Building2 } from "lucide-react";

import FeatureCard from "./FeatureCard";

export default function FeatureCards() {
  const items = [
    {
      icon: ClipboardList,
      title: "タスク管理",
      description: "ES提出やSPI受験など、就活に関する全てのタスクを効率的に管理"
    },
    {
      icon: Calendar,
      title: "スケジュール管理",
      description: "面談・面接の日程を一元管理"
    },
    {
      icon: Building2,
      title: "企業情報管理",
      description: "応募企業の情報や選考状況を簡単に把握"
    }
  ];

  return (
    <div className="grid sm:grid-cols-3 gap-8">
      {
        items.map((item, index) => (
          <FeatureCard
            key={index}
            icon={<item.icon className="text-primary mb-4" />}
            title={item.title}
            description={item.description}
          />
        ))
      }
    </div>
  );
}
