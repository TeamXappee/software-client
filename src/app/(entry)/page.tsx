import ImportContainer from "@/components/dashboard/importContainer";

export default async function Home() {
  let channels = [];
  let carriers = [];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/channels`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      channels = await res.json();
    }
  } catch (err: any) {
    console.log(err);
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/carriers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      const data = await res.json();
      carriers = data.carriers;
    }
  } catch (err: any) {
    console.log(err);
  }

  return (
    <main>
      <ImportContainer carriers={carriers} channels={channels} />
    </main>
  );
}
