export function normalizeSimulationThemeName(name) {
  return name === 'dark' ? 'dark' : 'light';
}

export function getSimulationThemeSettings(name) {
  const themeName = normalizeSimulationThemeName(name);
  if (themeName === 'dark') {
    return {
      themeName,
      lightIntensityScale: 1,
      ambientIntensity: 0.18,
      backgroundRgb: [0.11, 0.18, 0.28],
      sonicHemiIntensity: 0.4,
      sonicFillIntensity: 0.48,
      sonicRimIntensity: 0.36,
    };
  }

  return {
    themeName,
    lightIntensityScale: 1,
    ambientIntensity: 0.1,
    backgroundRgb: [0.15, 0.25, 0.35],
    sonicHemiIntensity: 0.12,
    sonicFillIntensity: 0.18,
    sonicRimIntensity: 0.12,
  };
}
