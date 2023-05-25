import type { Meta, StoryObj } from "@storybook/react";

import { Carousel } from "./Carousel";

const meta = {
	title: "Carousel",
	component: Carousel,
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		title: "Carousel",
	},
};
