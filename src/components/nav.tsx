"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { ThemeToggle } from "./theme-toggle";
import { LocaleSwitch } from "./locale-switch";

const links = [
	{ href: "/", key: "home" },
	{ href: "/services", key: "services" },
	{ href: "/about", key: "about" },
	{ href: "/contact", key: "contact" },
] as const;

export function Nav() {
	const t = useTranslations("nav");
	const pathname = usePathname();

	return (
		<header className="border-b border-foreground/10 sticky top-0 z-10 backdrop-blur bg-background/80">
			<nav className="max-w-5xl mx-auto px-6 py-3 flex items-center gap-6" aria-label="Main navigation">
				<Link href="/" className="flex items-center gap-2 font-semibold shrink-0">
					<Image src="/favicon.png" alt="Catopia" width={24} height={24} />
					Catopia
				</Link>

				<div className="flex items-center gap-1 flex-1 flex-wrap">
					{links.map(({ href, key }) => {
						const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
						return (
							<Link
								key={href}
								href={href}
								className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
									active
										? "font-medium"
										: "text-foreground/50 hover:text-foreground hover:bg-foreground/5"
								}`}
							>
								{t(key)}
							</Link>
						);
					})}
				</div>

				<div className="flex items-center gap-1 shrink-0">
					<LocaleSwitch />
					<ThemeToggle />
				</div>
			</nav>
		</header>
	);
}
