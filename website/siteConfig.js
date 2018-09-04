/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See https://docusaurus.io/docs/site-config for all the possible
// site configuration options.

// List of projects/orgs using your project for the users page.
const users = [
  {
    caption: 'Airbnb',
    // You will need to prepend the image path with your baseUrl
    // if it is not '/', like: '/test-site/formik/img/formik.svg'.
    image: '/formik/img/logos/airbnb.svg',
    infoLink: 'https://airbnb.com',
    pinned: true,
  },
  {
    caption: 'Walmart',
    // You will need to prepend the image path with your baseUrl
    // if it is not '/', like: '/test-site/formik/img/formik.svg'.
    image: '/formik/img/logos/walmart.svg',
    infoLink: 'https://walmart.com',
    pinned: true,
  },

  {
    caption: 'OpenTable',
    // You will need to prepend the image path with your baseUrl
    // if it is not '/', like: '/test-site/formik/img/logos/formik.svg'.
    image: '/formik/img/logos/opentable.svg',
    infoLink: 'https://opentable.com',
    pinned: true,
  },
  {
    caption: 'Lyft',
    // You will need to prepend the image path with your baseUrl
    // if it is not '/', like: '/test-site/formik/img/logos/formik.svg'.
    image: '/formik/img/logos/lyft.svg',
    infoLink: 'https://lyft.com',
    pinned: true,
  },
  {
    caption: 'Nokia',
    // You will need to prepend the image path with your baseUrl
    // if it is not '/', like: '/test-site/formik/img/logos/formik.svg'.
    image: '/formik/img/logos/nokia.svg',
    infoLink: 'https://nokia.com',
  },
  {
    caption: 'Docker',
    // You will need to prepend the image path with your baseUrl
    // if it is not '/', like: '/test-site/formik/img/logos/formik.svg'.
    image: '/formik/img/logos/docker.svg',
    infoLink: 'https://docker.com',
    pinned: true,
  },
];

const siteConfig = {
  title: 'Formik', // Title for your website.
  tagline: `Build forms in React, without tears.`,
  url: 'https://jaredpalmer.com', // Your website URL
  baseUrl: '/formik/', // Base URL for your project */
  // For github.io type URLs, you would set the url and baseUrl like:
  //   url: 'https://facebook.github.io',
  //   baseUrl: '/test-site/',

  // Used for publishing and more
  projectName: 'formik',
  organizationName: 'jaredpalmer',
  // For top-level user or org sites, the organization is still the same.
  // e.g., for the https://JoelMarcey.github.io site, it would be set like...
  //   organizationName: 'JoelMarcey'

  // For no header links in the top nav bar -> headerLinks: [],
  headerLinks: [
    { doc: 'overview', label: 'Docs' },
    { doc: 'doc4', label: 'API' },
    { page: 'help', label: 'Help' },
    { blog: true, label: 'Blog' },
  ],
  search: true,
  // If you have users set above, you add it here:
  users,

  /* path to images for header/footer */
  headerIcon: 'img/formik.svg',
  footerIcon: 'img/formik.svg',
  favicon: 'img/favicon.png',

  /* Colors for website */
  colors: {
    primaryColor: '#111',
    secondaryColor: '#111',
    accentColor: '#785BA3',
    actionColor: '#008cf2',
  },

  /* Custom fonts for website */
  /*
  fonts: {
    myFont: [
      "Times New Roman",
      "Serif"
    ],
    myOtherFont: [
      "-apple-system",
      "system-ui"
    ]
  },
  */

  // This copyright info is used in /core/Footer.js and blog RSS/Atom feeds.
  copyright: `Copyright © ${new Date().getFullYear()} Jared Palmer or Your Company Name`,

  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks.
    theme: 'atom-one-dark',
  },

  // Add custom scripts here that would be placed in <script> tags.
  scripts: [
    'https://buttons.github.io/buttons.js',
    'https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js',
    '/formik/js/code-blocks-buttons.js',
  ],
  stylesheets: ['/formik/css/code-blocks-buttons.css'],

  // On page navigation for the current documentation page.
  onPageNav: 'separate',
  // No .html extensions for paths.
  cleanUrl: true,
  // Open Graph and Twitter card images.
  ogImage: 'img/docusaurus.png',
  twitterImage: 'img/docusaurus.png',
  algolia: {
    apiKey: 'my-api-key',
    indexName: 'my-index-name',
    algoliaOptions: {}, // Optional, if provided by Algolia
  },
  // You may provide arbitrary config keys to be used as needed by your
  // template. For example, if you need your repo's URL...
  repoUrl: 'https://github.com/jaredpalmer/formik',
  scrollToTop: true,
  scrollToTopOptions: {
    zIndex: 100,
  },
  enableUpdateTime: true,
};

module.exports = siteConfig;
