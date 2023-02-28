import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    ['btn', 'px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
    ['icon-btn', 'text-[0.9em] inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600 !outline-none'],
    ['msg-input-box', 'relative px-4 pl-6 py-2 bg-gray-100 dark:bg-hex-121212 mt-2'],
    ['msg-input-box-arrow', 'w5 h5 absolute left-1 i-carbon-arrow-up top-2.5 c-red'],
    ['msg-outout-box', 'relative px-4 pl-6 py-2 bg-gray-100 dark:bg-hex-121212 mt-2'],
    ['msg-outout-box-arrow', 'w5 h5 absolute left-1 i-carbon-arrow-down top-2.5 c-green'],
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
