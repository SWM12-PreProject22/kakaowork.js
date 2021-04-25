import { ModalBlock } from '../block';

export default class LabelBlock implements ModalBlock {
  text: string;

  markdown: boolean;

  constructor(text: string, markdown: boolean = true) {
    this.text = text;
    this.markdown = markdown;
  }

  type(): string {
    return 'label';
  }

  serialize(): Map<string, any> {
    const map = new Map();
    map.set('type', this.type());
    map.set('text', this.text);
    map.set('markdown', this.markdown);

    return map;
  }
}
