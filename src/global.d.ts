declare module "svelte-drag-and-drop-actions" {
    export function asDraggable(node: HTMLElement, options?: any): {
        destroy(): void;
        update(options?: any): void;
    };
}

declare const jQuery: typeof import('jquery');
declare const $: typeof jQuery;

declare global {
    interface Window {
        jQuery: typeof jQuery;
        $: typeof jQuery;
    }
}