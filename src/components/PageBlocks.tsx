import type { PageBlock } from '../lib/usePageBlocks';

export function PageBlocks({ blocks }: { blocks: PageBlock[] }) {
  if (!blocks?.length) return null;
  return (
    <>
      {blocks.map((block, idx) => {
        let content = null;
        switch (block.name) {
          case 'core/paragraph':
            content = <p dangerouslySetInnerHTML={{ __html: block.attributes?.content || block.innerHTML || '' }} />;
            break;
          case 'core/heading':
            const Tag = `h${block.attributes?.level || 2}` as keyof JSX.IntrinsicElements;
            content = <Tag dangerouslySetInnerHTML={{ __html: block.attributes?.content || block.innerHTML || '' }} />;
            break;
          case 'core/image':
            content = <img src={block.attributes?.url} alt={block.attributes?.alt || ''} style={{ maxWidth: '100%' }} />;
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
}
