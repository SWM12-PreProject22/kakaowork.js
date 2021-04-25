import { ButtonActionType } from './ActionType';

export default class ButtonSubmitAction implements ButtonActionType {
  actionType = 'submit_action';

  name: string;

  value: string;

  constructor(name: string, value: string = '') {
    this.name = name;
    this.value = value;
  }

  actionName(): string {
    return this.name;
  }

  getValue(): string {
    return this.value;
  }

  serialize(map: Map<String, any>): Map<String, any> {
    map.set('action_type', this.actionType);
    map.set('action_name', this.actionName());
    map.set('value', this.value);

    return map;
  }
}
