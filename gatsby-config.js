module.exports = {
  siteMetadata: {
    title: `Gissy Dashboard`,
    description: `UI Dashboard for Gissy Core`,
    author: `@DennisVash`,
  },
  plugins: [
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-postcss`,
    `gatsby-plugin-react-helmet`,
    'gatsby-plugin-resolve-src',
    {
      resolve: `gatsby-source-graphql`,
      options: {
        typeName: `Gissy`,
        fieldName: `gissy`,
        url: 'https://core.gissy.now.sh/graphql',
      },
    },
    {
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias: {
          '@src': 'src',
          '@components': 'src/components',
          '@hooks': 'src/hooks',
          '@config': 'src/config',
          '@styles': 'src/styles',
          '@utils': 'src/utils',
          '@constants': 'src/constants',
        },
        extensions: ['js'],
      },
    },
  ],
};
