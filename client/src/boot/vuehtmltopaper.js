import VueHtmlToPaper from 'vue-html-to-paper';

export default ({ Vue }) => {

  const options = {
    name: '_blank',
    specs: [
      'fullscreen=yes',
      'titlebar=yes',
      'scrollbars=yes'
    ],
    styles: [
      'https://cdn.jsdelivr.net/npm/quasar@1.10.5/dist/quasar.min.css'
    ]
  }

  Vue.use(VueHtmlToPaper, options);
};
