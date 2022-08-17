const plugin = require('tailwindcss/plugin');
const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '0.938rem'
      }
    },
    screens: Object.fromEntries(Object.entries(defaultTheme.screens).filter(([key, value]) => key !== '2xl')),
    fontFamily: {
      sans: ['Montserrat', 'san-serif'],
      serif: ['Merriweather'],
      mono: ['"Roboto Mono"'],
      display: ['"Sansita Swashed"'],
      handwriting: ['"Dancing Script"']
    },
    extend: {
      fontSize: {
        none: ['0', '0'],
        hero: ['3.5rem', '4.25rem'], // 56/68
        h1_medium: ['2.5rem', '3.0625rem'], // 40/49
        h2_regular: ['1.75rem', '2.125rem'], // 28/34
        h3_semibold: ['1.5rem', '1.8125rem'], // 24/29
        h3_medium: ['1.5rem', '1.8125rem'], // 24/29
        h4_regular: ['1.25rem', '1.5rem'], // 20/24
        h4_medium: ['1.25rem', '1.5rem'], // 20/24
        h5_regular: ['1.125rem', '1.375rem'], // 18/22
        h5_medium: ['1.125rem', '1.375rem'] // 18/22
      },

      lineHeight: {
        0: '0'
      },
      screens: {
        xl: '1440px'
      },
      colors: {
        'todo-blue-10': '#EDF2F7',
        'todo-blue-20': '#4B9AE8'
      },
      backgroundImage: {
        'gradient-45deg': 'linear-gradient(45deg, var(--tw-gradient-stops))'
      },
      maxWidth: {
        '1/2': '50%',
        '2/3': '66.666667%'
      },
      zIndex: {
        dropdown: '1000',
        sticky: '1020',
        fixed: '1030',
        offcanvasoverlay: '1040',
        offcanvas: '1045',
        modaloverlay: '1050',
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
        2000: '2000ms',
        10000: '10000ms'
      },
      transitionTimingFunction: {
        // https://cubic-bezier.com/
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
          '0%': {width: '0px'},
          '100%': {width: '100%'}
        },
        zoomIn: {
          '0%': {transform: 'translateY(0) scale(1, 1)'},
          '100%': {transform: 'translateY(-20px) scale(1.3, 1.3)'}
        },
        zoomOut: {
          '0%': {transform: 'translateY(-20px) scale(1.3, 1.3)'},
          '100%': {transform: 'translateY(0) scale(1, 1)'}
        }
      },
      typography: theme => ({
        DEFAULT: {
          css: {
            maxWidth: theme('maxWidth.full')
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
    plugin(function ({addUtilities, theme, e}) {
      const animationDelayValues = theme('animationDelay');
      addUtilities(
        Object.entries(animationDelayValues).map(([key, value]) => {
          return {
            [`.${e(`animate-delay-${key}`)}`]: {animationDelay: `${value}`}
          };
        })
      );
      addUtilities({
        '.invalid': {
          fontSize: theme('fontSize.xs'),
          color: theme('colors.abc-dark-red'),
          fontStyle: 'italic'
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
