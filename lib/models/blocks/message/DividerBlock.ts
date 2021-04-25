import { MessageBlock } from '../block';

export default class DividerBlock implements MessageBlock {
  type(): string {
    return 'divider';
  }

  serialize(): Map<string, any> {
    return new Map()
      .set('type', this.type());
  }
}
