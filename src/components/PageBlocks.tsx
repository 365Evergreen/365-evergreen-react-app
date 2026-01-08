import type { PageBlock } from '../lib/usePageBlocks';

export function PageBlocks({ blocks }: { blocks: PageBlock[] }) {
  if (!blocks?.length) return null;
  return (
    <div className="page-blocks">
      {blocks.map((block, idx) => {
        switch (block.name) {
          case 'core/paragraph':
            return <p key={idx} dangerouslySetInnerHTML={{ __html: block.attributes?.content || block.innerHTML || '' }} />;
          case 'core/heading':
            const Tag = `h${block.attributes?.level || 2}` as keyof JSX.IntrinsicElements;
            return <Tag key={idx} dangerouslySetInnerHTML={{ __html: block.attributes?.content || block.innerHTML || '' }} />;
          case 'core/image':
            return <img key={idx} src={block.attributes?.url} alt={block.attributes?.alt || ''} style={{ maxWidth: '100%' }} />;
          // Add more block types as needed
          default:
            // Fallback: render raw HTML
            return <div key={idx} dangerouslySetInnerHTML={{ __html: block.innerHTML || '' }} />;
        }
      })}
    </div>
  );
}
