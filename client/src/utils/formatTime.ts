export const fromMs = (ms: number) => {
  const mm = Math.floor((ms / 1000 / 60) % 60)
    .toString()
    .padStart(2, "0");
  const ss = Math.floor((ms / 1000) % 60)
    .toString()
    .padStart(2, "0");
  return `${mm}:${ss}`;
};

const mos = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
export const albumDate = (date: string) => {
  const parts = date.split("-");
  const yr = parts[0];
  const mo = mos[Number(parts[1]) - 1];
  return `${mo} ${yr}`;
};
