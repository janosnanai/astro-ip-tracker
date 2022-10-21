export default function formatOffsetToUTC(offset: number) {
  const hours = Math.trunc(offset);
  const minutes = Math.abs(Math.trunc((offset - hours) * 60));

  let hString: string;
  let mString: string;

  if (hours < 10 && hours > -10) {
    hString = "0" + Math.abs(hours).toString();
  } else {
    hString = hours.toString();
  }
  if (hours > 0) {
    hString = "+" + hString;
  } else if (hours < 0) {
    hString = "-" + hString;
  } else {
    hString = "±" + hString;
  }

  if (minutes < 10 && minutes > -10) {
    mString = "0" + minutes.toString();
  } else {
    mString = minutes.toString();
  }

  return `UTC${hString}:${mString}`;
}
