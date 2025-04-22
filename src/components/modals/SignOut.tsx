import { useRouter } from "next/navigation";
// import { useState } from "react";

import { SignOut } from "@/utils/api/auth";

import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";

export default function SignOutPage({ confirm, setConfirm }: SignOutProps) {
  // const [loading, setLoading] = useState(false); 
  const router = useRouter();

  const handleSignOut = async () => {
    // setLoading(true);
    try {
      await SignOut();
      router.push("/");
    } catch (error) {
      console.error("ログアウト失敗", error);
    } finally {
      // setLoading(false);
    }
  };

  return (
    <Dialog open={confirm} onOpenChange={setConfirm}>
      <DialogContent>
        <DialogHeader className='mb-8'>
          <DialogTitle className='text-2xl mb-4'>ログアウトの確認</DialogTitle>
          <DialogDescription className="ml-4">本当にログアウトしますか？</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => setConfirm(false)}
            className="font-bold cursor-pointer"
          >
            キャンセル
          </Button>
          <Button 
            onClick={handleSignOut} 
            className="font-bold bg-red-500 cursor-pointer"
          >
            ログアウト
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

type SignOutProps = {
  confirm: boolean;
  setConfirm: (value: boolean) => void;
};