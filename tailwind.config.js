module.exports = {
  purge: ['./public/index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'space-gtotesk-light': 'Space Gtotesk Light',
        'space-gtotesk-medium': 'Space Gtotesk Medium',
        'space-gtotesk-semiBold': 'Space Gtotesk SemiBold',
        'space-gtotesk-bold': 'Space Gtotesk Bold'
      },
      fontSize: {
        '120px': ['120px', '128px'],
        '88px': ['88px', '96px'],
        '48px': ['48px', '56px'],
        '36px': ['36px', '44px'],
        '32px': ['32px', '40px'],
        '18px': ['18px', '26px'],
        '14px': ['14px', '22px']
      },
      width: {
        '1342px': '1342px',
        '1200px': '1200px',
        '1024px': '1024px',
        '300px': '300px',
        '200px': '200px',
        '155px': '155px',
        '100px': '100px',
        '49%': '49%'
      },
      height: {
        '310px': '310px',
        '250px': '250px',
        '155px': '155px',
        '100px': '100px'
      },
      colors: {
        permaGray1: '#5D806E',
        permaGray2: '#CACACA',
        permaGray3: '#B8B8B8',
        permaGreen: '#5D8F4B',
        permaGreen2: '#70B16E',
        nftGreen: '#84C085',
        permaGrey: 'rgba(233, 233, 233, 0.5)'
      },
      backgroundImage: {
        permaGreenBg: 'linear-gradient(268.01deg, rgba(41, 41, 41, 0.8) -9.16%, rgba(51, 51, 51, 0.8) 109.32%);'
      }
    }
  },
  variants: {
    extend: {
      borderWidth: ['last'],
      padding: ['last'],
      margin: ['last'],
      width: ['last']
    }
  },
  plugins: []
}
