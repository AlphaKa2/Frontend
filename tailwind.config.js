// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // src 폴더 내의 모든 JS, JSX, TS, TSX 파일을 대상으로 지정
  ],
  theme: {
    extend: {
      colors: {
        grayDark: '#646464',
        redCustom: '#ef3b3b',
        blueCustom: '#0f2478',
        greenCustom: '#56ab59',
      },
      keyframes: {
        appear: {
          'to': { opacity: '1' },
        },
        bounce: {
          '0%, 100%': { transform: 'translateY(0) rotate(45deg)', opacity: '1' },
          '50%': { transform: 'translateY(-10px) rotate(45deg)', opacity: '0.3' },
        },
      },
      animation: {
        appear: 'appear 1s forwards',
        bounce: 'bounce 2s infinite',
      },
      spacing: {
        '3em': '3em',
        '5em': '5em',
      },
      fontSize: {
        '1.3em': '1.3em',
        '1.8em': '1.8em',
        '3.3em': '3.3em',
      },
      borderRadius: {
        '5%': '5%',
        '10%': '10%',
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
};
