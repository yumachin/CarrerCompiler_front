import camelcaseKeys from "camelcase-keys";

export const GetCompanies = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/companies`, {
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
    throw new Error('会社一覧の取得に失敗');
  }
};

export const GetCompany = async (id: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/companies/${id}`, {
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
    throw new Error('会社の取得に失敗');
  }
};

export const PostCompany = async (name: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/companies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({company: { name }}),
      credentials: 'include'
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('会社の追加に失敗');
  }
};

export const UpdateCompany = async (id: number, name: string, industry?: number, employees?: number | string, website?: string, address?: string, income?: number | string, holidays?: number | string, workingHours?: string, other?: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/companies/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({company: { name, industry, employees: employees !== "" ? Number(employees) : 0, website, address, income: income !== "" ? Number(income) : 0, holidays: holidays !== "" ? Number(holidays) : 0, workingHours, other }}),
      credentials: 'include'
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('会社情報の編集に失敗');
  }
};

export const UpdateCompanyMemo = async (id: number, memo: string) => {
  try {
    console.log("idは", id);
    console.log("memoは", memo);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/companies/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({company: { memo }}),
      credentials: 'include'
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('会社メモの編集に失敗');
  }
};