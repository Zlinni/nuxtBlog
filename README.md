# Nuxt 3 Minimal Starter

We recommend to look at the [documentation](https://v3.nuxtjs.org).

## Setup

Make sure to install the dependencies

```bash
yarn install
```

## Development

Start the development server on http://localhost:3000

```bash
yarn dev
```

## Production

Build the application for production:

```bash
yarn build
```

Checkout the [deployment documentation](https://v3.nuxtjs.org/docs/deployment).

todo
2. category的全部接口

4. 权限管理接口 表设计

~~5. 主页改一下标题~~

7. 主页的搜索

8. 主页的头像和登陆模块

9. 主页模块数据的访问量接口接入

10. 博客页面的最近更新有冒泡bug√ 不是冒泡bug 是vcard生成多个的bug

11. 博客详情页面 右侧目录出现不匹配的bug

13. 博客详情 目录的数字匹配

~~14. tag管理页面的loading修复：只能由父组件去控制~~

框架
1. 头像 intro模块
2. 登陆模块

主页
1. 标题order even为右边√
2. 幻灯片组件√
3. 目录组件 差intro
4. 访问量统计组件
5. 链接导向


article管理页面
    文章管理的删改查接口：删除的接口会影响到本地文件要考虑。改也是 只能进行title之类的修改，查的接口是搜索对应的文章
1. 删除接口
2. 修改接口
3. 模糊查找对应的文章


tag管理页面
1. tag管理页面的loading修复：只能由父组件去控制√
2. tag的div颜色√
3. tag的增删改查接口√
4. tag的修改：如果是0可以删除 如果大于0 只能自己找到对应的文件删除(不支持批量修改标签 会涉及到很多问题)√
5. 模糊搜索√

tag category：
1. 下方分页不显示的bug

全页面refresh改造计划√

