export default (values) => values.filter((it) => typeof it === 'function').length > 0;
