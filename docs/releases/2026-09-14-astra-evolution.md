# TIVONIX Astra Evolution — 2026-09-14

## Release identity

- `PRE_ASTRA_SHA`: `83f164d6f4338766a5f96178175e81cdb449e1b2`
- `RELEASE_SHA`: `4924eddbe5f2f7f7d4d2fde164d8b5b271ccb3d5`
- Backup branch: `backup/pre-astra-evolution-2026-09-14-0547`
- Backup tag: `pre-astra-evolution-2026-09-14-0547`
- Astra branch: `astra/product-evolution-2026-09-14`
- Pull request: `https://github.com/danilatitovets/tivonix/pull/2`
- Vercel deployment check: `https://vercel.com/danilas-projects-f4408b85/tivonix/M6o6k8mEc4FUE9zVqH5TZ6WtF9Sg`

## Astra commits

1. `b7a4578` `fix(analytics): count conversions after delivered lead`
2. `0d65183` `feat(leads): introduce structured product brief`
3. `c99d607` `feat(positioning): elevate product engineering proof`
4. `ce32c9c` `perf(mileseal): defer PDF export dependencies`
5. `a3aed52` `chore(deps): apply safe npm audit updates`

## What changed

- Repositioned the primary story around founder-led product engineering and product proof.
- Preserved the existing dark, ember, cinematic visual language and scroll-led hero concept.
- Moved proof of complex systems earlier on the homepage and clarified Product Engineering versus Launch Packages.
- Reworked the lead form into a short structured product brief with product type, users, workflow, integrations, timeline, and budget context.
- Corrected analytics so Ads conversion is emitted only after confirmed lead delivery; added contract checks.
- Updated RU/EN/ZH copy, metadata, project proof, About, pricing, and localized SEO checks.
- Deferred MileSeal PDF export dependencies until the export action is used.
- Applied non-breaking npm audit updates; remaining advisories are transitive Vercel dependency issues and were not force-upgraded.

## Verification

- `npm run typecheck` passed.
- `npm test` passed, including lead and analytics contracts.
- `npm run build` passed: client, SSR, prerender, and SEO checks.
- Changed-file ESLint passed.
- Static SSR smoke passed for key RU/EN/ZH routes with one title, description, and canonical per page.
- Full repository lint still contains legacy unrelated violations.
- Playwright visual/hydration capture was blocked by unavailable Chromium downloads in the execution environment.

## Known limitations / owner input

- Vercel status and runtime logs require access to the `danilas-projects-f4408b85` workspace; the connector returned `403` for that scope.
- Browser screenshot QA must be rerun from an environment with Chromium available.
- Existing public claims and client evidence should continue to be owner-verified before being promoted into stronger trust copy.
- Corporate email, legal entity details, and verified testimonials remain owner inputs; no unverified claims were added.

## Exact rollback procedure

1. Confirm `main` has no unrelated commits after `RELEASE_SHA` that must be preserved.
2. Create a new branch from current `main` for the rollback.
3. Revert the Astra merge commit without rewriting history:

   ```bash
   git revert -m 1 4924eddbe5f2f7f7d4d2fde164d8b5b271ccb3d5
   ```

4. Run `npm run typecheck`, `npm test`, and `npm run build`.
5. Open a pull request targeting `main`; merge it normally after checks pass.
6. Wait for the new Vercel deployment and verify the critical routes and lead flow.
7. Keep the backup branch, backup tag, Astra branch, and this manifest permanently.

Never force-push `main` and never delete the backup references.
