import Block from '@/components/blocks/Block';
import InterviewCards from '@/components/card/interview/InterviewCards';
import AddInterview from '@/components/modals/AddInterview';

export default function InterviewPage() {
  return (
    <div className="min-h-screen bg-emerald-50">
      <Block />
      <main className="space-y-8 p-4 sm:p-8 sm:ml-48 transition-margin duration-200 ease-in-out">
        <div className='flex justify-between items-center'>
          <h1 className="text-2xl font-bold text-gray-800">面接一覧</h1>
          <AddInterview />
        </div>
        <InterviewCards />
      </main>
    </div>
  );
};