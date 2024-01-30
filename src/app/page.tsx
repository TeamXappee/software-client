import ImportContainer from "@/components/dashboard/importContainer";

export default async function Home() {
  let channels = [];

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

  return (
    <main>
      <ImportContainer channels={channels}/>
    </main>
  );
}
