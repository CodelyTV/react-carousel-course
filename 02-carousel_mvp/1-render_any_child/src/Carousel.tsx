import "./Carousel.scss";

interface CarouselProps {
	children: JSX.Element[];
}

export function Carousel({ children }: CarouselProps) {
	return (
		<div className="carousel">
			{children.map((child, index) => (
				<div key={index} className="carousel__slide">
					{child}
				</div>
			))}
		</div>
	);
}
