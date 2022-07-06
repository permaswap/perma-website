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
        '14px': ['14px', '22px'],
        '12px': ['12px', '20px']
      },
      width: {
        '1342px': '1342px',
        '1200px': '1200px',
        '1024px': '1024px',
        '300px': '300px',
        '282px': '282px',
        '279px': '279px',
        '200px': '200px',
        '164px': '164px',
        '152px': '152px',
        '100px': '100px',
        '49%': '49%'
      },
      height: {
        '310px': '310px',
        '250px': '250px',
        '152px': '152px',
        '100px': '100px'
      },
      spacing: {
        '10px': '10px'
      },
      colors: {
        permaGrey: 'rgba(233, 233, 233, 0.5)',
        permaGray1: '#5D806E',
        permaGray2: '#CACACA',
        permaGray3: '#B8B8B8',
        permaGreen: '#5D8F4B',
        permaGreen2: '#70B16E',
        permaGreen3: '#142617',
        permaGreen4: '#0D2A14',
        permaGreen5: '#2EBB48',
        permaGreen6: '#84C085',
        permaGreen7: '#1E9437',
        permaGreen8: 'rgba(3, 33, 13, 0.65)',
        permaWhite: 'rgba(255, 255, 255, 0.65)',
        permaWhite2: 'rgba(255, 255, 255, 0.85)',
        permaWhite3: 'rgba(255, 255, 255, 0.45)',
        permaWhite4: 'rgba(255, 255, 255, 0.15)',
        permaBlack: '#141814',
        permaBlack2: '#03210D',
        permaBorderGreen: 'rgba(46, 187, 72, 0.25)',
        permaBorderGreen2: '#52C763',
        permaHoverGreen: '#AECCAD',
        permaHoverGreen2: '#52C763'
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
