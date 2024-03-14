"use client"

import { ReleaseCard } from "@/components"
import { ButtonArrow } from "@/components/buttons"
import { Album } from "@/types"

type ReleasesMenuProps = {
	albums: Album[]
}

export default function ReleasesMenu({ albums }: ReleasesMenuProps) {
	return (
		<div className='relative w-60 h-full p-4 mr-8 md:mr-64'>
			<ButtonArrow classes='rotate-270' action={() => console.log("click")} />
			<div className='overflow-scroll h-full space-y-4'>
				{albums.map((album) => (
					<>
						<ReleaseCard album={album} key={album.slug} />
						<span>{album.title}</span>
					</>
				))}
			</div>
			<ButtonArrow classes='rotate-90' action={() => console.log("click")} />
		</div>
	)
}
