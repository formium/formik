// import * as React from 'react';
// import HighlightJS from 'react-highlight';

// export default function Highlight({
//   children,
//   className,
//   style,
// }: {
//   children: React.ReactNode;
//   className: string;
//   style?: React.CSSProperties;
// }) {
//   return (
//     <div className="rounded-lg p-6 bg-gray-800 overflow-x-auto text-gray-400 text-sm leading-tight">
//       <HighlightJS
//         className={`language-${
//           className && className.replace(/language-/, '')
//         }`}
//         {...style}
//       >
//         {children}
//       </HighlightJS>
//     </div>
//   );
// }

import * as React from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';

// Original: https://raw.githubusercontent.com/PrismJS/prism-themes/master/themes/prism-ghcolors.css

/*:: import type { PrismTheme } from '../src/types' */

const theme /*: PrismTheme */ = {
  plain: {
    color: '#293742',
    borderRadius: 12,
    fontFamily: `SFMono-Regular,Consolas,Liberation Mono,Menlo,Courier,monospace`,
    fontSize: 14,
    lineHeight: '1.5',
  },
  styles: [
    {
      types: ['comment', 'prolog', 'doctype', 'cdata'],
      style: {
        color: '#A7B6C2',
        fontStyle: 'italic',
      },
    },
    {
      types: ['namespace'],
      style: {
        opacity: 0.7,
      },
    },
    {
      types: ['string', 'attr-value'],
      style: {
        color: '#DB2C6F',
      },
    },
    {
      types: ['punctuation', 'operator'],
      style: {
        color: '#394B59',
      },
    },
    {
      types: [
        'entity',
        'url',
        'symbol',
        'number',
        'boolean',
        'variable',
        'constant',
        'property',
        'regex',
        'inserted',
      ],
      style: {
        color: '#36acaa',
      },
    },
    {
      types: ['atrule', 'keyword', 'attr-name', 'selector'],
      style: {
        color: '#00B3A4',
      },
    },
    {
      types: ['function', 'deleted', 'tag'],
      style: {
        color: '#DB2C6F',
      },
    },
    {
      types: ['function-variable'],
      style: {
        color: '#634DBF',
      },
    },
    {
      types: ['tag', 'selector', 'keyword'],
      style: {
        color: '#1a56db',
      },
    },
  ],
};

const Code = ({
  children,
  codeString,
  className = 'language-js',
  ...props
}: any) => {
  const language = className.replace(/language-/, '');
  const [key, setKey] = React.useState(`${Math.random() * 7}`);
  if (props['live']) {
    return (
      <div>
        <LiveProvider
          key={key}
          code={children.trim()}
          theme={theme as any}
          noInline
        >
          <div className="flex items-center justify-between">
            <div>Live JSX Editor</div>
            <div>
              <button
                onClick={() => setKey((k: any) => `${k * Math.random()}`)}
              >
                Reset
              </button>
            </div>
          </div>
          <div style={{ paddingRight: 10, paddingLeft: 10 }}>
            <LiveEditor />
          </div>
          <div>
            <div>
              <div>Live Preview</div>
            </div>
            <div>
              <LiveError
                style={{
                  fontSize: 13,
                  background: '#FED7D7',
                  color: '#9B2C2C',
                  lineHeight: '1.5',
                  margin: -4,
                  padding: 4,
                }}
              />
              <LivePreview />
            </div>
          </div>
        </LiveProvider>
      </div>
    );
  } else {
    return (
      <Highlight
        {...defaultProps}
        code={children.trim()}
        language={language}
        theme={theme as any}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={className + ' bg-gray-50 pb-4 pt-4 pr-4 overflow-scroll'}
            style={{
              ...style,
              border: '1px solid #eee',
              fontSize: 13,
              lineHeight: '1.5',
            }}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                <span
                  aria-hidden="true"
                  className="select-none text-gray-300 text-right w-5 inline-block mx-2"
                >
                  {i}
                </span>{' '}
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    );
  }
};

export default Code;
