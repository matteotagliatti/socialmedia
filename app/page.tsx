import Banner from "@/components/banner";
import PostForm from "@/components/client/post_form";
import Post from "@/components/post";
import { createClient } from "@/utils/supabase/server";
import { randomUUID } from "crypto";
import { cookies } from "next/headers";

export default async function Index() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data } = await supabase.auth.getUser();
  const { user } = data;

  async function submitPost(formData: FormData) {
    "use server";

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data } = await supabase.auth.getUser();
    const { user } = data;

    const post = String(formData.get("post"));

    if (!post) return;
    if (!user) return;

    const { data: postData, error } = await supabase.from("posts").insert({
      user_id: user.id,
      text: post,
      id: randomUUID(),
    });

    if (error) {
      console.log(error);
      return;
    }
  }

  return (
    <>
      <section className="lg:max-w-2xl mx-auto lg:border-x lg:border-x-secondary/20">
        {user ? <PostForm submitPost={submitPost} /> : null}
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
