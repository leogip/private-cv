export function render(arr, container, toHtml) {
  const html = arr.map(toHtml).join('');

  document.querySelector(container).insertAdjacentHTML('afterbegin', html);
}

export function _createElement(tag, props, ...children) {
  const element = document.createElement(tag);

  Object.keys(props).forEach(key => (element[key] = props[key]));

  children.forEach(child => {
    if (typeof child === 'string') {
      child = document.createTextNode(child);
    }

    element.appendChild(child);
  });

  return element;
}
