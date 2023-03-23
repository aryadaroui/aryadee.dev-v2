<div id="img-box">
	<slot />
</div>

<style lang="scss">
	#img-box {
		border: rgb(65, 65, 61) 1px solid;
		box-shadow: 0px 5px 20px black;
		border-radius: 10px;

		background-image: url(/me_smile.webp);

		background-position-x: center;
		background-size: cover;

		width: 100%;
		height: 100%;

		min-width: 170px;
		min-height: 150px;

		max-width: 200px;
		max-height: 300px;

		overflow: hidden;

					@media only screen and (max-width: 500px) {
						min-width: 100px;
			}
	}
</style>
