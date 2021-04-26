export interface ButtonActionType {
  actionType: string;

  getValue(): string;

  serialize(map: Map<String, any>): Map<String, any>;
}
