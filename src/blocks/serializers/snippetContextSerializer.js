import pathSettings from 'settings/paths';
import JSX_SNIPPET_PRESETS from 'settings/jsxSnippetPresets';

export const snippetContextSerializer = {
  name: 'SnippetContextSerializer',
  methods: {
    code: snippet => {
      if (snippet.isCSS) return snippet.code;
      if (snippet.isReact) {
        /* eslint-disable camelcase */
        return {
          js: `${snippet.code.src}\n\n${snippet.code.example}`,
          css: snippet.code.style ? snippet.code.style : '',
          html: JSX_SNIPPET_PRESETS.envHtml,
          js_pre_processor: JSX_SNIPPET_PRESETS.jsPreProcessor,
          js_external: JSX_SNIPPET_PRESETS.jsImports.join(';'),
        };
        /* eslint-enable camelcase */
      }
      return undefined;
    },
    authors: snippet =>
      snippet.isBlog
        ? snippet.authors.flatMap(({ name, profile }) => ({
            name,
            profile,
          }))
        : undefined,
    type: snippet => (snippet.isBlog ? snippet.type : undefined),
    coverUrl: snippet =>
      snippet.cover
        ? `/${pathSettings.staticAssetPath}/${snippet.cover}`
        : undefined,
    dateFormatted: snippet =>
      snippet.lastUpdated.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
    fullDescription: snippet => snippet.html.fullDescription,
  },
  attributes: [
    'title',
    'fullDescription',
    'codeBlocks',
    'url',
    'slug',
    ['dateFormatted', 'date'],
    'expertise',
    'icon',
    ['formattedTags', 'tags'],
    'actionType',
    'code',
    'authors',
    ['coverUrl', 'cover'],
  ],
};