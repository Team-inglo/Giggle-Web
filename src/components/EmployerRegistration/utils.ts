export const handleInput = (
  input: string,
  setTarget: (input: number) => void
) => {
  const numberedInput = Number(input);
  if (Number.isNaN(numberedInput)) return;
  setTarget(numberedInput);
};
