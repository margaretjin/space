declare module 'svelte-routing';

declare module '*.svelte' {
  import { SvelteComponentTyped } from 'svelte';
  export default class extends SvelteComponentTyped<{ [key: string]: any }, { [key: string]: CustomEvent<any> }, { [key: string]: any }> {}
}
