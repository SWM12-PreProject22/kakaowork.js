import { Block } from '../blocks/block';
import Container from './Container';

export default class BlockContainer implements Container {
  blocks: Block[];

  text: string;

  constructor(text?: string, ...blocks: Block[]) {
    this.text = text || '';
    this.blocks = new Array<Block>();
    blocks.forEach((block: Block) => this.blocks.push(block));
  }

  serialize(map: Map<string, any> = new Map()): Map<string, any> {
    if (this.text.length) map.set('text', this.text);
    map.set(
      'blocks',
      this.blocks.map((b: Block) => Object.fromEntries(b.serialize()))
    );

    return map;
  }
}
