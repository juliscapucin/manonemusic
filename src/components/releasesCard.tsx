import { Album } from "@/types"

type ReleasesCardProps = {
	album: Album
}

export default function ReleasesCard({ album }: ReleasesCardProps) {
	return (
		<button className='w-full aspect-square bg-faded-70'>releasesCard</button>
	)
}
