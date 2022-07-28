import dotenv from 'dotenv';

dotenv.config();

const env: NodeJS.ProcessEnv = process.env;

type Options = { throwIfNotFound: true } | { defaultValue: string };

export function envGet(
  environmentVariableName: string,
  options: Options,
): string {
  const value = env[environmentVariableName];
  if (value) {
    return value;
  }
  if ('throwIfNotFound' in options) {
    throw new Error(
      `${environmentVariableName} environment variable must be provided`,
    );
  }
  return options.defaultValue;
}
