import { Logo } from "@/components/ui"
import Link from "next/link"

const NotFoundPage = () => {
	return (
		<section className='flex flex-col justify-between'>
			<div className='scale-20 origin-top'>
				<Logo />
			</div>
			<div className='text-center'>
				<h1 className='text-displaySmall md:text-displayMedium lg:text-displayLarge'>
					O–oh!
				</h1>
				<h1 className='text-headlineLarge font-bold mt-4 mb-2'>
					Page Not Found
				</h1>
				<p className='text-secondary text-xl mb-10'>
					The page you are looking for does not exist.
				</p>
				<Link href='/' className='text-secondary font-bold py-4 px-6'>
					Go Home
				</Link>
			</div>
		</section>
	)
}
export default NotFoundPage
