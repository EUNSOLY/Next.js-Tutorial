// node환경에서 제공되는 모듈
import fs from "fs";
// node환경에서 제공되는 모듈
import path from "path";
// 라이브러리
import matter from "gray-matter";
import exp from "constants";
import { remark } from "remark";
import remarkHtml from "remark-html";

// process.cwd() : process객체는 현재 Node.js에서 프로세스에 대한 정보를 제공하는 전역 객체이며 cwd()메서드는 현재 작업 디렉토리
// process.cwd() : /Desktop/이은소리/IT/nextjs-app
// 'posts' : cwd()의 결과 경로와 결합할 서브 디렉토리를 나타냅니다.

const postsDirectory = path.join(process.cwd(), "posts");
// postsDirectory: /Desktop/이은소리/IT/nextjs-app/posts

export function getSortedPostsData() {
  // posts 파일 이름을 잡아주기
  const fileNames = fs.readdirSync(postsDirectory);
  // ["pre-rendering.md", "ssg-ssr.md"]
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContent = fs.readFileSync(fullPath, "utf-8");
    const matterResult = matter(fileContent);

    return {
      id,
      ...(matterResult.data as { date: string; title: string }),
    };
  });
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}
export function getAllPostId() {
  // ID 가져와서 보내주기
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

export async function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf-8");

  const matterResult = matter(fileContents);
  const processedContent = await remark()
    .use(remarkHtml)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();
  return {
    id,
    contentHtml,
    ...(matterResult.data as { date: string; title: string }),
  };
}
