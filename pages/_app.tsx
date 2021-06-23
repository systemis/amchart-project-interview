import '../styles/globals.css'
import type { AppProps } from 'next/app'

console.warn = () => {};

// Look ma, no error!
console.error('Something bad happened.');



function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
export default MyApp
