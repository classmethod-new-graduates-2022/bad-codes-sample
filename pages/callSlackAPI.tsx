export async function slackAPI(accessToken: string) {
  const formData = new FormData();
  formData.append("token", accessToken);
  const res = await fetch("https://slack.com/api/users.conversations", {
    method: "POST",
    mode: "cors",
    body: formData,
  });
  return res;
}

/*
JSONをparseするのもありでは？？ by.嶋村
https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse
*/
