export default interface Container {
  serialize(map: Map<string, any>): Map<string, any>;
}
