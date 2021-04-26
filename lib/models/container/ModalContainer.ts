import { Block } from '../blocks/block';
import Container from './Container';

export default class ModalContainer implements Container {
  blocks: Block[];

  title: string;

  accept: string;

  decline: string;

  value: string;

  constructor(
    title: string,
    accept: string = '확인',
    decline: string = '취소',
    value: string,
    ...blocks: Block[]
  ) {
    this.title = title;
    this.accept = accept;
    this.decline = decline;
    this.value = value;
    this.blocks = new Array<Block>();
    blocks.forEach((block: Block) => this.blocks.push(block));
  }

  serialize(map: Map<string, any> = new Map()): Map<string, any> {
    map.set('title', this.title);
    map.set('accept', this.accept);
    map.set('decline', this.decline);
    map.set('value', this.value);
    map.set(
      'blocks',
      this.blocks.map((b: Block) => Object.fromEntries(b.serialize()))
    );
    return map;
  }
}
