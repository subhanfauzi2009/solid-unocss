import clsx from 'clsx'
import { render } from 'solid-js/web'
import { Router, useRoutes } from 'solid-app-router'
import routes from '~solid-pages'
import { DarkModeProvider, useDark } from './logic'
import '@unocss/reset/tailwind.css'
import 'uno.css'
import './index.css'

function App() {
  const { toggleDarkMode, isDarkMode } = useDark()
  const Routes = useRoutes(routes)
  return (
    <div class="text-dark-500 dark:text-light-300 max-w-200 mx-auto w-full p-2 md:p-10">
      <header class="children:pr-2 flex items-center">
        <nav class="children:pr-2 inline-block text-blue-500">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
        </nav>
        <button onClick={toggleDarkMode} type="button">
          <div class={clsx(isDarkMode() ? 'i-carbon-sun' : 'i-carbon-moon', 'text-2xl')} />
        </button>
      </header>
      <Routes />
    </div>
  )
}

const target = document.getElementById('root')
if (!target) throw new Error('target not found')

render(
  () => (
    <DarkModeProvider>
      <Router>
        <App />
      </Router>
    </DarkModeProvider>
  ),
  target
)
