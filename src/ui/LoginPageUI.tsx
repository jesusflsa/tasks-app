"use client";

import { Fieldset, Legend } from "@headlessui/react";
import LoginForm from "../components/login/LoginForm";

export default function LoginPageUI() {
  return (
    <Fieldset className="space-y-10 p-6 sm:p-10 mb-8 max-w-xl w-full">
      <Legend className="text-xl font-semibold text-white space-y-4">
        Iniciar sesión
      </Legend>
      <LoginForm />
    </Fieldset>
  );
}
