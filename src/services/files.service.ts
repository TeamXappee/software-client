export async function getAllUploadedFilesMetadata() {
  const res = await fetch("http://localhost:8000/api/files/all", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data.data;
}

export async function getAllFileData(activeFileMetadata: any) {
  if (!activeFileMetadata || !activeFileMetadata.channelName) return;
  const res = await fetch(
    `http://localhost:8000/api/orders/all/${activeFileMetadata?._id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await res.json();
  return data.data
}
