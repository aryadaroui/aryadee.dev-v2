<script>
	import ImgBox from '$lib/ImgBox.svelte';
	import Heart from '$lib/icons/heart.svelte';
	import PostBox2 from '$lib/PostBox2.svelte';
	import PostCard from '$lib/PostCard.svelte';
	import Header from '$lib/Header.svelte';
</script>

<div id="page-2">
	<!-- <div>fancy header</div> -->
	<div class="center-stack">
		<div>
			<h3>My name is Arya “Dee” Daroui</h3>
			<p>I like to code, take photos, and make music.</p>
			<p>Most of what I do is at the intersection of these things.</p>
		</div>
		<div>
			<ImgBox />
		</div>
	</div>
	<div class="spread-stack">
		<div>
			<h3>Languages and tools I&thinsp;&thinsp;<Heart /></h3>
			<ul>
				<li>
					<span class="tag lang"><b>Python</b></span> <span class="tag tool">NumPy</span> <span class="tag tool">Pandas</span>
					<span class="tag tool">SciKit</span> <span class="tag tool">OpenCV</span> <span class="tag tool">Plotly</span>
				</li>
				<li>
					<span class="tag lang"><b>TypeScript</b></span> <span class="tag tool">Svelte(Kit)</span>
					<span class="tag tool">WebGL</span> <span class="tag tool"> D3.js</span>
				</li>
				<li>
					<span class="tag lang"><b>C & C++</b></span> <span class="tag tool">SystemC</span>
					<span class="tag tool">Boost</span>
				</li>
				<li>
					<span class="tag lang"><b>Rust</b></span> <span class="tag tool">Tauri</span> <span class="tag tool">Rayon</span>
				</li>
			</ul>
		</div>
		<div>
			<h3>Domain knowledge</h3>
			<ul>
				<li>
					<b>Signals</b>: <span class="tag domain">image processing</span> <span class="tag domain">audio</span>
					<span class="tag domain">n-D data</span>
				</li>
				<li>
					<b>Data</b>: <span class="tag domain">data analysis</span> <span class="tag domain">visualization</span>
					<span class="tag domain">machine learning</span>
				</li>
				<li>
					<b>Systems</b>: <span class="tag domain">parallelization</span> <span class="tag domain">modeling</span>
				</li>
				<li>
					<b>WebDev</b>: <span class="tag domain">frontend</span> <span class="tag domain">graphics</span>
				</li>
			</ul>
		</div>
		<div>
			<h3>Links</h3>
			Uses<br />
			Maxim <br />
			Resume
		</div>
	</div>
	<div class="around-stack">
	<PostCard
		title={'Deploying a JPEG encoder on a modeled, multi-core "checkerboard" CPU'}
		tags={['C++', 'SystemC', 'embedded systems', 'parallelization', 'modeling', 'image processing']}
		img_src={'thesis_thumb.png'}
		alt={'thumbnail of thesis'}
		link={'/post1'}
	/>
	<PostCard
		title={'Filmic, an analog film emulation app'}
		tags={['TypeScript', 'WebGL', 'Svelte', 'image processing']}
		img_src={'filmic_thumb.png'}
		link={'/post1'}
		alt={'thumbnail of filmic app'}
	/>
	<PostCard
		title={'Filmic devblog 2: film grain and halation'}
		tags={['Python', 'image processing', 'Jupyter']}
		img_src={'devblog2_thumb.png'}
		link={'/post1'}
		alt={'thumbnail of filmic devblog 2'}
	/>
	</div>

	<!-- privacy and copyright Maybe put with other links? -->
</div>

<style lang="scss">
	#page-2 {
		margin: auto;
		max-width: 1080px;
		// border: pink 1px solid;
	}

	.center-stack {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.spread-stack {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.around-stack {
		display: flex;
		flex-direction: row;
		justify-content: space-around;

		gap: 20px;
	}

	div {
		// for debugging
		// border: 1px solid cadetblue;
	}
</style>
