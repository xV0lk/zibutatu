/** @type {import('tailwindcss').Config} */
export default {
  content: ['views/**/*.{html,templ}'],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
}
