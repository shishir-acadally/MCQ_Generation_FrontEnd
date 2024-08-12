import React from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css'; // Import the Katex CSS for proper styling

// Define the type for the dictionary array
type ContentItem = {
    type: 'text' | 'latex';
    content: string;
};

interface RenderContentProps {
    items: ContentItem[];
}

// console.log()
const RenderInline: React.FC<RenderContentProps> = ({ items }) => {
    console.log("In render inline =======> ",items);
    const renderItem = (item: ContentItem, index: number) => {
        if (item.type === 'latex') {
            try {
                // Use katex to render LaTeX code
                const html = katex.renderToString(item.content, { throwOnError: false });
                return <span key={index} dangerouslySetInnerHTML={{ __html: html }} />;
            } catch (error) {
                console.error('Error rendering LaTeX:', error);
                return <span key={index}>Error rendering LaTeX</span>;
            }
        } else {
            // Plain text
            return <span key={index}>{item.content}</span>;
        }
    };

    // console.log("after creating container: ", renderItem);
    return <span className=' mb-2'>{items.map(renderItem)}</span>;
};

export default RenderInline;
