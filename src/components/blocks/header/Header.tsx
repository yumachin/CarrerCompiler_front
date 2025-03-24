import { MenuIcon } from 'lucide-react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

import CareerCompilerLogo from "../../../../public/CareerCompilerLogo.jpg";

export default function Header( props: HeaderProps ) {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = () => {
    if (pathname === "/signUp" || pathname === "/signIn") {
      router.push("/");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <nav className="bg-emerald-900 shadow-sm fixed w-full z-10">
      <div className="flex-shrink-0 flex items-center text-white h-20 px-2 sm:px-8">
        <button onClick={(prev) => props.setOpen && props.setOpen(!prev)} className="text-white sm:hidden">
          <MenuIcon />
        </button>
        <div onClick={handleClick} className="flex items-center cursor-pointer">
          <Image src={CareerCompilerLogo} alt="Career Compiler" width={320} height={320} />
        </div>
      </div>
    </nav>
  );
};

type HeaderProps = {
  setOpen?: (prev: boolean) => void;
};