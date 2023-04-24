<script>
	import ImgBox from '$lib/ImgBox.svelte';
	import Heart from '$lib/icons/heart.svelte';
	import PostCard from '$lib/PostCard.svelte';
</script>

<div id="page-2">
	<!-- <div>fancy header</div> -->
	<!-- <Header /> -->
	<div class="center-stack">
		<div style="max-width: 500px; flex-grow: 2;">
			<h2>Hi there</h2>
			<p>My name is Arya “<span class="accent">Dee</span>” Daroui.</p>
			<p>I like to code, take photos, and make music. Most of what I share here is at the intersection of these things.</p>
			<p />
		</div>
		<div>
			<ImgBox />
		</div>
	</div>
	<div class="spread-stack">
		<div class="flex-child">
			<h3 style="margin-top:0;">Langs and tools I&thinsp;&thinsp;<Heart /></h3>
			<span class="tag lang-light"><b>Python</b></span><span class="tag tool">NumPy</span><span class="tag tool">Pandas</span
			><span class="tag tool">SciKit</span><span class="tag tool">OpenCV</span><span class="tag tool">Plotly</span><span
				class="tag tool">Rich</span
			><span class="tag tool">TensorFlow</span><span class="tag tool">Jupyter</span><br /><span class="tag lang-light"
				><b>TypeScript</b></span
			><span class="tag tool">Svelte</span><span class="tag tool">unified.js</span><span class="tag tool">WebGL2</span><span
				class="tag tool">D3.js</span
			><br /><span class="tag lang-light"><b>C</b></span><span class="tag lang-light"><b>C++</b></span><span class="tag tool"
				>SystemC</span
			><span class="tag tool">Boost</span><br /><span class="tag lang-light"><b>Rust</b></span><span class="tag tool"
				>Tauri</span
			><span class="tag tool">Rayon</span>
		</div>
		<div class="flex-child">
			<h3>Domain knowledge</h3>

			<span class="tag domain-light"><b>Signals</b></span><span class="tag domain">image processing</span><span
				class="tag domain">n-D data</span
			><br />

			<span class="tag domain-light"><b>Data</b></span><span class="tag domain">machine learning</span><span class="tag domain"
				>visualization</span
			><br />

			<span class="tag domain-light"><b>Systems</b></span><span class="tag domain">parallelization</span><span
				class="tag domain">modeling</span
			><br />

			<span class="tag domain-light"><b>WebDev</b></span><span class="tag domain">frontend</span><span class="tag domain"
				>graphics</span>
		</div>
		<div class="flex-child" id="links">
			<h3>Links</h3>
			<a class="link-box" href="/blog/uses">Uses</a>
			<!-- <a class="link-box" href="/">about</a>  -->
			<a class="link-box" href="/maxim">Maxim</a>
			<a class="link-box" href="/">Resumé</a>
		</div>
	</div>
	<div class="around-stack">
		<PostCard
			title={'A JPEG encoder on a modeled, multi-core "checkerboard" CPU'}
			tags={['C++', 'SystemC', 'parallelization', 'modeling', 'image processing']}
			img_src={'thesis_thumb1.webp'}
			alt={'thumbnail of thesis'}
			link={'/blog/documents/thesis daroui.pdf'} />
		<PostCard
			title={'Filmic, an analog film emulation app'}
			tags={['TypeScript', 'WebGL', 'Svelte', 'image processing']}
			img_src={'filmic_thumb1.webp'}
			link={'/blog/about_filmic'}
			alt={'thumbnail of filmic app'} />
		<PostCard
			title={'Filmic devblog 2: film grain and halation'}
			tags={['Python', 'image processing', 'Jupyter']}
			img_src={'devblog2_thumb.png'}
			link={'/blog/filmic_devblog_2'}
			alt={'thumbnail of filmic devblog 2'} />
	</div>
	<div class="footer">
		<span>arya<span class="accent">dee</span></span>&nbsp; &nbsp<a href="mailto:adaroui@uci.edu">adaroui@uci.edu</a>&nbsp;
		&nbsp;<a href="/privacy-and-copyright">privacy & copyright</a> <br /> <br />
		:-)
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
			opacity: 0.8;
			transition: all 0.15s ease;
		}

		> span:hover {
			opacity: 1;
			transition: all 0.15s ease;
		}

		> a:hover {
			opacity: 1;
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
			background-color: rgba($link-background, 0.8);
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
		border: transparentize($border-link-translucent, 1) 1px solid;
		// width: 85px;
		// display: inline-block;
		// text-align: center;
		transition: background-color 0.15s ease, border 0.15s ease;
	}

	a.link-box:hover {
		color: $cyan-soft;
		background-color: rgba($cyan-soft, 0.2);
		// border: $border-link-translucent-hover 1px solid;
		transition: background-color 0.15s ease, border 0.15s ease;
	}

	.gradient-box {
		background: linear-gradient(lighten($background-color, 14%), lighten($background-color, 14%)) padding-box, linear-gradient(to bottom, transparentize($pink-hard, 0.2), transparentize($tan-hard, 0.2)) border-box;
		border-radius: 50em;
		border: 1px solid transparent;
	}

	#page-2 {
		margin: auto;
		max-width: 1080px;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		gap: 100px;
		font-weight: 300;
		padding: 40px 20px;

	}
	h2 {
		color: $pink-hard;
		font-weight: 700;
		font-size: 2em;
	}
	h3 {
		margin-top: 0;
		color: $accent-color;
		font-weight: 300;
	}

	.center-stack {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		gap: 25px;
		font-size: clamp(0.9em, 4vw, 1.1em);
		line-height: 1.8em;

		color: lighten($ink-color, 2%);
	}

	.spread-stack {
		display: flex;
		flex-direction: row;
		justify-content: space-around;

		font-size: 1.07em;

		.flex-child {
			text-align: center;
			max-width: 400px;
		}

		#links {
			max-width: 90px;
		}

		@media (max-width: 890px) {
			flex-direction: column;
			flex: wrap;
			justify-content: center;

			.flex-child {
				// border: red 1px solid;
				max-width: 100%;
			}

			#links {
				max-width: 100%;
			}

			h3 {
				margin-top: 1.6em;
				margin-bottom: 0.4em;
			}
		}
	}

	.around-stack {
		display: flex;
		flex-direction: row;
		justify-content: space-around;

		gap: 30px;

		@media (max-width: 1040px) {
			flex-direction: column;
			// flex: wrap;
			flex-wrap: wrap;
			justify-content: center;
			align-content: center;
		}
	}


	.flex-child {
		flex-wrap: wrap;
		// max-width: 360px;
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
		color: $tan-soft;
	}

	.tool {
		background-color: lighten($gray-soft, 4%);
		// border: $navy-soft 1px solid;
		color: $tan-soft;
	}

	.domain {
		background-color: $gray-harder;
		color: lighten($tan-mid, 3%);
		// border: darken($tan-mid, 50%) 1px solid;
		border: hsl(220, 20%, 25%) 1px solid; // $navy-hard but lighter
	}

	.lang-light {
		background-color: darken($tan-soft, 5%);
		// border: $navy-soft 1.5px solid;
		color: darken($navy-soft, 20%);
	}

	.tool-light {
		background-color: $tan-mid;
		color: $navy-mid;
	}

	.domain-light {
		background-color: lighten($tan-mid, 2%);
		color: $navy-hard;
	}
</style>
