"use client";

import { useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import Slider from 'react-slick';
import remarkGfm from 'remark-gfm';
import "slick-carousel/slick/slick.css";

export default function CompanyMemoCard() {
  const sliderRef = useRef<Slider | null>(null);
  const [buttonState, setButtonState] = useState<number>(0);
  
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
    }
  };
  
  const handleView = () => {
    setButtonState(0);
    sliderRef.current?.slickPrev(); 
  };

  const handleEdit = () => {
    setButtonState(1);
    sliderRef.current?.slickNext();
  };
  
  return (
    <div className="bg-white shadow rounded-lg p-5">
      <h3 className="ml-2 text-lg font-bold text-gray-800">会社概要メモ</h3>
      <div className="flex border-b border-gray-200">
        <button 
          className={`flex-1 py-3 font-bold text-center ${buttonState === 0 ? "text-emerald-700" : "text-gray-400"}`}
          onClick={handleView}
        >
          プレビュー
        </button>
        <button 
          className={`flex-1 py-3 font-bold text-center ${buttonState === 1 ? "text-emerald-700" : "text-gray-400"}`}
          onClick={handleEdit}
        >
          編集
        </button>
      </div>
      <Slider 
        {...settings} 
        ref={sliderRef}
      >
        <div className="p-4 break-all">
          <ReactMarkdown remarkPlugins={[remarkGfm]}></ReactMarkdown>
        </div>
        <div className='px-4 pt-4 space-y-6'>
          <textarea
            rows={20}
            className="shadow w-full p-3 text-sm border rounded-lg"
            placeholder="マークダウンで入力"
          />
          <div className='flex justify-end'>
            <button className="mr-4 px-4 py-2 text-sm font-bold rounded-lg shadow text-white bg-emerald-600">
              保存
            </button>
          </div>
        </div>
      </Slider>
    </div>
  );
};