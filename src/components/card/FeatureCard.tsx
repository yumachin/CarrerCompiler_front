import { ReactNode } from "react";

export default function FeatureCard(props: FeatureCardProps) {
  return (
    <div className="p-6 rounded-lg bg-gray-100 border border-gray-300">
      <div className="flex items-center gap-4">
        {props.icon}
        <h3 className="text-xl font-bold mb-2">{props.title}</h3>
      </div>
      <p className="text-gray-500">{props.description}</p>
    </div>
  );
};

type FeatureCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
};