// next.config.mjs
const nextConfig = {
  output: 'export',
  webpack: (config) => {
    config.module.rules.push(
      {
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              svgo: false, // Disable default SVGO configuration
              svgoConfig: {
                plugins: [
                  { name: 'preset-default', params: { overrides: { cleanupIDs: false } } }
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.(mp4|webm)$/,
        use: {
          loader: 'file-loader',
          options: {
            publicPath: '/_next',
            name: 'static/media/[name].[hash].[ext]',
          },
        },
      }
    );

    return config;
  },
};

export default nextConfig;
