export default function secondsToHm(dateInSeconds) {
  const currentTimeInSeconds = parseInt(String(Date.now() / 1000));
  const convertedSeconds = Number(dateInSeconds) - currentTimeInSeconds
  if (convertedSeconds < 0) return { hours: 0, minutes: 0, seconds: 0 }

  let hours = Math.floor(convertedSeconds / 3600);
  let minutes = Math.floor((convertedSeconds % 3600) / 60);
  let seconds = convertedSeconds % 3600 % 60

  return { hours, minutes, seconds }
}
