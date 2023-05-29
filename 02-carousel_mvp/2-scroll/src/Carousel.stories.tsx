import type { Meta, StoryObj } from "@storybook/react";

import { Carousel } from "./Carousel";

const meta = {
	title: "Carousel",
	component: Carousel,
	tags: ["autodocs"],
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const VariableSlides: Story = {
	args: {
		children: [
			<div style={{ width: "300px", background: "yellow" }}>A simple slide</div>,
			<div>
				<img src="https://placekitten.com/500/500" alt="a slide can contain anything" />
			</div>,
			<article
				style={{ width: "400px", height: "400px", background: "aliceBlue", padding: "2rem" }}
			>
				<h2>It can be any tag</h2>
				<p>and contain any number of items</p>
			</article>,
			<div>
				<iframe
					width="560"
					height="315"
					src="https://www.youtube.com/embed/f2XGbg_3dRk"
					title="YouTube video player"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				></iframe>
			</div>,
		],
	},
};
