import { Loader2 } from "lucide-react";

import Block from "@/components/blocks/Block";

export default function LoadingPage() {
  return (
    <div className="min-h-screen bg-emerald-50 flex flex-col">
      <Block />
      <div className="flex flex-1 flex-col items-center justify-center ml-44">
        <p className="text-center text-emerald-600 text-lg font-bold mb-4">
          キャリアを形成中...
        </p>
        <div className="flex items-center justify-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
          <span className="text-lg font-medium text-emerald-500">
            Loading...
          </span>
        </div>
      </div>
    </div>
  );
}
