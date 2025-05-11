---
title: セットアップ方法
icon: world-plus
order: 0
---

[[toc]]

## 手動でのセットアップ方法 {#manual}

::: tip
基本的な操作は[MisskeyHubのドキュメント](https://misskey-hub.net/ja/docs/for-admin/install/guides/manual/)に記載されている内容と同様です。  
:::

### 1. 前提ソフトウェアのインストールとユーザーの作成
ドキュメントに記載されている手順に従って、Misskeyの動作に必要なソフトウェアのインストールおよびユーザーの作成を行います。

- [前提ソフトウェア](https://misskey-hub.net/ja/docs/for-admin/install/guides/manual/#%E4%BB%A5%E4%B8%8B%E3%81%AE%E3%82%BD%E3%83%95%E3%83%88%E3%82%A6%E3%82%A7%E3%82%A2%E3%81%8C%E3%82%A4%E3%83%B3%E3%82%B9%E3%83%88%E3%83%BC%E3%83%AB%E8%A8%AD%E5%AE%9A%E3%81%95%E3%82%8C%E3%81%A6%E3%81%84%E3%82%8B%E3%81%93%E3%81%A8)
- [ユーザーの作成](https://misskey-hub.net/ja/docs/for-admin/install/guides/manual/#%E3%83%A6%E3%83%BC%E3%82%B6%E3%83%BC%E3%81%AE%E4%BD%9C%E6%88%90)

### 2. リポジトリのクローンとインストール
以下のコマンドでリポジトリをクローンし、依存関係のインストールを行います。

```bash
sudo -iu misskey
git clone --recursive https://github.com/hideki0403/kakurega.app.git
cd kakurega.app
git checkout master-kakurega
git submodule update --init
NODE_ENV=production pnpm install --frozen-lockfile
```

### 3. 設定およびビルドと初期化
ドキュメントに記載されている手順に従い、設定・ビルド・初期化を行います。

- [設定](https://misskey-hub.net/ja/docs/for-admin/install/guides/manual/#%E8%A8%AD%E5%AE%9A)
- [ビルドと初期化](https://misskey-hub.net/ja/docs/for-admin/install/guides/manual/#%E3%83%93%E3%83%AB%E3%83%89%E3%81%A8%E5%88%9D%E6%9C%9F%E5%8C%96)

### 4. 起動
以下のコマンドでMisskeyを起動できます。

```bash
NODE_ENV=production pnpm run start
```

### 5. サービスの設定 (任意)
ドキュメントに記載されている「[systemdを用いた管理](https://misskey-hub.net/ja/docs/for-admin/install/guides/manual/#%E3%83%93%E3%83%AB%E3%83%89%E3%81%A8%E5%88%9D%E6%9C%9F%E5%8C%96:~:text=GLHF%E2%9C%A8-,systemd%E3%82%92%E7%94%A8%E3%81%84%E3%81%9F%E7%AE%A1%E7%90%86,-Misskey%E3%81%AE%E3%82%A2%E3%83%83%E3%83%97%E3%83%87%E3%83%BC%E3%83%88)」に従って操作を行うことでサービスとして運用することが出来ますが、サービスファイルの作成時に以下の箇所を修正する必要があります。

```ini
[Unit]
Description=Misskey daemon

[Service]
Type=simple
User=misskey
ExecStart=/usr/bin/npm start
WorkingDirectory=/home/misskey/misskey # [!code --]
WorkingDirectory=/home/misskey/kakurega.app # [!code ++]
Environment="NODE_ENV=production"
TimeoutSec=60
StandardOutput=journal
StandardError=journal
SyslogIdentifier=misskey
Restart=always

[Install]
WantedBy=multi-user.target
```

### 6. 検索プロバイダの設定 (任意)
Misskey 2025.1.0からは検索プロバイダとしてpgroongaを使用することが出来るようになっており、隠れ家フォークではノート検索に加えてユーザー検索でもpgroongaを使用するように改変されています。  
検索プロバイダにpgroongaを指定する場合は、**pgroongaを導入した後に**以下のようにインデックスを作成してください。

::: tip
pgroongaのインストール方法は[こちら](https://pgroonga.github.io/ja/install/)を参照してください。
:::

::: info
バージョン `2024.11.0-kakurega.1.39.6` 以前から使用している場合はインデックスを作成する必要はありません。
:::

```sql
CREATE INDEX "IDX_PGROONGA_NOTE_TEXT" ON "note" USING "pgroonga" ("text");
CREATE INDEX "IDX_PGROONGA_USER_NAME" ON "user" USING "pgroonga" ("name" pgroonga_varchar_full_text_search_ops_v2);
CREATE INDEX "IDX_PGROONGA_USER_PROFILE_DESCRIPTION" ON "user_profile" USING "pgroonga" ("description" pgroonga_varchar_full_text_search_ops_v2);
```

## Dockerを用いたセットアップ方法 {#docker}

::: tip
基本的な操作は[MisskeyHubのドキュメント](https://misskey-hub.net/ja/docs/for-admin/install/guides/docker/)に記載されている内容と同様ですが、隠れ家フォークを使用する場合は手順「ビルドと初期化」を行う必要はありません。
:::

::: info Note
DockerおよびDocker Composeがインストールされていることを前提としています。  
インストールされていない場合はインストールをした上で、以下の手順に従って操作してください
:::

### 1. リポジトリのクローン

```bash
git clone -b master-kakurega https://github.com/hideki0403/kakurega.app.git
cd kakurega.app
git checkout master-kakurega
```

### 2. configのセットアップ

以下のコマンドで設定ファイルをコピーし、configの編集を行います。  

```bash
cp .config/docker_example.yml .config/default.yml
cp .config/docker_example.env .config/docker.env
cp ./docker-compose_example.yml ./docker-compose.yml
```

基本的には`default.yml`の編集のみで問題ありません。

::: warning Important
`default.yml`内のPostgreSQLの接続に使用するデータベース名、ユーザー名、パスワードを変更した場合は`docker.env`も編集してください。
:::

::: info Note
公開するポートを変更する場合は`docker-compose.yml`も編集してください。
:::

### 3. Dockerコンテナの起動

以下のコマンドでMisskeyを起動することができます。


```bash
sudo docker compose up -d
```
