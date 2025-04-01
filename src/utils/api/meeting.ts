import camelcaseKeys from "camelcase-keys";

export const GetMeetings = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/meetings`, {
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
    throw new Error('面談・説明会の取得に失敗');
  }
};

export const PostMeeting = async (company_id: number, date: Date | null | undefined, meeting_type: string, online_url: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/meetings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        meeting: { company_id, date, meeting_type, online_url }
      }),
      credentials: 'include'
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('面談・説明会の追加に失敗');
  }
};

export const UpdateMeeting = async (id: number, company_id: number, date: Date | null | undefined, meeting_type: string, online_url: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/meetings/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        meeting: { company_id, date, meeting_type, online_url }
      }),
      credentials: 'include'
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('面談・説明会の編集に失敗');
  }
};

export const DestroyMeeting = async (id: number) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/meetings/${id}`, {
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
    throw new Error('面談・説明会の削除に失敗');
  }
};