"use client"

import { ReleaseCard } from "@/components"
import { ButtonArrow } from "@/components/buttons"
import { Album } from "@/types"

type ReleasesMenuProps = {
	albums: Album[]
}

export default function ReleasesMenu({ albums }: ReleasesMenuProps) {
	return (
		<div className='relative w-40 h-full p-4 flex flex-col gap-4 items-center mr-8 md:mr-64'>
			<ButtonArrow
				rotation={"270"}
				classes='absolute top-0'
				action={() => console.log("click")}
			/>
			{albums.map((album) => (
				<ReleaseCard album={album} key={album.slug} />
			))}

			<ButtonArrow
				rotation={"90"}
				classes='absolute bottom-0'
				action={() => console.log("click")}
			/>
		</div>
	)
}
