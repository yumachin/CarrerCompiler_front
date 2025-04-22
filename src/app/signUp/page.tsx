"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import Header from "@/components/blocks/header/Header";
import SignUpForm from "@/components/forms/SignUpForm";
import { SignUpType } from "@/types/auth/types";
import { SignUpFormSubmit } from "@/utils/forms/SignUpFormSubmit";
import { SignUpValidation } from "@/utils/validations/auth";

export default function SignUpPage() {
  const method = useForm<SignUpType>({
    mode: "onSubmit",
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(SignUpValidation),
  });
  const router = useRouter();

  const onSubmit = async (formData: SignUpType) => {
    const success = await SignUpFormSubmit(formData);
    setTimeout(() => {
      toast.remove();
      if (success) {
        router.push("/dashboard");
      }
    }, 1200);
  };

  return (
    <>
      <Header />
      <SignUpForm
        onSubmit={method.handleSubmit(onSubmit)}
        register={method.register}
        errors={method.formState.errors}
      />
    </>
  );
}
