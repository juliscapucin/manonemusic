type IconChevronProps = {
	direction: string
}

export default function IconChevron({ direction }: IconChevronProps) {
	return (
		<div className={direction === "back" ? "rotate-180" : ""}>
			<svg
				width='30'
				height='30'
				viewBox='0 0 30 30'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'>
				<path d='M28.832 14.8335L14.6454 29.0201' stroke='#B6D1C2' />
				<path d='M28.8223 15.0049L14.4634 0.646006' stroke='#B6D1C2' />
			</svg>
		</div>
	)
}
