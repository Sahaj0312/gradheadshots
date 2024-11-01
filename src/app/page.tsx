import { Page } from "@/components/page";
import FirebaseInit from "@/components/FirebaseInit";

export default function Home() {
  return (
    <>
      <FirebaseInit />
      <Page />
    </>
  );
}
