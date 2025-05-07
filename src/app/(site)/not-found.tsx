import { ButtonRounded } from "@/components/buttons"
import { Heading, Logo, SectionWrapper } from "@/components/ui"

const NotFoundPage = () => {
	return (
		<SectionWrapper>
			<div className='w-screen flex justify-center'>
				<Logo />
			</div>
			<div className='text-center basis-auto mt-24'>
				<Heading tag={"h1"} variant={"headline"} classes='mb-2'>
					Page Not Found
				</Heading>
				<p className='text-secondary text-xl my-10 text-balance'>
					The page you are looking for does not exist
				</p>
				<ButtonRounded href='/'>Restart</ButtonRounded>
			</div>
		</SectionWrapper>
	)
}
export default NotFoundPage
