import { envGet } from 'src/shared/env';

export const PORT = envGet('PORT', { defaultValue: '3333' });
