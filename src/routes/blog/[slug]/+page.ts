export async function load({ params }) {
	// console.log('trying to load :-(');
	// debugger;
	const post = await import(`../${params.slug}.svx`);
	const { title, date } = post.metadata;
	const content = post.default;

	console.log(content);


	return { title, date, content };
}