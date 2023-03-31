import { math } from "mathlifier";

function randomEnum<T>(anEnum: T): T[keyof T] {
	const enumValues = Object.keys(anEnum)
		.map((n) => Number.parseInt(n))
		.filter((n) => !Number.isNaN(n)) as unknown as T[keyof T][];
	const randomIndex = Math.floor(Math.random() * enumValues.length);
	const randomEnumValue = enumValues[randomIndex];
	return randomEnumValue;
}

enum Size {
	small,
	medium,
	large
}

enum Color {
	blue,
	pink
}


export class StarSprite {
	size: number;
	color: Color;
	x: number;
	y: number;
	z: number;
	scale: number;
	sprite_frame_index: number;
	frame_change_probability: number;
	sprite_imgs: HTMLElement[];
	complete: boolean; // should remove this in lieu of promise
	complete_prms: Promise<void>;
	// sprite_imgs: HTMLImageElement[];
	constructor() {
		this.size = Math.random();
		// this.size = Size.small;
		this.scale = 2.0;
		// this.scale = (Math.floor(Math.random() * 2) / 2) + 2;
		this.color = randomEnum(Color);
		// this.color = Color.blue;
		this.x = Math.random() * 2560;
		this.y = Math.random() * 1440;
		this.z = Math.floor(Math.random() * this.scale) + 2.0;
		// this.z = 2;
		this.frame_change_probability = 0.007;
		this.sprite_frame_index = this.random_sprite_frame();
		// debugger

		// this.load_sprite_imgs();
		this.complete_prms = this.load_sprite_imgs();
		this.complete = false;

		


		// this.complete_prms = new Promise((resolve, reject) => {
		// })
		// debugger;

		// this.complete_prms = new Promise((resolve, reject) => {
		// 	resolve(true);
		// })
	}

	random_sprite_frame() {
		return Math.floor(Math.random() * 3);
	}

	load_sprite_imgs() {


		// hard coded!

		const frame0 = new Image();
		const frame1 = new Image();
		const frame2 = new Image();


		if (this.size > 0.98) { // large

			if (this.color == Color.blue) {
				frame0.src = "/stars/star_blue5.png";
				frame1.src = "/stars/star_blue6.png";
				frame2.src = "/stars/star_blue7.png";
			} else {
				frame0.src = "/stars/star_pink3.png";
				frame1.src = "/stars/star_pink4.png";
				frame2.src = "/stars/star_pink5.png";
			}
		} else if (this.size > 0.92) { // medium
			if (this.color == Color.blue) {
				frame0.src = "/stars/star_blue2.png";
				frame1.src = "/stars/star_blue3.png";
				frame2.src = "/stars/star_blue5.png";
			} else {
				frame0.src = "/stars/star_pink6.png";
				frame1.src = "/stars/star_pink7.png";
				frame2.src = "/stars/star_pink8.png";
			}
		} else { // small
			if (this.color == Color.blue) {
				frame0.src = "/stars/star_blue0.png";
				frame1.src = "/stars/star_blue1.png";
				frame2.src = "/stars/star_blue2.png";
			} else {
				frame0.src = "/stars/star_pink0.png";
				frame1.src = "/stars/star_pink1.png";
				frame2.src = "/stars/star_pink2.png";
			}
		}



		return Promise.all([frame0.decode(), frame1.decode(), frame2.decode()]).then(() => {
			this.complete = true;
			// console.log(loaded_sprites)
			this.sprite_imgs = [frame0, frame1, frame2];
			// console.log('sprite images loaded');
	

			// this is for sure the wrong way of doing this

			
		});

		// frame0.decode().then(() => {
		// 	// console.log(result)
		// 	console.log(frame0);
		// 	this.complete = true;
		// 	debugger;
		// });


		// debugger;

		// return [frame0, frame1, frame2];
	}

	maybe_change_frame() {
		if (Math.random() < this.frame_change_probability) {
			this.sprite_frame_index = this.random_sprite_frame();
		}
	}

	draw(ctx: CanvasRenderingContext2D) {
		// some of these values are hard coded!
		if (this.complete) {
			// this.maybe_change_frame();
			// console.log(this);
			// debugger;
			this.x = (this.x + this.z - 1.0) % (ctx.canvas.width + 30);
			this.y = (this.y + this.z - 1.0) % (ctx.canvas.height + 30);
			// this.x = (this.x + this.z - 1.0) % 2560;
			// this.y = (this.y + this.z - 1.0) % 1440;

			ctx.drawImage(this.sprite_imgs[this.sprite_frame_index], 0, 0, 15, 15, this.x - 30, this.y - 30, 15 * this.z, 15 * this.z);
		}
	}

	redraw(ctx: CanvasRenderingContext2D) {
		// some of these values are hard coded!
		if (this.complete) {
			ctx.drawImage(this.sprite_imgs[this.sprite_frame_index], 0, 0, 15, 15, this.x - 30, this.y - 30, 15 * this.z, 15 * this.z);
		}
	}
}
