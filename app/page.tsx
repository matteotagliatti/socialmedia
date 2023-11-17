import Banner from "@/components/Banner";
import Post from "@/components/Post";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function Index() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  return (
    <>
      <section className="lg:max-w-2xl mx-auto border-x border-x-secondary/20">
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </section>
      <Banner />
    </>
  );
}
