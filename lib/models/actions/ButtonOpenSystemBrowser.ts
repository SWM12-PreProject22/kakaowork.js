import { ButtonActionType } from './ActionType';

export default class ButtonOpenSystemBrowser implements ButtonActionType {
  actionType = 'open_system_browser';

  value: string;

  constructor(value: string = '') {
    this.value = value;
  }

  getValue(): string {
    return this.value;
  }

  serialize(map: Map<String, any>): Map<String, any> {
    map.set('action_type', this.actionType);
    map.set('value', this.value);

    return map;
  }
}
