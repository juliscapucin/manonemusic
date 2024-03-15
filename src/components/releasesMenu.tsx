"use client"

import { ReleaseCard } from "@/components"
import { ButtonArrow } from "@/components/buttons"
import { Album } from "@/types"

type ReleasesMenuProps = {
	albums: Album[]
}

export default function ReleasesMenu({ albums }: ReleasesMenuProps) {
	return (
		<div className='absolute flex flex-col align-middle w-64 px-4 left-[60%] top-0 bottom-0 hover:bg-faded-10 transition-colors duration-200'>
			{/* <ButtonArrow classes='rotate-270' action={() => console.log("click")} /> */}
			<div className='overflow-y-scroll h-full space-y-4'>
				{albums.map((album) => (
					<>
						<ReleaseCard album={album} key={album.slug} />
						<span>{album.title}</span>
					</>
				))}
			</div>
			{/* <ButtonArrow classes='rotate-90' action={() => console.log("click")} /> */}
		</div>
	)
}
