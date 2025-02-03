const { API_URL } = process.env;

import ExternalLink from "@/ui/icons/ExternalLink";
import GithubIcon from "@/ui/icons/GithubIcon";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="px-6 py-2 text-sm flex justify-between">
      <p className="text-neutral-500 flex gap-2">
        Proyecto desarollado por{" "}
        <Link
          className="text-neutral-400 hover:text-neutral-300 transition-colors flex gap-1 items-center"
          href="https://github.com/jesusflsa"
          target="_blank"
        >
          <GithubIcon className="w-4 inline-block" />
          <span>Jesús Flores</span>
        </Link>
      </p>
      <div>
        <Link
          href={`${API_URL}/swagger-ui/index.html`}
          className="flex gap-1 text-neutral-400 hover:text-neutral-300"
          target="_blank"
        >
          <ExternalLink className="w-4 inline-block" />
          <span>Documentación del API</span>
        </Link>
      </div>
    </footer>
  );
}
