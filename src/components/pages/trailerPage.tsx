import { VideoPlayer } from "@/components/ui"

export default function TrailerPage() {
	return (
		<div className='absolute flex justify-center items-center w-screen h-screen bg-colorBlack z-50'>
			<VideoPlayer
				src='https://player.vimeo.com/video/371168497'
				title='Trailer Video'
			/>
		</div>
	)
}
