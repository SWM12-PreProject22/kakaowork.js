
export interface ButtonActionType {
    actionType(): "open_inapp_browser"
        | "open_system_browser"
        | "open_external_app"
        | "submit_action"
        | "call_modal"
    getValue(): string

    serialize(map: Map<String, any>): Map<String, any>
}

export class ButtonOpenInAppBrowser implements ButtonActionType {
    actionType(): "open_inapp_browser" { return "open_inapp_browser" }

    value: string

    getValue(): string { return this.value }

    constructor(value: string = "") {
        this.value = value
    }

    serialize(map: Map<String, any>): Map<String, any> {
        map.set("action_type", this.actionType())
        map.set("value", this.value)

        return map
    }
}

export class ButtonOpenSystemBrowser implements ButtonActionType {
    actionType(): "open_system_browser" { return "open_system_browser" }

    value: string

    getValue(): string { return this.value }

    constructor(value: string = "") {
        this.value = value
    }

    serialize(map: Map<String, any>): Map<String, any> {
        map.set("action_type", this.actionType())
        map.set("value", this.value)

        return map
    }
}

export class ButtonOpenExternalApp implements ButtonActionType {
    actionType(): "open_external_app" { return "open_external_app" }

    value: string

    getValue(): string { return this.value }

    constructor(value: string = "") {
        this.value = value
    }

    serialize(map: Map<String, any>): Map<String, any> {
        map.set("action_type", this.actionType())
        map.set("value", this.value)

        return map
    }
}

export class ButtonSubmitAction implements ButtonActionType {
    actionType(): "submit_action" { return "submit_action" }

    name: string
    value: string

    actionName(): string { return this.name }
    getValue(): string { return this.value }

    constructor(name: string, value: string = "") {
        this.name = name
        this.value = value
    }

    serialize(map: Map<String, any>): Map<String, any> {
        map.set("action_type", this.actionType())
        map.set("action_name", this.actionName())
        map.set("value", this.value)

        return map
    }
}

export class ButtonCallModal implements ButtonActionType {
    actionType(): "call_modal" { return "call_modal" }

    value: string

    getValue(): string { return this.value }

    constructor(value: string = "") {
        this.value = value
    }

    serialize(map: Map<String, any>): Map<String, any> {
        map.set("action_type", this.actionType())
        map.set("value", this.value)

        return map
    }
}
