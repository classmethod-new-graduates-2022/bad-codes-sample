import { useState, useEffect } from "react";
import { NextPage } from "next";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";

function useAccessToken(): string | undefined {
  const { data } = useSession();
  if (data?.accessToken) {
    return data.accessToken as string;
  }
  return undefined;
}

const MyComponent: NextPage = () => {
  const session = useSession();
  console.log(session);
  const [channels, setChannels] = useState([]);
  const accessToken = useAccessToken();
  useEffect(() => {
    async function getChannels() {
      try {
        if (accessToken) {
          const formData = new FormData();
          formData.append("token", accessToken);
          const res = await fetch("https://slack.com/api/users.conversations", {
            method: "POST",
            mode: "cors",
            body: formData,
          });
          const result = await res.json();
          console.log(result);
          if (result) {
            setChannels(result.channels);
          }
        }
      } catch (e) {
        console.error(e);
      }
    }
    if (accessToken) {
      getChannels();
    }
  }, [accessToken]);

  if (session.status === "authenticated") {
    return (
      <>
        <div>Signed in as {session.data.user?.email}</div>
        {session.data.user?.image && session.data.user?.name && (
          <Image
            src={session.data.user.image}
            alt={session.data.user.name}
            width={512}
            height={512}
          />
        )}
        <ul>
          {channels &&
            channels.map((channel) => <li key={channel.id}>{channel.name}</li>)}
        </ul>
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  } else {
    return (
      <>
        Not signed in <br />
        <button onClick={() => signIn()}>Sign in</button>
      </>
    );
  }
};

export default MyComponent;
