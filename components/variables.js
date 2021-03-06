/* eslint-disable key-spacing */

const variables = {
  unit: 8,

  screenSizes: {
    sm: 425,
    md: 768
  },

  colors: {
    black: '#070707',
    white: '#FFFFFF',
    grey1: '#F5F5F5',
    grey2: '#EFEFEF',
    grey3: '#D3D3D3',
    grey4: '#C4C4C4',
    grey5: '#B4B4B4',
    grey6: '#A4A4A4',
    grey7: '#949494',
    grey8: '#858585',
    grey9: '#444444',
    grey10: '#252525',

    background: 'white',
    body: '#383733',
    primary: '#0079FF',
    accent: '#f68830',
    error: '#e02020'
  },

  distinctColors: ['#0079FF', '#f68830'],

  fontFamily:
    'Ubuntu,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol',

  widths: {
    xsm: 8,
    sm: 8 * 2,
    md: 8 * 4,
    lg: 8 * 6,
    xlg: 8 * 8
  },

  fontSizes: {
    size6: 48,
    size5: 40,
    size4: 32,
    size3: 28,
    size2: 24,
    size1: 20,
    size0: 16,
    sizeN1: 14,
    sizeN2: 12
  },

  lineHeights: {
    size6: 62,
    size5: 50,
    size4: 46,
    size3: 34,
    size2: 30,
    size1: 26,
    size0: 22,
    sizeN1: 18,
    sizeN2: 16
  },

  fontWeights: {
    regular: 400,
    bold: 700
  },

  shadows: {
    shadow0: '0 0 18px 0 rgba(0, 0, 0, 0.08)',
    shadow1: `
      0 1px 2px 0 rgba(0, 0, 0, 0.04),
      0 1px 4px 0 rgba(0, 0, 0, 0.04)
    `,
    shadow2: `
      0 1px 2px 0 rgba(0, 0, 0, 0.04),
      0 2px 8px 0 rgba(0, 0, 0, 0.04)
    `
  }
}

variables.colors.warning = variables.colors.yellow
variables.colors.success = variables.colors.green

variables.unitize = quantity =>
  quantity ? quantity * variables.unit + 'px' : null

module.exports = variables
