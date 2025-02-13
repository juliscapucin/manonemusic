import { CopyEmailButton } from "@/components/buttons"

export default function ButtonEmail() {
	return (
		<>
			<div className='overflow-clip'>
				<a
					href='mailto:hello@juliscapucin.com'
					className='underlined-link flex flex-col text-titleSmall md:text-titleMedium lg:text-titleLarge font-light uppercase'
				>
					Get in touch
				</a>
			</div>
			<CopyEmailButton />
		</>
	)
}
