import Link from 'next/link';
import { ReactNode } from 'react';

export default function CountCard(props: CountCardProps) {
  return (
    <Link href={props.link} className="flex items-center p-5 bg-white border shadow rounded-lg">
      {props.icon}
      <div className="ml-5">
        <div className="text-sm font-bold text-gray-500">{props.name}</div>
        <div className="text-2xl font-bold text-gray-700">{props.count}</div>
      </div>
    </Link>
  );
};

type CountCardProps = {
  link: string;
  icon: ReactNode;
  name: string;
  count: number;
};