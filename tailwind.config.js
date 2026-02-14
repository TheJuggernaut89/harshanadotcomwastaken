/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        container: {
            center: true,
            padding: '1rem',
            screens: {
                sm: '640px',
                md: '768px',
                lg: '1024px',
                xl: '1280px',
                '2xl': '1400px',
            },
        },
        extend: {
            colors: {
                primary: {
                    light: '#9DCBCB',
                    DEFAULT: '#77A8A8',
                    dark: '#2C4F4F',
                },
                navy: {
                    light: '#3D5252',
                    DEFAULT: '#2A3D3D',
                    dark: '#1a2626',
                },
                teal: {
                    light: '#9DCBCB',
                    DEFAULT: '#77A8A8',
                    dark: '#5D8C8C',
                },
                sandy: {
                    light: '#f7bc8d',
                    DEFAULT: '#F4A261',
                    dark: '#e78a3e',
                },
                bronze: {
                    light: '#FFFDF0',
                    DEFAULT: '#EEEBD9',
                    dark: '#D4D1C0',
                },
                chestnut: {
                    light: '#342E32',
                    DEFAULT: '#282427',
                    dark: '#1F1C1E',
                },
                glass: {
                    light: 'rgba(255, 255, 255, 0.1)',
                    dark: 'rgba(0, 0, 0, 0.2)',
                },
                folder: {
                    back: 'var(--folder-back)',
                    front: 'var(--folder-front)',
                    tab: 'var(--folder-tab)',
                }
            },
            spacing: {
                '18': '4.5rem',
                '22': '5.5rem',
                '26': '6.5rem',
                '30': '7.5rem',
                '34': '8.5rem',
                '38': '9.5rem',
            },
            borderRadius: {
                'sm': '8px',
                'DEFAULT': '16px',
                'lg': '24px',
                'xl': '32px',
            },
            fontSize: {
                'xs': ['0.75rem', { lineHeight: '1.5' }],
                'sm': ['0.875rem', { lineHeight: '1.5' }],
                'base': ['1rem', { lineHeight: '1.6' }],
                'lg': ['1.125rem', { lineHeight: '1.6' }],
                'xl': ['1.25rem', { lineHeight: '1.5' }],
                '2xl': ['1.5rem', { lineHeight: '1.4' }],
                '3xl': ['1.875rem', { lineHeight: '1.4' }],
                '4xl': ['2.25rem', { lineHeight: '1.3' }],
                '5xl': ['3rem', { lineHeight: '1.2' }],
                '6xl': ['3.75rem', { lineHeight: '1.2' }],
                '7xl': ['4.5rem', { lineHeight: '1.1' }],
            },
            boxShadow: {
                'button': '0 8px 24px rgba(230, 57, 70, 0.3)',
                'button-hover': '0 12px 32px rgba(230, 57, 70, 0.4)',
                'card': '0 4px 24px rgba(0, 0, 0, 0.08)',
                'card-hover': '0 8px 32px rgba(0, 0, 0, 0.12)',
            },
            animation: {
                'gradient-x': 'gradient-x 15s ease infinite',
                'gradient-y': 'gradient-y 15s ease infinite',
                'gradient-xy': 'gradient-xy 15s ease infinite',
                'float': 'float 6s ease-in-out infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'slide-up': 'slide-up 0.3s ease-out',
            },
            keyframes: {
                'gradient-y': {
                    '0%, 100%': {
                        'background-size': '400% 400%',
                        'background-position': 'center top'
                    },
                    '50%': {
                        'background-size': '200% 200%',
                        'background-position': 'center bottom'
                    }
                },
                'gradient-x': {
                    '0%, 100%': {
                        'background-size': '200% 200%',
                        'background-position': 'left center'
                    },
                    '50%': {
                        'background-size': '200% 200%',
                        'background-position': 'right center'
                    }
                },
                'gradient-xy': {
                    '0%, 100%': {
                        'background-size': '400% 400%',
                        'background-position': 'left center'
                    },
                    '50%': {
                        'background-size': '200% 200%',
                        'background-position': 'right center'
                    }
                },
                'float': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                'slide-up': {
                    '0%': { transform: 'translateY(100%)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' },
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' },
                }
            },
            backdropBlur: {
                xs: '2px',
            }
        },
    },
    plugins: [],
}
