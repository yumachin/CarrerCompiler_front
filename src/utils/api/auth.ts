export const SignUp = async ( name: string, email: string, password: string ) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
      credentials: 'include'
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('サインアップ失敗');
  }
};

export const SignIn = async ( email: string, password: string ) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/sign_in`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      credentials: 'include'
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("ログイン失敗");
  }
};

export const SignOut = async () => {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/sign_out`, {
      method: 'DELETE',
      credentials: 'include'
    });
  } catch (error) {
    console.error("ログアウト失敗:", error);
    throw new Error("ログアウト失敗");
  }
};

// export const getAuth = async () => {
//   try {
//     const res = await axios.get(`${API_URL}/auth/check`, { withCredentials: true });
//     console.log("resは、、", res.status);
//     return res.status;
//   } catch (error) {
//     console.error("getAuthにおけるエラーは => ", error);
//     throw new Error('データの取得に失敗しました。');
//   }
// }