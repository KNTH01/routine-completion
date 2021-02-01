# routine-completion

Demo: https://routine-completion.vercel.app/

## Description

Implementation of a autocompletion box using Vue 3, Vite, Tailwind, Tiptap editor. Keyboard navigation for the autocompletion box is handled with native browser `tab`. Autocompletion data is fetched by an external API.

Autocompletion box is summoned after detecting "I pick you" keyword. E.g: Type `My name is Kevin and I pick you Bul`...


## TODOs
- [ ] Improve keyboard navigation in the autocompletion box (e.g: arrows keys)
- [ ] Add debounce function to fetch API in order to reduce backend load
- [ ] Improve autocompletion box placement depends on where the input is placed (e.g: using Vue Tooltip)
