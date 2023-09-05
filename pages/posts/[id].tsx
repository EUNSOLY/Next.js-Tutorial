import { getAllPostId, getPostData } from "@/lib/post";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import React from "react";
import postSytle from "../../styles/Post.module.css";
const Post = ({
  postData,
}: {
  postData: {
    title: string;
    date: string;
    contentHtml: string;
  };
}) => {
  return (
    <div className={postSytle.container}>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1>{postData.title}</h1>
        <div>{postData.date}</div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }}></div>
      </article>
    </div>
  );
};
export default Post;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostId();
  //[{params:{id:"pre-rendering"},{params:{id:"ssg-ssr"}}]
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postId = params!.id as string;
  const postData = await getPostData(postId);
  return {
    props: {
      postData,
    },
  };
};
