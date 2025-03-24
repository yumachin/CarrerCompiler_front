const API_URL = "http://localhost:3001";

export const getUser = async () => {
  try {
    const res = await fetch(`${API_URL}/user`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      },
      credentials: 'include'
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("サインアップAPIのエラー", error);
    // APIの呼び出し元にエラーを伝えるため、APIファイルにはこの処理が必要
    throw new Error('サインアップ失敗');
  }
};