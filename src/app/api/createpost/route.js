import { NextResponse } from "next/server";

export async function POST(request) {
  const payload = await request.json();

  const params = {
    username: payload.username,
    post: payload.post,
  };

  try {
    const res = await fetch(
      `https://assignment-api-spxd.onrender.com/api/posts`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      }
    );

    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }
    const data = await res.json();
    console.log(data);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred during the request" },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");
  
  try {
    const res = await fetch(
      `https://assignment-api-spxd.onrender.com/api/posts/${email}`,
      {
        method: "GET",
        headers: {
          //   token: _yY(token),
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }

    const data = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred during the request" },
      { status: 500 }
    );
  }
}
