import { Heading, Logo, PageWrapper, SectionWrapper } from "@/components/ui"
import Link from "next/link"

const NotFoundPage = () => {
	return (
		<SectionWrapper classes=''>
			<Logo />
			<div className='text-center basis-auto mt-24'>
				<Heading tag={"h1"} variant={"headline"} classes='mb-2'>
					Page Not Found
				</Heading>
				<p className='text-secondary text-xl my-10 text-balance'>
					The page you are looking for does not exist
				</p>
				<Link href='/' className='custom-button-rounded text-secondary'>
					Restart
				</Link>
			</div>
		</SectionWrapper>
	)
}
export default NotFoundPage
