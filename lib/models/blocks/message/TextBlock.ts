import { MessageBlock } from '../block';

export default class TextBlock implements MessageBlock {
  text: string;

  markdown: boolean;

  constructor(text: string, markdown: boolean = true) {
    this.text = text;
    this.markdown = markdown;
  }

  type(): string {
    return 'text';
  }

  serialize(): Map<string, any> {
    return new Map()
      .set('type', this.type())
      .set('text', this.text)
      .set('markdown', this.markdown);
  }
}
