import "./Carousel.scss";

import { ArrowLeft } from "./ArrowLeft";
import { ArrowRight } from "./ArrowRight";

interface CarouselProps {
	children: JSX.Element[];
	prevAriaLabel?: string;
	nextAriaLabel?: string;
	prevButtonContent?: React.ReactNode;
	nextButtonContent?: React.ReactNode;
}

export function Carousel({
	children,
	prevAriaLabel = "Previous",
	nextAriaLabel = "Next",
	prevButtonContent = <ArrowLeft />,
	nextButtonContent = <ArrowRight />,
}: CarouselProps) {
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
				<button className="carousel__button" aria-label={prevAriaLabel}>
					{prevButtonContent}
				</button>
				<button className="carousel__button" aria-label={nextAriaLabel}>
					{nextButtonContent}
				</button>
			</div>
		</div>
	);
}
