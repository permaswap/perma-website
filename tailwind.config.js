module.exports = {
  purge: ['./public/index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontSize: {
        '122px': '122px',
        '96px': '96px',
        '88px': '88px',
        '55px': '55px',
        '48px': '48px',
        '36px': '36px',
        '32px': '32px',
        '28px': '28px',
        '24px': '24px',
        '21px': '21px',
        '20px': '20px',
        '18px': '18px',
        '15px': '15px'
      },
      width: {
        '1342px': '1342px',
        '1200px': '1200px',
        '1024px': '1024px',
        '200px': '200px',
        '155px': '155px',
        '100px': '100px',
        '48%': '48%'
      },
      height: {
        '310px': '310px',
        '250px': '250px',
        '155px': '155px',
        '100px': '100px'
      },
      colors: {
        everGray1: '#5D806E',
        everGray2: '#CACACA',
        permaGreen: '#5D8F4B',
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
