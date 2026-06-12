// basePath kommt aus NEXT_PUBLIC_BASE_PATH (Build-Zeit, gesetzt im
// GitHub-Actions-Workflow). Default "" — damit funktioniert derselbe Build
// auf einer eigenen Domain im Root (Cutover, Launch-Plan M1/B6).
// next.config.ts liest dieselbe Variable.
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function withBasePath(path: string): string {
  return `${basePath}${path}`;
}
