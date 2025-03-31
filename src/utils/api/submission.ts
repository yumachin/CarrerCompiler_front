import camelcaseKeys from "camelcase-keys";

export const GetSubmissions = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/submissions`, {
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
    throw new Error('提出物・タスクの取得に失敗');
  }
};

export const PostSubmission = async (company_id: number, deadline: Date | null | undefined, submission_type: number, contact_media: string, submission_url: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/submissions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        submission: { company_id, deadline, submission_type, contact_media, submission_url }
      }),
      credentials: 'include'
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('提出物・タスクの追加に失敗');
  }
};

export const UpdateSubmission = async (id: number, company_id: number, deadline: Date | null | undefined, submission_type: number, contact_media: string, submission_url: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/submissions/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        submission: { company_id, deadline, submission_type, contact_media, submission_url }
      }),
      credentials: 'include'
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('提出物・タスクの編集に失敗');
  }
};

export const DestroySubmission = async (id: number) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/submissions/${id}`, {
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
    throw new Error('提出物・タスクの削除に失敗');
  }
};