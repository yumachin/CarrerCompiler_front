export default function getIndustrialBadge(Industrial: number) {
  switch (Industrial) {
    case 1:
      return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">商社</span>;
    case 2:
      return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-800">IT</span>;
    case 3:
      return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-800">メーカー</span>;
    default:
      return null;
  }
};