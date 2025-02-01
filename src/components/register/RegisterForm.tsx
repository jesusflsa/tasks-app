"use client";

import { useAuth } from "@/contexts/AuthContext";

import { Field, Label, Input, Button } from "@headlessui/react";
import clsx from "clsx";

import { registerAction } from "@/lib/auth/actions";
import { useActionState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const { auth } = useAuth();
  const [state, userAction, isPending] = useActionState(registerAction, auth);

  const router = useRouter();

  useEffect(() => {
    if (state?.username) {
      router.push("/");
    }
  }, [router, state]);

  return (
    <form
      className="w-full space-y-3"
      action={async (formData: FormData) => {
        const username = formData.get("tasks-username") as string;
        const email = formData.get("tasks-email") as string;
        const password = formData.get("tasks-password") as string;

        userAction({ username, email, password });
      }}
    >
      <Field className="space-y-2">
        <Label className="text-sm/6 font-medium text-white block">
          Nombre de usuario
        </Label>
        <Input
          className={clsx(
            "mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
            "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
          )}
          name="tasks-username"
          autoComplete="off"
        />
        {state?.errors?.username && (
          <p className="text-xs text-red-500">{state.errors.username}</p>
        )}
      </Field>
      <Field className="space-y-2">
        <Label className="text-sm/6 font-medium text-white block">Email</Label>
        <Input
          className={clsx(
            "mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
            "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
          )}
          name="tasks-email"
          type="email"
          autoComplete="off"
        />
        {state?.errors?.email && (
          <p className="text-xs text-red-500">{state.errors.email}</p>
        )}
      </Field>
      <Field className="space-y-2">
        <Label className="text-sm/6 font-medium text-white block">
          Contraseña
        </Label>
        <Input
          className={clsx(
            "mt-2 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
            "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
          )}
          type="password"
          name="tasks-password"
          autoComplete="off"
        />
        {state?.errors?.password && (
          <p className="text-xs text-red-500">{state.errors.password}</p>
        )}
      </Field>
      <p className="text-sm">
        Ya tienes cuenta?{" "}
        <Link className="underline" href="/login">
          Inicia sesión
        </Link>
      </p>
      <Button
        className="block w-full items-center gap-2 rounded-md bg-neutral-700 py-2 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-neutral-600 data-[open]:bg-neutral-700 data-[focus]:outline-1 data-[focus]:outline-white"
        type="submit"
        disabled={isPending}
      >
        {isPending ? "Registrándote..." : "Regístrate"}
      </Button>
      {state?.errors?.unknown && !isPending && (
        <p className="text-sm text-red-500">{state.errors.unknown}</p>
      )}
    </form>
  );
}
