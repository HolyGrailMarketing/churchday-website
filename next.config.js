/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async rewrites() {
    return [
      // Public giving links: www.church-day.com/give/<slug>.
      //
      // The page itself is rendered by the `givingPage` Cloud Function — donors
      // are not signed in, and every Firestore path in the project requires
      // auth, so the page has to be built server-side with the Admin SDK (see
      // functions/src/givingPage.ts). This rewrite exists purely to put a
      // brandable, printable URL in front of it; a cloudfunctions.net link is
      // not something a church can put in a bulletin.
      //
      // A rewrite rather than a redirect: the donor's address bar keeps saying
      // church-day.com, and the form POST stays same-origin. Next.js proxies
      // every method, so both the GET and the POST reach the function.
      //
      // Deploy order matters. The admin UI only starts showing these URLs once
      // `config/public.givingBaseUrl` is set in Firestore, which should happen
      // AFTER this is live — until then admins are shown the function URL, so
      // nobody can copy a link that 404s. See GivingPageService.linkBase().
      {
        source: '/give/:slug',
        destination:
          'https://us-central1-church-app-3ae50.cloudfunctions.net/givingPage/:slug',
      },
    ]
  },
}

module.exports = nextConfig
