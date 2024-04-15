import nextMDX from '@next/mdx';

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

const config = {
  reactStrictMode: true,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  // Add more custom Next.js config options here
};

// Wrap your config with withMDX and specify any additional MDX related configurations
export default withMDX({
  ...config, // Spread the existing config
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'], // Specify page extensions
});
