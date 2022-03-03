
## NextJs with Typescript, Tailwind, and Emotion

### Installation

Install Next.js

```shell
npx create-next-app@latest --ts <project> 
```
or if you're on the existing folder
```shell
npx create-next-app@latest --ts . 
```

Install the dependencies

```shell
npm install @emotion/react @emotion/styled @emotion/css @emotion/server
npm install -D twin.macro tailwindcss @emotion/babel-plugin babel-plugin-macros
```

### Add the global styles

Next, we need to import GlobalStyles from twin.macro. This brings in the base styles from Tailwind, and makes it work throughout our app. Copy the code below and replace the code in /pages/_app.tsx with it, and save your file.

```typescript
// page/_app.tsx
import type { AppProps } from 'next/app'
import { GlobalStyles } from 'twin.macro';

function App({ Component, pageProps }: AppProps) {
	return (
		<div>
			<GlobalStyles />
			<Component {...pageProps} />
		</div>
	);
}

export default App
```

### Add the babel config

Add this babel configuration in `.babelrc.js`:

```js
// .babelrc.js
module.exports = {
  presets: [
    [
      'next/babel',
      {
        'preset-react': {
          runtime: 'automatic',
          importSource: '@emotion/react',
        },
      },
    ],
  ],
  plugins: ['@emotion/babel-plugin', 'babel-plugin-macros'],
}
```

### Add the typescript config

Add this next configuration in `tsconfig.json`:

```js
 // tsconfig.json
{
  "compilerOptions": {
        //...
       "types": ["@emotion/core"],
  }
}

```

### Add the next config

Add this next configuration in `next.config.js`:

```js
// next.config.js
module.exports = {
  webpack: (config, { isServer }) => {
    // Fixes packages that depend on fs/module module
    if (!isServer) {
      config.node = { fs: 'empty', module: 'empty' }
    }

    return config
  },
}
```

> 'fs' is a server-side dependency which we don’t want added client-side. Adding the code above will make sure you don’t experience errors.

Then twin needs some type declarations added for your chosen css-in-js library, otherwise you’ll see errors like this:

```js
Property 'css' does not exist on type 'DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>'.
```

the easiest way to solve it was to put this on top

```typescript
/** @jsxImportSource @emotion/react */ // <-- this code
import { css } from '@emotion/react';
```

</details>


###References

- [Set Up A Next JS Project With TailwindCSS and Twin Macro](https://medium.com/@ianenrico1/set-up-a-next-js-project-with-tailwindcss-and-twin-macro-191ae518dd29)
- [CodeSandbox Sample](https://codesandbox.io/s/wmrk2?file=/README.md:0-13382)
- [Install Tailwind CSS with Next.js](https://tailwindcss.com/docs/guides/nextjs)