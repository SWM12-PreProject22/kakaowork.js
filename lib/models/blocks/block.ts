import { ENGINE_METHOD_PKEY_ASN1_METHS } from "node:constants";
import { ButtonActionType } from "./actionType";

export interface Block {
    type(): string
    serialize(): Map<string, any>
}

export interface MessageBlock extends Block {};
export interface ModalBlock extends Block {};

/* ========== MESSAGE BLOCKS ========== */
export class HeaderBlock implements MessageBlock {
    type(): string { return "header" }
    text: string
    style: 'blue' | 'red' | 'yellow'

    serialize(): Map<string, any> {
        return new Map()
            .set("type", this.type())
            .set("text", this.text)
            .set("style", this.style);
    }

    constructor(text: string, style: 'blue' | 'red' | 'yellow' = 'blue') {
        this.text = text;
        this.style = style;
    }
}

export class TextBlock implements MessageBlock {
    type(): string { return "text" }
    text: string
    markdown: boolean

    serialize(): Map<string, any> {
        return new Map()
            .set("type", this.type())
            .set("text", this.text)
            .set("markdown", this.markdown);
    }

    constructor(text: string, markdown: boolean = true) {
        this.text = text;
        this.markdown = markdown;
    }
}

export class DividerBlock implements MessageBlock {
    type(): string { return "divider" }
    serialize(): Map<string, any> {
        return new Map()
            .set("type", this.type());
    }
}

export class ButtonBlock implements MessageBlock {
    text: string
    style: "default" | "primary" | "danger"
    action?: ButtonActionType

    type(): string { return "button" }

    constructor(
        text: string,
        style: "default" | "primary" | "danger" = "default",
        action?: ButtonActionType
    ) {
        this.text = text
        this.style = style
        this.action = action
    }

    serialize(): Map<string, any> {
        const map = new Map();
        map.set("type", this.type());
        map.set("text", this.text);
        this.action?.serialize(map);

        return map;
    }
}

export class ImageLinkBlock implements MessageBlock {
    type(): string { return "image_link" }

    url: string

    serialize(): Map<string, any> {
        const map = new Map();
        map.set("type", this.type());
        map.set("url", this.url);

        return map;
    }

    constructor(url: string) {
        this.url = url
    }
}

export class ActionBlock implements MessageBlock {
    type(): string { return "action" }

    buttons: ButtonBlock[]

    serialize(): Map<string, any> {
        const map = new Map();
        map.set("type", this.type());
        map.set("elements", this.buttons.map(b => Object.fromEntries(b.serialize())));

        return map;
    }

    constructor(...buttons: ButtonBlock[]) {
        this.buttons = new Array<ButtonBlock>();
        buttons.forEach(b => this.buttons.push(b));
    }
}

export class SectionBlock implements MessageBlock {
    type(): string { return "section" }

    content: ButtonBlock
    accessory: ImageLinkBlock

    serialize(): Map<string, any> {
        const map = new Map();
        map.set("type", this.type());
        map.set("content", this.content.serialize());
        map.set("accessory", this.accessory.serialize());

        return map;
    }

    constructor(content: ButtonBlock, accessory: ImageLinkBlock) {
        this.content = content;
        this.accessory = accessory;
    }
}

export class ContextBlock implements MessageBlock {
    type(): string { return "context" }

    content: TextBlock
    image: ImageLinkBlock

    serialize(): Map<string, any> {
        const map = new Map();
        map.set("type", this.type());
        map.set("content", this.content.serialize());
        map.set("image", this.image.serialize());

        return map;
    }

    constructor(content: TextBlock, image: ImageLinkBlock) {
        this.content = content;
        this.image = image;
    }
}

export class DescriptionBlock implements MessageBlock {
    type(): string { return "description" }

    term: string
    content: TextBlock

    serialize(): Map<string, any> {
        const map = new Map();
        map.set("type", this.type());
        map.set("term", this.term);
        map.set("content", this.content.serialize())

        return map;
    }

    constructor(term: string, content: TextBlock) {
        this.term = term;
        this.content = content;
    }
}

/* ========== MODAL BLOCKS ========== */
export class LabelBlock implements ModalBlock {
    type(): string { return "label" }
    
    text: string
    markdown: boolean

    serialize(): Map<string, any> {
        const map = new Map();
        map.set("type", this.type());
        map.set("text", this.text);
        map.set("markdown", this.markdown);

        return map;
    }

    constructor(text: string, markdown: boolean = true) {
        this.text = text;
        this.markdown = markdown;
    }
}

export class InputBlock implements ModalBlock {
    type(): string { return "input" }

    name: string
    required?: boolean
    placeholder?: string

    serialize(): Map<string, any> {
        const map = new Map();
        map.set("type", this.type());
        if (this.required != null) map.set("required", this.required);
        if (this.placeholder != null) map.set("placeholder", this.placeholder);

        return map;
    }

    constructor(name: string, required?: boolean, placeholder?: string) {
        this.name = name;
        this.required = required;
        this.placeholder = placeholder;
    }
}

export class SelectOption {
    text: string
    value: string

    constructor(text: string, value: string) {
        this.text = text;
        this.value = value;
    }
    
    serialize(): Map<string, any> {
        const map = new Map();
        map.set("text", this.text);
        map.set("value", this.value);

        return map;
    }
}

export class SelectBlock extends InputBlock {
    type(): string { return "select" }

    options: SelectOption[]

    serialize(): Map<string, any> {
        const map = new Map();
        map.set("type", this.type());
        if (this.required != null) map.set("required", this.required);
        if (this.placeholder != null) map.set("placeholder", this.placeholder);
        map.set("options", this.options.map(o => o.serialize()));

        return map;
    }

    constructor(name: string, options: SelectOption[], required?: boolean, placeholder?: string) {
        super(name, required, placeholder);
        this.options = new Array<SelectOption>();
        options.forEach(o => this.options.push(o));
    }
}
