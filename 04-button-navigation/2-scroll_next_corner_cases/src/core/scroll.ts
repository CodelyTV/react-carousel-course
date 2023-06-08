import { isCompletelyVisible } from "./isCompletelyVisible";

function scrollSliderTo(slider: HTMLElement, horizontalPosition: number): void {
	const verticalPosition = 0;

	slider.scrollTo(horizontalPosition, verticalPosition);
}

export function scrollSliderNext(slider: HTMLElement): void {
	const slides = slider.querySelectorAll<HTMLElement>(`.carousel__slide`);

	let firstNotVisibleSlide;

	for (const slide of Array.from(slides)) {
		if (!isCompletelyVisible(slide)) {
			firstNotVisibleSlide = slide;
			break;
		}
	}

	if (!firstNotVisibleSlide) {
		return;
	}

	const position = firstNotVisibleSlide.offsetLeft;

	scrollSliderTo(slider, position);
}
