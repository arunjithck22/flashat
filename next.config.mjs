import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    domains: [
      "messej-backend.s3.amazonaws.com",
      "messej-backend-thumbnails.s3.amazonaws.com",
      "messej-media.s3.ap-southeast-1.amazonaws.com",
      "messej-media-thumbnails.s3.ap-southeast-1.amazonaws.com",
    ],
  },
};

export default withNextIntl(nextConfig);
