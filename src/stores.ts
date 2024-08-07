import { writable } from 'svelte/store';

export const selectedAddress = writable({
  juso: '',
  njuso: '',
  nameFull: ''
});
