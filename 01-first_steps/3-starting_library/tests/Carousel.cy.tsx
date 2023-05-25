import { Carousel } from "../src/Carousel";

describe("<Carousel />", () => {
	it("renders", () => {
		cy.mount(<Carousel title="My component" />);

		cy.findByText(/My component/i);
	});
});
