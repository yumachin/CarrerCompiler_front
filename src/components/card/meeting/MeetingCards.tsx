import MeetingCard from "./MeetingCard";

export default function MeetingCards() {
  const interviews = [
    {
      id: 1,
      company: "株式会社テクノロジー",
      date: new Date("2024-04-01T14:00:00"),
      status: "scheduled",
      location: "オンライン",
    },
    {
      id: 2,
      company: "グローバル株式会社",
      date: new Date("2024-04-03T10:00:00"),
      status: "completed",
      location: "東京本社",
    }
  ];
  
  return (
    <ul className="bg-white shadow rounded-lg border divide-y divide-gray-200">
      {
        interviews.map((interview) => (
          <MeetingCard
            key={interview.id}
            id={interview.id}
            company={interview.company} 
            date={interview.date}
            status={interview.status}
            location={interview.location}
          />
        ))
      }
    </ul>
  );
};