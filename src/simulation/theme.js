export function normalizeSimulationThemeName(name) {
  return name === 'dark' ? 'dark' : 'light';
}

export function getSimulationThemeSettings(name) {
  const themeName = normalizeSimulationThemeName(name);
  if (themeName === 'dark') {
    return {
      themeName,
      lightIntensityScale: 0.72,
      ambientIntensity: 0.07,
      backgroundRgb: [0.07, 0.1, 0.07],
      /** 与 GEAR-SONIC 类似的指数雾，略增景深；0 表示关闭 */
      fogExp2Density: 0.034,
      cinematicHemiIntensity: 0.55,
      cinematicFillIntensity: 0.34,
    };
  }

  return {
    themeName,
    lightIntensityScale: 1,
    ambientIntensity: 0.1,
    backgroundRgb: [0.15, 0.25, 0.35],
    fogExp2Density: 0,
    cinematicHemiIntensity: 0.2,
    cinematicFillIntensity: 0.12,
  };
}
