import { Request, Response } from "express";

// T 为 props 数据类型
export interface ParetoPage<
  T extends Record<string, any> = Record<string, any>
> {
  // function component 的类型
  (props: { initialData: T }): JSX.Element;

  // 组件.getServerSideProps
  getServerSideProps?: (req: Request, res: Response) => Promise<T>; // 获取的数据类型作为 props 的数据类型
  setUpClient?: (data?: Record<string,any>) => Promise<any>; // 初始化客户端函数？
  [key: string]: any; // 是不是多余了？
}

export interface ParetoRuntimeConfig {
  pages: Record<string,ParetoPage >;
  assets: Record<
    string,
    {
      js?: string[] | string;
      css?: string[] | string;
    }
  >;
}
