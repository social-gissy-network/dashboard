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
    {
      resolve: `gatsby-source-graphql`,
      options: {
        typeName: `Gissy`,
        fieldName: `gissy`,
        url: `https://gissy-graphql.herokuapp.com/`,
      },
    },
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        useMozJpeg: false,
        stripMetadata: true,
        defaultQuality: 75,
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
          '@store': 'src/store',
        },
        extensions: ['js'],
      },
    },
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        printRejected: true, // Print removed selectors and processed file names
        // develop: true, // Enable while using `gatsby develop`
        tailwind: true, // Enable tailwindcss support
        // whitelist: ['whitelist'], // Don't remove this selector
        // ignore: ['/ignored.css', 'prismjs/', 'docsearch.js/'], // Ignore files/folders
        purgeOnly: ['src/styles/globals.css'], // Purge only these files/folders
      },
    },
  ],
};
