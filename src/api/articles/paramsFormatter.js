export function pageParamsFormatter(page) {
  return { offset: page * 10, limit: 10 };
}
