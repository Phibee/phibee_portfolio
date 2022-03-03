import '../styles/globals.css'
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

export default App;
