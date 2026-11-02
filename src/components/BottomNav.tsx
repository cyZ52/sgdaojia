"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="bottom">
      {[
        ["/home", "⌂", "首页"],
        ["/service", "▦", "服务"],
        ["/my", "♙", "我的"],
      ].map(([path, icon, label]) => (
        <Link
          key={path}
          href={path}
          className={pathname === path ? "active" : ""}
          aria-current={pathname === path ? "page" : undefined}
        >
          <span>{icon}</span>
          {label}
        </Link>
      ))}
    </nav>
  );
}
