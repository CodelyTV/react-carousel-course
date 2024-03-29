import { Carousel } from "../../src/Carousel";
import { beNotVisible, beVisible } from "../tests-helpers/visibility";

describe("Carousel pagination", () => {
	it("next button should scroll until the first not visible slide is visible", () => {
		const carouselWithThirdSlidePartiallyVisible = (
			<div style={{ width: "900px", margin: "0 auto" }}>
				<Carousel>
					<div style={{ width: "300px", background: "yellow" }}>slide 1</div>
					<div style={{ width: "500px", height: "500px", background: "aliceBlue" }}>slide 2</div>
					<div style={{ width: "400px", height: "400px", background: "yellow" }}>slide 3</div>
					<div style={{ width: "560px", height: "315px", background: "aliceBlue" }}>slide 4</div>
				</Carousel>
			</div>
		);
		cy.mount(carouselWithThirdSlidePartiallyVisible);

		const thirdSlide = ".carousel__slide:nth-child(3)";

		cy.get(thirdSlide).should(beNotVisible);

		cy.findByLabelText(/Next/i).click();

		cy.get(thirdSlide).should(beVisible);
	});

	it("previous button should scroll until the first not visible slide is visible", () => {
		const randomCarousel = (
			<div style={{ width: "900px", margin: "0 auto" }}>
				<Carousel>
					<div style={{ width: "300px", background: "yellow" }}>slide 1</div>
					<div style={{ width: "500px", height: "500px", background: "aliceBlue" }}>slide 2</div>
					<div style={{ width: "400px", height: "400px", background: "yellow" }}>slide 3</div>
					<div style={{ width: "560px", height: "315px", background: "aliceBlue" }}>slide 4</div>
				</Carousel>
			</div>
		);
		cy.mount(randomCarousel);

		function scrollPastFirstSlide() {
			return cy.document().then((document) => {
				const slider = document.querySelector(".carousel__slider") as HTMLElement;
				slider.scrollLeft = 800;
			});
		}

		const firstSlide = ".carousel__slide:nth-child(1)";

		scrollPastFirstSlide().get(firstSlide).should(beNotVisible);

		cy.findByLabelText(/Previous/i).click();

		cy.get(firstSlide).should(beVisible);
	});
});
