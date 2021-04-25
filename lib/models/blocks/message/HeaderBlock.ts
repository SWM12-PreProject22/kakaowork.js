import { MessageBlock } from '../block';

export default class HeaderBlock implements MessageBlock {
  text: string;

  style: 'blue' | 'red' | 'yellow';

  constructor(text: string, style: 'blue' | 'red' | 'yellow' = 'blue') {
    this.text = text;
    this.style = style;
  }

  type(): string {
    return 'header';
  }

  serialize(): Map<string, any> {
    return new Map()
      .set('type', this.type())
      .set('text', this.text)
      .set('style', this.style);
  }
}
