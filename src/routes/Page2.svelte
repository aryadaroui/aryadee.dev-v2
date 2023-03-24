<script lang="ts">
	import ImgBox from '$lib/ImgBox.svelte';
	import DownloadBox from '$lib/DownloadBox.svelte';
	import PostBox from '$lib/PostBox.svelte';
	import TextBox from '$lib/TextBox.svelte';
	import LinkBox from '$lib/LinkBox.svelte';
</script>

<div id="double-column">
	<div>
		<div id="col-1" class="column">
			<h1>Hello world</h1>

			<div class="hstack">
				<TextBox>
					<h3>My name is Arya “Dee” Daroui</h3>
					<p>I like to <code>code</code>, take photos, and make music.</p>
					<p>Most of my content is at the intersection of these things.</p>
				</TextBox>
				<div>
					<ImgBox />
				</div>
			</div>

			<TextBox>
				<h3>Languages and tools I &lt;3</h3>
				<ul>
					<li>
						<b>Python</b> – NumPy · Pandas · SciKit · OpenCV · Plotly · Rich
					</li>
					<li>
						<b>TypeScript</b> – Svelte(Kit) · WebGL · D3
					</li>
					<li>
						<b>C & C++</b> – SystemC · Boost
					</li>
					<li>
						<b>Rust</b> – Tauri · Rayon
					</li>
				</ul>

				<h3>Domain knowledge</h3>

				<ul>
					<li>
						<b>Signal processing</b> – imaging · audio · n-D data
					</li>
					<li>
						<b>Data</b> – analysis · visualization · some ML
					</li>
					<li>
						<b>Low-level</b> – parallelization · modeling
					</li>
					<li>
						<b>Web</b> – frontend · graphics
					</li>
				</ul>
			</TextBox>

			<div class="hstack">
				<div class="vstack">
					<!-- <div> -->
					<LinkBox link={"/blog/workflow"}>
						<h2>Workflow</h2>
					</LinkBox>
					<!-- </div> -->
					<!-- <div> -->
					<LinkBox link={"/maxim"}>
						<h2>Maxim</h2>
					</LinkBox>
					<!-- </div> -->
				</div>

				<!-- <div> -->
				<DownloadBox link={"/arya_d_resume.pdf"}>
					<h2>Resumé.pdf</h2>
				</DownloadBox>
				<!-- </div> -->
			</div>
		</div>
	</div>

	<div>
		<div id="col-2" class="column">
			<h1>Select posts</h1>
			<PostBox link={'/post1'} thumbnail={'thesis_thumb.png'}>
				<h2>Applying a JPEG encoder benchmark on a modeled, multi-core "checkerboard" computer</h2>
				<p>A checkerboard computer is one with a grid of processing cells.</p>
			</PostBox>
			<PostBox link={'/post1'} thumbnail={'filmic_thumb.png'}>
				<h2>About Filmic</h2>
				<p>Lalala</p>
			</PostBox>
			<PostBox link={'/post1'} thumbnail={'devblog2_thumb.png'}>
				<h2>Filmic devblog 2</h2>
				<p>Llala</p>
			</PostBox>
			<div id="legal">
				<p>
					<a href="/privacy-and-copyright" class="chevron-link">
						<span class="select-chevron">»</span>
						<span class="link">privacy & copyright</span>
					</a>
				</p>
			</div>
		</div>
	</div>
</div>

<style lang="scss">

	.vstack {
		display: flex;
		flex: 1;
		flex-direction: column;
		gap: 20px;
		justify-content: space-between;
		align-content: space-between;
	}

	.hstack {
		display: flex;
		justify-content: space-between;
		gap: 20px;
	}


	h1 {
		font-family: 'Swiss 721';
		font-weight: 900;
		margin: 0;
		text-shadow: 0px 5px 20px black;
	}

	#legal {
		font-size: 0.85em;
		text-shadow: 0px 5px 20px black;
		text-align: right;
	}

	#double-column {
		display: flex;
		padding: 30px;
		justify-content: center;
		gap: 0px;
		// max-width: 1200px;
		// border: pink 1px solid;

		@media only screen and (max-width: 1000px) {
			// flex-wrap: wrap;
			display: block;
			margin: auto;
			padding: 25px;
		}
		@media only screen and (max-width: 600px) {
			padding: 0px;
		}
	}

	// #col-1 {
	// }
	// #col-2 {
	// }

	.column {
		padding: 20px;
		max-width: 600px;
		display: flex;
		flex-direction: column;
		gap: 20px;

		@media only screen and (max-width: 1000px) {
			max-width: 800px;
		}
	}

	// .corner-border {
	// 	background: linear-gradient(to right, beige 1px, transparent 1px) 0 0,
	// 		linear-gradient(to bottom, beige 1px, transparent 1px) 0 0,
	// 		linear-gradient(to right, beige 1px, transparent 1px) 0 100%,
	// 		linear-gradient(to top, beige 1px, transparent 1px) 0 100%,
	// 		linear-gradient(to left, beige 1px, transparent 1px) 100% 0,
	// 		linear-gradient(to bottom, beige 1px, transparent 1px) 100% 0,
	// 		linear-gradient(to left, beige 1px, transparent 1px) 100% 100%,
	// 		linear-gradient(to top, beige 1px, transparent 1px) 100% 100%;
	// 	background-repeat: no-repeat;
	// 	background-size: 10px 10px;
	// }

	// should this link stuff be somewhere else?
	.chevron-link {
		visibility: hidden;
	}

	.chevron-link:hover {
		visibility: visible;
	}

	.link {
		visibility: visible;
	}

	.link:hover {
		text-decoration: underline;
	}

	.select-chevron {
		color: $ink-color;
	}

	a {
		font-family: Hack;
		color: $link-color;
		text-decoration: none;
	}

	a:hover {
		color: $ink-color;
	}
</style>
