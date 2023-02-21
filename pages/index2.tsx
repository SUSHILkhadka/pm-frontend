import { useRouter } from "next/router";
import { Button } from "rsuite";

const Home = () => {
  const router = useRouter();
  return (
    <>
      <h1>index2</h1>
      <Button
        onClick={() => {
          router.replace("/");
        }}
      >Next</Button>
    </>
  );
};
export default Home;
