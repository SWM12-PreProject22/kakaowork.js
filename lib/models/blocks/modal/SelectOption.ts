export default class SelectOption {
  text: string;

  value: string;

  constructor(text: string, value: string) {
    this.text = text;
    this.value = value;
  }

  serialize(): Map<string, any> {
    const map = new Map();
    map.set('text', this.text);
    map.set('value', this.value);

    return map;
  }
}
