import camelcaseKeys from "camelcase-keys";

export const GetCounts = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/counts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });
    const data = await res.json();
    return camelcaseKeys(data, { deep: true });
  } catch (error) {
    console.error(error);
    throw new Error('各テーブル数の取得に失敗');
  }
};

export const GetDashboardData = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/dashboard`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });
    const data = await res.json();
    return camelcaseKeys(data, { deep: true });
  } catch (error) {
    console.error(error);
    throw new Error('ダッシュボードデータの取得に失敗');
  }
};