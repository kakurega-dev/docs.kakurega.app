---
title: アップデート方法
icon: world-up
order: 1
---

[[toc]]

## 手動でセットアップした場合のアップデート方法 {#manual}

::: tip
基本的な操作は[MisskeyHubのドキュメント](https://misskey-hub.net/ja/docs/for-admin/install/guides/manual/#misskey%E3%81%AE%E3%82%A2%E3%83%83%E3%83%97%E3%83%87%E3%83%BC%E3%83%88%E6%96%B9%E6%B3%95)に記載されている内容と同様です。 
:::

ユーザーの切り替えとディレクトリの移動を行います。

```bash
sudo su - misskey
cd kakurega.app
```

以下のコマンドでアップデートを行います。

```bash
git checkout master-kakurega
git pull
git submodule update --init
NODE_ENV=production pnpm install --frozen-lockfile
NODE_ENV=production pnpm run build
pnpm run migrate
```

正常にアップデートが完了した場合は現在の実行ユーザー(misskey)からexitしておきます。

```bash
exit
```

### サービスの再起動
アップデートの完了後にサービスの再起動を行います。

```bash
sudo systemctl restart misskey
```

## Dockerを使用している場合のアップデート方法 {#docker}

::: tip
基本的な操作は[MisskeyHubのドキュメント](https://misskey-hub.net/ja/docs/for-admin/install/guides/docker/#misskey%E3%81%AE%E3%82%A2%E3%83%83%E3%83%97%E3%83%87%E3%83%BC%E3%83%88%E6%96%B9%E6%B3%95)に記載されている内容と同様です。
:::

リポジトリをクローンしたディレクトリに移動します。

```bash
cd kakurega.app
```

以下のコマンドでアップデートを行います。

```bash
git checkout master-kakurega
git pull
sudo docker compose stop && sudo docker compose up -d
```

::: info アップデートに失敗する場合
もし`docker compose`でイメージの取得に失敗する場合は、以下のように`docker-compose.yml`内のイメージ名を修正してみてください。
```yaml
services:
  web:
    build: .
    image: ghcr.io/hideki0403/kakurega.app:latest # [!code --]
    image: ghcr.io/kakurega-dev/kakurega.app:latest # [!code ++]
    restart: always
```
:::
