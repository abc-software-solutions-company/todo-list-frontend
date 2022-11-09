const plugin = require('tailwindcss/plugin');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{html,njk,js,jsx,ts,tsx}'],
  corePlugins: {
    preflight: true
  },
  theme: {
    container: {
      // Dùng để giới hạn nội dung hiển thị của website
      // Mặc định tailwind hỗ trợ 5 breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px).
      // Như vậy khi mở website trên màn hình lớn nếu nội dung được chứa trong 1 div có class="container" thì nội dung sẽ hiển thị trong giới hạn tối đa là 1536px.
      // Trường hợp bạn muốn thay đổi giá trị này thì cần điều chỉnh như sau: (Tham khảo dòng 21 đến 23 -> thay đổi giá trị của 2xl = 1440px);
      center: true,
      padding: {
        DEFAULT: '0.938rem' // Ở màn hình mobile thì container sẽ cách lề trái và lề phải 15px
        // xl: '0'
      }
    },
    screens: Object.fromEntries(Object.entries(defaultTheme.screens).filter(([key]) => key !== '2xl')),
    fontFamily: {
      // Khai báo các font chữ được sử dụng trong website. Mặc định Tailwind sẽ sử dụng font họ "sans". Có nghĩa là font được sử dụng trong website hiện tại là "Quicksand".
      sans: ['Mulish', 'system-ui', '-apple-system', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'sans-serif'],
      serif: ['Merriweather', 'Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
      mono: ['"Roboto Mono"', 'Menlo', 'Monaco', 'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace'],
      display: ['"Sansita Swashed"'],
      handwriting: ['"Dancing Script"']
    },
    extend: {
      screens: {
        xl: '1310px'
      },
      // https://nekocalc.com/px-to-rem-converter
      // Tailwind cung cấp sẵn cho bạn khá nhiều thứ nhưng không có nghĩa là chỉ dùng những cái nó cung cấp sẵn là đủ.
      // Do đó Tailwind cung cấp tính năng mở rộng để tạo thêm cấu hình một cách dễ dàng.
      fontSize: {
        none: ['0', '0'],
        hero: ['3.5rem', { lineHeight: '4rem', letterSpacing: '0' }],
        h1: ['2.5rem', { lineHeight: '3rem', letterSpacing: '0' }],
        h2: ['1.75rem', { lineHeight: '2.25rem', letterSpacing: '0' }],
        h3: ['1.5rem', { lineHeight: '2rem', letterSpacing: '0' }],
        h4: ['1.25rem', { lineHeight: '1.75rem', letterSpacing: '0' }],
        h5: ['1.125rem', { lineHeight: '1.625rem', letterSpacing: '0' }],
        h6: ['1rem', { lineHeight: '1.5rem', letterSpacing: '0' }],
        h7: ['0.875rem', { lineHeight: '1.375rem', letterSpacing: '0' }],
        brand: ['0.75rem', { lineHeight: '1rem', letterSpacing: '0' }],
        display1: ['5rem', { lineHeight: '3.5rem', letterSpacing: '0' }],
        display2: ['4.5rem', { lineHeight: '3.5rem', letterSpacing: '0' }],
        display3: ['4rem', { lineHeight: '3.5rem', letterSpacing: '0' }],
        display4: ['3.5rem', { lineHeight: '3.5rem', letterSpacing: '0' }],
        display5: ['3rem', { lineHeight: '3.5rem', letterSpacing: '0' }],
        display6: ['2.5rem', { lineHeight: '3.5rem', letterSpacing: '0' }],
        figure: ['0.688rem', { lineHeight: '3.5rem', letterSpacing: '0' }]
      },
      letterSpacing: {
        4: '0.04em', // -4%
        3: '0.03em', // -3%
        2: '0.02em', // -2%
        1: '0.01em' // -1%
      },
      lineHeight: {
        0: '0'
      },
      colors: {
        blue: {
          50: '#f6fafe',
          100: '#edf5fd',
          200: '#d2e6f9',
          300: '#b7d7f6',
          400: '#81b8ef',
          500: '#4b9ae8',
          600: '#448bd1',
          700: '#3874ae',
          800: '#2d5c8b',
          900: '#254b72'
        }
      },
      backgroundImage: {
        'gradient-45deg': 'linear-gradient(45deg, var(--tw-gradient-stops))'
      },
      maxWidth: {
        '1/2': '50%',
        '2/3': '66.666667%',
        'login-container-lg': '600px'
      },
      zIndex: {
        dropdown: '1000',
        sticky: '1020',
        fixed: '1030',
        drawerbackdrop: '1040',
        drawer: '1045',
        modalbackdrop: '1050',
        modal: '1055',
        popover: '1070',
        tooltip: '1080',
        toast: '1090'
      },
      transitionProperty: {
        width: 'width',
        height: 'height',
        top: 'top',
        spacing: 'margin, padding'
      },
      transitionDuration: {
        0: '0ms',
        1500: '1500ms',
        2000: '2000ms'
      },
      transitionTimingFunction: {
        // Tham khảo: https://cubic-bezier.com/
        'in-out': 'cubic-bezier(.68,.12,.38,.87)',
        'in-out-back': 'cubic-bezier(0.68, -0.6, 0.32, 1.6)'
      },
      animation: {
        'h-line': 'hLine 200ms ease-in-out infinite',
        'zoom-in': 'zoomIn 6s',
        'zoom-out': 'zoomOut 6s'
      },
      animationDelay: {
        100: '100ms',
        150: '150ms',
        200: '200ms',
        300: '300ms',
        400: '400ms',
        500: '500ms'
      },
      keyframes: {
        hLine: {
          '0%': { width: '0px' },
          '100%': { width: '100%' }
        },
        zoomIn: {
          '0%': { transform: 'translateY(0) scale(1, 1)' },
          '100%': { transform: 'translateY(-20px) scale(1.3, 1.3)' }
        },
        zoomOut: {
          '0%': { transform: 'translateY(-20px) scale(1.3, 1.3)' },
          '100%': { transform: 'translateY(0) scale(1, 1)' }
        }
      },
      typography: theme => ({
        DEFAULT: {
          css: {
            /* It's a way to reference a value in the theme. */
            // maxWidth: theme('maxWidth.full')
            'h1,h2,h3': {
              color: theme('colors.black'),
              fontWeight: 'bold',
              margin: '0px'
            },
            img: {
              borderRadius: theme('borderRadius.lg'),
              maxWidth: '400px',
              width: '100%'
            },
            p: {
              margin: '0px'
            }
          }
        },
        abc: {
          color: theme('colors.white'),
          css: {
            '--tw-prose-body': theme('colors.white'),
            '--tw-prose-headings': theme('colors.white'),
            '--tw-prose-lead': theme('colors.white'),
            '--tw-prose-links': theme('colors.white'),
            '--tw-prose-bold': theme('colors.white'),
            '--tw-prose-counters': theme('colors.white'),
            '--tw-prose-bullets': theme('colors.white'),
            '--tw-prose-hr': theme('colors.white'),
            '--tw-prose-quotes': theme('colors.white'),
            '--tw-prose-quote-borders': theme('colors.white'),
            '--tw-prose-captions': theme('colors.white'),
            '--tw-prose-code': theme('colors.white'),
            '--tw-prose-pre-code': theme('colors.white'),
            '--tw-prose-pre-bg': theme('colors.white'),
            '--tw-prose-th-borders': theme('colors.white'),
            '--tw-prose-td-borders': theme('colors.white')
          }
        }
      })
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
    plugin(function ({ addUtilities, theme, e }) {
      const animationDelayValues = theme('animationDelay');
      addUtilities(
        Object.entries(animationDelayValues).map(([key, value]) => {
          return {
            [`.${e(`animate-delay-${key}`)}`]: { animationDelay: `${value}` }
          };
        })
      );
      addUtilities({
        '.invalid': {
          fontSize: theme('fontSize.xs'),
          color: theme('colors.abc-dark-red'),
          fontStyle: 'italic',
          marginTop: theme('spacing.1')
        },
        '.overflow-initial': {
          overflow: 'initial'
        },
        '.hash-anchor-offset': {
          content: '',
          display: 'block',
          visibility: 'hidden',
          marginTop: '-100px',
          height: '100px'
        }
      });
    })
  ]
};
