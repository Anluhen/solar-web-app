import Link from "next/link";

export default function NavBox({ href, label }: { href: string; label: string }) {
  return (
    <Link
      className="
      w-25 h-25
      rounded-xl
      bg-blue-600 
      text-2xl font-semibold text-white
      grid place-items-center
      "
      href={href}
    >
      <span className="select-none">{label}</span>
    </Link>
  )
}