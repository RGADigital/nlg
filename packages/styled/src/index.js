import styledString from './stylers/string';
import styledTemplate from './stylers/template';
import styledComponent from './stylers/component';

export default (styleMap, ...values) => {
  if (typeof styleMap === 'string') {
    return styledString(styleMap);
  }
  if (Array.isArray(styleMap)) {
    return styledTemplate(styleMap, ...values);
  }
  return styledComponent(styleMap);
};
