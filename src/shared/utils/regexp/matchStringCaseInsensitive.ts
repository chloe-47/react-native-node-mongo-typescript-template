import { escapeRegExp } from 'src/shared/utils/regexp/escapeRegExp';

export function matchStringCaseInsensitive(val: string): RegExp {
  const escaped = escapeRegExp(val);
  return new RegExp(escaped, 'i');
}
