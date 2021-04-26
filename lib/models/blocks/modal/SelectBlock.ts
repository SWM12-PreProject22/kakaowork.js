import SelectOption from './SelectOption';
import InputBlock from './InputBlock';

export default class SelectBlock extends InputBlock {
  options: SelectOption[];

  constructor(
    name: string,
    options: SelectOption[],
    required?: boolean,
    placeholder?: string
  ) {
    super(name, required, placeholder);
    this.options = new Array<SelectOption>();
    options.forEach((o) => this.options.push(o));
  }

  type(): string {
    return 'select';
  }

  serialize(): Map<string, any> {
    const map = new Map();
    map.set('type', this.type());
    map.set('name', this.name);
    if (this.required !== undefined) map.set('required', this.required);
    if (this.placeholder !== undefined)
      map.set('placeholder', this.placeholder);
    map.set(
      'options',
      this.options.map((o) => Object.fromEntries(o.serialize()))
    );

    return map;
  }
}
