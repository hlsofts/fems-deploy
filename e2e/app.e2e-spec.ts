import { HlsoftFemsTemplatePage } from './app.po';

describe('HlsoftFems App', function() {
  let page: HlsoftFemsTemplatePage;

  beforeEach(() => {
    page = new HlsoftFemsTemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
