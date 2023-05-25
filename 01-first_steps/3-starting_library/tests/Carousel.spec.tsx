import { render, screen } from "@testing-library/react";

import { Carousel } from "../src/Carousel";

test("Carousel displays correctoy", () => {
	render(<Carousel title="My Component" />);

	const heading = screen.getByText(/My Component/i);

	expect(heading).toBeInTheDocument();
});
