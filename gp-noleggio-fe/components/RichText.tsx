import React from 'react';

type LexicalNode = {
    type: string;
    children?: LexicalNode[];
    text?: string;
    format?: number;
    tag?: string;
    listType?: string;
    url?: string;
    [key: string]: any;
};

interface RichTextProps {
    content: {
        root: {
            children: LexicalNode[];
        };
    } | string;
    className?: string;
}

const IS_BOLD = 1;
const IS_ITALIC = 2;
const IS_STRIKETHROUGH = 4;
const IS_UNDERLINE = 8;
const IS_CODE = 16;
const IS_SUBSCRIPT = 32;
const IS_SUPERSCRIPT = 64;

export default function RichText({ content, className }: RichTextProps) {
    if (!content) return null;

    // Se il contenuto è una stringa semplice (dal textarea di emergenza)
    if (typeof content === 'string') {
        return (
            <div className={`rich-text max-w-3xl mx-auto px-4 text-center ${className || ''}`}>
                {content.split('\n').map((line, i) => (
                    <p key={i} className="mb-6 leading-relaxed text-lg text-gray-700 break-words whitespace-pre-wrap">
                        {line}
                    </p>
                ))}
            </div>
        );
    }
    
    if (!content.root?.children) return null;

    const renderNodes = (nodes: LexicalNode[]) => {
        return nodes.map((node, i) => {
            if (node.type === 'text') {
                let text: React.ReactNode = node.text;
                if (node.format && (node.format & IS_BOLD)) text = <strong key={i}>{text}</strong>;
                if (node.format && (node.format & IS_ITALIC)) text = <em key={i}>{text}</em>;
                if (node.format && (node.format & IS_UNDERLINE)) text = <span key={i} style={{ textDecoration: 'underline' }}>{text}</span>;
                return text;
            }

            const children = node.children ? renderNodes(node.children) : null;

            switch (node.type) {
                case 'paragraph':
                    return <p key={i} className="mb-6 leading-relaxed text-lg text-gray-700 text-center break-words">{children}</p>;
                case 'heading':
                    const Tag = node.tag as keyof React.JSX.IntrinsicElements;
                    const headingClasses = {
                        h1: "text-4xl font-bold mt-12 mb-6 text-black",
                        h2: "text-3xl font-bold mt-10 mb-5 text-black border-b pb-2",
                        h3: "text-2xl font-bold mt-8 mb-4 text-black",
                        h4: "text-xl font-bold mt-6 mb-3 text-black",
                        h5: "text-lg font-bold mt-4 mb-2 text-black",
                        h6: "text-base font-bold mt-4 mb-2 text-black",
                    }[node.tag || 'h2'] || "text-2xl font-bold mt-8 mb-4";
                    
                    return <Tag key={i} className={headingClasses}>{children}</Tag>;
                case 'list':
                    if (node.listType === 'number') return <ol key={i} className="list-decimal pl-6 mb-6 space-y-2 text-gray-700">{children}</ol>;
                    return <ul key={i} className="list-disc pl-6 mb-6 space-y-2 text-gray-700">{children}</ul>;
                case 'listitem':
                    return <li key={i} className="pl-2">{children}</li>;
                case 'link':
                    return (
                        <a key={i} href={node.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                            {children}
                        </a>
                    );
                default:
                    return <div key={i}>{children}</div>;
            }
        });
    };

    return (
        <div className={`rich-text-content ${className || ''}`}>
            {renderNodes(content.root.children)}
        </div>
    );
}
