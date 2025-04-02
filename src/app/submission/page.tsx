"use client";

import Block from '@/components/blocks/Block';
import SubmissionCards from '@/components/card/submission/SubmissionCards';
import AddSubmission from '@/components/modals/AddSubmission';

export default function SubmissionsPage() {
  return (
    <div className="min-h-screen bg-emerald-50">
      <Block />
      <main className="space-y-8 p-4 sm:p-8 sm:ml-40 transition-margin duration-200 ease-in-out">
        <div className='flex justify-between items-center'>
          <h1 className="text-2xl font-bold text-gray-800">提出物・タスク一覧</h1>
          <AddSubmission />
        </div>
        <SubmissionCards />
      </main>
    </div>
  );
};