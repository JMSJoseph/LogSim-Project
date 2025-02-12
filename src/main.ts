import { mount } from 'svelte'
import './app.css'
import App from './App.svelte'

// import 'jointjs/dist/joint.css';
// import 'jquery-ui/dist/themes/base/jquery-ui.css';

// Expose jQuery in the global scope with BOTH names
// module.exports = jq;
const app = mount(App, {
  target: document.getElementById('app')!,
})

export default app
