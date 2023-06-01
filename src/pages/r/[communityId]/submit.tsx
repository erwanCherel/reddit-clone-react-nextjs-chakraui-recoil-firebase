import { communityState } from "@/src/atoms/communitiesAtom";
import PageContent from "@/src/components/Layout/PageContent";
import NewPostForm from "@/src/components/Layout/Posts/NewPostForm";
import { auth } from "@/src/firebase/clientApp";
import { Box, Text } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilValue } from "recoil";

const SubmitPostPage: React.FC = () => {
  const [user] = useAuthState(auth);
  const communityStateValue = useRecoilValue(communityState);
  console.log("COMMUNITY", communityStateValue);

  return (
    <PageContent>
      <>
        <Box p="14px 0px" borderBottom="1px solid" borderColor="white">
          <Text>Create a post</Text>
        </Box>
        {user && <NewPostForm user={user} />}
      </>
      <>{/* About */}</>
    </PageContent>
  );
};
export default SubmitPostPage;
