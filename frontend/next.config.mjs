/** @type {import('next').NextConfig} */

const nextConfig = {
  // ... rest of the configuration.
  output: "standalone",
};

// if no env vars set, set them
if (!process.env.NEXT_PUBLIC_API_URL) {
  process.env.NEXT_PUBLIC_API_URL = "http://localhost:8080";
}

console.log("NEXT_PUBLIC_API_URL: ", process.env.NEXT_PUBLIC_API_URL);

export default nextConfig;
