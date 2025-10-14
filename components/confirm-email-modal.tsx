"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ConfirmEmailModalProps {
  email: string;
  onBack?: () => void;
  onResend?: () => Promise<void>;
  onSignIn?: () => void;
  open: boolean;
  onClose: () => void;
}

export default function ConfirmEmailModal({
  email,
  onBack,
  onResend,
  onSignIn,
  open,
  onClose,
}: ConfirmEmailModalProps) {
  const [timer, setTimer] = useState(15);
  const [resending, setResending] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!open) return;
    setTimer(15);
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [open]);

  const handleResend = async () => {
    if (onResend) {
      setResending(true);
      await onResend();
      setResending(false);
      setTimer(15);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-[#232323] rounded-xl shadow-lg w-full max-w-md flex flex-col overflow-hidden">
        <div className="flex flex-col items-center justify-center p-8">
          <div className="w-full flex justify-center mb-4">
            <Image src="/favicon.png" alt="Sin Stream" width={48} height={48} />
          </div>
          <h2 className="text-2xl font-bold mb-2 text-white">Confirm Your Email</h2>
          <p className="text-gray-300 text-center mb-2">
            We have sent a confirmation link to <span className="font-semibold text-blue-400">{email}</span>.<br />
            If you don't see it, check your spam folder.
          </p>
          <div className="text-sm text-gray-400 mb-4">00:{timer.toString().padStart(2, "0")}</div>
          <Button
            className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white w-full mb-2"
            onClick={handleResend}
            disabled={timer > 0 || resending}
          >
            {resending ? "Sending..." : "Resend Link"}
          </Button>
          <div className="border-t border-[#333] pt-4 mt-4 text-center w-full">
            <span className="text-gray-400">Already have an account?</span>
            <button
              className="text-blue-400 underline ml-1"
              onClick={onSignIn || (() => router.push("/login"))}
            >
              Log In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
