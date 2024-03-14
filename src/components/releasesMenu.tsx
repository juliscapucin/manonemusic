"use client"

import { ReleaseCard } from "@/components"
import { ButtonArrow } from "@/components/buttons"
import { Album } from "@/types"

type ReleasesMenuProps = {
	albums: Album[]
}

export default function ReleasesMenu({ albums }: ReleasesMenuProps) {
	return (
		<div className='relative w-60 h-full p-4 flex flex-col gap-4 items-center mr-8 md:mr-64'>
			<ButtonArrow
				classes='absolute top-4 rotate-270'
				action={() => console.log("click")}
			/>
			{albums.map((album) => (
				<div className='w-full'>
					<ReleaseCard album={album} key={album.slug} />
					<span>{album.title}</span>
				</div>
			))}

			<ButtonArrow
				classes='absolute bottom-4 rotate-90'
				action={() => console.log("click")}
			/>
		</div>
	)
}
