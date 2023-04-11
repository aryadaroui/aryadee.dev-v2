<div id="img-box">
	<slot />
</div>

<style lang="scss">
	#img-box {
		border: $brown-soft 1px solid;
		// box-shadow: 0px 5px 30px black;
		border-radius: 15px;
		background-image: url(/me_smile.webp);

		background-position-x: center;
		background-size: cover;

		width: 100%;
		height: 100%;

		min-width: 200px;
		min-height: 200px;

		max-width: 200px;
		max-height: 300px;

		overflow: hidden;

					@media only screen and (max-width: 500px) {
						min-width: 100px;
			}
	}
</style>
