import { Carousel, CarouselProps } from "../../src/Carousel";
import { SlideMother } from "./SlideMother";

type CarouselPropsWithoutChildren = Omit<CarouselProps, "children">;

export const CarouselMother = {
	random({
		carouselWidth = 900,
		slidesCount = 5,
		minSlideWidth = 300,
		maxSlideWidth = 500,
		props,
		style,
	}: {
		carouselWidth?: number;
		slidesCount?: number;
		minSlideWidth?: number;
		maxSlideWidth?: number;
		props?: CarouselPropsWithoutChildren;
		style?: React.CSSProperties;
	} = {}) {
		const slides = SlideMother.list(slidesCount, minSlideWidth, maxSlideWidth);

		return (
			<div style={{ width: `${carouselWidth}px`, margin: "0 auto", ...style }}>
				<Carousel {...props}>{slides}</Carousel>
			</div>
		);
	},
};
