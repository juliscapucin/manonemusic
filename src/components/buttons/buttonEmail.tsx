import { CopyEmailButton } from "@/components/buttons"

export default function ButtonEmail() {
	return (
		<div className='flex-1'>
			<a href='mailto:hello@juliscapucin.com' className='custom-button-rounded'>
				Get in touch
			</a>
			<CopyEmailButton />
		</div>
	)
}
