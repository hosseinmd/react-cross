import createIconSet from "./create-icon-set";

export function createIconSetFromIcoMoon(config, fontFamilyArg) {
  const glyphMap = {};
  config.icons.forEach(icon => {
    glyphMap[icon.properties.name] = icon.properties.code;
  });

  const fontFamily =
    fontFamilyArg || config.preferences.fontPref.metadata.fontFamily;

  return createIconSet(glyphMap, fontFamily);
}
