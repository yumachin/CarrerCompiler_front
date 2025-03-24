import InterviewCard from "./InterviewCard";

export default function InterviewCards() {
  const interviews = [
    {
      id: 1,
      company: "株式会社テクノロジー",
      type: "カジュアル面談",
      date: new Date("2024-04-01T14:00:00"),
      status: "scheduled",
      location: "オンライン",
    },
    {
      id: 2,
      company: "グローバル株式会社",
      type: "1次面接",
      date: new Date("2024-04-03T10:00:00"),
      status: "completed",
      location: "東京本社",
    }
  ];
  
  return (
    <ul className="bg-white shadow rounded-lg border divide-y divide-gray-200">
      {
        interviews.map((interview) => (
          <InterviewCard
            key={interview.id}
            id={interview.id}
            company={interview.company} 
            type={interview.type}
            date={interview.date}
            status={interview.status}
            location={interview.location}
          />
        ))
      }
    </ul>
  );
};