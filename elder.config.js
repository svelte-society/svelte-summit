
module.exports = {
  origin: 'sveltesummit.com', // TODO: update this.
  srcDir: 'src',
  distDir: 'public',
  rootDir: process.cwd(),
  build: {},
  server: {
    prefix: '',
  },
  debug: {
    stacks: false,
    hooks: false,
    performance: false,
    build: false,
    automagic: false,
  },
  hooks: {
    disable: 'elderAddDefaultIntersectionObserver'
    // disable: ['elderWriteHtmlFileToPublic'], // this is used to disable internal hooks. Uncommenting this would disabled writing your files on build.
  },
  plugins: {
    '@elderjs/plugin-browser-reload': {
      // this reloads your browser when nodemon restarts your server.
      port: 8080,
    },
    'elderjs-plugin-google-fonts': {
      fonts: {
        'Anton': ['400'],
        'Overpass': ['400', '700'],
        'Inter': ['400']
      }
    }
  },
  shortcodes: { closePattern: '}}', openPattern: '{{' },
};