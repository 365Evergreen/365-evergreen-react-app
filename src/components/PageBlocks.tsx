import React from 'react';
import { VanillaAccordion } from './VanillaAccordion';
import '../PageBlocks.css';

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
        let content: React.ReactNode = null;
        switch (block.name) {
          case 'core/paragraph':
            content = <p className="fluent-body1" dangerouslySetInnerHTML={{ __html: block.attributes?.content || block.innerHTML || '' }} />;
            break;
          case 'core/heading': {
            const level = block.attributes?.level || 2;
            const tag = `h${level}`;
            if (/^h[1-6]$/.test(tag)) {
              content = React.createElement(tag, {
                className: `fluent-title${level}`,
                dangerouslySetInnerHTML: { __html: block.attributes?.content || block.innerHTML || '' }
              });
            } else {
              content = <h2 className="fluent-title2" dangerouslySetInnerHTML={{ __html: block.attributes?.content || block.innerHTML || '' }} />;
            }
            break;
          }
          case 'core/image':
            content = <img src={block.attributes?.url} alt={block.attributes?.alt || ''} style={{ maxWidth: '100%', borderRadius: 8 }} />;
            break;
          case 'core/button':
            content = (
              <a
                href={toLocalUrl(block.attributes?.url)}
                style={{ display: 'inline-block', padding: '0.5em 1.5em', background: block.attributes?.backgroundColor || 'black', color: block.attributes?.textColor || 'white', textDecoration: 'none', fontWeight: 700, borderRadius: 6 }}
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
          case 'core/columns':
            // Render columns as flex row, with background and padding
            content = (
              <div
                className="wp-columns"
                style={{
                  background: block.attributes?.backgroundColor || undefined,
                  borderRadius: block.attributes?.borderRadius || undefined,
                  boxShadow: block.attributes?.boxShadow || undefined,
                  padding: block.attributes?.style?.spacing?.padding || '2.5rem 2rem',
                  minHeight: 200,
                  margin: '1.5rem 0',
                  ...block.attributes?.style?.custom,
                }}
              >
                {block.innerBlocks?.map((col, i) => (
                  <div className="wp-column" key={i} style={{ flex: 1, minWidth: 0 }}>
                    <PageBlocks blocks={[col]} />
                  </div>
                ))}
              </div>
            );
            break;
          case 'core/column':
            // Render column content only
            content = (
              <div className="wp-column">
                {block.innerBlocks && <PageBlocks blocks={block.innerBlocks} />}
              </div>
            );
            break;
          case 'core/group':
          case 'core/template-part':
          case 'core/cover':
          case 'core/post-content':
          case 'core/buttons':
            content = null; // just render children below
            break;
          // Automatically map WP accordion block to VanillaAccordion
          case 'core/accordion': {
            // Map WP block to VanillaAccordionItem structure
            const panels = (block.innerBlocks || []).map((panelBlock: any) => ({
              title: panelBlock.attributes?.title || 'Accordion Panel',
              content: panelBlock.attributes?.content || panelBlock.innerHTML || '',
            }));
            const item = {
              title: block.attributes?.title || 'Accordion',
              description: block.attributes?.description || '',
              panels,
            };
            content = <VanillaAccordion items={[item]} />;
            break;
          }
          // Add more block types as needed
          default:
            // Fallback: show block name and any raw HTML
            content = (
              <div style={{ border: '1px dashed #ccc', margin: '8px 0', padding: 4 }}>
                <small style={{ color: '#888' }}>{block.name}</small>
                {block.innerHTML && (
                  <div className="fluent-body1" dangerouslySetInnerHTML={{ __html: block.innerHTML }} />
                )}
              </div>
            );
        }
        // Determine if this is a container block that should use background/text color
        const isContainer = [
          'core/group',
          'core/cover',
          'core/columns',
          'core/column',
          'core/template-part',
        ].some(type => block.name.startsWith(type));

        // Compose style for container
        const hasBgOrOverlay = !!(block.attributes?.backgroundColor || block.attributes?.overlayColor);
        const containerStyle: React.CSSProperties = isContainer
          ? {
              margin: '12px 0',
              background: block.attributes?.backgroundColor || undefined,
              color: block.attributes?.textColor || undefined,
              borderRadius: block.attributes?.borderRadius || undefined,
              padding: block.attributes?.style?.spacing?.padding || (hasBgOrOverlay ? '2.5rem 2rem' : undefined),
              minHeight: hasBgOrOverlay ? 200 : undefined,
              display: hasBgOrOverlay ? 'flex' : undefined,
              flexDirection: hasBgOrOverlay ? 'column' : undefined,
              alignItems: hasBgOrOverlay ? 'center' : undefined,
              justifyContent: hasBgOrOverlay ? 'center' : undefined,
              position: undefined, // will be set below if overlay
            }
          : {};

        // Overlay support
        let overlay: React.ReactNode = null;
        if (isContainer && block.attributes?.overlayColor) {
          // Accept overlayOpacity as 0-1 or 0-100
          let opacity = 0.5;
          if (typeof block.attributes.overlayOpacity === 'number') {
            opacity = block.attributes.overlayOpacity > 1 ? block.attributes.overlayOpacity / 100 : block.attributes.overlayOpacity;
          }
          overlay = (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 1,
                background: block.attributes.overlayColor,
                opacity,
                borderRadius: block.attributes?.borderRadius || undefined,
              }}
              aria-hidden="true"
            />
          );
        }

        return (
          <div
            key={idx}
            className="wp-content"
            style={{
              ...containerStyle,
              position: overlay ? 'relative' : containerStyle.position,
            }}
          >
            {overlay}
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
