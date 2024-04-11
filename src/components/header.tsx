import { Search, ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export function Header() {
	return (
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-5">
				<Link href="/" className="text-2xl font-extrabold text-white">
					devstore
				</Link>

				<form className="flex w-[320px] items-center gap-3 rounded-full bg-zinc-900 px-5 py-3 ring-zinc-700 focus-within:outline">
					<Search className="w-5 h-5 text-zinc-500" />

					<input
						type="text"
						placeholder="Buscar produtos..."
						className="flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-500"
					/>
				</form>
			</div>
			<div className="flex items-center gap-4">
				<div className="flex items-center gap-2">
					<ShoppingBag className="h-4 w-4" />
					<span className="text-sm">Sacola (0)</span>
				</div>

				<div className="w-px h-4 bg-zinc-700" />

				<Link href="/home" className="flex items-center gap-2 hover:underline">
					<span className="text-sm">Conta</span>
					<Image
						src="https://github.com/lorenasg1.png"
						alt="Sua foto"
						width={24}
						height={24}
						className="h-6 w-6 rounded-full"
					/>
				</Link>
			</div>
		</div>
	)
}