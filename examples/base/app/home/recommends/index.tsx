import { use } from "react";
import { Image, promiseMap } from "@pareto/core";

import { getRecommendsKey } from "../stream";

import styles from "./style.module.scss";

interface RecommendData {
  feeds: {
    name: string;
    avatar: string;
    time: string;
    action: string;
    repositoryName: string;
    repositoryAvatar: string;
    desc: string;
  }[];
}

// promiseMap 是全局的 map

export function Recommends() {
  // use hook to get data from promiseMap
  // use hook can read the value of a promise before it is resolved or rejected
  // 读取 promise 中的数据 use(promise) or use(context)
  const { feeds }: RecommendData = use(promiseMap.get(getRecommendsKey)!);

  return (
    <div className={styles.container}>
      <div className={styles.title}>Recommends</div>
      <div className={styles.list}>
        {feeds.map((item, index) => (
          <div className={styles.item} key={index}>
            <div className={styles.user}>
              <div className={styles.avatar}>
                <Image src={item.avatar} />
              </div>
              <div>
                <div className={styles.name}>
                  {item.name} <div className={styles.action}>{item.action}</div>
                </div>
                <div className={styles.time}>{item.time}</div>
              </div>
            </div>
            <div className={styles.repository}>
              <div className={styles.repositoryAvatar}>
                <Image src={item.repositoryAvatar} />
              </div>
              <div className={styles.repositoryName}>{item.repositoryName}</div>
            </div>
            <div className={styles.desc}>{item.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
