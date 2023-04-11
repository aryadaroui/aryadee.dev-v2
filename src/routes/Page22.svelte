<script>
	import ImgBox from '$lib/ImgBox.svelte';
	import Heart from '$lib/icons/heart.svelte';
	import PostBox2 from '$lib/PostBox2.svelte';
	import PostCard from '$lib/PostCard.svelte';
	import Header from '$lib/Header.svelte';
  import LinkBox from '$lib/LinkBox.svelte';
  import Footer from '$lib/Footer.svelte';
</script>

<div id="page-2">
	<!-- <div>fancy header</div> -->
	<div class="center-stack">
		<div style="max-width: 500px; flex-grow: 2;">
			<h2>Hello world!</h2>
			<p>My name is Arya “<span class="accent">Dee</span>” Daroui.</p>
			<p>I like to code, take photos, and make music. Most of what I share here is at the intersction of these things.</p>
			<p></p>
		</div>
		<div>
			<ImgBox />
		</div>
	</div>
	<div class="spread-stack">
		<div class="flex-child">
			<h3>Langs and tools I&thinsp;&thinsp;<Heart /></h3>
			<span class="tag lang-light"><b>Python</b></span><span class="tag tool">NumPy</span><span class="tag tool">Pandas</span><span class="tag tool">SciKit</span><span class="tag tool">OpenCV</span><span class="tag tool">Plotly</span><span class="tag tool">Rich</span><span class="tag tool">TensorFlow</span><span class="tag tool">Jupyter</span><span class="tag lang-light"><b>TypeScript</b></span><span class="tag tool">Svelte</span><span class="tag tool">SvelteKit</span><span class="tag tool">unified.js</span><span class="tag tool">WebGL2</span><span class="tag tool">D3.js</span><span class="tag lang-light"><b>C</b></span><span class="tag lang-light"><b>C++</b></span><span class="tag tool">SystemC</span><span class="tag tool">Boost</span><span class="tag lang-light"><b>Rust</b></span><span class="tag tool">Tauri</span><span class="tag tool">Rayon</span>
		</div>
		<div class="flex-child" >
			<h3>Domain knowledge</h3>

			<span class="tag domain-light"><b>Signals</b></span><span class="tag domain">image processing</span><span class="tag domain">n-D data</span>

			<span class="tag domain-light"><b>Data</b></span><span class="tag domain">machine learning</span><span class="tag domain">visualization</span>

			<span class="tag domain-light"><b>Systems</b></span><span class="tag domain">parallelization</span><span class="tag domain">modeling</span>

			<span class="tag domain-light"><b>WebDev</b></span><span class="tag domain">frontend</span><span class="tag domain">graphics</span>

		</div>
		<div class="flex-child" style="max-width: 85px;">
			<h3>Links</h3>
			<a class="link-box" href="/">uses</a> 
			<!-- <a class="link-box" href="/">about</a>  -->
			<a class="link-box" href="/">maxim</a>
			<a class="link-box" href="/">resumé</a>
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
	<div class="footer">
		<span>arya<span class="accent">dee</span></span>&nbsp; · &nbsp<a href="mailto:adaroui@uci.edu">adaroui@uci.edu</a>&nbsp; · &nbsp;<a href="/privacy-and-copyright">privacy & copyright</a>
	</div>

</div>

<style lang="scss">

	.footer {
		// margin: 20px;
		font-size: 0.85em;
		font-weight: 300;
		// background-color: $void-color;
		// color: rgba($tan-soft, 0.7);
		// opacity: 0.1;
		// height: 100px;
		// width: 100%;

		// position: absolute;
		// bottom: 0;
		margin-bottom: 20px;

		text-align: center;

		> * {
			opacity: 0.7;
			transition: all 0.15s ease;
		}

		> span:hover{
			opacity: 1.0;
			transition: all 0.15s ease;
		}

		> a:hover{
			opacity: 1.0;
			transition: all 0.15s ease;
		}


		a {
			color: rgba($link-color, 0.9);
			text-decoration: none;
			border-radius: 0.4rem;
			padding: 0.2rem;
			margin: -0.2rem;
			// padding: 0.1rem;
			transition: background-color 0.15s ease, color 0.15s ease;
		}

		a:hover {
			background-color: rgba($link-background, 0.6);
			color: $cyan-soft;
			// color: $cyan-hard;
			// color: $ink-color;
			padding: 0.2rem;
			margin: -0.2rem;
			// color: $tan-mid;
			// transition: background-color 0.15s ease, color 0.15s ease;
		}
	}

	// .footer > span > a:hover {
	// 	opacity: 1.0;
	// 	transition: opacity 0.15s ease;
	// }

	a.link-box {
		text-decoration: none;
		color: $link-color;
		font-weight: 300;
		background-color: $background-translucent;
		border-radius: 0.4em;
		padding: 0.3em;
		line-height: 2.2em;
		border: transparentize($border-link-translucent, 1.0) 1px solid;
		// width: 85px;
		// display: inline-block;
		// text-align: center;
		transition: background-color 0.15s ease, border 0.15s ease;

	}

	a.link-box:hover {
		color: $cyan-soft;
		background-color: rgba($cyan-soft, 0.2);
		border: $border-link-translucent-hover 1px solid;
		transition: background-color 0.15s ease, border 0.15s ease;

	}

	#page-2 {
		margin: auto;
		max-width: 1080px;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		gap: 50px;
		// border: pink 1px solid;
		font-weight: 300;
		margin-top: 50px;
		margin-bottom: 50px;

		padding: 0px 20px;
	}
	h2 {
		color: $pink-hard;
		font-weight: 900;
	}
	h3 {
		color: $accent-color;
		font-weight: 300;
	}

	.center-stack {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		gap: 25px;
	}

	.spread-stack {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		
		.flex-child {
			text-align: center;
		}
	}

	.around-stack {
		display: flex;
		flex-direction: row;
		justify-content: space-around;

		gap: 20px;
	}

	ul {
		padding-left: 0px;
		list-style-type: none;
	}

	.flex-child {
		// display: flex;
		// text-align: justify;
		flex-wrap: wrap;
		max-width: 360px;
		justify-content: space-between;
		align-items: flex-start;
	}

	.tag {
		border-radius: 0.4em;
		padding: 0.3em;

		font-size: 0.85em;
		font-weight: 300;
		text-overflow: ellipsis;
		display: inline-block;
		margin: 0.4em 0.4em;
		margin-left: 0;
		margin-bottom: 0;
	}



	.lang {
		background-color: $gray-soft;
		// border: $brown-soft 1px solid;
		color: $tan-soft;
		// color: whitesmoke;
	}

	.tool {
		background-color: darken($gray-mid, 3%);
		// border: $brown-mid 1px solid;
		color: $tan-mid;
	}

	.domain {
		background-color: darken($gray-harder, 4%);
		// border: hsl(17, 20%, 30%) 1px solid; // $brown-hard but lighter
		color: $tan-mid;
	}



	.lang-light {
		background-color: darken($tan-soft, 2%);
		// border: $brown-soft 1.5px solid;
		color: darken($brown-soft, 8%);
	}

	.tool-light {
		background-color: $tan-mid;
		// border: $brown-mid 1.5px solid;
		color: $brown-mid;
	}

	.domain-light {
		background-color: lighten($tan-mid, 4%);
		// border: $brown-hard 1.5px solid; // $brown-hard but lighter
		color: $brown-hard;
	}

	div {
		// for debugging
		// border: 1px solid cadetblue;
	}
	
</style>
