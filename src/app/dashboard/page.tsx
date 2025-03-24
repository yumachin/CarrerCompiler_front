import Block from '@/components/blocks/Block';
import CountCards from '@/components/card/dashboard/CountCards';
import DashboardCards from '@/components/card/dashboard/DashboardCards';

export default function DashBoardPage() {
  return (
    <div className="min-h-screen bg-emerald-50">
      <Block />
      <main className="space-y-8 p-4 sm:p-8 sm:ml-48 transition-margin duration-200 ease-in-out">
        <CountCards />
        <DashboardCards />
      </main>
    </div>
  );
};