import Banner from "@/components/banner";
import PostForm from "@/components/client/post_form";
import Post from "@/components/post";
import { createClient } from "@/utils/supabase/server";
import { randomUUID } from "crypto";
import { cookies } from "next/headers";

export default async function Index() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: userData } = await supabase.auth.getUser();
  const { user } = userData;

  const { data: posts, error } = await supabase.from("posts").select(`
    *, 
    profiles ( full_name, username )
  `);

  console.log(posts);

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

    return {
      data: postData,
      error,
    };
  }

  return (
    <>
      <section className="lg:max-w-2xl mx-auto lg:border-x lg:border-x-secondary/20">
        {user ? <PostForm submitPost={submitPost} /> : null}
        {posts?.map((post) => (
          <Post
            key={post.id}
            text={post.text}
            username={post.profiles?.username}
            full_name={post.profiles?.full_name}
          />
        ))}
      </section>
      {user ? null : <Banner />}
    </>
  );
}
