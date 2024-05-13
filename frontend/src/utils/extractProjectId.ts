// src/utils/projectUtils.ts
export const extractProjectIdFromPath = (path: string): string | null => {
    const match = /project\/([^/]*)/.exec(path);
    return match ? match[1] : null;
  };
  