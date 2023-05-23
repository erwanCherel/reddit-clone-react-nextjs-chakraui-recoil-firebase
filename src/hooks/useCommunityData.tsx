import { useRecoilState } from "recoil";
import { Community, communityState } from "../atoms/communitiesAtom";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/clientApp";
import { collection, getDocs } from "firebase/firestore";

const useCommunityData = () => {
  const [user] = useAuthState(auth);
  const [communityStateValue, setCommunityStateValue] =
    useRecoilState(communityState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onJoinOrLeaveCommunity = (
    communityData: Community,
    isJoined: boolean
  ) => {
    // is the user signed in ?
    // if not => open auth modal

    if (isJoined) {
      leaveCommunity(communityData.id);
      return;
    }
    joinCommunity(communityData);
  };

  const getMySnippets = async () => {
    setLoading(true);
    try {
      // get users snippets
      const snippetsDocs = await getDocs(
        collection(firestore, `users/${user?.uid}/communitySnippets`)
      );

      const snippets = snippetsDocs.docs.map((doc) => ({ ...doc.data() }));
    } catch (error) {
      console.log("getMySnippers error", error);
    }
  };

  const joinCommunity = (communityData: Community) => {};

  const leaveCommunity = (communityId: string) => {};

  return {
    // data and functions
    communityStateValue,
    onJoinOrLeaveCommunity,
  };
};
export default useCommunityData;
