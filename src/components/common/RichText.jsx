import React from 'react';

// Renders admin-edited text, turning **double stars** into bold
export default function RichText({ text }) {
  return String(text ?? '').split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith('**') && part.endsWith('**') && part.length > 4
      ? <strong key={i}>{part.slice(2, -2)}</strong>
      : <React.Fragment key={i}>{part}</React.Fragment>
  );
}
