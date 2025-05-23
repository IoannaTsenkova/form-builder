export function getFieldError(errors: any, name: string): string | undefined {
  return name.split('.').reduce((obj, key) => obj?.[key], errors)?.message;
}
