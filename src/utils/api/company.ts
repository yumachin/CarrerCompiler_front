export const PostCompany = async (name: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/companies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        company: { name }
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