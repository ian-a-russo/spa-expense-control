export const defaultColors = {
  success: "rgb(56, 176, 119)",
  info: "rgb(54, 119, 255)",
  "error-darken-1": "rgb(200, 60, 60)",
  error: "rgb(220, 80, 80)",
  "line-border": "#9364f3ff",
  "line-border-darken-1": "rgb(140, 155, 175)",
  "warning-darken-1": "rgb(255, 150, 60)",
};

export const defaultDark = {
  ...defaultColors,
  background: "rgb(16, 18, 24)",
  surface: "rgb(22, 24, 32)",
  "background-darken-1": "rgb(12, 14, 20)",
  "background-darken-2": "rgb(8, 10, 14)",
  "background-lighten-1": "rgb(32, 35, 45)",

  "header-font": "rgb(235, 238, 255)",
  font: "rgb(210, 215, 230)",
};

export const defaultLight = {
  ...defaultColors,
  background: "rgb(245, 247, 255)",
  surface: "rgb(249, 250, 255)",
  "background-darken-1": "rgb(230, 233, 250)",
  "background-darken-2": "rgb(218, 221, 245)",
  "background-lighten-1": "rgb(255, 255, 255)",
  "header-font": "rgb(255, 255, 255)",
  font: "rgb(28, 28, 33)",
};

export const modern = {
  primary: "#8855ff",
  "primary-lighten-1": "rgba(167, 140, 255, 1)",
  "primary-darken-1": "#6a3cdb",
  avatar: "rgba(226, 159, 255, 1)",
};

// export function makeThemes() {
//   const themes: Record<string, any> = {};

//   for (const [colorName, colorValue] of Object.entries(colorThemes)) {
//     themes[`dark${capitalize(colorName)}`] = {
//       dark: true,
//       colors: { ...defaultDark, ...colorValue },
//     };

//     themes[`light${capitalize(colorName)}`] = {
//       dark: false,
//       colors: { ...defaultLight, ...colorValue },
//     };
//   }

//   return themes;
// }

// function capitalize(str: string) {
//   return str.charAt(0).toUpperCase() + str.slice(1);
// }
