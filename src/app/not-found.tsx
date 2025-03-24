import { FileQuestion, Home, Search, Users } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12 text-center">
      <div className="mb-6">
        <FileQuestion className="w-24 h-24 mx-auto text-primary" />
      </div>
      <h1 className="text-4xl font-bold tracking-tight mb-2">ページが見つかりません</h1>
      <p className="text-xl text-muted-foreground mb-8">お探しのページは存在しないか、移動した可能性があります。</p>

      <div className="flex flex-col sm:flex-row gap-4 mb-12">
        <Button asChild size="lg">
          <Link href="/">
            <Home className="mr-2 h-5 w-5" />
            ホームに戻る
          </Link>
        </Button>
      </div>

      <div className="max-w-md mx-auto">
        <h2 className="text-lg font-medium mb-4">以下のページもご利用いただけます：</h2>
        <ul className="space-y-3 text-left">
          <li>
            <Link href="/companies" className="flex items-center p-3 rounded-lg hover:bg-muted transition-colors">
              <Users className="mr-3 h-5 w-5 text-primary" />
              <span>企業一覧</span>
            </Link>
          </li>
          <li>
            <Link href="/applications" className="flex items-center p-3 rounded-lg hover:bg-muted transition-colors">
              <FileQuestion className="mr-3 h-5 w-5 text-primary" />
              <span>応募状況</span>
            </Link>
          </li>
          <li>
            <Link href="/search" className="flex items-center p-3 rounded-lg hover:bg-muted transition-colors">
              <Search className="mr-3 h-5 w-5 text-primary" />
              <span>求人検索</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};