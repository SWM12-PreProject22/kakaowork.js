import { MessageBlock } from '../block';

export default class ImageLinkBlock implements MessageBlock {
  url: string;

  constructor(url: string) {
    this.url = url;
  }

  type(): string {
    return 'image_link';
  }

  serialize(): Map<string, any> {
    const map = new Map();
    map.set('type', this.type());
    map.set('url', this.url);

    return map;
  }
}
