import { ModalBlock } from '../block';

export default class InputBlock implements ModalBlock {
  name: string;

  required?: boolean;

  placeholder?: string;

  constructor(name: string, required?: boolean, placeholder?: string) {
    this.name = name;
    this.required = required;
    this.placeholder = placeholder;
  }

  type(): string {
    return 'input';
  }

  serialize(): Map<string, any> {
    const map = new Map();
    map.set('type', this.type());
    map.set('name', this.name);
    if (this.required !== undefined) map.set('required', this.required);
    if (this.placeholder !== undefined)
      map.set('placeholder', this.placeholder);

    return map;
  }
}
