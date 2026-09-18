'use client';

// Hlavička dělená na poloviny: levá vinisto zelená (logo + „prodejce"),
// pravá merkatos Nova blue (logo merkatos) — řez barev pod úhlem 45°
// (tvrdý přechod, žádný gradient dle brand pravidel merkatos).

import Image from 'next/image';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { VinistoLogo } from '@/components/vinisto-logo';
import { useMobileMenu } from '@/components/mobile-menu';

export function AppHeader({ supplierName }: { supplierName: string }) {
	const { toggle, open } = useMobileMenu();

	return (
		<header
			className="grid h-14 shrink-0 grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 text-white"
			style={{
				background:
					'linear-gradient(135deg, var(--vinisto-green) 0%, var(--vinisto-green) 50%, var(--merkatos-blue) 50%, var(--merkatos-blue) 100%)',
			}}
		>
			<Link
				href="/"
				className="flex shrink-0 items-center text-white"
				aria-label="vinisto prodejce — domů"
			>
				<VinistoLogo height={34} />
			</Link>

			{/* Střed (přesně na rozhraní barev): název aplikace na zelené modře, jméno prodejce na modré zeleně */}
			<div className="flex min-w-0 items-center">
				<span className="shrink-0 pr-10 font-heading text-lg font-medium text-[var(--merkatos-blue)] md:text-xl">
					portál prodejce
				</span>
				<span
					className="hidden min-w-0 max-w-[30vw] truncate pl-10 font-heading text-lg font-medium text-[var(--vinisto-green)] md:block md:text-xl"
					title={supplierName}
				>
					{supplierName}
				</span>
			</div>

			<div className="flex items-center justify-end gap-3">
				<a
					href="https://merkatos.cz"
					target="_blank"
					rel="noopener noreferrer"
					className="shrink-0 transition-opacity hover:opacity-80"
					aria-label="merkatos.cz"
				>
					<Image
						src="/merkatos-logo.png"
						alt="merkatos"
						width={512}
						height={186}
						className="h-11 w-auto brightness-0 invert"
					/>
				</a>

				<button
					type="button"
					onClick={toggle}
					aria-expanded={open}
					aria-label={open ? 'Zavřít menu' : 'Otevřít menu'}
					className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm transition-colors hover:bg-white/10 lg:hidden"
				>
					<Menu className="size-4" />
					Menu
				</button>
			</div>
		</header>
	);
}
