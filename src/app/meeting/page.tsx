import Block from '@/components/blocks/Block';
import MeetingCards from '@/components/card/meeting/MeetingCards';
import AddMeeting from '@/components/modals/AddMeeting';

export default function MeetingPage() {
  return (
    <div className="min-h-screen bg-emerald-50">
      <Block />
      <main className="space-y-8 p-4 sm:p-8 sm:ml-40 transition-margin duration-200 ease-in-out">
        <div className='flex justify-between items-center'>
          <h1 className="text-2xl font-bold text-gray-800">面談・説明会一覧</h1>
          <AddMeeting />
        </div>
        <MeetingCards />
      </main>
    </div>
  );
};