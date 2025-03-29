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
    throw new Error('面談・説明会予定の取得に失敗');
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
    throw new Error('面談・説明会予定の追加に失敗');
  }
};