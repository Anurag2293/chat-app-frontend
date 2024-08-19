export async function postRoom({
  name,
  description,
}: {
  name: string;
  description: string;
}) {
  const response = await fetch("/api/room", {
    method: "POST",
    body: JSON.stringify({
      name,
      description,
    }),
  });
  const result = await response.json();
  if (!result.success) {
    throw new Error(result.message);
  }
  return result;
}

export async function patchRoomWithProfileImage({
  roomID,
  profileImageURL,
}: {
  roomID: string;
  profileImageURL: string;
}) {
  const response = await fetch("/api/room", {
    method: "PATCH",
    body: JSON.stringify({
      roomID,
      profileImageURL,
    }),
  });
  const result = await response.json();
  if (!result.success) {
    throw new Error(result.message);
  }
  return result;
}
