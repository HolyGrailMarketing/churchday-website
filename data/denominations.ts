export type DenominationFAQ = { q: string; a: string }

export type Denomination = {
  slug: string
  shortName: string
  fullName: string
  officialSite: string
  // Display strings, not numbers — some carry a "+" and COGOP has none at
  // all (see comment below), so keeping these as free text avoids the
  // temptation to do arithmetic or reformat them inconsistently.
  congregationCount?: string
  memberCount?: string
  foundingNote?: string
  heroFraming: string
  painPoints: { title: string; description: string }[]
  faq: DenominationFAQ[]
  demoSourceTag: string
  metaTitle: string
  metaDescription: string
}

// Every number below was checked against a primary source (the
// denomination's own site, or Wikipedia where that held up) before this
// file was written — nothing here is carried over from an unverified
// estimate. Where a primary source didn't hold up, the field is omitted
// rather than filled with a guess. See the plan for the verification trail.
export const denominations: Record<string, Denomination> = {
  ntcog: {
    slug: 'ntcog',
    shortName: 'NTCOG',
    fullName: 'New Testament Church of God',
    officialSite: 'https://ntcogjamaica.org',
    congregationCount: '361',
    // No membership figure found on ntcogjamaica.org or elsewhere — omitted
    // rather than guessed. NTCOG's own site also claims "2nd largest
    // denomination in Jamaica" — real, but self-reported and not
    // independently corroborated, so deliberately not repeated here.
    heroFraming:
      'Church management software for New Testament Church of God congregations across Jamaica — built for how you already run church, from the member list to the offering.',
    painPoints: [
      {
        title: '361 congregations, one denomination',
        description:
          "New Testament Church of God has 361 congregations across Jamaica — and most are still running membership on paper, in a notebook, or across a dozen different spreadsheets.",
      },
      {
        title: 'Tithes counted by hand',
        description:
          'Offerings collected in cash, counted after service, and tracked separately from the member list — with no clean report at the end of the month.',
      },
      {
        title: 'No island-wide view',
        description:
          "Attendance, giving, and engagement live in a different format at every local church, so there's no easy way to see the whole picture.",
      },
    ],
    faq: [
      {
        q: 'Is ChurchDay built specifically for NTCOG?',
        a: "ChurchDay isn't an official New Testament Church of God system — it's built for Jamaican churches generally, with membership, attendance, JMD giving, and a daily devotional in one app. It's designed around the same day-to-day realities every Jamaican congregation, including NTCOG's 361, deals with.",
      },
      {
        q: "We already use Planning Center's free tier — why switch?",
        a: "Planning Center is genuinely good, and free — keep it if it's working for your member list. What it can't do is your offering: Planning Center Giving doesn't operate in Jamaica, so tithes still end up tracked separately, usually by hand. ChurchDay keeps membership, attendance, and JMD giving in one place, so the monthly report builds itself.",
      },
      {
        q: 'Is any NTCOG church already using ChurchDay?',
        a: "Not yet confirmed — ChurchDay is early, and that's deliberate. We're working closely with a small number of founding churches to build what they actually need. If yours is one of the first, you get our full attention and a real say in where it goes.",
      },
      {
        q: 'What does it cost, and how long does setup take?',
        a: 'Plans start at J$4,500/month for up to 100 members, with a 14-day free trial and no card required. Most churches are live within an afternoon — create your church, add your people at your own pace, and invite your congregation with one link.',
      },
    ],
    demoSourceTag: 'ntcog',
    metaTitle: 'Church Management Software for New Testament Church of God | ChurchDay Jamaica',
    metaDescription:
      "Membership, attendance, and JMD tithes in one app — built for New Testament Church of God's 361 Jamaican congregations. Set up in an afternoon.",
  },
  jbu: {
    slug: 'jbu',
    shortName: 'Jamaica Baptist Union',
    fullName: 'Jamaica Baptist Union',
    officialSite: 'https://jbu.church',
    congregationCount: '337',
    memberCount: '~40,000 communicant members',
    foundingNote: 'Founded 1849, with roots to 1783',
    heroFraming:
      'Church management software for Jamaica Baptist Union congregations — 337 churches strong, with a history stretching back to 1849.',
    painPoints: [
      {
        title: '337 churches, no shared system',
        description:
          "The Jamaica Baptist Union's 337 congregations each keep their own records — usually on paper, sometimes in a spreadsheet, rarely anywhere a leadership team can see clearly.",
      },
      {
        title: 'Tithes counted by hand',
        description:
          'Offerings collected in cash, counted after service, and tracked separately from the member list — with no clean report at the end of the month.',
      },
      {
        title: 'No island-wide view',
        description:
          "Attendance, giving, and engagement live in a different format at every local church, so there's no easy way to see the whole picture.",
      },
    ],
    faq: [
      {
        q: 'Is ChurchDay built specifically for JBU?',
        a: "ChurchDay isn't an official Jamaica Baptist Union system — it's built for Jamaican churches generally, with membership, attendance, JMD giving, and a daily devotional in one app. It's designed around the same day-to-day realities every Jamaican congregation, including JBU's 337, deals with.",
      },
      {
        q: "We already use Planning Center's free tier — why switch?",
        a: "Planning Center is genuinely good, and free — keep it if it's working for your member list. What it can't do is your offering: Planning Center Giving doesn't operate in Jamaica, so tithes still end up tracked separately, usually by hand. ChurchDay keeps membership, attendance, and JMD giving in one place, so the monthly report builds itself.",
      },
      {
        q: 'Is any JBU church already using ChurchDay?',
        a: "Not yet confirmed — ChurchDay is early, and that's deliberate. We're working closely with a small number of founding churches to build what they actually need. If yours is one of the first, you get our full attention and a real say in where it goes.",
      },
      {
        q: 'What does it cost, and how long does setup take?',
        a: 'Plans start at J$4,500/month for up to 100 members, with a 14-day free trial and no card required. Most churches are live within an afternoon — create your church, add your people at your own pace, and invite your congregation with one link.',
      },
    ],
    demoSourceTag: 'jbu',
    metaTitle: 'Church Management Software for Jamaica Baptist Union | ChurchDay Jamaica',
    metaDescription:
      "Membership, attendance, and JMD tithes in one app — built for Jamaica Baptist Union's 337 congregations. Set up in an afternoon, 14-day free trial.",
  },
  cogop: {
    slug: 'cogop',
    shortName: 'Church of God of Prophecy',
    fullName: 'Church of God of Prophecy',
    officialSite: 'https://cogopcaribbean.org',
    // Deliberately no congregation/member count: neither cogopcaribbean.org
    // nor globalcogop.org exposed real figures when checked, and the
    // ~302/1923/Phoenix-Avenue numbers floating around only ever traced
    // back to a secondary aggregator, not COGOP itself. Qualitative
    // language only until someone gets real numbers from COGOP directly.
    heroFraming:
      'Church management software for Church of God of Prophecy congregations across Jamaica — built for how you already run church, from the member list to the offering.',
    painPoints: [
      {
        title: 'Hundreds of congregations, no shared system',
        description:
          'Church of God of Prophecy congregations across Jamaica each keep their own records — usually on paper, sometimes in a spreadsheet, rarely anywhere a leadership team can see clearly.',
      },
      {
        title: 'Tithes counted by hand',
        description:
          'Offerings collected in cash, counted after service, and tracked separately from the member list — with no clean report at the end of the month.',
      },
      {
        title: 'No island-wide view',
        description:
          "Attendance, giving, and engagement live in a different format at every local church, so there's no easy way to see the whole picture.",
      },
    ],
    faq: [
      {
        q: 'Is ChurchDay built specifically for COGOP?',
        a: "ChurchDay isn't an official Church of God of Prophecy system — it's built for Jamaican churches generally, with membership, attendance, JMD giving, and a daily devotional in one app. It's designed around the same day-to-day realities every Jamaican congregation, including COGOP's, deals with.",
      },
      {
        q: "We already use Planning Center's free tier — why switch?",
        a: "Planning Center is genuinely good, and free — keep it if it's working for your member list. What it can't do is your offering: Planning Center Giving doesn't operate in Jamaica, so tithes still end up tracked separately, usually by hand. ChurchDay keeps membership, attendance, and JMD giving in one place, so the monthly report builds itself.",
      },
      {
        q: 'Is any COGOP church already using ChurchDay?',
        a: "Not yet confirmed — ChurchDay is early, and that's deliberate. We're working closely with a small number of founding churches to build what they actually need. If yours is one of the first, you get our full attention and a real say in where it goes.",
      },
      {
        q: 'What does it cost, and how long does setup take?',
        a: 'Plans start at J$4,500/month for up to 100 members, with a 14-day free trial and no card required. Most churches are live within an afternoon — create your church, add your people at your own pace, and invite your congregation with one link.',
      },
    ],
    demoSourceTag: 'cogop',
    metaTitle: 'Church Management Software for Church of God of Prophecy | ChurchDay Jamaica',
    metaDescription:
      'Membership, attendance, and JMD tithes in one app — built for Church of God of Prophecy congregations across Jamaica. Set up in an afternoon.',
  },
  ucjci: {
    slug: 'ucjci',
    shortName: 'United Church',
    fullName: 'United Church in Jamaica and the Cayman Islands',
    officialSite: 'https://www.unitedchurch.ky',
    congregationCount: '200+',
    // Membership deliberately omitted: Wikipedia's 2006 figure (~60,000)
    // conflicts sharply with the ~10,000+ found elsewhere, and neither is
    // current enough today (2026) to state as fact.
    foundingNote: 'Formed 1965 (Presbyterian + Congregational Union merger); Disciples of Christ joined 1992',
    heroFraming:
      'Church management software for United Church in Jamaica and the Cayman Islands congregations — 200+ strong, uniting Presbyterian, Congregational, and Disciples of Christ roots since 1965.',
    painPoints: [
      {
        title: '200+ congregations, no shared system',
        description:
          'United Church congregations across Jamaica and the Cayman Islands each keep their own records — usually on paper, sometimes in a spreadsheet, rarely anywhere a leadership team can see clearly.',
      },
      {
        title: 'Tithes counted by hand',
        description:
          'Offerings collected in cash, counted after service, and tracked separately from the member list — with no clean report at the end of the month.',
      },
      {
        title: 'No island-wide view',
        description:
          "Attendance, giving, and engagement live in a different format at every local church, so there's no easy way to see the whole picture.",
      },
    ],
    faq: [
      {
        q: 'Is ChurchDay built specifically for the United Church?',
        a: "ChurchDay isn't an official United Church system — it's built for Jamaican churches generally, with membership, attendance, JMD giving, and a daily devotional in one app. It's designed around the same day-to-day realities every Jamaican congregation, including the United Church's 200+, deals with.",
      },
      {
        q: "We already use Planning Center's free tier — why switch?",
        a: "Planning Center is genuinely good, and free — keep it if it's working for your member list. What it can't do is your offering: Planning Center Giving doesn't operate in Jamaica, so tithes still end up tracked separately, usually by hand. ChurchDay keeps membership, attendance, and JMD giving in one place, so the monthly report builds itself.",
      },
      {
        q: 'Is any United Church congregation already using ChurchDay?',
        a: "Not yet confirmed — ChurchDay is early, and that's deliberate. We're working closely with a small number of founding churches to build what they actually need. If yours is one of the first, you get our full attention and a real say in where it goes.",
      },
      {
        q: 'What does it cost, and how long does setup take?',
        a: 'Plans start at J$4,500/month for up to 100 members, with a 14-day free trial and no card required. Most churches are live within an afternoon — create your church, add your people at your own pace, and invite your congregation with one link.',
      },
    ],
    demoSourceTag: 'ucjci',
    metaTitle: 'Church Management Software for the United Church in Jamaica | ChurchDay Jamaica',
    metaDescription:
      "Membership, attendance, and JMD tithes in one app — built for the United Church's 200+ Jamaican and Cayman congregations. Set up in an afternoon.",
  },
}

export const DENOMINATION_SLUGS = Object.keys(denominations)

export function getDenomination(slug: string): Denomination | undefined {
  return denominations[slug]
}
