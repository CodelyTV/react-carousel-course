import "./Carousel.scss";

import { ArrowLeft } from "./ArrowLeft";
import { ArrowRight } from "./ArrowRight";

interface CarouselProps {
	children: JSX.Element[];
}

export function Carousel({ children }: CarouselProps) {
	return (
		<div className="carousel">
			<div className="carousel__slider">
				{children.map((child, index) => (
					<div key={index} className="carousel__slide">
						{child}
					</div>
				))}
			</div>
			<div className="carousel__nav">
				<button className="carousel__button" aria-label="Previous">
					<ArrowLeft />
				</button>
				<button className="carousel__button" aria-label="Next">
					<ArrowRight />
				</button>
			</div>
		</div>
	);
}
