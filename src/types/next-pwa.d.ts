declare module 'next-pwa' {
  import type { NextConfig } from 'next';

  interface NextPWAOptions {
    dest: string;
    register?: boolean;
    skipWaiting?: boolean;
    disable?: boolean;
    buildExcludes?: string[];
    [key: string]: unknown;
  }

  const withPWA: (options: NextPWAOptions) => (nextConfig: NextConfig) => NextConfig;

  export = withPWA;
}
