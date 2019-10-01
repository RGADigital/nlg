export default (...styled) => [
  styled.reduce((prev, [template]) => `${prev}${template}`, ''),
  ...styled.reduce((prev, [, ...rest]) => [...prev, ...rest], []),
];
