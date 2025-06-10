"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import { assets } from "@/assets/assets";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const CareerCompilerLogo = assets.CareerCompilerLogo.src;

  const handleClick = () => {
    if (pathname === "/signUp" || pathname === "/signIn") {
      router.push("/");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <nav className="bg-emerald-900 shadow-sm fixed w-full z-10">
      <div
        onClick={handleClick}
        className="flex items-start cursor-pointer max-w-xs h-20 px-4"
      >
        <Image
          src={CareerCompilerLogo}
          alt="Career Compiler"
          width={200}
          height={200}  
          style={{ width: "auto", height: "auto" }}
          priority
        />
      </div>
    </nav>
  );
}
