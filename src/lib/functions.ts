export function arange (start: number, stop: number, step: number): number[] {
	step = step || 1;
	const arr: number[] = [];
	for (let i = start; i <= stop; i += step) {
		arr.push(i);
	}
	return arr;
}

export function clamp (num: number, min: number, max: number): number {
	return Math.min(Math.max(num, min), max);
}


// const clamp = (num, min, max) => Math.min(Math.max(num, min), max);


