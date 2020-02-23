import { Component, h } from 'preact';
import { IroColor, IroColorPickerOptions } from '@irojs/iro-core';
import { IroColorPicker } from './ColorPicker';
export declare const enum EventResult {
    Start = 0,
    Move = 1,
    End = 2
}
export interface IroComponentProps extends IroColorPickerOptions {
    parent: IroColorPicker;
    color: IroColor;
    onInput: (type: EventResult) => void;
}
interface Props {
    onInput: (x: number, y: number, type: EventResult) => void;
}
interface State {
}
export declare class IroComponentBase extends Component<Props, State> {
    uid: string;
    base: HTMLElement;
    constructor(props: any);
    render(props: any): h.JSX.Element;
    handleEvent(e: MouseEvent & TouchEvent): void;
}
export {};
