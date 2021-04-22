import { Block } from "./block";


export class BlockContainer {
    blocks: Block[]

    constructor(...blocks: Block[]) {
        this.blocks = new Array<Block>();
        blocks.forEach((block: Block) => this.blocks.push(block) );
    }

    serialize(): Object[] {
        return this.blocks.map((b: Block) => Object.fromEntries(b.serialize()));
    }
}

