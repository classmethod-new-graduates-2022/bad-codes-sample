import { useState, useEffect } from "react";
import { NextPage } from "next";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import { slackAPI } from "./callSlackAPI";
import { Channel } from "./channel";
import AuthenticatedHome from "./authenticatedHome";
import UnAuthenticatedHome from "./unAuthenticatedHome";

function useAccessToken(): string | undefined {
  const { data: session } = useSession();
  if (session?.accessToken) {
    return session.accessToken as string;
  }
  return undefined;
}

const MyComponent: NextPage = () => {
  const session = useSession();
  // console.log(session);
  const [channels, setChannels] = useState<Channel[]>([]);
  const accessToken = useAccessToken();

  useEffect(() => {
    async function fetchChannels() {
      try {
        if (!accessToken) {
          return;
        }
        const response = await slackAPI(accessToken);
        const result = await response.json();
        console.log(result);
        if (result) {
          setChannels(result.channels);
        }
      } catch (e) {
        console.error(e);
      }
    }
    if (accessToken) {
      fetchChannels();
    }
  }, [accessToken]);

  if (session.status === "authenticated") {
    return <AuthenticatedHome channels={channels} />;
  }
  return <UnAuthenticatedHome />;
};

export default MyComponent;
