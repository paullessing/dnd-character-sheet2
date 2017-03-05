import { DndCharacterSheet2Page } from './app.po';

describe('dnd-character-sheet2 App', () => {
  let page: DndCharacterSheet2Page;

  beforeEach(() => {
    page = new DndCharacterSheet2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
