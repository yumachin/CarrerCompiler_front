import { Building2, Calendar, FileText } from 'lucide-react';

import CountCard from './CountCard';

export default function CountCards() {
  const items = [
    {
      link: "/submission",
      icon: FileText,
      name: "提出物"
    },
    {
      link: "/meeting",
      icon: Calendar,
      name: "面談"
    },
    {
      link: "/interview",
      icon: Calendar,
      name: "面接"
    },
    {
      link: "/company",
      icon: Building2,
      name: "企業"
    }
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mt-8">
      {
        items.map((item, index) => (
          <CountCard 
            key={index}
            link={item.link}
            icon={<item.icon className="text-gray-400" />}
            name={item.name}
          />
        ))
      }
    </div>
  );
};