const path = require('path');
const withPlugins = require('next-compose-plugins');
const CopyPlugin = require('copy-webpack-plugin');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      'localhost',
      '127.0.0.1',
      'abc-strapi-dev.s3.ap-southeast-1.amazonaws.com',
      'strapi-dev-alb-2059981737.ap-southeast-1.elb.amazonaws.com',
      'abc-cms-1740798364.ap-southeast-1.elb.amazonaws.com',
      'strapiv4cms.abcsoftwarecompany.com',
      'strapiv4cms.stage.abcsoftwarecompany.com',
      'abc-cms-stage.s3.ap-southeast-1.amazonaws.com',
      'abc-cms-production.s3.ap-southeast-1.amazonaws.com',
      'todo-list-website-production.s3.ap-southeast-1.amazonaws.com'
    ]
  },
  webpack: config => {
    config.plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: path.join(__dirname, './src/vendors/abc-icons/dist'),
            to: path.join(__dirname, './public/fonts'),
            noErrorOnMissing: true
          }
        ]
      })
    );

    return config;
  },
  output: 'standalone'
};

module.exports = withPlugins([[withBundleAnalyzer]], nextConfig);
