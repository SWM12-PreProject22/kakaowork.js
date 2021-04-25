export interface Block {
  type(): string

  serialize(): Map<string, any>
}

export interface MessageBlock extends Block {
}

export interface ModalBlock extends Block {
}
