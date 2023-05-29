export function isCompletelyVisible(element: HTMLElement): boolean {
	return false;
}

export const beNotVisible = ($el: JQuery<HTMLElement>): void => {
	const htmlElement = $el.get(0);
	expect(isCompletelyVisible(htmlElement)).to.be.false;
};

export const beVisible = ($el: JQuery<HTMLElement>): void => {
	const htmlElement = $el.get(0);
	expect(isCompletelyVisible(htmlElement)).to.be.true;
};
