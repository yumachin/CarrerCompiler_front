import { FileText, SquarePen, CodeXml } from "lucide-react";

export default function SubmissionCard(props: SubmissionCardProps) {
  const getIcon = (iconId: number) => {
    switch (iconId) {
      case 1:
        return <FileText className="h-6 w-6 text-gray-400" />;
      case 2:
        return <SquarePen className="h-6 w-6 text-gray-400" />;
      case 3:
        return <CodeXml className="h-6 w-6 text-gray-400" />;
      default:
        return <div className="h-6 w-6"></div>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-800">未提出</span>;
      case 'submitted':
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800">提出済</span>;
      case 'rejected':
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800">不採用</span>;
      case 'accepted':
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">採用</span>;
      default:
        return null;
    }
  };

  return (
    <li key={props.id} className="p-4">
      <div className="flex items-center space-x-4">
        {getIcon(props.iconId)}
        <div className="flex-1">
          <div className="flex justify-between">
            <p className="text-sm font-bold text-indigo-600">{props.company}</p>
            {getStatusBadge(props.status)}
          </div>
          <div className="mt-1 text-sm text-gray-500">
            <p>{props.type}</p>
            <p>提出期限: {props.deadline}</p>
          </div>
        </div>
        <button className="px-3 py-2 border shadow text-sm font-bold rounded-md text-gray-700 bg-white">
          詳細
        </button>
      </div>
    </li>
  );
};

type SubmissionCardProps = {
  id: number;
  company: string;
  type: string;
  deadline: string;
  status: string;
  iconId: number;
};