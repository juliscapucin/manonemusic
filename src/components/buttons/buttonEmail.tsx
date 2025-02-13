import { CopyEmailButton } from "@/components/buttons"

export default function ButtonEmail() {
	return (
		<div className='flex-1'>
			<a href='mailto:hello@juliscapucin.com' className='custom-rounded-button'>
				Get in touch
			</a>
			<CopyEmailButton />
		</div>
	)
}
