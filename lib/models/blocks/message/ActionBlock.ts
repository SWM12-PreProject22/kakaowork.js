import { MessageBlock } from '../block';
import ButtonBlock from './ButtonBlock';

export default class ActionBlock implements MessageBlock {
  buttons: ButtonBlock[];

  constructor(...buttons: ButtonBlock[]) {
    this.buttons = new Array<ButtonBlock>();
    buttons.forEach((b) => this.buttons.push(b));
  }

  type(): string {
    return 'action';
  }

  serialize(): Map<string, any> {
    const map = new Map();
    map.set('type', this.type());
    map.set(
      'elements',
      this.buttons.map((b) => Object.fromEntries(b.serialize()))
    );

    return map;
  }
}
