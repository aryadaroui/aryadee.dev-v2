<script lang="ts">
import FingerprintJS from '@fingerprintjs/fingerprintjs'

const fpPromise = FingerprintJS.load( {monitoring: false} );


(async () => {
  // Get the visitor identifier when you need it.
  const fp = await fpPromise
  const result = await fp.get()
  console.log(result.visitorId)
})()


// class UserData {
// 		browser: string;
// 		platform: string;
// 		screen_width: number;
// 		screen_height: number;
// 		color_depth: number;
// 		concurrency: number;
// 		user_id: string;

// 		constructor () {
// 			this.browser = navigator.userAgent;
// 			this.platform = navigator.platform;
// 			this.screen_width = window.screen.width;
// 			this.screen_height = window.screen.height;
// 			this.color_depth = window.screen.colorDepth;
// 			this.concurrency = navigator.hardwareConcurrency;

// 		}
// 	}
</script>