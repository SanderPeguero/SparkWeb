module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  // content: [
  //   "./node_modules/flowbite/**/*.js"
  // ],
  theme: {
    extend: {},
    fontFamily:{
      'anonymous': ['anonymous pro']
    }
  },
  plugins: [
    require('flowbite/plugin')
  ]
};
