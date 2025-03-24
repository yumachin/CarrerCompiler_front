import Block from '@/components/blocks/Block';
import CompanyCards from '@/components/card/company/CompanyCards';

export default function CompanyPage() {
  return (
    <div className="min-h-screen bg-emerald-50">
      <Block />
      <main className="space-y-8 p-4 sm:p-8 sm:ml-48 transition-margin duration-200 ease-in-out">
        <h1 className="text-2xl font-bold text-gray-800">企業一覧</h1>
        <CompanyCards />
      </main>
    </div>
  );
};