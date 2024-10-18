/** @type {import('next').NextConfig} */
const nextConfig = {

  images: {
    remotePatterns: [
      { hostname: 'i.ibb.co' },
      { hostname: 'd9aloqs890lqz.cloudfront.net' },
      { hostname: 'media.giphy.com' },
      { hostname: 'example.com' },
    ],
  },
};

export default nextConfig;
