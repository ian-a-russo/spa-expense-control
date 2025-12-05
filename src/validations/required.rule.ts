export function required(value: any) {
  if (value === 0) return true;
  if (value === null || value === undefined) return "Campo requerido!";
  return !!value.toString().replaceAll("  ", " ").trim() || "Campo requerido!";
}
