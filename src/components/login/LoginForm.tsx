import { useAuth } from "@/contexts/AuthContext";

import { Field, Label, Input, Button } from "@headlessui/react";
import clsx from "clsx";

import { loginAction } from "@/lib/auth/actions";
import { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ErrorType, UserType } from "@/lib/types";

export default function LoginForm() {
  const { auth } = useAuth();
  const [state, userAction, isPending] = useActionState(loginAction, auth);
  const [errorState, setErrorState] = useState<ErrorType | undefined>(undefined);

  const router = useRouter();

  useEffect(() => {
    const userState = state as UserType;
    const errorState = state as ErrorType;
    if (userState?.username) {
      router.push("/");
    }

    if (errorState?.errors) {
      setErrorState(errorState);
    }
  }, [router, state]);

  return (
    <form
      className="w-full space-y-3"
      action={async (formData: FormData) => {
        const username = formData.get("tasks-username") as string;
        const password = formData.get("tasks-password") as string;

        userAction({ username, password });
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
        {errorState?.errors?.username && !isPending && (
          <p className="text-sm text-red-500">{errorState?.errors.username}</p>
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
        {errorState?.errors?.password && !isPending && (
          <p className="text-sm text-red-500">{errorState.errors.password}</p>
        )}
      </Field>
      <p className="text-sm">
        No tienes cuenta?{" "}
        <Link className="underline" href="/register">
          Regístrate
        </Link>
      </p>
      <Button
        className="block w-full items-center gap-2 rounded-md bg-neutral-500 py-2 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-neutral-600 data-[open]:bg-neutral-700 data-[focus]:outline-1 data-[focus]:outline-white disabled:bg-neutral-400 disabled:cursor-not-allowed"
        type="submit"
        disabled={isPending}
      >
        {isPending ? "Iniciando sesión..." : "Iniciar sesión"}
      </Button>
      {errorState?.errors?.unknown && !isPending && (
        <p className="text-sm text-red-500">{errorState.errors.unknown}</p>
      )}
    </form>
  );
}
