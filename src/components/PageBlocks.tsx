import React from 'react';

// Utility to convert absolute URLs to relative
function toLocalUrl(url?: string) {
  if (!url) return '';
  return url.replace(/^https?:\/\/(www\.)?365evergreen\.com/, '');
}

type Block = {
  name: string;
  attributes?: Record<string, any>;
  innerHTML?: string;
  innerBlocks?: Block[];
};

interface PageBlocksProps {
  blocks?: Block[];
}

const PageBlocks: React.FC<PageBlocksProps> = ({ blocks }) => {
  if (!blocks?.length) return null;
  return (
    <>
      {blocks.map((block, idx) => {
        let content = null;
        switch (block.name) {
          case 'core/paragraph':
            content = <p dangerouslySetInnerHTML={{ __html: block.attributes?.content || block.innerHTML || '' }} />;
            break;
          case 'core/heading': {
            const level = block.attributes?.level || 2;
            const tag = `h${level}`;
            if (/^h[1-6]$/.test(tag)) {
              content = React.createElement(tag, {
                dangerouslySetInnerHTML: { __html: block.attributes?.content || block.innerHTML || '' }
              });
            } else {
              content = <h2 dangerouslySetInnerHTML={{ __html: block.attributes?.content || block.innerHTML || '' }} />;
            }
            break;
          }
          case 'core/image':
            content = <img src={block.attributes?.url} alt={block.attributes?.alt || ''} style={{ maxWidth: '100%' }} />;
            break;
          case 'core/button':
            content = (
              <a
                href={toLocalUrl(block.attributes?.url)}
                style={{ display: 'inline-block', padding: '0.5em 1.5em', background: block.attributes?.backgroundColor || 'black', color: block.attributes?.textColor || 'white', textDecoration: 'none', fontWeight: 700 }}
              >
                {block.attributes?.content}
              </a>
            );
            break;
          case 'core/navigation-link':
            content = (
              <a href={toLocalUrl(block.attributes?.url)}>{block.attributes?.label}</a>
            );
            break;
          // Add more block types as needed
          default:
            content = <div dangerouslySetInnerHTML={{ __html: block.innerHTML || '' }} />;
        }
        return (
          <div key={idx}>
            {content}
            {block.innerBlocks && block.innerBlocks.length > 0 && (
              <PageBlocks blocks={block.innerBlocks} />
            )}
          </div>
        );
      })}
    </>
  );
};

export default PageBlocks;
