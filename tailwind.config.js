/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // Pretendard 폰트 설정
      fontFamily: {
        pretendard: ['"Pretendard"', 'sans-serif'],
      },

      // 그라디언트 배경 정의
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

      // 그림자 효과 정의
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

      // 색상 정의 (Primitive + Semantic)
      colors: {
        // ──────────────────────────────
        // Primitive Colors
        // ──────────────────────────────

        brand: {
          50: '#FFFFFF',
          100: '#FFFFFF',
          200: '#FFFFF3',
          300: '#FFFACF',
          400: '#FFF7AB',
          500: '#FEF387',
          600: '#E1D771',
          700: '#C4BA5E',
          800: '#B0923A',
          900: '#4F4B1D',
        },
        neutral: {
          0: '#FFFFFF',
          100: '#F4F4F9',
          200: '#EBEDF2',
          300: '#D0DAE3',
          400: '#C3C5D0',
          500: '#A9ABB8',
          600: '#8F919D',
          700: '#747680',
          800: '#5A5B63',
          900: '#28292D',
          950: '#17181A',
          1000: '#000000',
        },
        status: {
          red: {
            100: '#FFF3F4',
            200: '#FFCACF',
            300: '#FF4D5F',
            400: '#E33E4E',
          },
          blue: {
            50: '#F1F7FF',
            100: '#E0EDFF',
            200: '#A6C9FF',
            300: '#0066FF',
          },
          green: {
            100: '#E6F7ED',
            200: '#B1E7C3',
            300: '#1DAA55',
          },
        },

        // ──────────────────────────────
        // Semantic Colors
        // ──────────────────────────────

        text: {
          strong: '#17181A', // neutral.950
          normal: '#5A5B63', // neutral.800 ← 변경 반영됨
          alternative: '#8F919D', // neutral.600
          assistive: '#A9ABB8', // neutral.500
          disabled: '#C3C5D0', // neutral.400
          invert: '#FFFFFF', // neutral.0
          error: '#FF4D5F', // status-red.300
          success: '#0066FF', // status-blue.300
          primary: '#FEF387', // brand.500
        },
        surface: {
          primary: '#FEF387', // brand.500
          base: '#FFFFFF', // neutral.0
          secondary: '#F4F4F9', // neutral.100
          tertiary: '#EBEDF2', // neutral.200
          disabled: '#D0DAE3', // neutral.300
          invert: '#17181A', // neutral.950
        },
        surfaceDim: {
          normal: '#0000004D', // opacity 30%
          dark: '#000000B2', // opacity 70%
        },
        border: {
          primary: '#FEF387', // brand.500
          normal: '#C3C5D0', // neutral.400
          alternative: '#D0DAE3', // neutral.300
          disabled: '#EBEDF2', // neutral.200
          error: '#FF4D5F', // status-red.300
          success: '#0066FF', // status-blue.300
        },
        primary: {
          normal: '#FEF387',
          dark: '#17181A',
          neutral: '#F4F4F9',
        },
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
