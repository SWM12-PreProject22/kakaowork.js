import { MessageBlock } from '../block';
import TextBlock from './TextBlock';
import ImageLinkBlock from './ImageLinkBlock';

export default class ContextBlock implements MessageBlock {
  content: TextBlock;

  image: ImageLinkBlock;

  constructor(content: TextBlock, image: ImageLinkBlock) {
    this.content = content;
    this.image = image;
  }

  type(): string {
    return 'context';
  }

  serialize(): Map<string, any> {
    const map = new Map();
    map.set('type', this.type());
    map.set('content', this.content.serialize());
    map.set('image', this.image.serialize());

    return map;
  }
}
