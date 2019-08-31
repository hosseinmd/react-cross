/**
 * @typedef colorsType
 * @type {object}
 * @property {string} background
 * @property {string} onBackground unused
 * @property {string} surface
 * @property {string} onSurface
 * @property {string} primary
 * @property {string} onPrimary unused
 * @property {string} secondary unused
 * @property {string} onSecondary unused
 * @property {string} placeholder
 *
 */

/**
 * @typedef typographyType
 * @type {object}
 * @property {object} h1 unused
 * @property {object} h2 unused
 * @property {object} h3 unused
 * @property {object} h4 unused
 * @property {object} h5 unused
 * @property {object} h6
 * @property {object} subtitle unused
 * @property {object} body1 unused
 * @property {object} body2
 * @property {object} button
 * @property {object} caption unused
 * @property {object} overline unused
 */

export const theme = {
  /** @type {typographyType} */
  typography: {},
  /** @type {colorsType} */
  colors: {},
};

/**
 * @param {object} param0
 * @param {typographyType} param0.typography
 * @param {colorsType} param0.colors
 */
export function customizeTheme({ typography, colors }) {
  theme.typography = typography;
  theme.colors = colors;
}
