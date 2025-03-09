/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ['"Pretendard"', 'sans-serif'],
      },

      backgroundImage: {
        navbarGradient:
          'linear-gradient(270deg, #FEFEFE 0.35%, #F4F4F9 175.32%)',
        grayGradient:
          'linear-gradient(180deg, rgba(255, 255, 255, 1) 36.54%, #FFF 94.71%)',
        profileMenuGradient:
          'linear-gradient(0deg, var(--grey, #F4F4F9) 0%, var(--grey, #F4F4F9) 100%), linear-gradient(0deg, rgba(255, 255, 255, 0.50) 0%, rgba(255, 255, 255, 0.50) 100%), url(<path-to-image>)',
        profilePageGradient:
          'linear-gradient(180deg, #FEF387 0.01%, #FFF 46.31%)',
      },
      boxShadow: {
        alarmShadow: '0px 4px 16px rgba(0, 0, 0, 0.04)',
        cardShadow: '0px 0px 1px rgba(0, 0, 0, 0.08)',
        emphasizeShadow:
          '0px 2px 8px 0px rgba(0, 0, 0, 0.12), 0px 1px 4px 0px rgba(0, 0, 0, 0.08), 0px 0px 1px 0px rgba(0, 0, 0, 0.08)',
        bottomSheetShadow: '0px -4px 24px rgba(3.67, 21.75, 48.87, 0.25)',
        yellowShadow:
          '0px 218px 61px 0px rgba(152, 147, 81, 0.00), 0px 139px 56px 0px rgba(152, 147, 81, 0.01), 0px 78px 47px 0px rgba(152, 147, 81, 0.05), 0px 35px 35px 0px rgba(152, 147, 81, 0.09), 0px 9px 19px 0px rgba(152, 147, 81, 0.10)',
        subHeaderShadow:
          '0px 1px 2px 0px rgba(0, 0, 0, 0.12), 0px 0px 1px 0px rgba(0, 0, 0, 0.08), 0px 0px 1px 0px rgba(0, 0, 0, 0.08)',
        languageCardShadow:
          '0px 218px 61px 0px rgba(152, 147, 81, 0.00), 0px 139px 56px 0px rgba(152, 147, 81, 0.01), 0px 78px 47px 0px rgba(152, 147, 81, 0.05), 0px 35px 35px 0px rgba(152, 147, 81, 0.09), 0px 9px 19px 0px rgba(152, 147, 81, 0.10)',
        inputFieldShadow: '0px 1px 2px 0px rgba(107, 110, 116, 0.04)',
      },
      colors: {
        text: {
          strong: '#000000',
          normal: '#252525',
          alternative: '#9397a1',
          assistive: '#abb0b9',
          disabled: '#c5c8ce',
          invert: '#ffffff',
          error: '#ff5252',
          success: '#0066ff',
          priamry: '#FEF387',
        },
        border: {
          normal: '#c5c8ce',
          alternative: '#e2e5eb',
          disabled: '#ebeef1',
          error: '#ff5252',
          success: '#0066ff',
          primary: '#FEF387',
        },
        surfaceDim: {
          normal: 'rgba(0,0,0, 30%)',
          dark: 'rgba(0,0,0,70%)',
        },
        surface: {
          base: '#ffffff',
          secondary: '#f4f4f9',
          tertiary: '#ebeef1',
          disabled: '#e2e5eb',
          invert: '#000000',
          primary: '#FEF387',
        },
        primary: {
          normal: '#FEF387',
          dark: '#252525',
          neutral: '#f4f4f9',
        },
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
