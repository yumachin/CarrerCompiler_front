"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

import FeatureCards from "@/components/card/FeatureCards";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-700 to-cyan-50">
      <section className="pt-48 text-center">
        <h1 className="text-3xl sm:text-7xl font-bold tracking-tight text-white mb-10">
          就活管理を、シンプルに効率的に
        </h1>
        <p className="text-2xl text-gray-100 mb-14">
          タスク管理から面接スケジュールまで、就活に必要な全てを一つのプラットフォームで管理
        </p>
        <div className="flex gap-6 justify-center">
          <Button size="lg" className="text-white bg-teal-800 hover:bg-teal-900">
            <Link href="/signUp" className="flex items-center">
              新規アカウント登録
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button size="lg" variant="outline">
            <Link href="/signIn">ログイン</Link>
          </Button>
        </div>
      </section>
      <section className="py-18">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">～主な機能～</h2>
          <FeatureCards />
        </div>
      </section>
    </div>
  );
};