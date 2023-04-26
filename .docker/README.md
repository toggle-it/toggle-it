# Configure for local development

**Step 1**

- Add the following in the hosts file

```
127.0.0.1     local.toggleit.dev
```

**Step 2**

- Install mkcert and generate self signed certificate
- Rename generated certificate to `toggleit.pem` and key to `toggleit.key.pem` and place it in `.docker` folder

```bash
mkcert -install
mkcert "*.toggleit.dev" localhost 127.0.0.1 ::1
```

**Step 3**

- Create .env file in root folder
- Update variables in `Auth secrets` section
- Update your local IPv4 address for `API_URL` and `APP_URL` in _.env_ file

```bash
cp example.env .env
```

<u>**FYI:**</u>

If configuring oauth2 authentication then use these callback url to generate provider's `CLIENT_ID` and `CLIENT_SECRET`

- **Google:** `https://local.toggleit.dev/auth/callback/google`
- **Microsoft:** `https://local.toggleit.dev/auth/callback/microsoft`

**Step 4**

- Start docker containers
- Start API and WEB server. The following commands with spin up nginx and mongodb and start dev mode `packages/config` and its dependents `apps/web` and `apps/api`

```bash
docker compose up -d
yarn dev --filter=...config
```

**Step 5**

- Go to https://local.toggleit.dev/ to view live changes for webapp
- Go to https://local.toggleit.dev/api/v2/doc to view nestjs swagger documentation

Happy coding 😎
