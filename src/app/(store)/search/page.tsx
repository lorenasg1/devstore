import { api } from '@/data/api'
import type { Product } from '@/data/types/product'
import { formatPrice } from '@/utils/formatPrice'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import { CurrentSearch } from './current-search'

interface SearchProps {
	searchParams: {
		q: string
	}
}

async function searchProducts(query: string): Promise<Product[]> {
	const response = await api(`/products/search?q=${query}`, {
		next: {
			revalidate: 60 * 60, // 1h,
		},
	})

	const products = await response.json()

	return products
}

export default async function Search({ searchParams }: SearchProps) {
	const { q: query } = searchParams

	if (!query) redirect('/')

	const products = await searchProducts(query)

	return (
		<div className="flex flex-col gap-4">
			<p className="text-sm">
				Resultados para: <span className="font-semibold">{query}</span>
			</p>

			<div className="grid grid-cols-3 gap-6">
				{products?.map((product) => (
					<Link
						key={product.slug}
						href={`/product/${product.slug}`}
						className="group relative rounded-lg bg-zinc-900 overflow-hidden flex justify-center items-end"
					>
						<Image
							src={product.image}
							alt={product.description}
							className="group-hover:scale-105 transition-transform duration-500"
							width={480}
							height={480}
							quality={80}
							priority
						/>

						<div className="absolute bottom-20 right-8 lg:bottom-24 lg:right-18 h-12 flex items-center gap-2 max-w-[300px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
							<span title={product.title} className="text-sm truncate">
								{product.title}
							</span>
							<span className="flex h-full text-sm items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
								{formatPrice(product.price)}
							</span>
						</div>
					</Link>
				))}
			</div>
		</div>
	)
}
