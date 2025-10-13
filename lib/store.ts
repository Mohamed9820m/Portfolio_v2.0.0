import { create } from 'zustand'

interface CursorStore {
  cursorVariant: 'default' | 'text' | 'button' | 'link'
  setCursorVariant: (variant: 'default' | 'text' | 'button' | 'link') => void
}

export const useCursorStore = create<CursorStore>((set) => ({
  cursorVariant: 'default',
  setCursorVariant: (variant) => set({ cursorVariant: variant }),
}))

interface ThemeStore {
  accentColor: string
  setAccentColor: (color: string) => void
}

export const useThemeStore = create<ThemeStore>((set) => ({
  accentColor: 'purple',
  setAccentColor: (color) => set({ accentColor: color }),
}))

