"use client";

import { useRouter } from "next/navigation";

export default function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return;
    router.push("/");
  };

  return (
    <div
      className="fixed inset-0 backdrop-blur-sm w-full h-full flex flex-col items-center justify-center"
      onClick={handleBackdropClick}
    >
      {children}
    </div>
  );
}
