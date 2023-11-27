import Banner from "@/components/Banner";
import Post from "@/components/Post";
import PostFormAction from "@/components/server/post_form_action";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function Index() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data } = await supabase.auth.getUser();
  const { user } = data;

  return (
    <>
      <section className="lg:max-w-2xl mx-auto lg:border-x lg:border-x-secondary/20">
        {user ? <PostFormAction /> : null}
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </section>
      {user ? null : <Banner />}
    </>
  );
}
