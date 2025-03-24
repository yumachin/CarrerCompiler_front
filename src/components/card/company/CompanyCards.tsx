import CompanyCard from "./CompanyCard";

export default function CompanyCards() {
  const companies = [
    {
      id: 1,
      company: "株式会社テクノロジー",
      industrial: 2,
      address: "東京都渋谷区"
    },
    {
      id: 2,
      company: "グローバル株式会社",
      industrial: 1,
      address: "東京都渋谷区"
    }
  ];

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {
        companies.map((company) => (
          <CompanyCard
            key={company.id}
            id={company.id}
            company={company.company}
            industrial={company.industrial}
            address={company.address}
          />
        ))
      }
    </ul>
  );
};