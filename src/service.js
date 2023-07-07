const base_url = "http://localhost:4000";

export const get = async (url) => {
  const dataResp = await fetch(`${base_url}/${url}`);
  const data = await dataResp.json();
  console.log(data);
  return data;
};

export const post = async (url, body, method) => {
  console.log("body", JSON.stringify(body));
  const postData = await fetch(`${base_url}/${url}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: method,
    body: JSON.stringify(body),
  });
  return postData.status === 201 || postData.status === 200;
};

export const deleteData = async (url) => {
  const deleteMethod = await fetch(`${base_url}/${url}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "DELETE",
  });
  console.log({deleteMethod});
  return deleteMethod.status === 200;
};
