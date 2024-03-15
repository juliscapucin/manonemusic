"use client"

import { Fragment } from "react"
import { ReleaseCard } from "@/components"
import { ButtonArrow } from "@/components/buttons"
import { Album } from "@/types"

type ReleasesMenuProps = {
	albums: Album[]
}

export default function ReleasesMenu({ albums }: ReleasesMenuProps) {
	return (
		<div className='custom-releases-menu absolute flex flex-col align-middle w-64 left-[60%] top-0 bottom-0 overflow-y-scroll overflow-x-clip hover:bg-faded-10 transition-colors duration-200'>
			{/* <ButtonArrow classes='rotate-270' action={() => console.log("click")} /> */}
			<div className='space-y-4 m-4'>
				{albums.map((album) => (
					<Fragment key={album.title}>
						<ReleaseCard album={album} key={album.slug} />
						<span>{album.title}</span>
					</Fragment>
				))}
			</div>
			{/* <ButtonArrow classes='rotate-90' action={() => console.log("click")} /> */}
		</div>
	)
}
