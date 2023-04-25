

export type FilmicLayer = {
	color_response_curve: ColorResponseCurve,
	grain: Grain,
	tone_curve: ToneCurve,
	// bloom: Bloom,
	// halation: Halation
}

/**
 * Data for Color Response. Each array is 13 elements--one for the 12 equidistant colors of the hue circle; the 0th and 13th element both represent red. Each element of the array is composed of a tuple where the first value is a self-representing index for the color (e.g. idx -> red), and the second value is the shift of that color, with respect to the HSV(A) color space.
 */
export type ColorResponseCurve = {
	hue_shift: [number, number][];
	saturation_shift: [number, number][];
	value_shift: [number, number][];
	alpha_shift: [number, number][];
};

export type Grain = {
	exposure_offset: number;
	intensity: number;
	size: number;
	tone_response_curve: ToneCurve,
};


/**
 * Should conist of 7 elements
 */
export type ToneCurve = [number, number][];


export type Bloom = {
	thresh_low: number,
	thresh_high: number,
	radius: number,
	opacity: number;
};

export type Halation = {
	hue: number,
	thresh_low: number,
	thresh_high: number,
	radius: number,
	opacity: number;
};