export const ToggleInterview = async (id: number, status: boolean) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/interviews/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ interview: { status: !status } }),
      credentials: "include"
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('面接予定の更新に失敗');
  }
};

export const ToggleMeeting = async (id: number, status: boolean) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/meetings/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ meeting: { status: !status } }),
      credentials: "include"
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('面談・説明会予定の更新に失敗');
  }
};

export const ToggleSubmission = async (id: number, status: boolean) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/submissions/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ submission: { status: !status } }),
      credentials: "include"
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('提出・未提出の更新に失敗');
  }
};