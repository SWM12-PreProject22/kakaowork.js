import { MessageBlock } from '../block';
import TextBlock from './TextBlock';

export default class DescriptionBlock implements MessageBlock {
  term: string;

  content: TextBlock;

  constructor(term: string, content: TextBlock) {
    this.term = term;
    this.content = content;
  }

  type(): string {
    return 'description';
  }

  serialize(): Map<string, any> {
    const map = new Map();
    map.set('type', this.type());
    map.set('term', this.term);
    map.set('content', this.content.serialize());

    return map;
  }
}
