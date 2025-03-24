"use client";

import Block from '@/components/blocks/Block';
import SubmissionCards from '@/components/card/submission/SubmissionCards';

export default function SubmissionsPage() {
  return (
    <div className="min-h-screen bg-emerald-50">
      <Block />
      <main className="space-y-8 p-4 sm:p-8 sm:ml-48 transition-margin duration-200 ease-in-out">
        <h1 className="text-2xl font-bold text-gray-800">提出物一覧</h1>
        <SubmissionCards />
      </main>
    </div>
  );
};