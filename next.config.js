/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env:{
    bigdatacloudapi:process.env.bigdatacloudapi,
    mongodburl:process.env.mongodburl
  }
}

module.exports = nextConfig
