export const buildPath = (
  endPoint: string,
  params: Record<string, string | number>
): string => {
  let path = endPoint;

  for (const key in params) {
    path = path.replace(`:${key}`, String(params[key]));
  }

  return path;
};
