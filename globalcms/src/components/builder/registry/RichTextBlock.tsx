import React from 'react';

interface RichTextBlockProps {
  content: string;
}

export const RichTextBlock: React.FC<RichTextBlockProps> = ({ content }) => {
  return (
    <div className="surface-card p-5 md:p-8 border-round-xl shadow-2 mb-6 border-left-3 border-orange-500">
      <div className="text-900 text-xl line-height-4 font-normal" style={{ whiteSpace: 'pre-wrap' }}>
        {content}
      </div>
    </div>
  );
};
