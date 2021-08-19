import React from 'react';
import { Meta } from '@storybook/react';
import { useDarkMode } from 'storybook-dark-mode';

export default {
  title: 'Base/Typography',
} as Meta;

export const Headings = () => {
  return (
    <>
      <h1>Heading 1</h1>
      <h2>Heading 2</h2>
      <h3>Heading 3</h3>
      <h4>Heading 4</h4>
      <h5>Heading 5</h5>
      <h6>Heading 6</h6>
    </>
  )
}

export const Paragraphs = () => {
  return (
    <>
      <h4>Regular Paragraph</h4>
      <p>Duis aute irure dolor in <a href="#">reprehenderit</a> in nulla volptate velit easse neon cillum dolore <u>eu fugiat nulla pariatur</u>. Exceptur aute sint occaecat dolor cupidatat non proident.</p>
      <p>Sed ut <strong>perspiciatis unde omnis</strong> iste natus error irure  aute sit <em>voluatem accusantium doloremque</em>.</p>

      <h4>Small Paragraph</h4>
      <p><small>Duis aute irure dolor in reprehenderit in nulla volptate velit easse neon cillum dolore eu fugiat nulla pariatur. Exceptur aute sint occaecat dolor cupidatat non proident.</small></p>

      <h4>Mono Paragraph</h4>
      <pre>
        <code>const exampleCode = localStorage.get('mono-type')</code>
      </pre>
    </>
  )
}
