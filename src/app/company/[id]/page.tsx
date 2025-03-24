import Block from '@/components/blocks/Block';
import CompanyInfCard from '@/components/card/company/detail/CompanyInfCard';
import CompanyMemoCard from '@/components/card/company/detail/CompanyMemoCard';

export default function CompanyDetailPage() {

  const company = {
    id: 1,
    name: '株式会社テクノロジー',
    industry: 2,
    employees: 500,
    website: 'https://example.com',
    address: '東京都渋谷区渋谷1-1-1',
    income: '35万',
    holidays: '126日',
    workingHours: '9:00~18:00',
    selectionFlow: ['書類選考', '一次面接', '二次面接', '最終面接', '内定'],
    other: "フレックスタイム制",
    favorite: false
  };

  return (
    <div className="min-h-screen bg-emerald-50 pb-12">
      <Block />
      <main className="space-y-8 p-4 sm:p-8 sm:ml-48 transition-margin duration-200 ease-in-out">
        <CompanyInfCard company={company} />
        <CompanyMemoCard />
      </main>
    </div>
  );
};