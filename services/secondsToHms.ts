function secondsToHms(audioTime: number) {
  const audioTime2 = Number(audioTime) || 0;
  const m = Math.floor((audioTime2 % 3600) / 60);
  const s = Math.floor((audioTime2 % 3600) % 60);
  return `${m}:${s < 10 ? "0" : ""}${s}`;
}

export default secondsToHms;
