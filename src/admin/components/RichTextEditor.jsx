import React, { useState } from 'react';
import {
  Bold,
  Italic,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  Eye,
  Edit3,
  Eraser,
} from 'lucide-react';

export const RichTextEditor = ({
  value = '',
  onChange,
  placeholder = 'Write long description, story, or policy details...',
  minHeight = '180px',
}) => {
  const [activeTab, setActiveTab] = useState('edit'); // 'edit' or 'preview'

  const insertTag = (openTag, closeTag = '') => {
    const textarea = document.getElementById('rich-text-textarea');
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selected = text.substring(start, end) || 'Sample text';
    const replacement = `${openTag}${selected}${closeTag}`;

    const updated = text.substring(0, start) + replacement + text.substring(end);
    onChange(updated);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + openTag.length, start + replacement.length - closeTag.length);
    }, 10);
  };

  const handleLink = () => {
    const url = prompt('Enter destination URL (e.g. https://... or /collections):');
    if (url) {
      insertTag(`<a href="${url}" class="text-champagne-dark underline">`, '</a>');
    }
  };

  const handleClear = () => {
    // Strip HTML tags
    const plain = value.replace(/<[^>]*>/g, '');
    onChange(plain);
  };

  return (
    <div className="border border-sand-border rounded-[3px] bg-white overflow-hidden shadow-subtle flex flex-col">
      {/* Editor Header Toolbar */}
      <div className="bg-[#FAF7F0] border-b border-sand-border p-2 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1">
          <button
            type="button"
            onClick={() => insertTag('<strong>', '</strong>')}
            title="Bold"
            className="p-1.5 hover:bg-sand/60 text-espresso/80 hover:text-espresso rounded-[2px] transition-colors"
          >
            <Bold className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => insertTag('<em>', '</em>')}
            title="Italic"
            className="p-1.5 hover:bg-sand/60 text-espresso/80 hover:text-espresso rounded-[2px] transition-colors"
          >
            <Italic className="w-3.5 h-3.5" />
          </button>
          <div className="w-[1px] h-4 bg-sand-border mx-1" />
          <button
            type="button"
            onClick={() => insertTag('<h2>', '</h2>')}
            title="Heading 2"
            className="p-1.5 hover:bg-sand/60 text-espresso/80 hover:text-espresso rounded-[2px] transition-colors"
          >
            <Heading2 className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => insertTag('<h3>', '</h3>')}
            title="Heading 3"
            className="p-1.5 hover:bg-sand/60 text-espresso/80 hover:text-espresso rounded-[2px] transition-colors"
          >
            <Heading3 className="w-3.5 h-3.5" />
          </button>
          <div className="w-[1px] h-4 bg-sand-border mx-1" />
          <button
            type="button"
            onClick={() => insertTag('<ul>\n  <li>', '</li>\n</ul>')}
            title="Bullet list"
            className="p-1.5 hover:bg-sand/60 text-espresso/80 hover:text-espresso rounded-[2px] transition-colors"
          >
            <List className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => insertTag('<ol>\n  <li>', '</li>\n</ol>')}
            title="Numbered list"
            className="p-1.5 hover:bg-sand/60 text-espresso/80 hover:text-espresso rounded-[2px] transition-colors"
          >
            <ListOrdered className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => insertTag('<blockquote>', '</blockquote>')}
            title="Quote"
            className="p-1.5 hover:bg-sand/60 text-espresso/80 hover:text-espresso rounded-[2px] transition-colors"
          >
            <Quote className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={handleLink}
            title="Insert Link"
            className="p-1.5 hover:bg-sand/60 text-espresso/80 hover:text-espresso rounded-[2px] transition-colors"
          >
            <LinkIcon className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={handleClear}
            title="Clear formatting"
            className="p-1.5 hover:bg-sand/60 text-espresso/60 hover:text-espresso rounded-[2px] transition-colors ml-1"
          >
            <Eraser className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center gap-1 bg-white border border-sand-border rounded-[2px] p-0.5 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('edit')}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-[2px] transition-colors ${
              activeTab === 'edit'
                ? 'bg-espresso text-ivory font-semibold'
                : 'text-espresso/60 hover:text-espresso'
            }`}
          >
            <Edit3 className="w-3 h-3" />
            <span>Editor</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-[2px] transition-colors ${
              activeTab === 'preview'
                ? 'bg-espresso text-ivory font-semibold'
                : 'text-espresso/60 hover:text-espresso'
            }`}
          >
            <Eye className="w-3 h-3" />
            <span>Preview</span>
          </button>
        </div>
      </div>

      {/* Body Area */}
      {activeTab === 'edit' ? (
        <textarea
          id="rich-text-textarea"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={{ minHeight }}
          className="w-full p-4 text-xs sm:text-sm text-espresso font-sans bg-white focus:outline-none focus:ring-1 focus:ring-champagne/50 resize-y leading-relaxed"
        />
      ) : (
        <div
          style={{ minHeight }}
          className="p-4 bg-ivory/30 text-xs sm:text-sm text-espresso font-sans leading-relaxed overflow-y-auto prose prose-stone max-w-none"
          dangerouslySetInnerHTML={{
            __html: value || '<p className="text-espresso/40 italic">Nothing to preview yet.</p>',
          }}
        />
      )}
    </div>
  );
};
