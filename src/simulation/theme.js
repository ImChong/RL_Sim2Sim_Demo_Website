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
      backgroundRgb: [0.08, 0.12, 0.18],
    };
  }

  return {
    themeName,
    lightIntensityScale: 1,
    ambientIntensity: 0.1,
    backgroundRgb: [0.15, 0.25, 0.35],
  };
}
