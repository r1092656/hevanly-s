// Upstash Redis helper — gebruikt KV_REST_API_URL en KV_REST_API_TOKEN
async function cmd(...args) {
  const res = await fetch(process.env.KV_REST_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(args),
  });
  const data = await res.json();
  if (data.error) throw new Error(data.error);
  return data.result;
}

export async function get(key) {
  const raw = await cmd('GET', key);
  return raw ? JSON.parse(raw) : null;
}

export async function set(key, value) {
  return cmd('SET', key, JSON.stringify(value));
}

export async function del(key) {
  return cmd('DEL', key);
}
