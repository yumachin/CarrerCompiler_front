import SubmissionCard from "./SubmissionCard";

export default function SubmissionCards() {
  const submissions = [
    {
      id: 1,
      company: "株式会社テクノロジー",
      type: "履歴書・職務経歴書",
      deadline: "2024-03-31",
      status: "pending",
      iconId: 3
    },
    {
      id: 2,
      company: "グローバル株式会社",
      type: "エントリーシート",
      deadline: "2024-04-05",
      status: "submitted",
      iconId: 2
    },
    {
      id: 3,
      company: "株式会社プログラミング",
      type: "適性検査",
      deadline: "2024-04-05",
      status: "submitted",
      iconId: 4
    }
  ];

  return (
    <ul className="bg-white shadow rounded-lg border divide-y divide-gray-200">
      {
        submissions.map((submission) => (
          <SubmissionCard 
            key={submission.id}
            id={submission.id}
            company={submission.company} 
            type={submission.type}
            deadline={submission.deadline}
            status={submission.status}
            iconId={submission.iconId}
          />
        ))
      }
    </ul>
  );
};