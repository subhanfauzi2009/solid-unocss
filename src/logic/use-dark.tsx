import { effect } from 'solid-js/web'
import type { Accessor, JSX } from 'solid-js'

const noop = () => void 0

const darkModeContext = createContext<{
  isDarkMode: Accessor<boolean>
  toggleDarkMode: () => void
  setColorScheme: (value: 'auto' | 'dark' | 'light') => void
}>({ isDarkMode: () => false, toggleDarkMode: noop, setColorScheme: noop })

export function DarkModeProvider(props: { children: JSX.Element }) {
  const [prefersDarkMode, setPrefersDarkMode] = createSignal(false)
  const [colorScheme, setColorScheme] = createSignal<'auto' | 'dark' | 'light'>('auto')
  const isDarkMode = createMemo(() => (colorScheme() === 'auto' ? prefersDarkMode() : colorScheme() === 'dark'))

  onMount(() => {
    const setting = localStorage.getItem('color-scheme')
    if (setting === 'light' || setting === 'dark') setColorScheme(setting)
  })

  onMount(() => {
    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) setPrefersDarkMode(true)
      else setPrefersDarkMode(false)
    }
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    handleChange(mq)
    mq.addEventListener('change', handleChange)
    effect(() => {
      localStorage.setItem('color-scheme', colorScheme())
    })
    return () => mq.removeEventListener('change', handleChange)
  })

  effect(() => {
    document.body.classList.toggle('dark', isDarkMode())
  })

  function toggleDarkMode() {
    setColorScheme(isDarkMode() ? 'light' : 'dark')
  }

  return (
    <darkModeContext.Provider value={{ isDarkMode, toggleDarkMode, setColorScheme }}>
      {props.children}
    </darkModeContext.Provider>
  )
}

export function useDark() {
  const result = useContext(darkModeContext)
  if (result.setColorScheme === noop) throw new Error('useDark must be used within DarkModeProvider')
  return result
}
