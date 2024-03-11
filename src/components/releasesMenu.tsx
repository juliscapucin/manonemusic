import { ReleasesCard } from "@/components"
import { ButtonArrow } from "@/components/buttons"
import { Album } from "@/types"

type ReleasesMenuProps = {
	albums: Album[]
}

export default function ReleasesMenu({ albums }: ReleasesMenuProps) {
	return (
		<div className='absolute top-8 right-8 bottom-8 md:right-1/4 w-40 p-4'>
			<div className='relative w-full h-full py-16 flex flex-col gap-4 items-center'>
				<ButtonArrow
					rotation={"270"}
					classes='absolute top-0'
					action={() => console.log("click")}
				/>
				{albums.map((album) => (
					<ReleasesCard key={album.slug} album={album} />
				))}
				<ButtonArrow
					rotation={"90"}
					classes='absolute bottom-0'
					action={() => console.log("click")}
				/>
			</div>
		</div>
	)
}
