import { Suspense } from "react";
import type { ParetoPage } from "@pareto/core";
import { promiseMap, Image, mockClientPromise } from "@pareto/core";

import { fetchJson } from "../../utils";
import { Recommends } from "./recommends";
import { RecommendsSkeleton } from "./recommends/loading";
import { getRecommends, getRecommendsKey } from "./stream";

import styles from "./style.module.scss";

interface InitialData {
  repositories: {
    name: string;
    avatar: string;
  }[];
}

const Home: ParetoPage<InitialData> = (props) => {
  const { repositories } = props.initialData;

  return (
    <div className={styles.container}>
      <div className={styles.title}>Repositories</div>
      <div className={styles.repos}>
        {repositories.map((repo) => (
          <div key={repo.name} className={styles.repo}>
            <div>
              <Image src={repo.avatar} />
            </div>
            <div>{repo.name}</div>
          </div>
        ))}
      </div>

      {/* use 中 promise resolve 前就走 suspense，reject 就走 Error boundary */}
      <Suspense fallback={<RecommendsSkeleton/>}>
        <Recommends />
      </Suspense>
    </div>
  );
};


// 从服务端获取数据
// return 的数据，作为 props 传递给组件
Home.getServerSideProps = async () => {
  // stream ssr & init server promise
  promiseMap.set(getRecommendsKey, getRecommends());
  // ssr
  const repositories = (await fetchJson("/api/repositories")) as InitialData;
  return repositories;
};


// 初始化客户端？
Home.setUpClient = async () => {
  // mock client promise, it only will be resolved when server data is ready
  mockClientPromise(getRecommendsKey);
};

export default Home;
