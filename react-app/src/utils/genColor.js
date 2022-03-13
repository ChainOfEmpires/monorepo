export default function genColor(seed) {
  if (seed) {
    let color = Math.floor(Math.abs(Math.sin(parseInt(seed, 16)) * 16777215));
    color = color.toString(16);
    // pad any colors shorter than 6 characters with leading 0s
    color = `${color}`.substring(0, 6).padStart(6, '0');

    return color;
  }
  return '';
}
