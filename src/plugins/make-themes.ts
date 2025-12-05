export const defaultColors = {
  success: "rgb(56, 176, 119)", // verde suave moderno
  info: "rgb(54, 119, 255)", // azul vivo porém agradável
  "error-darken-1": "rgb(200, 60, 60)", // vermelho mais profundo e elegante
  error: "rgb(220, 80, 80)", // erro suave porém destacado
  "line-border": "rgb(180, 190, 205)", // cinza-azulado minimalista
  "line-border-darken-1": "rgb(140, 155, 175)",
  "warning-darken-1": "rgb(255, 150, 60)", // laranja moderno sem ser agressivo
};

export const defaultDark = {
  ...defaultColors,
  background: "rgb(16, 18, 24)", // quase preto, mas não absoluto
  surface: "rgb(22, 24, 32)", // sutilmente mais claro
  "background-darken-1": "rgb(12, 14, 20)", // níveis para hover/transparências
  "background-darken-2": "rgb(8, 10, 14)",
  "background-lighten-1": "rgb(32, 35, 45)", // para cards e contrastes

  "header-font": "rgb(235, 238, 255)", // branco levemente azulado
  font: "rgb(210, 215, 230)", // texto principal mais suave
};

export const defaultLight = {
  ...defaultColors,
  background: "rgb(245, 247, 255)", // quase branco com leve azul
  surface: "rgb(249, 250, 255)",
  "background-darken-1": "rgb(230, 233, 250)",
  "background-darken-2": "rgb(218, 221, 245)",
  "background-lighten-1": "rgb(255, 255, 255)", // branco puro
  "header-font": "rgb(255, 255, 255)",
  font: "rgb(28, 28, 33)", // preto suave (não puro)
};

export const modern = {
  primary: "rgba(124, 92, 255, 1)", // roxo moderno (Linear style)
  "primary-lighten-1": "rgba(167, 140, 255, 1)",
  "primary-darken-1": "rgba(84, 58, 207, 1)",
  avatar: "rgba(72, 149, 239, 1)", // azul vibrante e limpo
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
