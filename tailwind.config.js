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
        '1264px': '1264px',
        '1200px': '1200px',
        '1024px': '1024px',
        '300px': '300px',
        '282px': '282px',
        '279px': '279px',
        '200px': '200px',
        '164px': '164px',
        '120px': '120px',
        '100px': '100px',
        '49%': '49%',
        '43%': '43%'
      },
      minWidth: {
        '279px': '279px',
        '185px': '185px',
        '164px': '164px',
        '148px': '148px',
        '134px': '134px'
      },
      height: {
        '528px': '528px',
        '310px': '310px',
        '250px': '250px',
        '120px': '120px',
        '100px': '100px'
      },
      minHeight: {
        '44px': '44px'
      },
      spacing: {
        '429px': '429px',
        '280px': '280px',
        '258px': '258px',
        '148px': '148px',
        '10px': '10px',
        '9px': '9px'
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
        permaGreen8: 'rgba(24, 59, 33, 0.25);',
        permaGreen9: '#A4E0A9',
        permaGreen10: '#79D483',
        permaGreen11: '#5AAD67',
        permaWhite: 'rgba(255, 255, 255, 0.65)',
        permaWhite2: 'rgba(255, 255, 255, 0.85)',
        permaWhite3: 'rgba(255, 255, 255, 0.45)',
        permaWhite4: 'rgba(255, 255, 255, 0.15)',
        permaWhite5: 'rgba(255, 255, 255, 0.08)',
        permaBlack: '#141814',
        permaBlack2: '#03210D',
        permaBlack3: '#074719',
        permaBlack4: 'rgba(20, 24, 20, 0.85)',
        permaBlack5: '#183B21',
        permaBlack6: '#222422',
        permaBorderGreen: 'rgba(121, 212, 131, 0.25)',
        permaHoverGreen: '#AECCAD'
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
