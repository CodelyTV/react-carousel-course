import { CarouselMother } from "../tests-helpers/CarouselMother";
import { CarouselPageObject } from "../tests-helpers/CarouselPageObject";

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
		const partiallyVisibleSlide = 3;
		cy.mount(carouselWithThirdSlidePartiallyVisible);

		const carousel = new CarouselPageObject();

		carousel.verifySlideIsNotCompletelyVisible(partiallyVisibleSlide);

		carousel.clickNext();

		carousel.verifySlideIsCompletelyVisible(partiallyVisibleSlide);
	});

	it("next button should scroll until the first not visible slide after a visible slide becomes visible", () => {
		const slideWidth = 300;
		const randomCarousel = CarouselMother.random({
			carouselWidth: slideWidth * 3,
			minSlideWidth: slideWidth,
			maxSlideWidth: slideWidth,
		});
		const firstSlideNotVisibleIndex = 5;
		cy.mount(randomCarousel);

		const carousel = new CarouselPageObject();

		carousel.scrollPast(slideWidth);

		carousel.clickNext();

		carousel.verifySlideIsCompletelyVisible(firstSlideNotVisibleIndex);
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

		const carousel = new CarouselPageObject();

		carousel.scrollPast(slideWidth * 3);

		carousel.clickNext();

		carousel.verifyFirstSlideIsCompletelyVisible();
	});

	it("previous button should scroll until the first not visible slide is visible", () => {
		const slideWidth = 400;
		const randomCarousel = CarouselMother.random({
			carouselWidth: slideWidth * 2,
			minSlideWidth: slideWidth,
			maxSlideWidth: slideWidth,
		});

		cy.mount(randomCarousel);

		const carousel = new CarouselPageObject();

		carousel.scrollPast(slideWidth * 2).verifyFirstSlideIsNotCompletelyVisible();

		carousel.clickPrevious();

		carousel.verifyFirstSlideIsCompletelyVisible();
	});

	it("previous button should scroll to the end of the carousel when there are no slides before the first visible slide", () => {
		const randomCarousel = CarouselMother.random();
		cy.mount(randomCarousel);

		const carousel = new CarouselPageObject();

		carousel.clickPrevious();

		carousel.verifyLastSlideIsCompletelyVisible();
	});

	it("next button should scroll correctly with random slide widths", () => {
		const randomCarousel = CarouselMother.random();
		cy.mount(randomCarousel);

		const carousel = new CarouselPageObject();

		carousel.disableScrollTransition();

		const maxAttempts = 20;

		for (let i = 0; i < maxAttempts; i++) {
			carousel.clickNextIfLastSlideIsNotVisible();
		}

		carousel.verifyLastSlideIsCompletelyVisible();
	});

	it("previous button should scroll correctly with random slide widths", () => {
		const randomCarousel = CarouselMother.random();
		cy.mount(randomCarousel);

		const carousel = new CarouselPageObject();

		carousel.disableScrollTransition().scrollUntilTheEnd();

		const maxAttempts = 20;

		for (let i = 0; i < maxAttempts; i++) {
			carousel.clickPreviousIfFirstSlideIsNotVisible();
		}

		carousel.verifyFirstSlideIsCompletelyVisible();
	});

	it("next button should scroll until the first not visible slide positioning it on the offset position", () => {
		const pageWidth = Cypress.config().viewportWidth;
		const containerWidth = 600;
		const offset = (pageWidth - containerWidth) / 2;
		const slideWidth = containerWidth / 2;

		const carouselWithOffset = CarouselMother.random({
			carouselWidth: containerWidth,
			minSlideWidth: slideWidth,
			maxSlideWidth: slideWidth,
			style: {
				"--carousel-offset": `${offset}px`,
			} as React.CSSProperties,
		});
		cy.mount(carouselWithOffset);

		const carousel = new CarouselPageObject();

		carousel.clickNext();
		carousel.getSlide(3).should(($el) => {
			const slide = $el[0];
			const slidePosition = slide.getBoundingClientRect().left;
			expect(slidePosition).to.equal(offset);
		});
	});

	it("previous button should scroll until the previous not visible slide positioning it on the offset position", () => {
		const pageWidth = Cypress.config().viewportWidth;
		const containerWidth = 600;
		const offset = (pageWidth - containerWidth) / 2;
		const slideWidth = containerWidth / 2;

		const carouselWithOffset = CarouselMother.random({
			carouselWidth: containerWidth,
			minSlideWidth: slideWidth,
			maxSlideWidth: slideWidth,
			slidesCount: 5,
			style: {
				"--carousel-offset": `${offset}px`,
			} as React.CSSProperties,
		});
		cy.mount(carouselWithOffset);

		const carousel = new CarouselPageObject();

		carousel.scrollPast(slideWidth * 3);
		carousel.clickPrevious();
		carousel.getFirstSlide().should(($el) => {
			const slide = $el[0];
			const slidePosition = slide.getBoundingClientRect().left;
			expect(slidePosition).to.equal(offset);
		});
	});

	it("recalculates offset after resize correctly", () => {
		const pageWidth = Cypress.config().viewportWidth;
		const pageHeight = Cypress.config().viewportHeight;
		const containerWidth = 600;
		const slideWidth = containerWidth / 2;

		const carouselWithOffset = CarouselMother.random({
			carouselWidth: containerWidth,
			minSlideWidth: slideWidth,
			maxSlideWidth: slideWidth,
			slidesCount: 5,
			style: {
				"--carousel-offset": `calc(100vw - ${containerWidth}px / 2)`,
			} as React.CSSProperties,
		});
		cy.mount(carouselWithOffset);

		const carousel = new CarouselPageObject();

		const resizedPageWidth = pageWidth * 0.85;
		cy.viewport(resizedPageWidth, pageHeight);

		const offset = (resizedPageWidth - containerWidth) / 2;
		cy.wait(200);
		carousel.clickNext();
		carousel.getSlide(4).should(($el) => {
			const slide = $el[0];
			const slidePosition = slide.getBoundingClientRect().left;
			expect(slidePosition).to.equal(offset);
		});
	});
});
