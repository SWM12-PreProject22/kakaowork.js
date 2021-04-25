import { ButtonActionType } from '../../actions/ActionType';
import { MessageBlock } from '../block';

export const ButtonStyle = {
  Default: 'default',
  Primary: 'primary',
  Danger: 'danger',
} as const;

type ButtonStyleType = typeof ButtonStyle[keyof typeof ButtonStyle];

export default class ButtonBlock implements MessageBlock {
  text: string;

  style: ButtonStyleType;

  action?: ButtonActionType;

  constructor(
    text: string,
    style: ButtonStyleType,
    action?: ButtonActionType,
  ) {
    this.text = text;
    this.style = style;
    this.action = action;
  }

  type(): string {
    return 'button';
  }

  serialize(): Map<string, any> {
    const map = new Map();
    map.set('type', this.type());
    map.set('text', this.text);
    this.action?.serialize(map);

    return map;
  }
}
