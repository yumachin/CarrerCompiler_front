export default function getIndustrialBadge(Industrial: number) {
  switch (Industrial) {
    case 1:
      return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">ソフトウェア・通信</span>;
    case 2:
      return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-800">メーカー</span>;
    case 3:
      return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-800">商社</span>;
    case 4:
      return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-800">流通・小売</span>;
    case 5:
      return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-800">金融</span>;
    case 6:
      return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-800">サービス・インフラ</span>;
    case 7:
      return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-800">広告・出版・マスコミ</span>;
    case 8:
      return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-800">官公庁・公社・団体</span>;
    default:
      return null;
  }
};