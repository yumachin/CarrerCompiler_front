"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";
import Slider from "react-slick";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";

import { toastStyle } from "@/styles/toastStyle";
import { UpdateCompanyMemo } from "@/utils/api/company";

import "highlight.js/styles/github.css";
import "slick-carousel/slick/slick.css";

export default function CompanyMemoCard(props: CompanyMemoCardProps) {
  const sliderRef = useRef<Slider | null>(null);
  const [buttonState, setButtonState] = useState<number>(0);
  const [memo, setMemo] = useState<string>(props.memo || "");
  const router = useRouter();

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    arrows: false,
    afterChange: (current: number) => {
      if (current === 0) {
        setButtonState(0);
      } else {
        setButtonState(1);
      }
    },
  };

  const handleView = () => {
    setButtonState(0);
    sliderRef.current?.slickPrev();
  };

  const handleEdit = () => {
    setButtonState(1);
    sliderRef.current?.slickNext();
  };

  const handleSave = async () => {
    toast.dismiss();
    const loadingToast = toast.loading("編集中です...");
    try {
      const res = await UpdateCompanyMemo(props.id, memo);
      if (!res.error) {
        toast.success("会社メモの編集に成功しました！", {
          duration: 1200,
          id: loadingToast,
        });
        window.location.reload();
      } else {
        if (res.error === "トークン切れ") {
          toast.error("アクセス権がありません。ログインしなおしてください。", {
            style: toastStyle,
            duration: 1200,
            id: loadingToast,
          });
        } else {
          toast.error(
            "ユーザーが見つかりません。ログインしなおしてください。",
            {
              style: toastStyle,
              duration: 1200,
              id: loadingToast,
            }
          );
        }
        router.push("/signIn");
      }
    } catch (error) {
      console.error("会社メモ編集エラー", error);
      toast.error("会社メモの編集に失敗しました。", {
        id: loadingToast,
      });
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-5">
      <h3 className="ml-2 text-lg font-bold text-gray-800">会社概要メモ</h3>
      <div className="flex border-b border-gray-200">
        <button
          className={`flex-1 py-3 font-bold text-center ${
            buttonState === 0 ? "text-emerald-700" : "text-gray-400"
          }`}
          onClick={handleView}
        >
          プレビュー
        </button>
        <button
          className={`flex-1 py-3 font-bold text-center ${
            buttonState === 1 ? "text-emerald-700" : "text-gray-400"
          }`}
          onClick={handleEdit}
        >
          編集
        </button>
      </div>
      <Slider {...settings} ref={sliderRef}>
        <div className="p-4 prose break-all">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            components={{
              pre(props) {
                const { ...rest } = props;
                return <pre className="bg-white border" {...rest} />;
              },
              a(props) {
                const { ...rest } = props;
                return <a className="text-sm text-indigo-600" {...rest} />;
              },
            }}
          >
            {memo}
          </ReactMarkdown>
        </div>
        <div className="px-4 pt-4 space-y-6">
          <textarea
            rows={20}
            className="shadow w-full p-4 text-sm border rounded-lg"
            placeholder="マークダウンで入力"
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
          />
          <div className="flex justify-end">
            <button
              className="mr-4 px-4 py-2 text-sm font-bold rounded-lg shadow text-white bg-emerald-600"
              onClick={handleSave}
            >
              保存
            </button>
          </div>
        </div>
      </Slider>
    </div>
  );
}

type CompanyMemoCardProps = {
  id: number;
  memo: string;
};
