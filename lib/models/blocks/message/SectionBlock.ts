import { MessageBlock } from '../block';
import ButtonBlock from './ButtonBlock';
import ImageLinkBlock from './ImageLinkBlock';

export default class SectionBlock implements MessageBlock {
  content: ButtonBlock;

  accessory: ImageLinkBlock;

  constructor(content: ButtonBlock, accessory: ImageLinkBlock) {
    this.content = content;
    this.accessory = accessory;
  }

  type(): string {
    return 'section';
  }

  serialize(): Map<string, any> {
    const map = new Map();
    map.set('type', this.type());
    map.set('content', this.content.serialize());
    map.set('accessory', this.accessory.serialize());

    return map;
  }
}
