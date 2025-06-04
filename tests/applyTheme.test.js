const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

describe('applyTheme', () => {
  let dom;
  let window;
  let document;

  beforeAll(() => {
    const html = fs.readFileSync(path.join(__dirname, '..', 'sudoku.html'), 'utf-8');
    dom = new JSDOM(html, { runScripts: 'dangerously' });
    window = dom.window;
    document = window.document;
  });

  test('sets CSS variables on body for ocean theme', () => {
    window.applyTheme('ocean');
    const bodyStyle = document.body.style;
    expect(bodyStyle.getPropertyValue('--bg-color')).toBe('#001f3f');
    expect(bodyStyle.getPropertyValue('--text-color')).toBe('#f0f8ff');
  });
});
