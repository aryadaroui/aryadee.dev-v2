
# aryadee.dev - personal blog

This is my blog is built mostly from scratch using SvelteKit.

## How to
To run on your local machine,
```bash
# in project directory
npm install # installs all the necessary packages for development
npm run dev # runs the website locally
```
As always, make sure all your dependencies are up-to-date. I started this blog with SvelteKit pre-1.0 and a too-new version of TypeScript for a couple packages.

## How to use math
With thanks to Mathlifier,

In an .md, .svx, .svelte.md, file, we can use `$` and `$$` as normal.

In a .svelte file, for inline:
```svelte
{@html math(`\\int f(x) dx`)}
```

and for block:
```svelte
{@html display(`\\int f(x) dx`)}
```

## Credits
- (Svelte and SvelteKit)[https://svelte.dev/]
- (MDsveX)[https://github.com/pngwn/MDsveX]
- (Mathlifier)[https://github.com/kelvinsjk/mathlified/tree/main/sites/mdsvex-math-starter]

## License

(Please) do not copy, repost, or reuse my creative content like photos, art, audio, writing. Otherwise, MIT License for all the code and logic.