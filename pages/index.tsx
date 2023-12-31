import Head from "next/head";
import { Inter } from "next/font/google";
import homeStyles from "@/styles/Home.module.css";
import { GetStaticProps, NextPage } from "next";
import { getSortedPostsData } from "@/lib/post";
import Link from "next/link";

const Home = ({
  allPostData,
}: {
  allPostData: {
    date: string;
    title: string;
    id: string;
  }[];
}) => {
  return (
    <div className={homeStyles.container}>
      <Head>
        <title>Eunsoly</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className={homeStyles.headingMd}>
        <p>[Eunsoly Introduction]</p>
        <p>(This is a website)</p>
      </section>
      <section className={`${homeStyles.headingMd} ${homeStyles.padding1px}`}>
        <h2 className={homeStyles.headingLg}>Blog</h2>
        <ul className={homeStyles.list}>
          {allPostData.map(({ id, title, date }) => (
            <li className={homeStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={homeStyles.lightText}>{date}</small>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};
export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const allPostData = getSortedPostsData();
  return {
    props: {
      allPostData,
    },
  };
};
