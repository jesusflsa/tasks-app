"use client";

import RegisterForm from "@/components/register/RegisterForm";
import { Fieldset, Legend } from "@headlessui/react";

export default function RegisterPageUI() {
  return (
    <Fieldset className="space-y-10 p-6 sm:p-10 mb-8 w-full max-w-xl">
      <Legend className="text-xl font-semibold text-white space-y-4">
        Registrarse
      </Legend>
      <RegisterForm />
    </Fieldset>
  );
}
