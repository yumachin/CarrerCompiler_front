export default function DashboardCard(props: DashboardCardProps) {
  const interviews = [
    {
      company: "株式会社テクノロジー",
      date: "2024年4月1日 14:00 - 1次面接"
    },
    {
      company: "グローバル株式会社",
      date: "2024年4月3日 10:00 - カジュアル面談"
    }
  ];
  const submissions = [
    {
      name: "履歴書・職務経歴書",
      company: "株式会社テクノロジー",
      deadline: "2024年3月31日まで"
    },
    {
      name: "エントリーシート",
      company: "グローバル株式会社",
      deadline: "2024年4月5日まで"
    }
  ];

  return (
    <div className="bg-white border shadow rounded-lg p-4 sm:p-6">
      <h3 className="text-lg font-bold text-gray-700">{props.title}</h3>
      <ul className="-my-4 divide-y divide-gray-200 mt-2">
        {
          props.id === 0 ? 
          interviews.map((interview, index) => (
            <li key={index} className="flex flex-col justify-center py-6">
              <p className="text-sm font-bold text-gray-700">{interview.company}</p>
              <p className="text-sm text-gray-500">{interview.date}</p>
            </li>
          )) : 
          submissions.map((submission, index) => (
            <li key={index} className="flex flex-col justify-center py-6">
              <p className="text-sm font-bold text-gray-700">{submission.name}</p>
              <p className="text-sm text-gray-500">{submission.company} - {submission.deadline}</p>
            </li>
          ))
        }
      </ul>
    </div>
  );
};

type DashboardCardProps = {
  id: number;
  title: string;
};