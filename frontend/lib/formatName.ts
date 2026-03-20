export function formatName(rawName: string | null | undefined) {
  if (!rawName) {
    return "";
  }

  const trimmed = rawName.trim();

  // Removes numeric prefixes such as "26_20000" from a display name.
  return trimmed.replace(/^(?:\d+_?)+/u, "");
}
