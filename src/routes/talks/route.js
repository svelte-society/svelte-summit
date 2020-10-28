const content = require("../../../content.json");
module.exports = {
  // WARNING: Here be dragons and magic of all sorts.
  data: ({data, request}) => {
    let x = content.speaker.find(s => s.slug === request.slug)
    // console.log('data returned2', request)
    return x
  },
  all: ({data}) => {
    // require('fs').writeFileSync('data.json', JSON.stringify(content.speaker, null, 2))
    return content.speaker.map(speaker => ({ slug: speaker.slug }))
  },
  permalink: ({ request }) => `/talks/${request.slug}/`,
};
