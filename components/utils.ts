import Color from 'color'

export const noop = (): void => {
  /*noop*/
}

Color.prototype.tint = function(ratio) {
  return this.mix(Color('white'), ratio)
}

Color.prototype.shade = function(ratio) {
  return this.mix(Color('black'), ratio)
}

/**
 *
 * @param {Number} start - The start of the range.
 * @param {Number} end - The end of the range.
 *
 * @return {Array} the range of numbers [start...end]
 */
export const range = (start = 0, end) =>
  [...Array(end - start + 1).keys()].map(x => x + start)

export const colorGenerator = ({
  dark = 0,
  light = 0,
  black = 0,
  fade = 0,
  tint = 0,
  shade = 0,
} = {}) => color => {
  if (!color) {return null}
  return Color(color)
    .darken(dark)
    .lighten(light)
    .blacken(black)
    .tint(tint)
    .shade(shade)
    .fade(fade)
    .rgb()
    .toString()
}

export const mix = (color1, color2, ratio) => {
  if (!color1) {return null}
  if (!color2) {return null}
  return Color(color1)
    .mix(Color(color2), ratio)
    .rgb()
    .toString()
}

export const shadeToColor = (color, shade) => {
  if (!color) {return null}
  return Color(color)
    .shade(shade)
    .rgb()
    .toString()
}

export const tintToColor = (color, tint) => {
  if (!color) {return null}
  return Color(color)
    .tint(tint)
    .rgb()
    .toString()
}

export const alphaToColor = (color, alpha) => {
  if (!color) {return null}
  return Color(color)
    .alpha(alpha)
    .rgb()
    .toString()
}

export const xxxdark = color => shadeToColor(color, 0.8)
export const xxdark = color => shadeToColor(color, 0.6)
export const xdark = color => shadeToColor(color, 0.4)
export const dark = color => shadeToColor(color, 0.2)

export const light = color => tintToColor(color, 0.2)
export const xlight = color => tintToColor(color, 0.4)
export const xxlight = color => tintToColor(color, 0.7)
export const xxxlight = color => tintToColor(color, 0.9)

export const transparent = color => alphaToColor(color, 0.8)
export const xtransparent = color => alphaToColor(color, 0.6)
export const xxtransparent = color => alphaToColor(color, 0.3)
export const xxxtransparent = color => alphaToColor(color, 0.2)
export const xxxxtransparent = color => alphaToColor(color, 0.1)

export const hover = color => tintToColor(color, 0.15)

export const active = color => shadeToColor(color, 0.1)

export const contrast = (
  color,
  ammount = 1,
  contrastLuminance = 0.37,
  contrastDark = 0.8,
  contrastDarkSaturate = 1,
  contrastLight = 0.9
) => {
  if (!color) {return null}
  const c = Color(color)
  return c.luminosity() > contrastLuminance
    ? c
        .shade(contrastDark * ammount)
        .saturate(contrastDarkSaturate * ammount)
        .rgb()
        .toString()
    : c
        .tint(contrastLight * ammount)
        .rgb()
        .toString()
}

const BUTTON_FONT_LIGHT_MUTATION = 0.75
const BUTTON_FONT_DARK_MUTATION = 0.5

export const isColorLight = color => {
  if (typeof color === 'string') {
    color = Color(color)
  }
  const hsv = color.hsv()
  const v = hsv.color[2] / 100
  const s = hsv.color[1] / 100
  // Magic curve from V1
  return v > 0.5 + Math.pow(s, 1.6) * 0.5
}

export const oldContrast = colorString => {
  const color = Color(colorString)
  const lightestColor = 'white'

  const hsl = color.hsl()
  const l = hsl.color[2] / 100

  if (l === 0) {
    return lightestColor
  }

  return (isColorLight(color)
    ? color.darken(BUTTON_FONT_DARK_MUTATION / l)
    : color.lighten(BUTTON_FONT_LIGHT_MUTATION / l)
  )
    .rgb()
    .toString()
}

export const overlayBackgroundColor = backgroundColor =>
  isColorLight(backgroundColor)
    ? Color(backgroundColor)
        .darken(0.1)
        .fade(0.1)
        .rgb()
        .toString()
    : Color(backgroundColor)
        .lighten(0.15)
        .fade(0.1)
        .rgb()
        .toString()

export const __OVERRIDE_THIS_COLOR = '#E700CC'

export const rgbToHex = rgbString => {
  return (
    rgbString &&
    Color(rgbString)
      .hex()
      .toString()
  )
}

// from https://hacks.mozilla.org/2013/04/detecting-touch-its-the-why-not-the-how/
const hasTouch = () =>
  (typeof window !== 'undefined' && 'ontouchstart' in window) ||
  (typeof navigator !== 'undefined' &&
    (navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0))

const isMobile = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone|IEMobile/i.test(
    navigator.userAgent
  )

// This function should be the same as the one in Stakhanov
export const isTouch = () => hasTouch() && isMobile()
