
// 返回一个 Promise 对象，用于获取 JSON 数据
export async function fetchJson(url: string, options: RequestInit = {}) {
  const base = 'http://localhost:4000';
  const isoUrl = typeof window === 'undefined' ? `${base}${url}` : url;
  const response = await fetch(isoUrl, options);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

export async function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
