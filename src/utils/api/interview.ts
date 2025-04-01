import camelcaseKeys from "camelcase-keys";

export const GetInterviews = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/interviews`, {
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
    throw new Error('面接予定の取得に失敗');
  }
};

export const PostInterview = async (company_id: number, date: Date | null | undefined, selection_id: number, interview_type: string, online_url: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/interviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        interview: { company_id, date, selection_id, interview_type, online_url }
      }),
      credentials: 'include'
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('面接予定の追加に失敗');
  }
};

export const UpdateInterview = async (id: number, company_id: number, date: Date | null | undefined, selection_id: number, interview_type: string, online_url: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/interviews/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        interview: { company_id, date, selection_id, interview_type, online_url }
      }),
      credentials: 'include'
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('面接の編集に失敗');
  }
};

export const DestroyInterview = async (id: number) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/interviews/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });

    const text = await res.text();
    if (text) {
      return JSON.parse(text);
    } else {
      return {};
    }
  } catch (error) {
    console.error(error);
    throw new Error('面接の削除に失敗');
  }
};