export function normalizeSimulationThemeName(name) {
  return name === 'dark' ? 'dark' : 'light';
}

export function getSimulationThemeSettings(name) {
  const themeName = normalizeSimulationThemeName(name);
  if (themeName === 'dark') {
    return {
      themeName,
      lightIntensityScale: 0.85,
      ambientIntensity: 0.14,
      backgroundRgb: [0.08, 0.12, 0.18],
      sonicHemiIntensity: 0.34,
      sonicFillIntensity: 0.42,
      sonicRimIntensity: 0.3,
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
