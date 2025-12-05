export function minPasswordLength(value: any) {
  return value?.length >= 8 || "A senha deve possuir pelo menos 8 caracteres!";
}
