
export default function sleep(s: number) {
  var e = new Date().getTime() + (s * 1000);
  while (new Date().getTime() <= e) {}
}
