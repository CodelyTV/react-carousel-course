import { isCompletelyVisible } from "./isCompletelyVisible";

function scrollSliderTo(slider: HTMLElement, horizontalPosition: number): void {
	const verticalPosition = 0;

	slider.scrollTo(horizontalPosition, verticalPosition);
}

export function scrollSliderNext(slider: HTMLElement): void {
	const slides = slider.querySelectorAll<HTMLElement>(`.carousel__slide`);

	let firstNotVisibleSlideAfterVisibleSlide, firstVisibleSlide;

	for (const slide of Array.from(slides)) {
		if (!firstVisibleSlide && isCompletelyVisible(slide)) {
			firstVisibleSlide = slide;
		}
		if (firstVisibleSlide && !isCompletelyVisible(slide)) {
			firstNotVisibleSlideAfterVisibleSlide = slide;
			break;
		}
	}

	const initialScrollPosition = 0;
	const position = firstNotVisibleSlideAfterVisibleSlide?.offsetLeft ?? initialScrollPosition;

	scrollSliderTo(slider, position);
}
