require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: `Gissy Dashboard`,
    description: `UI Dashboard for Gissy Core`,
    author: `@DennisVash`,
  },
  plugins: [
    `gatsby-plugin-postcss`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-resolve-src`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gissy Dashboard`,
        short_name: `Gissy`,
        start_url: `/`,
        background_color: `#f7f0eb`,
        theme_color: `#F25192`,
        display: `standalone`,
        icon: `static/logo.png`,
      },
    },
    `gatsby-plugin-graphql-loader`,
    {
      resolve: `gatsby-source-graphql`,
      options: {
        typeName: `Gissy`,
        fieldName: `gissy`,
        url: process.env.SERVER_URL,
      },
    },
    {
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias: {
          '@src': 'src',
          '@components': 'src/components',
          '@icons': 'src/components/atoms/icons',
          '@hooks': 'src/hooks',
          '@config': 'src/config',
          '@styles': 'src/styles',
          '@utils': 'src/utils',
          '@constants': 'src/constants',
          '@queries': 'src/queries',
        },
        extensions: ['js'],
      },
    },
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-now`,
    `gatsby-plugin-offline`,
  ],
};
