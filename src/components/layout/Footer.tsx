import Link from "next/link";

export default function Footer() {
  return (
    <footer className="px-6 py-2 text-sm flex justify-between">
      <p className="text-neutral-500">
        Proyecto construido por{" "}
        <Link
          className="underline hover:text-neutral-300"
          href="https://github.com/jesusflsa"
          target="_blank"
        >
          jesusflsa
        </Link>
        .
      </p>
      <div>
        <p>Documentación del API <Link href=""></Link></p>
      </div>
    </footer>
  );
}
