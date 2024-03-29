import { CarouselMother } from "../tests-helpers/CarouselMother";
import { disableScrollTransition, scrollPast, scrollUntilTheEnd } from "../tests-helpers/scroll";
import { beNotVisible, beVisible, isCompletelyVisible } from "../tests-helpers/visibility";

describe("Carousel pagination", () => {
	it("next button should scroll until the first not visible slide is visible", () => {
		const slideWidth = 350;
		const visibleSlides = 2;
		const carouselWithThirdSlidePartiallyVisible = CarouselMother.random({
			carouselWidth: slideWidth * visibleSlides + slideWidth / 2,
			minSlideWidth: slideWidth,
			maxSlideWidth: slideWidth,
			slidesCount: visibleSlides + 1,
		});
		cy.mount(carouselWithThirdSlidePartiallyVisible);

		const thirdSlide = ".carousel__slide:nth-child(3)";

		cy.get(thirdSlide).should(beNotVisible);

		cy.findByLabelText(/Next/i).click();

		cy.get(thirdSlide).should(beVisible);
	});

	it("next button should scroll until the first not visible slide after a visible slide becomes visible", () => {
		const slideWidth = 300;
		const randomCarousel = CarouselMother.random({
			carouselWidth: slideWidth * 3,
			minSlideWidth: slideWidth,
			maxSlideWidth: slideWidth,
		});
		cy.mount(randomCarousel);

		function scrollPastFirstSlide() {
			return scrollPast(slideWidth);
		}

		const fifthSlide = ".carousel__slide:nth-child(5)";

		scrollPastFirstSlide();

		cy.findByLabelText(/Next/i).click();

		cy.get(fifthSlide).should(beVisible);
	});

	it("next button should scroll back to initial position if there are no not visible slides after first visible slide", () => {
		const slideWidth = 300;
		const randomCarousel = CarouselMother.random({
			carouselWidth: slideWidth * 3,
			minSlideWidth: slideWidth,
			maxSlideWidth: slideWidth,
			slidesCount: 5,
		});
		cy.mount(randomCarousel);

		function scrollPastFirst3Slides() {
			return scrollPast(slideWidth * 3);
		}

		const firstSlide = ".carousel__slide:first-child";

		scrollPastFirst3Slides();

		cy.findByLabelText(/Next/i).click();

		cy.get(firstSlide).should(beVisible);
	});

	it("previous button should scroll until the first not visible slide is visible", () => {
		const slideWidth = 400;
		const randomCarousel = CarouselMother.random({
			carouselWidth: slideWidth * 2,
			minSlideWidth: slideWidth,
			maxSlideWidth: slideWidth,
		});

		cy.mount(randomCarousel);

		function scrollPastFirstTwoSlides() {
			return scrollPast(slideWidth * 2);
		}

		const firstSlide = ".carousel__slide:nth-child(1)";

		scrollPastFirstTwoSlides().get(firstSlide).should(beNotVisible);

		cy.findByLabelText(/Previous/i).click();

		cy.get(firstSlide).should(beVisible);
	});

	it("previous button should scroll to the end of the carousel when there are no slides before the first visible slide", () => {
		const randomCarousel = CarouselMother.random();
		cy.mount(randomCarousel);

		const lastSlide = ".carousel__slide:last-child";

		cy.findByLabelText(/Previous/i).click();

		cy.get(lastSlide).should(beVisible);
	});

	it("next button should scroll correctly with random slide widths", () => {
		const randomCarousel = CarouselMother.random();
		cy.mount(randomCarousel);
		disableScrollTransition();

		const lastSlide = ".carousel__slide:last-child";
		let isLastSlideVisible;

		function clickNextButtonIfLastSlideIsNotVisible($el: JQuery<HTMLElement>) {
			const htmlElement = $el[0];

			isLastSlideVisible = isCompletelyVisible(htmlElement);

			if (!isLastSlideVisible) {
				cy.findByLabelText(/Next/i).click();
			}
		}

		const maxAttempts = 20;

		for (let i = 0; i < maxAttempts; i++) {
			cy.get(lastSlide).then(clickNextButtonIfLastSlideIsNotVisible);
		}

		cy.get(lastSlide).should(beVisible);
	});

	it("previous button should scroll correctly with random slide widths", () => {
		const randomCarousel = CarouselMother.random();
		cy.mount(randomCarousel);
		disableScrollTransition();
		scrollUntilTheEnd();

		const firstSlide = ".carousel__slide:first-child";
		let isFirstSlideVisible;

		function clickPreviousButtonIfLastSlideIsNotVisible($el: JQuery<HTMLElement>) {
			const htmlElement = $el[0];

			isFirstSlideVisible = isCompletelyVisible(htmlElement);

			if (!isFirstSlideVisible) {
				cy.findByLabelText(/Previous/i).click();
			}
		}

		const maxAttempts = 20;

		for (let i = 0; i < maxAttempts; i++) {
			cy.get(firstSlide).then(clickPreviousButtonIfLastSlideIsNotVisible);
		}

		cy.get(firstSlide).should(beVisible);
	});
});
