import DashboardCard from "./DashboardCard";

export default function DashboardCards() {
  const titles = [ "今後の面談・面接", "提出期限が近い書類" ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
      {
        titles.map((title: string, index: number) => (
          <DashboardCard 
            key={index} 
            id={index} 
            title={title} 
          />
        ))
      }
    </div>
  );
};