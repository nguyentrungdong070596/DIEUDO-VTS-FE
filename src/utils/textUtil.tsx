export const stripHtmlWithFormat = (html: string): string => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    const walk = (node: Node): string => {
        if (node.nodeType === Node.TEXT_NODE) {
            return node.textContent || '';
        }

        if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as HTMLElement;
            const tag = element.tagName.toLowerCase();

            switch (tag) {
                case 'br':
                    return '\n';
                case 'p':
                case 'div':
                    return `${Array.from(element.childNodes).map(walk).join('').trim()}\n\n`;
                case 'ul':
                    return `${Array.from(element.children)
                        .map(child => (child.tagName.toLowerCase() === 'li' ? `- ${walk(child).trim()}` : walk(child)))
                        .join('\n')}\n\n`;
                case 'ol':
                    return `${Array.from(element.children)
                        .map((child, i) =>
                            child.tagName.toLowerCase() === 'li'
                                ? `${i + 1}. ${walk(child).trim()}`
                                : walk(child)
                        )
                        .join('\n')}\n\n`;
                case 'li':
                    return `- ${Array.from(element.childNodes).map(walk).join('').trim()}`;
                case 'strong':
                case 'b':
                    return `**${Array.from(element.childNodes).map(walk).join('').trim()}**`;
                case 'em':
                case 'i':
                    return `*${Array.from(element.childNodes).map(walk).join('').trim()}*`;
                case 'u':
                    return `__${Array.from(element.childNodes).map(walk).join('').trim()}__`;
                case 'h1':
                case 'h2':
                case 'h3':
                case 'h4':
                case 'h5':
                case 'h6':
                    return `\n\n${Array.from(element.childNodes).map(walk).join('').trim().toUpperCase()}\n\n`;
                case 'img': { // Added curly braces to scope declarations
                    const src = element.getAttribute('src') || '';
                    const alt = element.getAttribute('alt') || '';
                    if (src.startsWith('data:image')) {
                        return `![${alt || 'Embedded Base64 Image'}](${src})\n\n`;
                    }
                    return `![${alt}](${src})\n\n`;
                }
                case 'span':
                    return Array.from(element.childNodes).map(walk).join('');
                default:
                    return Array.from(element.childNodes).map(walk).join('');
            }
        }

        return '';
    };

    const text = walk(doc.body).trim();
    return text.replace(/\n{3,}/g, '\n\n');
};