import type { GuideCategory, GuideLocale } from "./extraGuides";

export type SeoIntent = "country" | "comparison" | "howto" | "review" | "usecase";
export type CompetitionTier = "high" | "medium" | "low";
type Region = "asia" | "europe" | "americas" | "middle-east-africa" | "oceania" | "global";

export interface SeoProgramEntry {
  slug: string;
  category: GuideCategory;
  intent: SeoIntent;
  primaryKeyword: string;
  secondaryKeywords: string[];
  competition: CompetitionTier;
  region: Region;
  countrySlug?: string;
}

interface CountrySeed {
  slug: string;
  countrySlug: string;
  primaryKeyword: string;
  competition: CompetitionTier;
  region: Region;
}

interface TopicSeed {
  slug: string;
  category: GuideCategory;
  intent: SeoIntent;
  primaryKeyword: string;
  secondaryKeywords: string[];
  competition: CompetitionTier;
  region?: Region;
}

export interface SeoProgramContent {
  sections: { heading: string; body: string }[];
  faq: { q: string; a: string }[];
  datePublished?: string;
  dateModified?: string;
}

interface SeoProgramCountryOverride {
  introAngle: string;
  tripSegment: string;
  mismatchRisk: string;
  bufferAdvice: string;
  regionalDecision: string;
}

export const SEO_PROGRAM_OVERRIDE_DATE = "2026-04-07";
export const SEO_PROGRAM_DEFAULT_PUBLISHED_DATE = "2026-03-10";

const ENGLISH_COUNTRY_OVERRIDES: Partial<Record<string, SeoProgramCountryOverride>> = {
  "brazil-esim": {
    introAngle: "Brazil trips often combine dense city days with long domestic transfer days, so a plan that feels generous in Rio or Sao Paulo can feel much tighter once airport coordination, ride-hailing, and intercity movement stack up.",
    tripSegment: "The plan choice changes most when the itinerary adds more than one major city, a waterfall stop, or a coastline segment. Those are the days where the convenience gap between a thin starter plan and a calmer, more recoverable plan becomes obvious.",
    mismatchRisk: "The common mistake is buying for a weekend-in-one-city data pattern and then applying the same logic to a multi-stop Brazil route. That usually underestimates navigation, translation, and transport use on travel days.",
    bufferAdvice: "For Brazil, it is usually safer to size for the hardest transfer day rather than the average city day. The reader should think about the day with the most navigation, booking checks, and arrival logistics, then leave headroom above that.",
    regionalDecision: "If the route also touches nearby countries, the decision should include whether a wider regional plan removes mid-trip repurchasing. If not, a Brazil-specific plan still works best when the route stays fully domestic.",
  },
  "argentina-esim": {
    introAngle: "Argentina itineraries often swing between easy urban days and much longer travel days, so the best eSIM decision is usually tied to route shape rather than headline price.",
    tripSegment: "The plan choice changes once Buenos Aires is no longer the only anchor. Patagonia flights, Mendoza moves, or longer inland transfers put more weight on stability and recovery than on the cheapest starting allowance.",
    mismatchRisk: "Travelers often overestimate how well a city-break data estimate translates to a wider Argentina itinerary. That is where under-sizing starts to create friction later in the trip.",
    bufferAdvice: "The safer approach is to leave room for transfer-heavy days and booking checks instead of optimizing only for cafe and hotel Wi-Fi days. That usually leads to a calmer recommendation.",
    regionalDecision: "Regional plans only become attractive if the route is part of a broader South America trip. Otherwise, a destination-focused plan is easier to reason about and easier to size well.",
  },
  "peru-esim": {
    introAngle: "Peru is one of the clearest examples of why altitude, transfers, and sightseeing structure matter more than average daily data use.",
    tripSegment: "The itinerary changes most when Lima is paired with Cusco, Machu Picchu logistics, or other high-movement days. That is when offline backup habits and clear order recovery matter more than minimal price.",
    mismatchRisk: "A common mistake is assuming that a light-city usage pattern tells the whole story. The mismatch usually appears on transfer days, station days, or itinerary changes around more remote sightseeing.",
    bufferAdvice: "Readers should leave more headroom for route changes, ticket checks, and translation-heavy moments than they would for a pure city trip. The right buffer is about uncertainty, not only raw streaming volume.",
    regionalDecision: "Regional plans only win if Peru is one stop inside a wider cross-border route. If Peru is the core destination, a country plan remains easier to size and easier to evaluate.",
  },
  "colombia-esim": {
    introAngle: "Colombia routes often move between major cities and more relaxed regional stops, which means the best eSIM choice depends on how often the traveler will be in motion.",
    tripSegment: "The buying decision changes when Bogota, Medellin, and Cartagena are all in the same trip instead of one-city stays. Frequent transport days create more pressure on maps, bookings, and messaging than the average sightseeing day suggests.",
    mismatchRisk: "The usual mistake is treating Colombia as one uniform urban pattern. That can lead to under-sizing once the route includes multiple city hops or work-heavy days.",
    bufferAdvice: "The safer recommendation is to leave room for transit days, backup navigation, and occasional hotspot use rather than optimizing for the lightest day on the trip.",
    regionalDecision: "A broader regional plan only becomes important when Colombia is part of a larger Latin America route. Otherwise, the clearer decision is often a Colombia-focused plan with enough margin for movement days.",
  },
  "chile-esim": {
    introAngle: "Chile rewards route-based planning because a city stay and a long scenic itinerary place very different demands on the plan.",
    tripSegment: "The recommendation shifts once the trip adds longer domestic movement, desert segments, or Patagonia-style logistics. Those days make buffer and order recovery more important than a low starting price.",
    mismatchRisk: "Travelers often buy for a Santiago usage pattern and only later realize that long-distance days are where the connectivity pressure shows up.",
    bufferAdvice: "In Chile, it is safer to size for the longest day between destinations and any navigation-heavy scenic segments. That buffer is usually what prevents unnecessary top-up stress later.",
    regionalDecision: "Regional coverage matters mainly when Chile is one leg of a larger South America itinerary. Otherwise, a destination-led plan is easier to align with the actual route.",
  },
  "netherlands-esim": {
    introAngle: "The Netherlands usually looks easy on paper, but the real decision often depends on whether the trip stays local or keeps spilling into neighboring countries.",
    tripSegment: "A mostly Amsterdam-based trip can use a very different plan from one that adds Rotterdam, day trips, or regular cross-border movement. Those short rail-heavy days are what shift the recommendation.",
    mismatchRisk: "The common mistake is assuming that because distances are short, any small plan will do. Frequent rail navigation, ticketing, and side trips can still make a thin allowance feel tight.",
    bufferAdvice: "The better sizing rule is to think about how many moving days the itinerary has, not just how many nights it includes. Short-country trips can still be surprisingly active on data.",
    regionalDecision: "This is one of the clearest countries where a regional Europe option can be more practical than a single-country plan if the traveler expects even light cross-border movement.",
  },
  "belgium-esim": {
    introAngle: "Belgium often works as a short-hop trip, which means the best eSIM choice depends less on long-haul data volume and more on whether the traveler is moving between cities or countries every day.",
    tripSegment: "The recommendation changes once Brussels becomes one stop among Bruges, Antwerp, or nearby international rail segments. Frequent movement compresses many data needs into short windows.",
    mismatchRisk: "The main mistake is underestimating how many navigation and booking checks happen on rail-heavy itineraries, especially when the traveler is trying to keep the trip flexible.",
    bufferAdvice: "Readers should leave more room for movement days than a city-break budget would suggest. The plan only has to feel thin once to become annoying.",
    regionalDecision: "Belgium is another destination where a Europe-wide option can be the cleaner choice if nearby-country movement is realistic rather than hypothetical.",
  },
  "austria-esim": {
    introAngle: "Austria trips often combine easy city connectivity with train or alpine days that change what a sensible plan looks like.",
    tripSegment: "The plan choice shifts when Vienna is no longer the whole trip and Salzburg, Innsbruck, or scenic rail segments enter the itinerary. That is where travelers start caring more about buffer and recovery.",
    mismatchRisk: "A common mistake is buying for urban comfort and not for mountain or transfer days. That makes the plan look cheaper than it feels in practice.",
    bufferAdvice: "The safer recommendation is to size for the most mobile day on the itinerary and any period where the phone becomes the main navigation or booking device.",
    regionalDecision: "Regional Europe plans become more attractive once Austria is combined with neighboring countries. If not, a country-specific plan keeps the buying decision simpler.",
  },
  "ireland-esim": {
    introAngle: "Ireland trips often look simple at booking stage, but the route can quickly shift from city use into scenic driving or coast-heavy days where stable guidance matters more.",
    tripSegment: "The recommendation changes most when Dublin stops being the center of the trip and the route moves toward west-coast or multi-stop driving days.",
    mismatchRisk: "Travelers often budget for a low-data city break and forget that route changes, weather checks, and navigation add up quickly on longer scenic days.",
    bufferAdvice: "It is better to leave room for map use, booking lookups, and fallback connectivity during longer drives than to optimize too tightly around average daily use.",
    regionalDecision: "A broader regional plan only matters when Ireland is combined with nearby-country travel. If the whole trip stays in Ireland, a country plan is still easier to tune well.",
  },
  "poland-esim": {
    introAngle: "Poland tends to reward practical planning more than flashy plan comparisons because many trips involve several cities linked by simple but data-dependent movement.",
    tripSegment: "The key shift happens when Warsaw is paired with Krakow, Gdansk, or other intercity legs. Rail planning and flexible day changes make those routes more data-reliant than they first appear.",
    mismatchRisk: "The common error is assuming that because the cities are connected well, the plan can be sized like a static city trip. In practice, the moving days are where the buffer matters.",
    bufferAdvice: "A safer choice leaves enough room for route changes, navigation, and train-day logistics rather than only the quiet hotel and cafe periods.",
    regionalDecision: "If Poland is part of a broader Europe itinerary, a regional plan may simplify things. If the trip stays domestic, the decision is usually clearer with a country-led plan.",
  },
  "denmark-esim": {
    introAngle: "Denmark usually feels straightforward, but frequent short transfers and side trips can still turn a small plan into a stressful one if the route is active enough.",
    tripSegment: "The plan changes once Copenhagen becomes one stop inside a wider rail or ferry-based itinerary rather than the only destination.",
    mismatchRisk: "The main mismatch comes from treating Denmark like a static city break when the traveler is actually moving often and checking transport constantly.",
    bufferAdvice: "The better approach is to size for the number of movement windows and transport decisions, not only for the total number of days.",
    regionalDecision: "Regional coverage becomes useful once the trip expects Nordic or nearby-Europe movement. Otherwise, Denmark-specific sizing stays easier to control.",
  },
  "finland-esim": {
    introAngle: "Finland is a good example of a destination where weather, longer distances, and winter-style trip structure can matter more than raw average data use.",
    tripSegment: "The recommendation changes sharply when Helsinki is paired with Lapland, overnight movement, or any trip pattern that depends on real-time updates.",
    mismatchRisk: "Travelers often size for calm city use and forget that winter logistics, longer transfers, and more remote segments create extra reliance on the phone.",
    bufferAdvice: "It is safer to leave headroom for movement, weather checks, and backup navigation than to optimize too closely around low daily averages.",
    regionalDecision: "Regional plans only become the better choice if Finland is part of a larger Nordic route. For single-country itineraries, the cleaner answer is still usually Finland-focused.",
  },
  "egypt-esim": {
    introAngle: "Egypt itineraries often put more pressure on arrival-day coordination and transfer clarity than on ordinary day-to-day browsing volume.",
    tripSegment: "The plan choice changes when Cairo is combined with Luxor, Aswan, desert movement, or resort segments. Those transitions are where stable access and easy recovery matter most.",
    mismatchRisk: "A common mistake is thinking only in terms of hotel Wi-Fi and city use. The friction usually shows up during transfers, itinerary changes, and direction-heavy sightseeing days.",
    bufferAdvice: "The safer plan is the one that feels calm during airport arrival, station moves, and booking checks, not just on low-pressure sightseeing afternoons.",
    regionalDecision: "Regional coverage matters only if Egypt is one part of a wider Middle East or Africa route. Otherwise, a country-first plan stays easier to judge.",
  },
  "qatar-esim": {
    introAngle: "Qatar trips are often short, but that does not make the decision trivial because layovers, business arrivals, and airport-to-hotel movement compress many needs into a very small time window.",
    tripSegment: "The recommendation changes most when the trip includes a stopover, overnight arrival, or a work-oriented schedule rather than a slow sightseeing itinerary.",
    mismatchRisk: "The usual mistake is to assume that a short stay automatically means almost no data. In practice, short stays can be the most concentrated in terms of maps, messaging, booking checks, and transport coordination.",
    bufferAdvice: "It is usually smarter to optimize for a smooth arrival and first few hours than to shave the plan down too tightly on price alone.",
    regionalDecision: "Regional plans only make sense if Qatar is part of a wider Gulf itinerary. For stopovers or Doha-centered visits, the simpler country-specific decision is usually better.",
  },
  "saudi-arabia-esim": {
    introAngle: "Saudi Arabia routes often become more demanding once the trip moves beyond one city, because the distance between major stops changes how the plan should be judged.",
    tripSegment: "The eSIM recommendation changes when Riyadh, Jeddah, or Madinah are combined instead of treated as separate trips. Long intercity movement raises the value of a calmer buffer and clear recovery options.",
    mismatchRisk: "Travelers often compare plans as if the trip were one urban stay. That misses the moments when navigation, timing, and booking checks concentrate around transfer days.",
    bufferAdvice: "The safer sizing rule is to plan for the most movement-heavy day and any period where the phone becomes the main logistics tool rather than just a light browsing device.",
    regionalDecision: "A wider regional plan is only necessary when the route crosses into a broader Gulf trip. For domestic travel, a Saudi-focused plan is easier to size accurately.",
  },
  "macau-esim": {
    introAngle: "Macau stays are often short, but the real decision is whether the trip is truly Macau-only or part of a wider Hong Kong and ferry-linked itinerary.",
    tripSegment: "The recommendation changes once the traveler expects border crossings, day returns, or quick movement between hotel, historic center, and Cotai rather than a single static base.",
    mismatchRisk: "The common mistake is assuming that a short stay means a very thin plan is enough even when the route involves multiple movement windows and side trips.",
    bufferAdvice: "The better rule is to size for a compact but busy itinerary. Short stays can still be navigation-heavy if the traveler is moving often and making real-time decisions.",
    regionalDecision: "Macau is one of the clearest cases where a broader regional option may be more practical if the route naturally overlaps with Hong Kong or nearby destinations.",
  },
};

const ENGLISH_TOPIC_OVERRIDES: Partial<Record<string, SeoProgramContent>> = {
  "pocket-wifi-vs-esim-japan": {
    sections: [
      {
        heading: "The real Japan comparison is friction on arrival",
        body: "Most travelers searching this topic are not choosing between two abstract technologies. They are choosing between two kinds of arrival-day experience. Pocket WiFi asks the traveler to manage pickup, battery, charging, and return. Japan eSIM asks the traveler to confirm compatibility and installation before the trip. The cleaner option depends on where the traveler wants the friction to happen.\n\nThat is why this comparison works best when it starts with the first twelve hours in Japan rather than a spec sheet.",
      },
      {
        heading: "When pocket WiFi still makes sense",
        body: "Pocket WiFi can still be sensible when one connection will be shared across several people or devices, when the traveler strongly prefers not to install anything on the phone before departure, or when a dedicated battery-backed device feels easier to manage than dual-SIM settings.\n\nBut those advantages come with a physical workflow. Someone still has to pick it up, keep it charged, and return it correctly at the end.",
      },
      {
        heading: "When eSIM is the cleaner Japan option",
        body: "eSIM is usually cleaner for solo travelers, shorter trips, airport-to-hotel navigation, and anyone who wants to be online the moment the plane lands. It removes pickup and return logistics and generally keeps the travel day simpler.\n\nThat matters more in Japan than many travelers expect, because route-finding, train decisions, and station complexity can all make the first hours feel busier than planned.",
      },
      {
        heading: "What foreign travelers often underestimate in Japan",
        body: "The usual blind spot is not data size. It is the amount of route-checking, timetable confirmation, and map use that happens on station days, day trips, and neighborhood changes. Even travelers who expect to rely on hotel Wi-Fi often end up needing stable mobile data much more often than they thought.\n\nThat is why the right recommendation depends on travel style, not only on the headline daily price.",
      },
      {
        heading: "A decision framework that is actually usable",
        body: "Choose eSIM first if the priority is immediate arrival-day connectivity, fewer physical logistics, and a simpler one-person setup. Choose pocket WiFi first if the trip is group-based, device-sharing is central, or the traveler actively prefers a separate hardware connection.\n\nThe article should not pretend that one option wins for every Japan trip. It should make the tradeoff explicit enough that the traveler can decide before checkout.",
      },
    ],
    faq: [
      { q: "Is eSIM usually better for a solo Japan trip?", a: "In most cases, yes. It removes pickup and return steps and keeps the arrival day simpler." },
      { q: "When does pocket WiFi still make more sense?", a: "It is strongest when multiple people or devices will share one connection and the group is comfortable managing a separate device." },
      { q: "What is the main Japan-specific pain point here?", a: "The first hours often involve more navigation and station decisions than travelers expect, so friction on arrival matters a lot." },
      { q: "Should I decide based only on price per day?", a: "No. The real cost includes pickup, charging, return, setup confidence, and how much arrival-day complexity you want to carry." },
    ],
    dateModified: SEO_PROGRAM_OVERRIDE_DATE,
  },
  "esim-qr-code-not-working": {
    sections: [
      {
        heading: "Most QR failures are setup issues, not network issues",
        body: "When an eSIM QR code does not work, the problem is usually happening before the device ever reaches the network. The common failure points are display quality, device compatibility, existing eSIM storage limits, and whether the code has already been used or partially installed.\n\nA useful article should separate those causes immediately so the reader does not waste time troubleshooting the wrong layer.",
      },
      {
        heading: "Check the phone before checking the provider",
        body: "The fastest checks are practical ones: confirm the phone supports eSIM, make sure there is still room for another profile, raise screen brightness if scanning from another device, and verify that the QR is being scanned from a stable display rather than a compressed screenshot.\n\nThose steps solve a large share of failures without needing support.",
      },
      {
        heading: "When to switch to manual activation flow",
        body: "If the QR still fails, the next branch is whether the provider also exposes a manual activation path. That usually means using an SM-DP+ address or equivalent install details instead of relying on the camera step.\n\nThe article becomes more useful when it explains that the QR step is only one installation path, not the whole setup process.",
      },
      {
        heading: "What not to do while retrying",
        body: "The main risk is repeatedly retrying without confirming what changed. Travelers can make the situation harder by deleting a partially added profile too quickly, skipping screenshots of the original order details, or assuming the code can be reissued without checking the provider rules.\n\nA good recovery article should slow the user down and make each retry deliberate.",
      },
      {
        heading: "What support needs in order to help quickly",
        body: "If support is needed, the best starting bundle is the device model, the exact error or failure point, whether the profile appears anywhere in settings already, and whether the traveler has tried manual activation details. That makes it much easier to distinguish a phone-side issue from a provider-side one.\n\nFor stressed travelers, this section is often more useful than another generic list of camera tips.",
      },
    ],
    faq: [
      { q: "Does a QR failure mean the eSIM plan itself is broken?", a: "Not necessarily. Many QR failures happen before the plan reaches the network layer at all." },
      { q: "What should I check first?", a: "Device compatibility, available eSIM storage, scan quality, and whether the code has already been partially used are the first checks." },
      { q: "Should I keep rescanning the same code?", a: "Only after confirming what changed. Random repeated retries often make the situation less clear." },
      { q: "When should I contact support?", a: "After you have confirmed device support, tried a clean scan, and checked whether manual installation details are available." },
    ],
    dateModified: SEO_PROGRAM_OVERRIDE_DATE,
  },
  "esim-install-before-travel": {
    sections: [
      {
        heading: "Install before travel is usually about stress reduction",
        body: "Travelers search this topic because they are trying to reduce risk on departure day. Installing before travel is usually less about saving time during the trip and more about moving setup into a calm moment with reliable Wi-Fi.\n\nThat makes the question less technical than it first appears. It is really a timing and confidence decision.",
      },
      {
        heading: "Install and activate are not the same thing",
        body: "The most important distinction is between adding the eSIM profile and starting the plan. Many travelers can safely install in advance and only enable the travel line after arrival, but the exact timing still depends on how the provider counts validity.\n\nA good article should explain that difference clearly instead of turning the whole topic into a yes-or-no rule.",
      },
      {
        heading: "When pre-installing is the safer option",
        body: "Pre-installing is usually safer when the traveler wants arrival-day simplicity, expects a long-haul or late-night landing, or does not want to troubleshoot while moving through immigration, baggage claim, or a first train transfer.\n\nThose are exactly the moments when a calm pre-trip setup pays off.",
      },
      {
        heading: "When waiting can still make sense",
        body: "Waiting can still make sense if the traveler is unsure about device support, is worried about activating too early, or wants to confirm the final destination setup details once the itinerary is locked. But even then, the article should usually recommend reading and saving the order details before departure.\n\nThe worst version of this topic is waiting without preparing anything at all.",
      },
      {
        heading: "The practical rule travelers can actually use",
        body: "The useful rule is simple: install early if the phone is confirmed compatible and the provider validity rules are clear, then activate at the point that matches the trip. Save the order details, keep the instructions accessible, and avoid making the airport the first place you think about setup.\n\nThat turns the question into a manageable checklist instead of a last-minute gamble.",
      },
    ],
    faq: [
      { q: "Is it usually safe to install before the trip?", a: "Often yes, as long as the phone is compatible and you understand when plan validity begins." },
      { q: "Does installing early always activate the plan?", a: "Not always. Installation and activation are often different steps." },
      { q: "What should I save before departure?", a: "Keep the order page, QR or manual activation details, and the provider instructions easy to reopen." },
      { q: "What is the biggest mistake here?", a: "Leaving everything until the airport without even checking compatibility or saving the setup details." },
    ],
    dateModified: SEO_PROGRAM_OVERRIDE_DATE,
  },
  "nomad-review": {
    sections: [
      {
        heading: "What kind of traveler is really looking at Nomad",
        body: "Nomad tends to attract travelers who already understand the basics of eSIM and are comparing app-led providers rather than asking whether eSIM itself is a good idea. That means the review has to go beyond surface-level pricing and actually explain where Nomad fits.\n\nThe key question is not whether Nomad works. It is which kind of trip makes Nomad feel straightforward and which kind makes a more destination-led purchase flow feel safer.",
      },
      {
        heading: "Where Nomad tends to feel strong",
        body: "Nomad is usually strongest for repeat eSIM users who are comfortable buying through an app, want quick access to country or regional options, and do not need the article itself to carry them all the way through the final choice.\n\nThat makes it appealing for travelers who already know how they size data and how they handle activation timing.",
      },
      {
        heading: "Where the review needs to stay honest",
        body: "The limitation is that an app-centered experience is not always the same as a destination-centered research flow. Travelers who are still unsure about plan size, hotspot needs, or recovery expectations may need more buying context than the app alone naturally provides.\n\nThat is where a review has to be explicit about fit instead of repeating generic praise.",
      },
      {
        heading: "What to compare against a destination-first purchase flow",
        body: "The real comparison is not only Nomad versus another brand. It is Nomad versus a destination-first experience where the traveler can move from guide to plan page to setup recovery with fewer context switches.\n\nThat is a meaningful difference for first-time buyers and for travelers who want more editorial guidance before they pay.",
      },
      {
        heading: "Who should treat Nomad as a strong option",
        body: "Nomad is easier to recommend to travelers who already know their usage pattern, trust app-led buying flows, and want speed. It is less obviously the best fit when the traveler still needs help narrowing the itinerary, sizing the plan, or understanding support and recovery before purchase.\n\nThat is the distinction a useful review should keep front and center.",
      },
    ],
    faq: [
      { q: "Who is Nomad best suited to?", a: "Repeat eSIM users and travelers who are comfortable with fast, app-centered buying flows." },
      { q: "What is the main limitation?", a: "It can feel thinner on editorial guidance if the traveler still needs help choosing the right plan for the route." },
      { q: "What should I compare besides price?", a: "Compare plan clarity, setup recovery, hotspot expectations, and how much buying context you need before checkout." },
      { q: "When might a destination-first flow be better?", a: "When you want country-specific guidance and a clearer path from research to purchase to setup recovery." },
    ],
    dateModified: SEO_PROGRAM_OVERRIDE_DATE,
  },
  "ubigi-review": {
    sections: [
      {
        heading: "Ubigi makes the most sense when the app experience matters",
        body: "Travelers usually search Ubigi after hearing about the app, device compatibility, or repeat-use convenience rather than because they are just starting their eSIM research. That changes what a useful review should cover.\n\nThe review has to explain whether the app-centered flow is actually an advantage for the trip in front of the reader.",
      },
      {
        heading: "Where Ubigi often feels convenient",
        body: "Ubigi tends to appeal to travelers who want an app-managed experience, expect repeat trips, or already know that they prefer handling the purchase and activation inside one familiar interface.\n\nThat can feel efficient for business travel, repeat international movement, or travelers who do not need much editorial help to decide.",
      },
      {
        heading: "Where the friction still shows up",
        body: "The main weakness is that app convenience does not automatically solve the earlier planning questions. Travelers still need to know whether the plan fits the route, whether the allowance is enough, and how easy recovery will be if something goes wrong later.\n\nA useful review should say that plainly instead of treating app presence as the whole product story.",
      },
      {
        heading: "What to compare against destination-led buying",
        body: "The meaningful comparison is between an app-first workflow and a destination-led site flow where the traveler can read, compare, and buy from the context of the actual trip. Those are different experiences even if both ultimately sell eSIM plans.\n\nThat distinction matters most for first-time travelers and for anyone who values pre-purchase clarity more than app speed.",
      },
      {
        heading: "Who should keep Ubigi on the shortlist",
        body: "Ubigi is easier to shortlist for travelers who already know their data pattern, like app-managed tools, and expect repeat use over time. It is a less obvious default for someone who is still deciding between destinations, plan sizes, or support expectations.\n\nThat makes the review useful only if it is honest about the reader profile it serves best.",
      },
    ],
    faq: [
      { q: "Who usually gets the most value from Ubigi?", a: "Travelers who like app-centered management and expect to use eSIM repeatedly across future trips." },
      { q: "What should I compare besides the app?", a: "Compare destination fit, plan clarity, hotspot policy, and how easy the recovery path feels if setup fails." },
      { q: "Is Ubigi automatically better for business travelers?", a: "Not automatically. It is strong when the traveler values a familiar app flow, but the plan still has to fit the route and support expectations." },
      { q: "When is a destination-led purchase flow still better?", a: "When the traveler wants more itinerary-specific guidance before paying and less guesswork around plan selection." },
    ],
    dateModified: SEO_PROGRAM_OVERRIDE_DATE,
  },
};

function buildEnglishCountryOverride(
  title: string,
  description: string,
  override: SeoProgramCountryOverride,
): SeoProgramContent {
  return {
    sections: [
      {
        heading: `Why ${title} decisions feel different on the ground`,
        body: `${description}\n\n${override.introAngle}`,
      },
      {
        heading: "Which part of the itinerary changes the recommendation",
        body: override.tripSegment,
      },
      {
        heading: `Where travelers usually get ${title} wrong`,
        body: override.mismatchRisk,
      },
      {
        heading: "How much buffer to leave in the plan",
        body: override.bufferAdvice,
      },
      {
        heading: "When a broader regional option becomes the better choice",
        body: override.regionalDecision,
      },
      {
        heading: "What a stronger buying decision looks like",
        body: "A stronger article does not stop at saying the destination needs an eSIM. It explains which day of the trip puts the most pressure on connectivity, what kind of traveler can safely buy lean, and when simplicity matters more than squeezing out the lowest possible price.\n\nThat is the difference between a generic destination page and one that actually helps a traveler buy with confidence.",
      },
    ],
    faq: [
      { q: `What makes ${title} harder to size than a simple city trip?`, a: override.introAngle },
      { q: "Should I size for the average day or the hardest day?", a: override.bufferAdvice },
      { q: "What is the most common mistake travelers make here?", a: override.mismatchRisk },
      { q: "When should I compare a regional plan instead?", a: override.regionalDecision },
    ],
    dateModified: SEO_PROGRAM_OVERRIDE_DATE,
  };
}

function getSeoProgramOverrideContent(params: {
  entry: SeoProgramEntry;
  locale: GuideLocale;
  title: string;
  description: string;
}) {
  if (params.locale !== "en") {
    return null;
  }

  const countryOverride = ENGLISH_COUNTRY_OVERRIDES[params.entry.slug];
  if (countryOverride && params.entry.intent === "country") {
    return buildEnglishCountryOverride(
      params.title,
      params.description,
      countryOverride,
    );
  }

  return ENGLISH_TOPIC_OVERRIDES[params.entry.slug] ?? null;
}

const COUNTRY_SEEDS: CountrySeed[] = [
  { slug: "japan-esim", countrySlug: "japan", primaryKeyword: "日本 esim", competition: "high", region: "asia" },
  { slug: "korea-esim", countrySlug: "south-korea", primaryKeyword: "韓国 esim", competition: "high", region: "asia" },
  { slug: "thailand-esim", countrySlug: "thailand", primaryKeyword: "タイ esim", competition: "high", region: "asia" },
  { slug: "usa-esim", countrySlug: "united-states", primaryKeyword: "アメリカ esim", competition: "high", region: "americas" },
  { slug: "uk-esim", countrySlug: "united-kingdom", primaryKeyword: "イギリス esim", competition: "high", region: "europe" },
  { slug: "france-esim", countrySlug: "france", primaryKeyword: "フランス esim", competition: "high", region: "europe" },
  { slug: "italy-esim", countrySlug: "italy", primaryKeyword: "イタリア esim", competition: "high", region: "europe" },
  { slug: "spain-esim", countrySlug: "spain", primaryKeyword: "スペイン esim", competition: "high", region: "europe" },
  { slug: "germany-esim", countrySlug: "germany", primaryKeyword: "ドイツ esim", competition: "high", region: "europe" },
  { slug: "australia-esim", countrySlug: "australia", primaryKeyword: "オーストラリア esim", competition: "high", region: "oceania" },
  { slug: "singapore-esim", countrySlug: "singapore", primaryKeyword: "シンガポール esim", competition: "high", region: "asia" },
  { slug: "taiwan-esim", countrySlug: "taiwan", primaryKeyword: "台湾 esim", competition: "high", region: "asia" },
  { slug: "vietnam-esim", countrySlug: "vietnam", primaryKeyword: "ベトナム esim", competition: "medium", region: "asia" },
  { slug: "indonesia-esim", countrySlug: "indonesia", primaryKeyword: "インドネシア esim", competition: "medium", region: "asia" },
  { slug: "malaysia-esim", countrySlug: "malaysia", primaryKeyword: "マレーシア esim", competition: "medium", region: "asia" },
  { slug: "philippines-esim", countrySlug: "philippines", primaryKeyword: "フィリピン esim", competition: "medium", region: "asia" },
  { slug: "china-esim", countrySlug: "china", primaryKeyword: "中国 esim", competition: "high", region: "asia" },
  { slug: "canada-esim", countrySlug: "canada", primaryKeyword: "カナダ esim", competition: "medium", region: "americas" },
  { slug: "turkey-esim", countrySlug: "turkey", primaryKeyword: "トルコ esim", competition: "medium", region: "europe" },
  { slug: "india-esim", countrySlug: "india", primaryKeyword: "インド esim", competition: "medium", region: "asia" },
  { slug: "hawaii-esim", countrySlug: "united-states", primaryKeyword: "ハワイ esim", competition: "high", region: "americas" },
  { slug: "guam-esim", countrySlug: "guam", primaryKeyword: "グアム esim", competition: "medium", region: "americas" },
  { slug: "hong-kong-esim", countrySlug: "hong-kong", primaryKeyword: "香港 esim", competition: "medium", region: "asia" },
  { slug: "dubai-esim", countrySlug: "united-arab-emirates", primaryKeyword: "ドバイ esim", competition: "medium", region: "middle-east-africa" },
  { slug: "europe-esim", countrySlug: "europe", primaryKeyword: "ヨーロッパ esim", competition: "high", region: "europe" },
  { slug: "cambodia-esim", countrySlug: "cambodia", primaryKeyword: "カンボジア esim", competition: "medium", region: "asia" },
  { slug: "greece-esim", countrySlug: "greece", primaryKeyword: "ギリシャ esim", competition: "medium", region: "europe" },
  { slug: "mexico-esim", countrySlug: "mexico", primaryKeyword: "メキシコ esim", competition: "medium", region: "americas" },
  { slug: "new-zealand-esim", countrySlug: "new-zealand", primaryKeyword: "ニュージーランド esim", competition: "medium", region: "oceania" },
  { slug: "norway-esim", countrySlug: "norway", primaryKeyword: "ノルウェー esim", competition: "medium", region: "europe" },
  { slug: "portugal-esim", countrySlug: "portugal", primaryKeyword: "ポルトガル esim", competition: "medium", region: "europe" },
  { slug: "switzerland-esim", countrySlug: "switzerland", primaryKeyword: "スイス esim", competition: "medium", region: "europe" },
  { slug: "morocco-esim", countrySlug: "morocco", primaryKeyword: "モロッコ esim", competition: "low", region: "middle-east-africa" },
  { slug: "iceland-esim", countrySlug: "iceland", primaryKeyword: "アイスランド esim", competition: "medium", region: "europe" },
  { slug: "sri-lanka-esim", countrySlug: "sri-lanka", primaryKeyword: "スリランカ esim", competition: "medium", region: "asia" },
  { slug: "brazil-esim", countrySlug: "brazil", primaryKeyword: "ブラジル esim", competition: "medium", region: "americas" },
  { slug: "argentina-esim", countrySlug: "argentina", primaryKeyword: "アルゼンチン esim", competition: "low", region: "americas" },
  { slug: "peru-esim", countrySlug: "peru", primaryKeyword: "ペルー esim", competition: "low", region: "americas" },
  { slug: "colombia-esim", countrySlug: "colombia", primaryKeyword: "コロンビア esim", competition: "low", region: "americas" },
  { slug: "chile-esim", countrySlug: "chile", primaryKeyword: "チリ esim", competition: "low", region: "americas" },
  { slug: "netherlands-esim", countrySlug: "netherlands", primaryKeyword: "オランダ esim", competition: "medium", region: "europe" },
  { slug: "belgium-esim", countrySlug: "belgium", primaryKeyword: "ベルギー esim", competition: "low", region: "europe" },
  { slug: "austria-esim", countrySlug: "austria", primaryKeyword: "オーストリア esim", competition: "low", region: "europe" },
  { slug: "ireland-esim", countrySlug: "ireland", primaryKeyword: "アイルランド esim", competition: "low", region: "europe" },
  { slug: "croatia-esim", countrySlug: "croatia", primaryKeyword: "クロアチア esim", competition: "medium", region: "europe" },
  { slug: "czech-republic-esim", countrySlug: "czech-republic", primaryKeyword: "チェコ esim", competition: "low", region: "europe" },
  { slug: "poland-esim", countrySlug: "poland", primaryKeyword: "ポーランド esim", competition: "low", region: "europe" },
  { slug: "denmark-esim", countrySlug: "denmark", primaryKeyword: "デンマーク esim", competition: "low", region: "europe" },
  { slug: "sweden-esim", countrySlug: "sweden", primaryKeyword: "スウェーデン esim", competition: "medium", region: "europe" },
  { slug: "finland-esim", countrySlug: "finland", primaryKeyword: "フィンランド esim", competition: "medium", region: "europe" },
  { slug: "egypt-esim", countrySlug: "egypt", primaryKeyword: "エジプト esim", competition: "medium", region: "middle-east-africa" },
  { slug: "south-africa-esim", countrySlug: "south-africa", primaryKeyword: "南アフリカ esim", competition: "low", region: "middle-east-africa" },
  { slug: "kenya-esim", countrySlug: "kenya", primaryKeyword: "ケニア esim", competition: "low", region: "middle-east-africa" },
  { slug: "qatar-esim", countrySlug: "qatar", primaryKeyword: "カタール esim", competition: "low", region: "middle-east-africa" },
  { slug: "saudi-arabia-esim", countrySlug: "saudi-arabia", primaryKeyword: "サウジアラビア esim", competition: "low", region: "middle-east-africa" },
  { slug: "nepal-esim", countrySlug: "nepal", primaryKeyword: "ネパール esim", competition: "low", region: "asia" },
  { slug: "macau-esim", countrySlug: "macau", primaryKeyword: "マカオ esim", competition: "low", region: "asia" },
  { slug: "japan-tourist-esim-guide", countrySlug: "japan", primaryKeyword: "japan tourist esim", competition: "high", region: "asia" },
  { slug: "korea-tourist-esim-guide", countrySlug: "south-korea", primaryKeyword: "korea tourist esim", competition: "high", region: "asia" },
  { slug: "bali-esim", countrySlug: "indonesia", primaryKeyword: "bali esim", competition: "high", region: "asia" },
  { slug: "phuket-esim", countrySlug: "thailand", primaryKeyword: "phuket esim", competition: "high", region: "asia" },
  { slug: "bangkok-esim", countrySlug: "thailand", primaryKeyword: "bangkok esim", competition: "high", region: "asia" },
  { slug: "tokyo-esim-guide", countrySlug: "japan", primaryKeyword: "tokyo esim", competition: "high", region: "asia" },
  { slug: "seoul-esim-guide", countrySlug: "south-korea", primaryKeyword: "seoul esim", competition: "high", region: "asia" },
  { slug: "london-esim", countrySlug: "united-kingdom", primaryKeyword: "london esim", competition: "high", region: "europe" },
  { slug: "paris-esim", countrySlug: "france", primaryKeyword: "paris esim", competition: "high", region: "europe" },
  { slug: "israel-esim", countrySlug: "israel", primaryKeyword: "イスラエル esim", competition: "low", region: "middle-east-africa" },
  { slug: "jordan-esim", countrySlug: "jordan", primaryKeyword: "ヨルダン esim", competition: "low", region: "middle-east-africa" },
  { slug: "new-york-esim", countrySlug: "united-states", primaryKeyword: "new york esim", competition: "high", region: "americas" },
  { slug: "los-angeles-esim", countrySlug: "united-states", primaryKeyword: "los angeles esim", competition: "high", region: "americas" },
  { slug: "las-vegas-esim", countrySlug: "united-states", primaryKeyword: "las vegas esim", competition: "medium", region: "americas" },
  { slug: "rome-esim", countrySlug: "italy", primaryKeyword: "rome esim", competition: "high", region: "europe" },
  { slug: "barcelona-esim", countrySlug: "spain", primaryKeyword: "barcelona esim", competition: "high", region: "europe" },
  { slug: "amsterdam-esim", countrySlug: "netherlands", primaryKeyword: "amsterdam esim", competition: "medium", region: "europe" },
  { slug: "dubai-city-esim", countrySlug: "united-arab-emirates", primaryKeyword: "dubai city esim", competition: "high", region: "middle-east-africa" },
  { slug: "osaka-esim-guide", countrySlug: "japan", primaryKeyword: "osaka esim", competition: "high", region: "asia" },
  { slug: "kyoto-esim-guide", countrySlug: "japan", primaryKeyword: "kyoto esim", competition: "medium", region: "asia" },
  { slug: "okinawa-esim", countrySlug: "japan", primaryKeyword: "沖縄 esim", competition: "medium", region: "asia" },
  { slug: "istanbul-esim", countrySlug: "turkey", primaryKeyword: "istanbul esim", competition: "medium", region: "europe" },
  { slug: "lisbon-esim", countrySlug: "portugal", primaryKeyword: "lisbon esim", competition: "medium", region: "europe" },
  { slug: "berlin-esim", countrySlug: "germany", primaryKeyword: "berlin esim", competition: "medium", region: "europe" },
  { slug: "munich-esim", countrySlug: "germany", primaryKeyword: "munich esim", competition: "medium", region: "europe" },
  { slug: "sydney-esim", countrySlug: "australia", primaryKeyword: "sydney esim", competition: "high", region: "oceania" },
  { slug: "melbourne-esim", countrySlug: "australia", primaryKeyword: "melbourne esim", competition: "medium", region: "oceania" },
  { slug: "vienna-esim", countrySlug: "austria", primaryKeyword: "vienna esim", competition: "low", region: "europe" },
  { slug: "prague-esim", countrySlug: "czech-republic", primaryKeyword: "prague esim", competition: "medium", region: "europe" },
  { slug: "singapore-city-esim", countrySlug: "singapore", primaryKeyword: "singapore city esim", competition: "high", region: "asia" },
  { slug: "kuala-lumpur-esim", countrySlug: "malaysia", primaryKeyword: "kuala lumpur esim", competition: "medium", region: "asia" },
  { slug: "ho-chi-minh-esim", countrySlug: "vietnam", primaryKeyword: "ho chi minh esim", competition: "medium", region: "asia" },
  { slug: "hanoi-esim", countrySlug: "vietnam", primaryKeyword: "hanoi esim", competition: "medium", region: "asia" },
  { slug: "taipei-esim", countrySlug: "taiwan", primaryKeyword: "taipei esim", competition: "high", region: "asia" },
  { slug: "hong-kong-city-esim", countrySlug: "hong-kong", primaryKeyword: "hong kong city esim", competition: "medium", region: "asia" },
  { slug: "toronto-esim", countrySlug: "canada", primaryKeyword: "toronto esim", competition: "medium", region: "americas" },
  { slug: "vancouver-esim", countrySlug: "canada", primaryKeyword: "vancouver esim", competition: "medium", region: "americas" },
  { slug: "san-francisco-esim", countrySlug: "united-states", primaryKeyword: "san francisco esim", competition: "high", region: "americas" },
  { slug: "miami-esim", countrySlug: "united-states", primaryKeyword: "miami esim", competition: "medium", region: "americas" },
  { slug: "tanzania-esim", countrySlug: "tanzania", primaryKeyword: "タンザニア esim", competition: "low", region: "middle-east-africa" },
  { slug: "ethiopia-esim", countrySlug: "ethiopia", primaryKeyword: "エチオピア esim", competition: "low", region: "middle-east-africa" },
  { slug: "uzbekistan-esim", countrySlug: "uzbekistan", primaryKeyword: "ウズベキスタン esim", competition: "low", region: "asia" },
  { slug: "georgia-esim", countrySlug: "georgia", primaryKeyword: "ジョージア esim", competition: "low", region: "europe" },
  { slug: "fukuoka-esim", countrySlug: "japan", primaryKeyword: "fukuoka esim", competition: "low", region: "asia" },
  { slug: "sapporo-esim", countrySlug: "japan", primaryKeyword: "sapporo esim", competition: "low", region: "asia" },
  { slug: "busan-esim", countrySlug: "south-korea", primaryKeyword: "busan esim", competition: "medium", region: "asia" },
  { slug: "jeju-esim", countrySlug: "south-korea", primaryKeyword: "jeju esim", competition: "low", region: "asia" },
  { slug: "da-nang-esim", countrySlug: "vietnam", primaryKeyword: "da nang esim", competition: "medium", region: "asia" },
  { slug: "chiang-mai-esim", countrySlug: "thailand", primaryKeyword: "chiang mai esim", competition: "medium", region: "asia" },
  { slug: "boracay-esim", countrySlug: "philippines", primaryKeyword: "boracay esim", competition: "low", region: "asia" },
  { slug: "cebu-esim", countrySlug: "philippines", primaryKeyword: "cebu esim", competition: "medium", region: "asia" },
  { slug: "athens-esim", countrySlug: "greece", primaryKeyword: "athens esim", competition: "medium", region: "europe" },
  { slug: "cairo-esim", countrySlug: "egypt", primaryKeyword: "cairo esim", competition: "medium", region: "middle-east-africa" },
  { slug: "marrakech-esim", countrySlug: "morocco", primaryKeyword: "marrakech esim", competition: "low", region: "middle-east-africa" },
  { slug: "reykjavik-esim", countrySlug: "iceland", primaryKeyword: "reykjavik esim", competition: "low", region: "europe" },
];

const TOPIC_SEEDS: TopicSeed[] = [
  { slug: "wifi-vs-esim", category: "howto", intent: "comparison", primaryKeyword: "wifi vs esim", secondaryKeywords: ["ポケットwifi esim 比較", "海外 wifi esim どっち"], competition: "high" },
  { slug: "how-to-setup-esim", category: "howto", intent: "howto", primaryKeyword: "esim 設定方法", secondaryKeywords: ["esim 使い方", "esim 開通 方法"], competition: "high" },
  { slug: "esim-compatible-phones", category: "howto", intent: "howto", primaryKeyword: "esim 対応機種", secondaryKeywords: ["esim 対応スマホ", "iphone esim 対応"], competition: "high" },
  { slug: "esim-troubleshooting", category: "howto", intent: "howto", primaryKeyword: "esim つながらない", secondaryKeywords: ["esim 不具合", "esim 開通しない"], competition: "high" },
  { slug: "esim-vs-sim-card", category: "howto", intent: "comparison", primaryKeyword: "esim simカード 違い", secondaryKeywords: ["esim physical sim 比較", "esim メリット デメリット"], competition: "medium" },
  { slug: "esim-for-business-travel", category: "howto", intent: "usecase", primaryKeyword: "出張 esim", secondaryKeywords: ["ビジネス travel esim", "法人 出張 esim"], competition: "medium" },
  { slug: "first-time-esim", category: "howto", intent: "howto", primaryKeyword: "初めて esim", secondaryKeywords: ["esim 初心者", "esim 入門"], competition: "medium" },
  { slug: "esim-data-plans-explained", category: "howto", intent: "howto", primaryKeyword: "esim データプラン", secondaryKeywords: ["esim 何gb", "esim 有効期限"], competition: "medium" },
  { slug: "travel-internet-options", category: "howto", intent: "comparison", primaryKeyword: "海外旅行 ネット 接続 方法", secondaryKeywords: ["旅行 internet options", "海外 通信 手段"], competition: "high" },
  { slug: "dual-sim-esim", category: "howto", intent: "howto", primaryKeyword: "デュアルsim esim", secondaryKeywords: ["esim 2回線", "海外 esim 日本sim 併用"], competition: "medium" },
  { slug: "esim-for-students", category: "howto", intent: "usecase", primaryKeyword: "留学 esim", secondaryKeywords: ["学生 esim", "ワーホリ esim"], competition: "medium" },
  { slug: "esim-long-term-travel", category: "howto", intent: "usecase", primaryKeyword: "長期旅行 esim", secondaryKeywords: ["世界一周 esim", "長期滞在 esim"], competition: "medium" },
  { slug: "save-money-roaming", category: "howto", intent: "comparison", primaryKeyword: "ローミング 節約", secondaryKeywords: ["海外ローミング 高い", "esim ローミング 代わり"], competition: "high" },
  { slug: "asia-travel-connectivity", category: "topic", intent: "comparison", primaryKeyword: "アジア esim 比較", secondaryKeywords: ["アジア 旅行 通信", "アジア 周遊 esim"], competition: "medium", region: "asia" },
  { slug: "europe-travel-connectivity", category: "topic", intent: "comparison", primaryKeyword: "ヨーロッパ 旅行 通信", secondaryKeywords: ["eu roaming esim", "ヨーロッパ 周遊 esim"], competition: "medium", region: "europe" },
  { slug: "best-esim-providers", category: "topic", intent: "comparison", primaryKeyword: "海外 esim おすすめ", secondaryKeywords: ["esim おすすめ", "海外 esim 比較"], competition: "high", region: "global" },
  { slug: "international-esim", category: "topic", intent: "comparison", primaryKeyword: "international esim", secondaryKeywords: ["best travel esim", "international travel esim", "global esim"], competition: "high", region: "global" },
  { slug: "global-esim", category: "topic", intent: "comparison", primaryKeyword: "global esim", secondaryKeywords: ["best global esim", "global travel esim", "worldwide esim"], competition: "high", region: "global" },
  { slug: "esim-vs-roaming", category: "topic", intent: "comparison", primaryKeyword: "esim vs roaming", secondaryKeywords: ["travel esim vs roaming", "international roaming vs esim", "roaming alternative esim"], competition: "high", region: "global" },
  { slug: "best-esim-for-north-america", category: "topic", intent: "comparison", primaryKeyword: "north america esim", secondaryKeywords: ["best esim for north america", "usa canada mexico esim", "north america travel esim"], competition: "high", region: "americas" },
  { slug: "travel-data-usage-tips", category: "topic", intent: "howto", primaryKeyword: "旅行 データ 節約", secondaryKeywords: ["海外 データ 使いすぎ", "esim 節約"], competition: "medium" },
  { slug: "international-calling-esim", category: "topic", intent: "howto", primaryKeyword: "esim 国際通話", secondaryKeywords: ["海外 電話 esim", "esim 電話番号"], competition: "medium" },
  { slug: "cruise-travel-esim", category: "topic", intent: "usecase", primaryKeyword: "クルーズ esim", secondaryKeywords: ["船旅 esim", "寄港地 esim"], competition: "low" },
  { slug: "digital-nomad-esim", category: "topic", intent: "usecase", primaryKeyword: "デジタルノマド esim", secondaryKeywords: ["nomad esim", "remote work esim"], competition: "medium", region: "global" },
  { slug: "family-travel-esim", category: "topic", intent: "usecase", primaryKeyword: "家族旅行 esim", secondaryKeywords: ["ファミリー esim", "複数台 esim"], competition: "low" },
  { slug: "esim-prepaid-vs-postpaid", category: "topic", intent: "comparison", primaryKeyword: "esim プリペイド ポストペイド", secondaryKeywords: ["prepaid esim postpaid", "旅行 esim 料金体系"], competition: "low" },
  { slug: "esim-security-tips", category: "topic", intent: "howto", primaryKeyword: "esim セキュリティ", secondaryKeywords: ["esim 安全性", "sim swap 対策"], competition: "medium" },
  { slug: "airport-connectivity-guide", category: "topic", intent: "comparison", primaryKeyword: "空港 wifi esim", secondaryKeywords: ["airport connectivity", "空港 通信"], competition: "medium" },
  { slug: "esim-activation-timing", category: "topic", intent: "howto", primaryKeyword: "esim いつ 有効化", secondaryKeywords: ["esim activate when", "出発前 esim"], competition: "medium" },
  { slug: "travel-apps-esim", category: "topic", intent: "usecase", primaryKeyword: "旅行 アプリ esim", secondaryKeywords: ["esim travel apps", "海外旅行 アプリ"], competition: "low" },
  { slug: "esim-iphone-setup", category: "howto", intent: "howto", primaryKeyword: "iphone esim 設定", secondaryKeywords: ["iphone esim 追加", "iphone esim 使い方"], competition: "high" },
  { slug: "esim-android-setup", category: "howto", intent: "howto", primaryKeyword: "android esim 設定", secondaryKeywords: ["galaxy esim 設定", "pixel esim 設定"], competition: "high" },
  { slug: "airalo-review", category: "topic", intent: "review", primaryKeyword: "airalo 評判", secondaryKeywords: ["airalo review", "airalo esim"], competition: "high", region: "global" },
  { slug: "holafly-review", category: "topic", intent: "review", primaryKeyword: "holafly 評判", secondaryKeywords: ["holafly review", "holafly esim"], competition: "high", region: "global" },
  { slug: "esim-speed-test", category: "topic", intent: "comparison", primaryKeyword: "esim 速度", secondaryKeywords: ["esim speed test", "海外 esim 速度"], competition: "medium" },
  { slug: "esim-for-remote-workers", category: "topic", intent: "usecase", primaryKeyword: "リモートワーク esim", secondaryKeywords: ["remote workers esim", "ノマド 通信"], competition: "medium", region: "global" },
  { slug: "pocket-wifi-vs-esim-japan", category: "topic", intent: "comparison", primaryKeyword: "日本 ポケットwifi esim", secondaryKeywords: ["japan pocket wifi esim", "日本 esim 比較"], competition: "high", region: "asia" },
  { slug: "esim-unlimited-data", category: "topic", intent: "comparison", primaryKeyword: "esim 無制限", secondaryKeywords: ["unlimited data esim", "無制限 esim 比較"], competition: "high", region: "global" },
  { slug: "cheapest-esim-plans", category: "topic", intent: "comparison", primaryKeyword: "格安 esim", secondaryKeywords: ["安い esim", "cheap esim"], competition: "high", region: "global" },
  { slug: "best-esim-for-europe", category: "topic", intent: "comparison", primaryKeyword: "ヨーロッパ esim おすすめ", secondaryKeywords: ["best esim for europe", "ヨーロッパ 周遊 esim"], competition: "high", region: "europe" },
  { slug: "best-esim-for-asia", category: "topic", intent: "comparison", primaryKeyword: "アジア esim おすすめ", secondaryKeywords: ["best esim for asia", "アジア 周遊 esim"], competition: "high", region: "asia" },
  { slug: "esim-vs-airport-sim", category: "topic", intent: "comparison", primaryKeyword: "esim 空港sim 比較", secondaryKeywords: ["airport sim vs esim", "空港sim どっち"], competition: "medium" },
  { slug: "esim-hotspot-tethering", category: "howto", intent: "howto", primaryKeyword: "esim テザリング", secondaryKeywords: ["esim hotspot", "esim tethering"], competition: "high" },
  { slug: "how-much-data-do-i-need-for-travel", category: "howto", intent: "howto", primaryKeyword: "旅行 データ 何gb", secondaryKeywords: ["how much data travel", "海外旅行 データ量"], competition: "high" },
  { slug: "esim-for-backpackers", category: "topic", intent: "usecase", primaryKeyword: "バックパッカー esim", secondaryKeywords: ["backpacker esim", "周遊旅行 esim"], competition: "medium", region: "global" },
  { slug: "esim-for-road-trips", category: "topic", intent: "usecase", primaryKeyword: "ロードトリップ esim", secondaryKeywords: ["road trip esim", "ドライブ旅行 esim"], competition: "low" },
  { slug: "esim-for-solo-travel", category: "topic", intent: "usecase", primaryKeyword: "一人旅 esim", secondaryKeywords: ["solo travel esim", "ひとり旅 通信"], competition: "low" },
  { slug: "esim-for-honeymoon", category: "topic", intent: "usecase", primaryKeyword: "ハネムーン esim", secondaryKeywords: ["honeymoon esim", "新婚旅行 通信"], competition: "low" },
  { slug: "esim-qr-code-not-working", category: "howto", intent: "howto", primaryKeyword: "esim qrコード 読み取れない", secondaryKeywords: ["esim qr 失敗", "esim qr code not working"], competition: "high" },
  { slug: "esim-install-before-travel", category: "howto", intent: "howto", primaryKeyword: "esim 旅行前 インストール", secondaryKeywords: ["install esim before travel", "出発前 esim 設定"], competition: "medium" },
  { slug: "nomad-review", category: "topic", intent: "review", primaryKeyword: "nomad esim 評判", secondaryKeywords: ["nomad review", "nomad esim"], competition: "medium", region: "global" },
  { slug: "ubigi-review", category: "topic", intent: "review", primaryKeyword: "ubigi 評判", secondaryKeywords: ["ubigi review", "ubigi esim"], competition: "medium", region: "global" },
  { slug: "esim-instant-activation", category: "howto", intent: "howto", primaryKeyword: "esim 即日 開通", secondaryKeywords: ["esim 即日", "esim instant activation", "esim 当日"], competition: "medium" },
  { slug: "esim-one-week-plan", category: "topic", intent: "comparison", primaryKeyword: "esim 1週間 海外", secondaryKeywords: ["7 day travel esim", "海外 esim 短期", "esim 一週間"], competition: "medium", region: "global" },
  { slug: "esim-one-month-plan", category: "topic", intent: "comparison", primaryKeyword: "esim 1ヶ月 海外", secondaryKeywords: ["30 day travel esim", "海外 esim 長期 1ヶ月", "esim 月額 海外"], competition: "medium", region: "global" },
  { slug: "esim-refund-guide", category: "howto", intent: "howto", primaryKeyword: "esim 返金", secondaryKeywords: ["esim refund", "esim キャンセル", "esim 払い戻し"], competition: "low" },
  { slug: "esim-top-up-guide", category: "howto", intent: "howto", primaryKeyword: "esim 容量追加", secondaryKeywords: ["esim チャージ", "esim top up", "esim データ追加"], competition: "medium" },
  { slug: "esim-5g-coverage", category: "topic", intent: "comparison", primaryKeyword: "esim 5g 対応", secondaryKeywords: ["5g travel esim", "海外 esim 5g", "best 5g esim"], competition: "medium", region: "global" },
  { slug: "rakuten-mobile-vs-travel-esim", category: "topic", intent: "comparison", primaryKeyword: "楽天モバイル 海外 esim 比較", secondaryKeywords: ["楽天モバイル 海外ローミング", "rakuten mobile overseas", "楽天 海外 2gb"], competition: "medium", region: "global" },
  { slug: "ahamo-vs-travel-esim", category: "topic", intent: "comparison", primaryKeyword: "ahamo 海外 esim 比較", secondaryKeywords: ["ahamo 海外 15日", "ahamo 海外ローミング", "ahamo 海外 使い方"], competition: "medium", region: "global" },
  { slug: "povo-vs-travel-esim", category: "topic", intent: "comparison", primaryKeyword: "povo 海外 esim", secondaryKeywords: ["povo 海外トッピング", "povo 海外ローミング", "povo overseas"], competition: "low", region: "global" },
  { slug: "esim-for-kids", category: "topic", intent: "usecase", primaryKeyword: "esim 子供 海外", secondaryKeywords: ["子供 スマホ 海外", "kids travel esim", "家族 esim 子供"], competition: "low" },
  { slug: "airalo-vs-holafly", category: "topic", intent: "comparison", primaryKeyword: "airalo vs holafly", secondaryKeywords: ["airalo holafly 比較", "holafly airalo どっち", "best esim airalo holafly"], competition: "high", region: "global" },
  { slug: "airalo-vs-nomad", category: "topic", intent: "comparison", primaryKeyword: "airalo vs nomad", secondaryKeywords: ["airalo nomad 比較", "nomad airalo どっち", "nomad esim review"], competition: "medium", region: "global" },
  { slug: "saily-review", category: "topic", intent: "review", primaryKeyword: "saily esim 評判", secondaryKeywords: ["saily review", "nordvpn esim", "saily esim"], competition: "medium", region: "global" },
  { slug: "jetpac-review", category: "topic", intent: "review", primaryKeyword: "jetpac esim 評判", secondaryKeywords: ["jetpac review", "jetpac travel esim", "jetpac esim"], competition: "low", region: "global" },
  { slug: "esim-without-credit-card", category: "howto", intent: "howto", primaryKeyword: "esim クレジットカードなし", secondaryKeywords: ["esim without credit card", "esim paypal", "esim コンビニ払い"], competition: "low" },
  { slug: "apple-watch-esim-travel", category: "howto", intent: "howto", primaryKeyword: "apple watch esim 海外", secondaryKeywords: ["apple watch 海外 使える", "apple watch travel esim", "watch esim 海外利用"], competition: "low" },
  { slug: "scandinavia-esim", category: "topic", intent: "comparison", primaryKeyword: "北欧 esim 周遊", secondaryKeywords: ["scandinavia travel esim", "北欧 esim", "nordic esim"], competition: "medium", region: "europe" },
  { slug: "balkans-esim", category: "topic", intent: "comparison", primaryKeyword: "バルカン半島 esim", secondaryKeywords: ["balkans travel esim", "balkans esim", "croatia serbia esim"], competition: "low", region: "europe" },
  { slug: "caribbean-esim", category: "topic", intent: "comparison", primaryKeyword: "カリブ海 esim", secondaryKeywords: ["caribbean travel esim", "caribbean esim", "bahamas jamaica esim"], competition: "low", region: "americas" },
  { slug: "oceania-esim", category: "topic", intent: "comparison", primaryKeyword: "オセアニア esim", secondaryKeywords: ["oceania travel esim", "australia new zealand esim", "pacific esim"], competition: "low", region: "oceania" },
  { slug: "middle-east-esim", category: "topic", intent: "comparison", primaryKeyword: "中東 esim 周遊", secondaryKeywords: ["middle east travel esim", "uae jordan israel esim", "middle east esim"], competition: "low", region: "middle-east-africa" },
  { slug: "esim-for-concerts-kpop", category: "topic", intent: "usecase", primaryKeyword: "k-pop ライブ 韓国 esim", secondaryKeywords: ["kpop 遠征 esim", "韓国 ライブ遠征 esim", "kpop concert travel esim"], competition: "low", region: "asia" },
  { slug: "esim-for-sports-events", category: "topic", intent: "usecase", primaryKeyword: "海外 スポーツ観戦 esim", secondaryKeywords: ["olympics travel esim", "world cup esim", "海外 観戦 通信"], competition: "low", region: "global" },
  { slug: "esim-for-youtubers-creators", category: "topic", intent: "usecase", primaryKeyword: "旅行 youtuber esim", secondaryKeywords: ["content creator travel esim", "vlogger esim", "旅行 vlog 通信"], competition: "low", region: "global" },
  { slug: "esim-pixel-setup", category: "howto", intent: "howto", primaryKeyword: "google pixel esim 設定", secondaryKeywords: ["pixel esim setup", "pixel 海外 esim", "pixel 8 esim"], competition: "medium" },
  { slug: "esim-galaxy-setup", category: "howto", intent: "howto", primaryKeyword: "galaxy esim 設定", secondaryKeywords: ["samsung galaxy esim", "galaxy s24 esim", "galaxy z fold esim"], competition: "medium" },
  { slug: "esim-ipad-cellular-travel", category: "howto", intent: "howto", primaryKeyword: "ipad cellular 海外 esim", secondaryKeywords: ["ipad esim travel", "ipad 海外 esim", "ipad cellular 旅行"], competition: "low" },
  { slug: "esim-vpn-overseas", category: "howto", intent: "howto", primaryKeyword: "海外 esim vpn", secondaryKeywords: ["travel esim vpn", "esim vpn 併用", "vpn 海外旅行"], competition: "medium", region: "global" },
  { slug: "chatgpt-overseas-esim", category: "howto", intent: "howto", primaryKeyword: "海外 chatgpt 使える", secondaryKeywords: ["chatgpt 海外旅行", "chatgpt abroad esim", "chatgpt 地域制限"], competition: "medium", region: "global" },
  { slug: "google-maps-offline-travel", category: "howto", intent: "howto", primaryKeyword: "google maps オフライン 海外", secondaryKeywords: ["google maps offline travel", "google map オフライン eSIM", "旅行 地図 オフライン"], competition: "medium", region: "global" },
  { slug: "esim-2fa-sms-abroad", category: "howto", intent: "howto", primaryKeyword: "海外 sms 2段階認証", secondaryKeywords: ["2fa sms abroad", "海外 銀行 sms", "デュアルsim 2段階認証"], competition: "low" },
  { slug: "esim-roaming-carrier-comparison", category: "topic", intent: "comparison", primaryKeyword: "海外ローミング esim 比較", secondaryKeywords: ["carrier roaming vs esim", "キャリア 海外 esim 比較", "roaming esim comparison"], competition: "high", region: "global" },
  { slug: "esim-battery-usage", category: "howto", intent: "howto", primaryKeyword: "esim バッテリー 消費", secondaryKeywords: ["esim battery drain", "デュアルsim バッテリー", "esim 電池 持ち"], competition: "low" },
  { slug: "esim-corporate-bulk", category: "topic", intent: "usecase", primaryKeyword: "法人 esim 一括", secondaryKeywords: ["corporate travel esim", "企業 出張 esim", "bulk esim business"], competition: "low", region: "global" },
  { slug: "esim-for-flight-attendants", category: "topic", intent: "usecase", primaryKeyword: "ca esim 海外", secondaryKeywords: ["flight attendant esim", "客室乗務員 通信", "cabin crew travel esim"], competition: "low", region: "global" },
  { slug: "esim-for-tour-guides", category: "topic", intent: "usecase", primaryKeyword: "添乗員 esim", secondaryKeywords: ["tour guide travel esim", "ツアー 添乗 通信", "tour leader esim"], competition: "low", region: "global" },
  { slug: "central-asia-esim", category: "topic", intent: "comparison", primaryKeyword: "中央アジア esim", secondaryKeywords: ["central asia travel esim", "シルクロード esim", "uzbekistan kazakhstan esim"], competition: "low", region: "asia" },
  { slug: "africa-safari-esim", category: "topic", intent: "usecase", primaryKeyword: "アフリカ サファリ esim", secondaryKeywords: ["africa safari travel esim", "kenya tanzania esim", "safari esim"], competition: "low", region: "middle-east-africa" },
  { slug: "esim-for-marathon-running", category: "topic", intent: "usecase", primaryKeyword: "海外 マラソン esim", secondaryKeywords: ["marathon travel esim", "海外レース 通信", "runner travel esim"], competition: "low", region: "global" },
  { slug: "esim-for-study-abroad", category: "topic", intent: "usecase", primaryKeyword: "交換留学 esim", secondaryKeywords: ["study abroad esim", "exchange student esim", "短期留学 esim"], competition: "low", region: "global" },
  { slug: "esim-for-medical-tourism", category: "topic", intent: "usecase", primaryKeyword: "医療ツーリズム esim", secondaryKeywords: ["medical tourism esim", "海外治療 通信", "medical travel esim"], competition: "low", region: "global" },
  { slug: "esim-for-pilgrimage", category: "topic", intent: "usecase", primaryKeyword: "巡礼 esim", secondaryKeywords: ["pilgrimage travel esim", "聖地 通信", "mecca vatican santiago esim"], competition: "low", region: "global" },
  { slug: "esim-travel-insurance-combo", category: "topic", intent: "comparison", primaryKeyword: "海外 esim 旅行保険 比較", secondaryKeywords: ["travel insurance data addon", "旅行保険 通信特約", "insurance esim"], competition: "low", region: "global" },
  { slug: "esim-for-cruise-mediterranean", category: "topic", intent: "usecase", primaryKeyword: "地中海クルーズ esim", secondaryKeywords: ["mediterranean cruise esim", "地中海 寄港地 通信", "cruise esim europe"], competition: "low", region: "europe" },
  { slug: "esim-vs-skyroam", category: "topic", intent: "comparison", primaryKeyword: "skyroam esim 比較", secondaryKeywords: ["skyroam solis vs esim", "ポータブル wifi esim 比較", "skyroam travel esim"], competition: "low", region: "global" },
  { slug: "esim-vs-global-yo", category: "topic", intent: "comparison", primaryKeyword: "globalyo esim 比較", secondaryKeywords: ["globalyo travel esim", "globalyo vs airalo", "globalyo esim"], competition: "low", region: "global" },
  { slug: "maya-mobile-review", category: "topic", intent: "review", primaryKeyword: "maya mobile 評判", secondaryKeywords: ["maya mobile review", "maya mobile esim", "maya mobile travel"], competition: "low", region: "global" },
  { slug: "instabridge-review", category: "topic", intent: "review", primaryKeyword: "instabridge esim 評判", secondaryKeywords: ["instabridge review", "instabridge travel esim", "instabridge esim"], competition: "low", region: "global" },
  { slug: "esim-switch-between-plans", category: "howto", intent: "howto", primaryKeyword: "esim 切り替え 複数", secondaryKeywords: ["switch between esim", "esim 切り替え 方法", "複数 esim 管理"], competition: "low" },
  { slug: "esim-delete-remove-guide", category: "howto", intent: "howto", primaryKeyword: "esim 削除 方法", secondaryKeywords: ["delete esim iphone", "esim 消し方", "remove esim android"], competition: "low" },
  { slug: "esim-transfer-to-new-phone", category: "howto", intent: "howto", primaryKeyword: "esim 機種変更 移行", secondaryKeywords: ["transfer esim new phone", "esim 引き継ぎ", "esim 機種変"], competition: "medium" },
  { slug: "esim-signal-dropping-fix", category: "howto", intent: "howto", primaryKeyword: "esim 電波 切れる", secondaryKeywords: ["esim signal drop", "esim 電波弱い", "海外 esim 圏外"], competition: "medium" },
  { slug: "esim-no-service-fix", category: "howto", intent: "howto", primaryKeyword: "esim 圏外 no service", secondaryKeywords: ["esim no service", "esim つながらない 海外", "esim 圏外 対処"], competition: "medium" },
  { slug: "esim-customs-airport-advice", category: "howto", intent: "howto", primaryKeyword: "空港 esim 使い方", secondaryKeywords: ["activate esim airport arrival", "到着後 esim 設定", "空港 esim 開通"], competition: "medium" },
];

function withSecondaryKeywords(primaryKeyword: string, slug: string, region: Region): string[] {
  if (slug === "europe-esim") {
    return ["ヨーロッパ 周遊 esim", "eu esim"];
  }
  if (region === "asia") {
    return [`${primaryKeyword} おすすめ`, `${primaryKeyword} 設定`];
  }
  if (region === "europe") {
    return [`${primaryKeyword} おすすめ`, `${primaryKeyword} 比較`];
  }
  if (region === "americas") {
    return [`${primaryKeyword} 料金`, `${primaryKeyword} 使い方`];
  }
  if (region === "middle-east-africa") {
    return [`${primaryKeyword} カバレッジ`, `${primaryKeyword} おすすめ`];
  }
  return [`${primaryKeyword} 料金`, `${primaryKeyword} おすすめ`];
}

const COUNTRY_ENTRIES: SeoProgramEntry[] = COUNTRY_SEEDS.map((seed) => ({
  slug: seed.slug,
  category: "country",
  intent: "country",
  primaryKeyword: seed.primaryKeyword,
  secondaryKeywords: withSecondaryKeywords(seed.primaryKeyword, seed.slug, seed.region),
  competition: seed.competition,
  region: seed.region,
  countrySlug: seed.countrySlug,
}));

const TOPIC_ENTRIES: SeoProgramEntry[] = TOPIC_SEEDS.map((seed) => ({
  slug: seed.slug,
  category: seed.category,
  intent: seed.intent,
  primaryKeyword: seed.primaryKeyword,
  secondaryKeywords: seed.secondaryKeywords,
  competition: seed.competition,
  region: seed.region ?? "global",
}));

export const SEO_PROGRAM_ENTRIES = [...COUNTRY_ENTRIES, ...TOPIC_ENTRIES];
export const SEO_PROGRAM_SLUGS = SEO_PROGRAM_ENTRIES.map((entry) => entry.slug);

const ENTRY_MAP = new Map(SEO_PROGRAM_ENTRIES.map((entry) => [entry.slug, entry]));

export function getSeoProgramEntry(slug: string) {
  return ENTRY_MAP.get(slug) ?? null;
}

function getRegionHint(entry: SeoProgramEntry, locale: GuideLocale) {
  if (locale === "ja") {
    switch (entry.region) {
      case "asia":
        return "アジア圏は単国旅行と周遊旅行で最適なプランが分かれやすく、価格だけでなく対象国と開通タイミングの確認が重要です。";
      case "europe":
        return "ヨーロッパ圏はEU内でもイギリスやスイスの扱いが分かれるため、対象国の確認と周遊前提の比較が欠かせません。";
      case "americas":
        return "アメリカ大陸の旅行は都市部とロードトリップで必要条件が変わりやすく、広域移動ならテザリングや安定性も重要です。";
      case "middle-east-africa":
        return "中東・アフリカ方面は都市部と郊外で通信体験が変わりやすいため、カバレッジと再設定しやすさを優先するのが安全です。";
      case "oceania":
        return "オセアニア方面は都市部と郊外の差が大きいため、主要都市だけかロードトリップもあるかで選び方が変わります。";
      default:
        return "対象国や利用期間が広いテーマなので、料金よりも使い方に合ったプラン設計を優先すると失敗しにくくなります。";
    }
  }

  if (locale === "ko") {
    switch (entry.region) {
      case "asia":
        return "아시아는 단일 국가 여행인지 여러 국가를 이동하는지에 따라 최적 플랜이 달라지므로 대상 국가와 활성화 타이밍을 함께 확인해야 합니다.";
      case "europe":
        return "유럽은 영국과 스위스처럼 범위가 갈리는 국가가 있어, 방문 국가 목록을 먼저 확인하는 것이 중요합니다.";
      case "americas":
        return "미주 여행은 도시 체류와 로드트립에서 요구 조건이 달라지므로, 커버리지와 핫스팟 지원도 함께 봐야 합니다.";
      case "middle-east-africa":
        return "중동·아프리카는 도시와 교외의 차이가 커서, 커버리지와 재설정 편의성을 우선해 선택하는 편이 안전합니다.";
      case "oceania":
        return "오세아니아는 도시와 외곽의 차이가 크기 때문에, 도심 위주인지 장거리 이동이 있는지에 따라 선택 기준이 달라집니다.";
      default:
        return "여러 국가와 사용 시나리오를 아우르는 주제이므로, 최저가보다 실제 사용 방식에 맞는 플랜 구성이 중요합니다.";
    }
  }

  if (locale === "zh") {
    switch (entry.region) {
      case "asia":
        return "亚洲旅行中，单国行程和多国周游适合的套餐并不一样，因此除了价格，还要确认覆盖国家和激活时机。";
      case "europe":
        return "欧洲旅行常常会遇到英国、瑞士是否包含的问题，所以一定要先确认支持国家列表。";
      case "americas":
        return "美洲旅行在城市停留和自驾远行时需求差异很大，除了价格，也要关注覆盖范围和热点共享。";
      case "middle-east-africa":
        return "中东和非洲的城市与郊外网络体验差异较大，因此优先选择覆盖明确、恢复路径清晰的方案更稳妥。";
      case "oceania":
        return "大洋洲常见的情况是城市信号稳定、郊外差异明显，因此要先判断自己是城市旅行还是长距离移动。";
      default:
        return "这类主题覆盖多种国家和使用场景，与其只看低价，不如优先选择符合自己用量和行程的套餐。";
    }
  }

  switch (entry.region) {
    case "asia":
      return "Asia trips often split between single-country and multi-country use cases, so supported destinations and activation timing matter as much as price.";
    case "europe":
      return "Europe travel often breaks down around border-crossing coverage, especially for destinations like the UK and Switzerland.";
    case "americas":
      return "Trips in the Americas can vary sharply between city stays and wider road trips, so hotspot support and stability are worth checking.";
    case "middle-east-africa":
      return "Middle East and Africa itineraries often have larger city-to-rural coverage differences, so clear coverage and recovery steps matter.";
    case "oceania":
      return "Oceania travel frequently shifts between major cities and long-distance routes, so your itinerary matters more than headline price alone.";
    default:
      return "This topic spans multiple usage patterns, so matching the plan to the real trip matters more than simply picking the cheapest option.";
  }
}

function getIntentSummary(entry: SeoProgramEntry, locale: GuideLocale) {
  if (locale === "ja") {
    switch (entry.intent) {
      case "country":
        return "比較で見るべきなのは、データ容量、有効期間、対象ネットワーク、テザリング可否、購入後に手順を見返しやすいかの5点です。";
      case "comparison":
        return "比較系キーワードでは、料金だけでなく準備の手間、現地での開通しやすさ、サポート、荷物の増減まで並べて判断するのが重要です。";
      case "howto":
        return "設定・トラブル系キーワードでは、手順の順番と失敗しやすい分岐を先に整理しておくと、検索意図に合いやすくなります。";
      case "review":
        return "レビュー系キーワードでは、特徴だけでなく向いている人・向かない人・代替候補を同時に示す方が信頼されやすいです。";
      case "usecase":
        return "用途別キーワードでは、旅行スタイルごとに必要な容量や優先条件が変わるため、使い方に沿って判断基準を分けるのが効果的です。";
    }
  }

  if (locale === "ko") {
    switch (entry.intent) {
      case "country":
        return "비교할 때는 데이터 용량, 유효기간, 지원 네트워크, 테더링 가능 여부, 구매 후 절차를 다시 확인하기 쉬운지를 함께 보는 것이 좋습니다.";
      case "comparison":
        return "비교형 키워드는 가격뿐 아니라 준비 과정, 현지 개통 편의성, 지원 품질, 짐의 증가 여부까지 함께 비교해야 설득력이 높아집니다.";
      case "howto":
        return "설정·문제 해결 키워드는 단계 순서와 자주 막히는 분기를 먼저 정리해 주는 것이 검색 의도에 잘 맞습니다.";
      case "review":
        return "리뷰형 키워드는 장점뿐 아니라 맞는 사람과 맞지 않는 사람, 대체 후보까지 함께 제시할 때 신뢰도가 올라갑니다.";
      case "usecase":
        return "용도형 키워드는 여행 스타일마다 필요한 데이터와 우선 조건이 달라지므로, 사용 장면별로 판단 기준을 나누는 것이 효과적입니다.";
    }
  }

  if (locale === "zh") {
    switch (entry.intent) {
      case "country":
        return "做国家型对比时，除了价格，还要同时看流量、有效期、合作网络、是否支持热点，以及购买后能否方便找回安装步骤。";
      case "comparison":
        return "对比型关键词不只要讲价格，还要并列比较准备流程、落地开通便利度、客服和是否增加行李负担。";
      case "howto":
        return "设置和排障类关键词最重要的是把步骤顺序和常见卡点提前讲清楚。";
      case "review":
        return "评测类关键词如果同时说明适合谁、不适合谁以及替代方案，会更容易建立信任。";
      case "usecase":
        return "场景型关键词的关键在于按旅行方式拆分需求，因为不同场景下所需流量和优先条件完全不同。";
    }
  }

  switch (entry.intent) {
    case "country":
      return "For destination keywords, the best comparison points are data size, validity, network partners, hotspot support, and how easy it is to recover the setup steps later.";
    case "comparison":
      return "Comparison keywords need more than price. Setup friction, activation reliability, support quality, and travel convenience all influence the final choice.";
    case "howto":
      return "Setup and troubleshooting keywords perform best when the steps are clear, ordered, and written around the exact points where travelers get stuck.";
    case "review":
      return "Review keywords work better when the article explains who the service fits, where it falls short, and what alternatives are worth considering.";
    case "usecase":
      return "Use-case keywords work best when the guidance changes based on trip style, data appetite, and how much flexibility the traveler needs.";
  }
}

function buildCountryContent(entry: SeoProgramEntry, locale: GuideLocale, title: string, description: string): SeoProgramContent {
  const regionHint = getRegionHint(entry, locale);
  const intentSummary = getIntentSummary(entry, locale);

  if (locale === "ja") {
    return {
      sections: [
        {
          heading: `${entry.primaryKeyword}で確認したい比較ポイント`,
          body: `${description}\n\n${intentSummary} ${regionHint}`,
        },
        {
          heading: "旅行日数とデータ容量の目安",
          body: "2〜4日の短期旅行なら3GB前後、1週間なら5GB〜10GB、長期旅行やテザリング利用があるなら10GB以上を目安にすると選びやすくなります。地図、翻訳、配車、SNS中心か、動画視聴やPC接続まで含むかで必要量は大きく変わります。\n\n短期旅行では価格の安さが効きますが、周遊や地方移動がある場合は再購入の手間も含めて比較した方が失敗しにくいです。",
        },
        {
          heading: "空港SIM・ローミングと比べた時の判断軸",
          body: "空港SIMは到着後に調達できる安心感がありますが、列に並ぶ時間や在庫のばらつきがあります。キャリアローミングは設定が簡単な一方で、料金が高くなりやすいのが難点です。\n\neSIMは出発前に準備でき、到着直後から地図や配車アプリを使えるのが強みです。現地で迷わないことを重視するなら、事前設定できるeSIMの相性が良いです。",
        },
        {
          heading: "現地で失敗しやすいポイント",
          body: "よくある失敗は、対応端末を確認していない、対象国や対象地域を見落とす、データ容量を少なく見積もる、到着前に有効化して有効期間を無駄にする、の4つです。\n\n特に複数国をまたぐ旅程や郊外移動がある場合は、価格より先に対象国・テザリング可否・注文後に手順を見返せるかを確認しておくと安心です。",
        },
        {
          heading: "AutoWiFi Travelで見比べやすい理由",
          body: "AutoWiFi Travelでは国別ページ、比較記事、設定ガイドを行き来しながら判断できるため、単に安いプランではなく、旅程に合うeSIMを選びやすくしています。購入後もメールと注文詳細ページからQRコードや設定情報を見直せるため、旅行中の復旧もしやすい構成です。",
        },
      ],
      faq: [
        { q: "旅行には何GBくらい必要ですか？", a: "地図、検索、メッセージ中心なら5GB前後が目安です。動画視聴やPCテザリングがある場合は10GB以上を検討すると安心です。" },
        { q: "eSIMはいつ有効化すればいいですか？", a: "多くの旅行者は出発前にインストールだけ済ませ、到着後に回線を有効化する形が安全です。有効期間の起算条件はプランごとに確認してください。" },
        { q: "eSIMと空港SIMはどちらが向いていますか？", a: "到着直後からすぐにつなぎたい人や事前準備で不安を減らしたい人にはeSIMが向いています。複数人で1台をシェアしたい場合は別の選択肢も検討できます。" },
      ],
    };
  }

  if (locale === "ko") {
    return {
      sections: [
        {
          heading: `${title} 비교에서 먼저 볼 포인트`,
          body: `${description}\n\n${intentSummary} ${regionHint}`,
        },
        {
          heading: "여행 기간별 데이터 용량 기준",
          body: "2~4일 정도의 짧은 여행은 3GB 전후, 1주일은 5GB~10GB, 장기 여행이나 테더링이 있다면 10GB 이상을 기준으로 잡으면 무난합니다. 지도, 번역, 차량 호출, SNS 위주인지, 영상 시청과 노트북 연결까지 포함하는지에 따라 필요한 용량이 달라집니다.\n\n짧은 일정은 저렴한 플랜이 유리하지만, 여러 도시나 여러 국가를 이동하는 일정은 재구매 번거로움까지 함께 비교하는 편이 안전합니다.",
        },
        {
          heading: "공항 유심과 로밍과 비교할 때의 기준",
          body: "공항 유심은 도착 후 바로 구매할 수 있다는 장점이 있지만, 줄을 서야 하거나 원하는 플랜 재고가 없을 수 있습니다. 통신사 로밍은 편하지만 비용이 높아지기 쉽습니다.\n\neSIM은 출발 전에 준비할 수 있고 도착 직후 지도와 차량 호출 앱을 바로 사용할 수 있다는 점이 가장 큰 장점입니다.",
        },
        {
          heading: "현지에서 자주 생기는 실패 포인트",
          body: "지원 단말 확인 누락, 대상 국가·지역 확인 부족, 데이터 용량 과소 추정, 도착 전에 개통해 유효기간을 소모해 버리는 경우가 많습니다.\n\n특히 여러 국가를 이동하거나 외곽 지역까지 가는 일정은 가격보다 먼저 대상 국가, 테더링 지원, 주문 후 안내를 다시 볼 수 있는지부터 확인하는 것이 좋습니다.",
        },
        {
          heading: "AutoWiFi Travel에서 비교하기 쉬운 이유",
          body: "AutoWiFi Travel은 국가별 페이지와 비교 가이드, 설정 가이드를 함께 볼 수 있어 단순 최저가가 아니라 여행 일정에 맞는 eSIM을 고르기 쉽습니다. 구매 후에도 이메일과 주문 상세 페이지에서 QR 코드와 설치 정보를 다시 확인할 수 있습니다.",
        },
      ],
      faq: [
        { q: "여행에는 데이터가 얼마나 필요할까요?", a: "지도, 검색, 메시지 중심이면 5GB 전후가 많이 선택됩니다. 영상 시청이나 노트북 테더링이 있다면 10GB 이상을 고려하세요." },
        { q: "eSIM은 언제 활성화하는 것이 좋나요?", a: "출발 전에 설치만 해 두고, 도착 후 실제 회선을 켜는 방식이 가장 무난합니다. 유효기간 시작 조건은 플랜마다 다르므로 상세 설명을 확인하세요." },
        { q: "eSIM과 공항 유심 중 어느 쪽이 더 나은가요?", a: "도착 직후 바로 연결되고 싶거나 준비 과정을 미리 끝내고 싶은 사람에게는 eSIM이 더 잘 맞습니다." },
      ],
    };
  }

  if (locale === "zh") {
    return {
      sections: [
        {
          heading: `${title} 选择前先看哪些点`,
          body: `${description}\n\n${intentSummary} ${regionHint}`,
        },
        {
          heading: "按旅行时长估算流量",
          body: "2到4天的短途旅行通常3GB左右就能应付，一周建议看5GB到10GB，长途旅行或需要热点共享时更适合10GB以上。主要用地图、翻译、打车和社交媒体，还是还要看视频、连电脑，会直接影响你需要的流量。\n\n短行程可以更看价格，但如果行程涉及多城市或多国移动，最好把重复购买和切换的麻烦也算进去。",
        },
        {
          heading: "和机场SIM、运营商漫游相比怎么选",
          body: "机场SIM的好处是落地后可以买，但常见问题是排队、库存不稳定，或者套餐解释不够清楚。运营商漫游设置最省事，但费用通常更高。\n\neSIM的优势是出发前就能准备好，落地后直接用地图、打车和酒店联系等关键功能，整体更适合想把不确定性降到最低的旅客。",
        },
        {
          heading: "最容易踩坑的地方",
          body: "常见失误包括没有先确认手机是否支持、忽略支持国家或支持区域、低估所需流量、过早激活导致有效期被提前消耗。\n\n如果你的行程包含跨国、郊外或长距离移动，建议先确认覆盖国家、是否支持热点，以及购买后能否方便找回安装说明。",
        },
        {
          heading: "为什么在 AutoWiFi Travel 上更容易比",
          body: "AutoWiFi Travel 把国家页、对比页和设置指南串在一起，方便你不是只看最低价，而是按照行程去判断更合适的 eSIM。购买后还可以从邮件和订单详情页重新查看二维码和设置说明，出行途中更容易恢复。",
        },
      ],
      faq: [
        { q: "旅行大概要买多少流量？", a: "如果主要是地图、搜索和聊天，5GB左右通常够用；如果要看视频或给电脑共享网络，建议看10GB以上。" },
        { q: "eSIM 什么时候激活最合适？", a: "大多数情况下，出发前先安装，到达后再真正启用移动数据会更稳妥。具体何时开始计时要看套餐说明。" },
        { q: "eSIM 和机场SIM 哪个更适合？", a: "如果你想落地马上联网、尽量减少现场不确定性，eSIM 通常更适合。多人共用设备则可以再比较其他方案。" },
      ],
    };
  }

  const baseSections: SeoProgramContent["sections"] = [
      {
        heading: `What to compare before choosing ${title}`,
        body: `${description}\n\n${intentSummary} ${regionHint}\n\nTravelers usually make better choices when they compare a plan against the actual first day of the trip: airport arrival, hotel check-in, maps, ride-hailing, translation, messaging, and any hotspot use for a second device. A plan that looks fine in a generic table can feel limiting very quickly if those first-hour needs were never part of the comparison.`,
      },
      {
        heading: "How much data and validity should you buy?",
        body: "Short trips of a few days often work with around 3GB, week-long trips often land in the 5GB to 10GB range, and longer trips or hotspot-heavy use usually need 10GB or more. Maps, translation, social apps, and ride-hailing stay fairly light, while streaming and laptop tethering quickly increase usage.\n\nIf your trip includes multiple stops or wider travel days, compare total convenience as well as headline price. It is also worth thinking about whether you prefer one larger package that lasts the whole trip or a smaller starter plan with room to top up later. The cheaper-looking option is not always the easier one once the trip is already underway.",
      },
      {
        heading: "How eSIM compares with airport SIMs and roaming",
        body: "Airport SIM cards can feel reassuring because you buy them on arrival, but they add queue time and can come with inconsistent stock or confusing plan details. Carrier roaming is easy but often expensive.\n\nTravel eSIMs are strong when you want to prepare before departure and get online the moment you land for maps, transport, and check-in details. They also work well for travelers who want to keep the trip simple: fewer in-person decisions after a long flight, fewer surprises around store hours, and fewer moments where you are trying to solve connectivity while dragging luggage through the airport.",
      },
      {
        heading: "Common mistakes travelers make",
        body: "The biggest errors are forgetting to confirm device compatibility, misreading supported destinations, underestimating data usage, and activating too early. Cross-border itineraries and rural travel make those mistakes more expensive.\n\nBefore buying, it helps to check coverage, hotspot support, and whether you can easily recover the setup steps later. Another practical mistake is ignoring the recovery path entirely. If something goes wrong during installation, can you reopen the order details, see the QR code again, and quickly confirm the original instructions without digging through old emails?",
      },
      {
        heading: "How to match the plan to the shape of the trip",
        body: "A city-only stay, a multi-stop rail trip, a beach itinerary with ferries, and a road trip all change what “best” means. City travelers can often lean harder on lower-cost plans, while people moving between regions or relying on hotspot for navigation usually benefit from more headroom and more stable recovery options.\n\nWhen a destination page is useful, it should help travelers map the plan to the real trip shape rather than only repeating that eSIM is convenient. That usually means thinking about arrival day, intercity transfers, and the one day of the trip where losing data would be the most annoying.",
      },
      {
        heading: "Support and recovery matter once the trip has started",
        body: "Many travelers do not need support at all, but the few minutes when they do need it tend to be high-pressure moments: after landing, before a train, or while trying to reach accommodation. That is why post-purchase clarity matters more than it first appears. A good buying experience is not just about the checkout; it is also about how easily the traveler can recover QR details, installation notes, and the original order while on the move.",
      },
      {
        heading: "Why AutoWiFi Travel fits this use case",
        body: "AutoWiFi Travel connects destination pages, comparison guides, and setup help so travelers can choose based on the actual itinerary rather than price alone. After purchase, travelers can also revisit order details and installation information from email and the order page.\n\nThat makes the destination guide more practical than a purely editorial listicle. The page is meant to shorten the path from research to installation, while still giving enough context to avoid the common mistakes that usually show up on travel days.",
      },
    ];
  const baseFaq: SeoProgramContent["faq"] = [
      { q: "How much data do I need for this kind of trip?", a: "For maps, search, and messaging, around 5GB is a common starting point. Choose more if you tether a laptop or stream video regularly." },
      { q: "When should I activate my eSIM?", a: "A common approach is to install before departure and enable the plan after arrival. Always check when the plan validity actually starts." },
      { q: "Is eSIM better than buying a SIM on arrival?", a: "If you want to be connected immediately after landing and reduce uncertainty, eSIM is often the smoother option." },
      { q: "What should I double-check before I buy for this destination?", a: "Confirm device compatibility, supported destinations, data size, hotspot support, and how easily you can reopen the order details if you need to recover the setup later." },
    ];
  const supplement = locale === "en" ? getEnglishCountrySupplement(entry, title) : null;

  return {
    sections: mergeSupplementSections(baseSections, supplement?.sections),
    faq: mergeSupplementFaq(baseFaq, supplement?.faq),
    dateModified: locale === "en" ? SEO_PROGRAM_OVERRIDE_DATE : undefined,
  };
}

type SeoProgramSupplement = Pick<SeoProgramContent, "sections" | "faq">;

function mergeSupplementSections(
  baseSections: SeoProgramContent["sections"],
  extraSections?: SeoProgramContent["sections"],
) {
  if (!extraSections || extraSections.length === 0) {
    return baseSections;
  }

  if (baseSections.length === 0) {
    return extraSections;
  }

  return [
    ...baseSections.slice(0, -1),
    ...extraSections,
    baseSections[baseSections.length - 1],
  ];
}

function mergeSupplementFaq(
  baseFaq: SeoProgramContent["faq"],
  extraFaq?: SeoProgramContent["faq"],
) {
  const seen = new Set<string>();
  return [...baseFaq, ...(extraFaq ?? [])].filter((item) => {
    const key = item.q.trim().toLowerCase();
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

function getEnglishComparisonSupplement(entry: SeoProgramEntry, title: string): SeoProgramSupplement | null {
  const roamingCluster = new Set([
    "wifi-vs-esim",
    "travel-internet-options",
    "save-money-roaming",
    "esim-vs-roaming",
    "esim-vs-airport-sim",
  ]);
  const regionalCluster = new Set([
    "best-esim-providers",
    "international-esim",
    "global-esim",
    "best-esim-for-europe",
    "best-esim-for-asia",
    "best-esim-for-north-america",
  ]);
  const pricingCluster = new Set([
    "cheapest-esim-plans",
    "esim-unlimited-data",
    "esim-prepaid-vs-postpaid",
    "esim-speed-test",
  ]);

  if (roamingCluster.has(entry.slug)) {
    return {
      sections: [
        {
          heading: "What this tradeoff feels like on the first day of the trip",
          body: "Most readers are not comparing abstract products. They are deciding when they want to solve connectivity. Roaming keeps everything inside the home carrier but usually costs more. Airport SIM and local pickup push the decision into arrival day. eSIM shifts the work earlier so the traveler can land with fewer moving parts.\n\nThat framing is much more useful than a generic pros-and-cons table because it mirrors the exact moment when people feel the difference most strongly: after landing, while finding transport, or while trying to message accommodation.",
        },
        {
          heading: "Where the hidden cost usually appears",
          body: "The hidden cost is often not the advertised plan fee. It is the extra queue, the repeated top-up, the need to troubleshoot while standing in an airport, or the time spent switching between multiple travel connectivity methods because the first one was not planned properly.\n\nA good comparison page should make that hidden cost visible. Once it does, the reader can judge whether paying slightly more upfront saves enough friction to be worth it.",
        },
      ],
      faq: [
        {
          q: "Is roaming ever still the right answer?",
          a: "Yes. It can still make sense for very short trips, low data needs, or travelers who value zero setup above price and control.",
        },
        {
          q: "Should I decide before departure or after landing?",
          a: "If you want a calmer arrival, decide before departure. Waiting until landing usually keeps more flexibility but shifts the friction into the busiest part of the trip.",
        },
      ],
    };
  }

  if (regionalCluster.has(entry.slug)) {
    return {
      sections: [
        {
          heading: "Why regional coverage details matter more than headline country counts",
          body: `Pages like ${title} are usually won or lost on coverage nuance. A provider can advertise a large number of supported destinations and still be awkward for a real itinerary if border crossings, transit countries, or secondary stops are not handled cleanly.\n\nThat is why a strong regional comparison should help the reader map the plan to the exact route shape, not just the destination list on the pricing card.`,
        },
        {
          heading: "The better question is whether one plan removes mid-trip switching",
          body: "Many regional queries are really about avoiding a second purchase. The practical value of a regional eSIM is not only that it covers more than one country. It is that it can remove the need to repurchase, reinstall, or rethink the setup in the middle of the trip.\n\nIf the article makes that decision explicit, it becomes much more useful than a listicle that only ranks providers by broad popularity.",
        },
      ],
      faq: [
        {
          q: "When is a regional eSIM better than a country eSIM?",
          a: "It becomes better when the trip includes real border crossings or secondary stops that would otherwise force a second purchase mid-trip.",
        },
        {
          q: "What should I verify on a regional plan first?",
          a: "Check whether the actual countries on your route are included, whether hotspot use is allowed, and whether the plan avoids a second install later.",
        },
      ],
    };
  }

  if (pricingCluster.has(entry.slug)) {
    return {
      sections: [
        {
          heading: "Cheap, unlimited, and fast are not the same buying decision",
          body: "Pricing-heavy searches often collapse several goals into one query. Some readers want the lowest initial price. Others want the fewest top-ups. Others are trying to avoid speed drops, fair-use restrictions, or post-purchase surprises. If a page mixes those goals together, it becomes much harder to trust.\n\nThe strongest articles separate low starting cost, realistic total value, and performance expectations so the reader can compare the right variable instead of guessing.",
        },
        {
          heading: "Why repeat-buy friction changes the value equation",
          body: "A cheap starter plan can look excellent until the traveler has to buy again during the trip, reopen setup details, or change strategy around hotspot and heavy-data days. That repeat-buy friction is where pricing pages often stay too shallow.\n\nFor commercial-intent queries, the better answer is not only which plan is cheapest, but which one stays manageable once the itinerary becomes less tidy than expected.",
        },
      ],
      faq: [
        {
          q: "Does the cheapest plan usually stay cheapest by the end of the trip?",
          a: "Not always. Repeated top-ups, heavy-day usage, and recovery friction can make the lowest starter price less attractive in practice.",
        },
        {
          q: "What should I watch for on unlimited or speed-focused plans?",
          a: "Look for fair-use limits, hotspot restrictions, and what happens after the fast data allowance is consumed.",
        },
      ],
    };
  }

  return null;
}

function getEnglishHowtoSupplement(entry: SeoProgramEntry, title: string): SeoProgramSupplement | null {
  const setupCluster = new Set([
    "how-to-setup-esim",
    "esim-iphone-setup",
    "esim-android-setup",
    "esim-activation-timing",
    "esim-install-before-travel",
  ]);
  const troubleshootingCluster = new Set([
    "esim-troubleshooting",
    "esim-qr-code-not-working",
  ]);
  const deviceCluster = new Set([
    "esim-compatible-phones",
    "dual-sim-esim",
  ]);
  const usageCluster = new Set([
    "travel-data-usage-tips",
    "international-calling-esim",
    "esim-security-tips",
    "esim-hotspot-tethering",
    "how-much-data-do-i-need-for-travel",
  ]);

  if (setupCluster.has(entry.slug)) {
    return {
      sections: [
        {
          heading: "What to save before you leave Wi-Fi",
          body: `A good ${title} page should tell the traveler what to preserve before they ever leave home Wi-Fi: the order page, the QR or manual activation details, the exact provider instructions, and a fallback way to reopen them later.\n\nThat information is often more valuable than one extra screenshot of the settings flow because it determines whether the traveler can recover calmly if the first attempt does not go perfectly.`,
        },
        {
          heading: "Installation and activation should be treated as separate decisions",
          body: "Many travelers still confuse adding the profile with starting the trip plan. The safer guidance is usually to separate those steps clearly. Install in a calm environment, confirm the phone recognizes the profile, and only then decide when the travel line should actually become active.\n\nThis distinction reduces a large share of last-minute confusion and makes setup articles feel much more complete.",
        },
      ],
      faq: [
        {
          q: "What should I keep accessible before I travel?",
          a: "Keep the order page, QR or manual activation details, and the provider setup instructions easy to reopen without searching old emails.",
        },
        {
          q: "Why do setup articles need to explain activation timing separately?",
          a: "Because adding the profile and starting plan validity are often different moments, and readers make better decisions when those are separated clearly.",
        },
      ],
    };
  }

  if (troubleshootingCluster.has(entry.slug)) {
    return {
      sections: [
        {
          heading: "What the phone should show if the profile actually exists",
          body: "A practical troubleshooting guide should help the reader confirm whether the phone already sees the eSIM profile. If the line exists in settings, the next checks are usually data-line selection, roaming, network search, and APN or provider-side details. If the line does not exist at all, the problem is further upstream and the guide should say so explicitly.\n\nThat one split often saves travelers a lot of random retrying.",
        },
        {
          heading: "When to stop retrying and prepare a support message",
          body: "The right time to stop is when the same retry produces the same result and no core setting has changed. At that point, the fastest path is to gather the device model, exact error, destination, current line status, and order details before contacting support.\n\nArticles that explain this threshold are more useful than endless troubleshooting loops, because they tell the reader when another retry is noise rather than progress.",
        },
      ],
      faq: [
        {
          q: "How do I know whether the eSIM profile was added at all?",
          a: "Check whether the travel line appears anywhere in cellular or mobile settings. If it does, the next checks are usually data selection and roaming rather than installation.",
        },
        {
          q: "When should I stop retrying the same step?",
          a: "Stop when the result is unchanged and you are no longer testing a new variable. Then collect the device, error, destination, and order details for support.",
        },
      ],
    };
  }

  if (deviceCluster.has(entry.slug)) {
    return {
      sections: [
        {
          heading: "Carrier lock and line availability still matter",
          body: "Compatibility pages are most useful when they explain that support is not only about the phone model. Carrier lock status, available eSIM slots, whether the device already uses another digital line, and whether the OS is current can all change the real answer.\n\nThat is why a device guide should give the reader a confirmation sequence rather than a simple yes-or-no table.",
        },
        {
          heading: "Why model lists still need one final manual check",
          body: "Published device lists are useful, but they are not perfect proxies for the exact handset in a traveler's hand. Regional variants, carrier-specific restrictions, and old software can all create false confidence.\n\nThe best compatibility pages therefore end with a final manual check inside device settings so the traveler can verify support before buying.",
        },
      ],
      faq: [
        {
          q: "Can a supported phone still fail to install an eSIM?",
          a: "Yes. Carrier lock status, occupied line slots, and outdated software can still block the setup even when the model family supports eSIM.",
        },
        {
          q: "What is the final compatibility check before I buy?",
          a: "Open the phone's cellular settings and confirm that it can add another eSIM line before treating any device list as final.",
        },
      ],
    };
  }

  if (usageCluster.has(entry.slug)) {
    return {
      sections: [
        {
          heading: "Separate routine usage from backup usage",
          body: "These queries usually become clearer when the reader separates normal daily use from emergency or fallback use. Maps, messaging, and translation form the routine layer. Hotspot, work uploads, security recovery, and last-minute calling often sit in the backup layer.\n\nThe final recommendation changes depending on which layer matters more on this trip.",
        },
        {
          heading: "The single setting or habit that changes the experience most",
          body: "Usage-focused pages become more helpful when they point to one high-leverage change: turning off background-heavy apps, knowing whether hotspot is supported, keeping a secure recovery path for the order, or deciding whether the travel line will handle data only or also support wider communication needs.\n\nThat gives the reader a concrete next step rather than another abstract reminder to 'use data carefully.'",
        },
      ],
      faq: [
        {
          q: "Why is routine use different from backup use?",
          a: "Because many trips stay light on maps and messaging, then spike on one day because of hotspot, work, recovery, or urgent transport changes.",
        },
        {
          q: "What kind of change usually saves the most trouble?",
          a: "A single clear habit such as controlling background usage, confirming hotspot support, or keeping the order recovery path easy to reopen often matters more than small theoretical optimizations.",
        },
      ],
    };
  }

  return null;
}

function getEnglishReviewOrUsecaseSupplement(entry: SeoProgramEntry, title: string): SeoProgramSupplement | null {
  const providerReviewCluster = new Set([
    "airalo-review",
    "holafly-review",
    "nomad-review",
    "ubigi-review",
  ]);
  const workCluster = new Set([
    "digital-nomad-esim",
    "esim-for-remote-workers",
    "esim-for-business-travel",
  ]);
  const tripStyleCluster = new Set([
    "family-travel-esim",
    "cruise-travel-esim",
    "esim-for-road-trips",
    "esim-for-backpackers",
    "esim-for-solo-travel",
    "esim-long-term-travel",
    "esim-for-students",
    "esim-for-honeymoon",
  ]);

  if (providerReviewCluster.has(entry.slug)) {
    return {
      sections: [
        {
          heading: "The real test starts after checkout",
          body: `${title} should not be judged only by the storefront. The more useful test is whether the traveler can complete setup cleanly, recover the order later, and understand what to do if the first install attempt fails.\n\nThose post-purchase moments are where provider reviews become practically useful rather than just promotional.`,
        },
        {
          heading: "What changes if the itinerary is not one clean destination",
          body: "Provider reviews often stay too tidy by assuming a simple one-country trip. In practice, the evaluation changes when the traveler crosses borders, changes cities often, or needs hotspot, work backup, or a second purchase. A strong review says where those extra pressures start to matter.\n\nThat gives the reader a decision they can actually use instead of a brand verdict detached from the trip itself.",
        },
      ],
      faq: [
        {
          q: "What should I compare in a provider review beyond price?",
          a: "Look at setup clarity, post-purchase recovery, hotspot rules, destination fit, and what happens if the first install attempt fails.",
        },
        {
          q: "Why can one provider review change with itinerary shape?",
          a: "Because the recommendation often shifts when the trip becomes multi-stop, border-crossing, or hotspot-dependent instead of a simple one-country stay.",
        },
      ],
    };
  }

  if (workCluster.has(entry.slug)) {
    return {
      sections: [
        {
          heading: "The real requirement is low-friction fallback",
          body: "Work-oriented travel queries are usually less about raw price and more about whether the traveler has a stable fallback when hotel Wi-Fi is weak, arrival timing changes, or a laptop needs tethering for a short critical window.\n\nThat is why work travel content should treat reliability and recovery as core buying criteria, not bonus features.",
        },
        {
          heading: "What matters more than the cheapest gigabyte",
          body: "For business, remote work, or digital nomad scenarios, the better question is whether the plan reduces interruption. A cheap option can still be a poor fit if it creates uncertainty around hotspot use, order recovery, or border-crossing transitions during a work-heavy trip.\n\nThe article should make that tradeoff explicit so the reader does not over-optimize for the wrong variable.",
        },
      ],
      faq: [
        {
          q: "What matters most on a work-oriented trip?",
          a: "Low-friction fallback, hotspot confidence, and a clear recovery path usually matter more than shaving the last bit of price off the plan.",
        },
        {
          q: "Why is hotspot support not the whole answer?",
          a: "Because reliable work travel also depends on order recovery, border-crossing continuity, and how quickly the traveler can get back online if something changes.",
        },
      ],
    };
  }

  if (tripStyleCluster.has(entry.slug)) {
    return {
      sections: [
        {
          heading: "The recommendation shifts when the group or route shifts",
          body: `${title} only becomes useful when it explains what changes the moment the itinerary changes. A family trip, a cruise stop, a backpacking route, a study-abroad setup, and a solo city break all place different pressure on setup timing, data buffer, and recovery needs.\n\nA use-case page should therefore help the reader identify which part of the trip shape actually drives the decision.`,
        },
        {
          heading: "What usually causes regret after the trip has started",
          body: "Most regret does not come from one wrong technical choice. It comes from a plan that was sized or selected for the easiest day of the trip instead of the hardest day: a ferry transfer, a road segment, a family logistics day, a new campus arrival, or a moment when the traveler suddenly needs tethering or quick route changes.\n\nThat is the standard a good use-case article should be written against.",
        },
      ],
      faq: [
        {
          q: "Why do use-case pages need to talk about the hardest day of the trip?",
          a: "Because that is usually where the plan either feels calm or becomes frustrating. Buying for the easiest day often leads to regret later.",
        },
        {
          q: "What changes the decision most on family, cruise, or backpacking trips?",
          a: "Setup timing, buffer for movement days, and how easily the traveler can recover details mid-trip usually matter more than the smallest advertised discount.",
        },
      ],
    };
  }

  return null;
}

function getEnglishCountrySupplement(entry: SeoProgramEntry, title: string): SeoProgramSupplement | null {
  switch (entry.region) {
    case "asia":
      return {
        sections: [
          {
            heading: "Arrival-day friction is often the real deciding factor in Asia",
            body: `For many Asia itineraries, ${title} is really an arrival-day question before it becomes a pure pricing question. The first few hours often involve airport rail, payment apps, hotel contact, translation, and route changes in a dense urban environment.\n\nThat makes fast setup and clear recovery steps more important than a generic statement that the country has good coverage.`,
          },
          {
            heading: "Single-country trips and side trips should not be priced the same way",
            body: "Many Asia trips look single-country on paper and then quietly expand into ferries, border excursions, or day trips that change how useful a lean plan feels. A stronger destination guide should surface that possibility instead of assuming a static city itinerary.\n\nThat is usually where travelers either benefit from more buffer or start considering a regional option with less mid-trip friction.",
          },
        ],
        faq: [
          {
            q: "Why do Asia eSIM pages need to talk about arrival day so much?",
            a: "Because the first few hours often involve more transport, translation, and route-finding pressure than travelers expect, which changes what feels like a good plan.",
          },
          {
            q: "What is the common mistake on Asia trips?",
            a: "Treating a city stay and a side-trip itinerary as if they place the same pressure on the plan usually leads to under-sizing or avoidable repurchases.",
          },
        ],
      };
    case "europe":
      return {
        sections: [
          {
            heading: "The real Europe question is often rail days and border logic",
            body: `For many travelers reading ${title}, the plan is not only for one destination. It is also for station days, day trips, and the possibility that the route expands after booking. That makes border logic and movement days more important than a country page might first suggest.\n\nA useful destination guide should therefore help the reader decide whether to stay country-specific or step up to a wider regional plan before the trip starts.`,
          },
          {
            heading: "Short distances do not automatically mean light data usage",
            body: "European routes often compress many booking checks, rail platform changes, and navigation decisions into a short period of time. Even when the country itself is geographically compact, the travel pattern can still be data-active.\n\nThat is why the better sizing rule is to think about movement windows, not only the number of nights.",
          },
        ],
        faq: [
          {
            q: "Why is a Europe country page often still about border crossings?",
            a: "Because many Europe trips naturally expand into nearby countries or rail-heavy days, and that changes whether a single-country plan stays practical.",
          },
          {
            q: "What do travelers underestimate most in Europe?",
            a: "They often underestimate how much route-checking and booking activity happens on rail and day-trip days, even on short itineraries.",
          },
        ],
      };
    case "americas":
      return {
        sections: [
          {
            heading: "Big-country travel changes the recommendation quickly",
            body: `For many Americas itineraries, ${title} cannot be judged purely on city use. Longer domestic transfers, airport changes, and road-based movement mean the plan has to stay comfortable on the days when the traveler is most dependent on the phone.\n\nThat is usually where a destination page becomes useful or generic.`,
          },
          {
            heading: "The hardest day matters more than the average day",
            body: "A city-only estimate can look fine until the trip adds a long drive, a domestic flight, a resort transfer, or a national-park style day with heavier navigation and weaker fallback options. The better recommendation sizes for that hardest day, not the calmest one.\n\nThat approach tends to produce fewer regrets than optimizing too closely around average usage.",
          },
        ],
        faq: [
          {
            q: "Why do Americas destination pages need more buffer discussion?",
            a: "Because long domestic movement and road-based travel make the gap between an average day and a hard day much larger than many travelers expect.",
          },
          {
            q: "What is the safest way to size an eSIM here?",
            a: "Size for the most movement-heavy day on the route rather than the quietest city day, especially if the itinerary includes flights, long drives, or transfers.",
          },
        ],
      };
    case "middle-east-africa":
      return {
        sections: [
          {
            heading: "Coverage clarity matters more when the route feels less uniform",
            body: `For ${title}, the main issue is often not only price but how confidently the traveler can predict where the plan will feel easy and where it may need more buffer or clearer recovery steps. That matters more in destinations where city and non-city experiences can diverge quickly.\n\nA stronger destination guide should acknowledge that difference directly instead of assuming a single uniform usage pattern.`,
          },
          {
            heading: "Arrival, transfer, and support confidence carry more weight",
            body: "In these itineraries, the buying decision often leans harder on whether the traveler can get online quickly after arrival, recover the order without confusion, and avoid wasting time troubleshooting in a high-pressure moment. Those factors can outweigh a small price difference.\n\nThat is where commercial-intent content becomes more trustworthy than a generic destination overview.",
          },
        ],
        faq: [
          {
            q: "Why should I care so much about coverage clarity here?",
            a: "Because the difference between easy city use and a more demanding transfer or regional day can be sharper, so vague coverage assumptions are more costly.",
          },
          {
            q: "What tends to matter more than price on these routes?",
            a: "Fast arrival-day connectivity, clear recovery steps, and confidence that the plan will stay manageable through transfers often matter more than a small price gap.",
          },
        ],
      };
    case "oceania":
      return {
        sections: [
          {
            heading: "City travel and scenic travel are often two different products",
            body: `With ${title}, the advice changes quickly once the trip moves beyond one city. Scenic drives, regional stops, and longer transfer days create a very different connectivity problem from a short urban itinerary.\n\nThat is why a destination guide should help the reader decide whether they are really buying for city comfort or for a more spread-out route.`,
          },
          {
            heading: "The right plan depends on how independent the travel days are",
            body: "The more the traveler depends on the phone for self-directed movement, route changes, and backup navigation, the more valuable buffer and recovery become. A lean plan can still be fine for simple city travel, but it feels much less safe once the route stretches out.\n\nThe best version of the article should make that boundary obvious.",
          },
        ],
        faq: [
          {
            q: "Why do Oceania destination guides need to separate city travel from road travel?",
            a: "Because the plan that feels fine in one city can feel too thin once the itinerary adds longer scenic or self-directed travel days.",
          },
          {
            q: "When should I buy more buffer for this kind of trip?",
            a: "Add more margin when the route depends on navigation-heavy transfer days, scenic driving, or fewer reliable fallback options during the day.",
          },
        ],
      };
    default:
      return null;
  }
}

function buildComparisonContent(entry: SeoProgramEntry, locale: GuideLocale, title: string, description: string): SeoProgramContent {
  const intentSummary = getIntentSummary(entry, locale);

  if (locale === "ja") {
    return {
      sections: [
        {
          heading: `${entry.primaryKeyword}で比較すべき軸`,
          body: `${description}\n\n${intentSummary} 検索意図が強い比較キーワードほど、料金だけでなく、準備時間、荷物、テザリング、サポート、トラブル時の復旧しやすさまで並べて整理した方が上位と戦いやすくなります。`,
        },
        {
          heading: "価格だけで決めない方がよい理由",
          body: "一見安く見える選択肢でも、現地での設定が分かりにくい、再購入が必要、複数端末に向かないなど、旅行中の手間まで含めると割高になることがあります。\n\n比較記事では総額と運用のしやすさをセットで見ることが重要です。",
        },
        {
          heading: "どんな旅行者に向いているかで選び方は変わる",
          body: "一人旅、家族旅行、出張、長期滞在では、重視すべき条件が違います。比較ページでは“誰に向くか”を先に切り分けて読むと、自分に合う選択肢が見つかりやすくなります。",
        },
        {
          heading: "失敗しにくい選び方",
          body: "比較する時は、1. 旅行日数、2. 利用国数、3. テザリングの有無、4. 端末対応、5. 購入後の復旧導線、の順で確認すると判断しやすいです。特にeSIM初心者は、設定方法が分かりやすいサービスを優先すると失敗が減ります。",
        },
        {
          heading: "AutoWiFi Travelで比較しやすいポイント",
          body: "AutoWiFi Travelでは比較記事からそのまま国別ページや設定ガイドへ移動できるため、読み物だけで終わらず、実際の購入判断までつなげやすい構成です。",
        },
      ],
      faq: [
        { q: "比較では何を最優先で見ればいいですか？", a: "旅行日数、国数、データ容量、テザリング、購入後の分かりやすさを先に確認するのが基本です。" },
        { q: "安い方を選べば問題ないですか？", a: "価格は重要ですが、設定や再購入の手間まで含めると、最安が最適とは限りません。" },
        { q: "初めてのeSIMなら何を重視すべきですか？", a: "設定手順の分かりやすさと、注文後に情報を見直せるかを重視すると安心です。" },
      ],
    };
  }

  if (locale === "ko") {
    return {
      sections: [
        {
          heading: `${title}에서 비교해야 할 기준`,
          body: `${description}\n\n${intentSummary} 비교형 키워드는 가격뿐 아니라 준비 시간, 짐, 테더링, 지원 품질, 문제 발생 시 복구 편의성까지 함께 정리해야 설득력이 높습니다.`,
        },
        {
          heading: "가격만 보고 고르면 위험한 이유",
          body: "저렴해 보여도 현지에서 설정이 어렵거나, 중간에 데이터를 다시 사야 하거나, 여러 기기에 맞지 않으면 실제 체감 비용이 커질 수 있습니다.\n\n비교 글에서는 총비용과 사용 편의성을 함께 보는 것이 중요합니다.",
        },
        {
          heading: "여행 스타일에 따라 답이 달라집니다",
          body: "혼자 여행하는지, 가족과 함께인지, 출장인지, 장기 체류인지에 따라 우선순위가 달라집니다. 먼저 자신이 어떤 유형인지 나누어 보면 더 쉽게 선택할 수 있습니다.",
        },
        {
          heading: "실패하지 않는 선택 순서",
          body: "1. 여행 기간, 2. 방문 국가 수, 3. 테더링 필요 여부, 4. 단말 호환성, 5. 구매 후 복구 동선을 차례로 체크하면 판단이 쉬워집니다. eSIM 초보자라면 특히 설치 안내가 잘 정리된 서비스를 우선하세요.",
        },
        {
          heading: "AutoWiFi Travel에서 비교하기 쉬운 이유",
          body: "비교 글에서 바로 국가별 페이지와 설정 가이드로 이동할 수 있어, 정보 탐색에서 실제 구매 판단까지 자연스럽게 이어집니다.",
        },
      ],
      faq: [
        { q: "비교할 때 가장 먼저 봐야 할 것은 무엇인가요?", a: "여행 기간, 방문 국가 수, 데이터 용량, 테더링, 구매 후 안내를 먼저 확인하는 것이 기본입니다." },
        { q: "무조건 저렴한 쪽이 좋은가요?", a: "가격은 중요하지만 설정 난이도와 재구매 번거로움까지 보면 최저가가 최선은 아닐 수 있습니다." },
        { q: "처음 eSIM을 쓴다면 무엇을 중시해야 하나요?", a: "설치 방법이 명확하고, 주문 후 정보를 다시 확인하기 쉬운 서비스를 고르는 것이 안전합니다." },
      ],
    };
  }

  if (locale === "zh") {
    return {
      sections: [
        {
          heading: `${title} 应该怎么比`,
          body: `${description}\n\n${intentSummary} 对比类关键词越接近购买阶段，就越要把价格、准备时间、行李负担、热点共享、客服和出问题后的恢复路径一起讲清楚。`,
        },
        {
          heading: "为什么不能只看价格",
          body: "有些方案看起来便宜，但可能设置麻烦、需要中途补购流量，或不适合多设备使用。把这些隐性成本算进去，最终并不一定划算。\n\n所以对比时，最好把总成本和使用顺手程度一起看。",
        },
        {
          heading: "不同旅行方式，答案不同",
          body: "独自旅行、家庭旅行、商务出差、长期停留的优先条件并不一样。先判断自己属于哪种场景，再看方案，会更容易做决定。",
        },
        {
          heading: "更不容易选错的顺序",
          body: "建议按 1. 旅行天数、2. 访问国家数、3. 是否需要热点、4. 手机是否支持、5. 购买后是否容易找回说明 的顺序来比。尤其是第一次用 eSIM 的人，更应该优先看安装说明是否清楚。",
        },
        {
          heading: "为什么在 AutoWiFi Travel 上更好比",
          body: "在 AutoWiFi Travel 上，可以从对比文章直接跳到国家页和设置指南，阅读完后更容易继续完成实际购买判断。",
        },
      ],
      faq: [
        { q: "对比时最先看什么？", a: "先看旅行天数、国家数、流量、是否支持热点，以及购买后能否方便找回安装说明。" },
        { q: "是不是越便宜越好？", a: "价格重要，但如果设置复杂或中途要反复补购，整体体验和总成本都可能更差。" },
        { q: "第一次用 eSIM 应该重点看什么？", a: "重点看安装步骤是否清楚，以及购买后是否容易重新查看二维码和设置说明。" },
      ],
    };
  }

  const baseSections: SeoProgramContent["sections"] = [
      {
        heading: `What matters most in ${title}`,
        body: `${description}\n\n${intentSummary} High-intent comparison pages work best when they compare price, setup time, luggage burden, hotspot support, support quality, and recovery options side by side.\n\nReaders searching for comparison keywords are usually already close to making a decision. They do not just need one winner. They need a framework that tells them which option makes more sense for a short trip, a long trip, a multi-country route, a business arrival, or a first-time eSIM purchase.`,
      },
      {
        heading: "Why price alone is not enough",
        body: "Some options look cheaper at first glance but create more work during the trip through difficult setup, repeated top-ups, or device restrictions. Comparing total effort alongside total cost leads to better decisions.\n\nThe goal of a comparison page is not to eliminate price from the decision. It is to put price in context. A slightly more expensive option can still be the better value if it removes airport friction, reduces the chance of a setup problem, or makes it easier to recover the order once the trip is in progress.",
      },
      {
        heading: "The right choice depends on the traveler",
        body: "Solo travelers, families, business travelers, and long-stay users all optimize for different things. Splitting the comparison by traveler type usually leads to a clearer decision.\n\nFor example, a solo traveler may prioritize speed and simplicity, a family may care more about predictable data sizing, and a business traveler may value the ability to get online immediately after landing without experimenting with settings. Good comparison content should make those tradeoffs explicit instead of assuming all travelers define “best” the same way.",
      },
      {
        heading: "A safer decision checklist",
        body: "A practical order is: trip length, number of countries, hotspot needs, device compatibility, and how easy it is to recover the setup instructions. First-time eSIM users should prioritize clarity over a small headline discount.\n\nIt also helps to ask whether the comparison is solving for the trip you actually have or for an abstract “average traveler.” If the page never gets specific about arrival day, top-up friction, or how the traveler reopens the setup steps later, the comparison can still be too generic to guide a confident purchase.",
      },
      {
        heading: "Where comparison pages often stay too generic",
        body: "Many comparison pages repeat the same list of generic pros and cons without showing how those tradeoffs play out in a real trip. A stronger article explains where one option is enough, where it becomes restrictive, and where the convenience gap starts to matter more than the price gap.\n\nThat kind of framing is especially useful for English-language travel queries, because many readers are trying to compare across trip types, not just across brands. They want a decision they can trust when the itinerary changes slightly, not only a verdict for one perfect scenario.",
      },
      {
        heading: "What a complete buying decision includes",
        body: "A practical buying decision usually combines plan size, destination coverage, installation friction, support clarity, and the ability to recover if something goes wrong. The best comparison pages bring those pieces together so the reader is not forced to jump between multiple tabs to build the full picture.\n\nThat is where internal links matter. A good comparison should naturally lead into setup help, data sizing guidance, and destination pages so the traveler can validate the decision from multiple angles before buying.",
      },
      ...(entry.slug === "esim-vs-airport-sim"
        ? [
            {
              heading: "What changes after a long flight or late arrival",
              body: "The airport-versus-eSIM decision often feels different after a long-haul flight than it does when comparing plans from home. Once the traveler is tired, carrying luggage, and trying to reach the hotel, even a small amount of extra friction matters more. Queueing for a kiosk, figuring out the right plan on the spot, or relying on patchy airport WiFi can all feel much heavier in that moment than they do when reading a comparison article calmly.\n\nThat is why this topic is rarely only about price. It is about whether the traveler wants to solve connectivity before departure or after arrival, and whether they value a smoother first hour more than the chance of a slightly cheaper local purchase at the airport.",
            },
          ]
        : []),
      {
        heading: "How AutoWiFi Travel helps the decision",
        body: "AutoWiFi Travel connects comparison content directly to destination pages and setup guidance, which makes it easier to turn research into an actual purchase decision.\n\nInstead of stopping at a generic verdict, the comparison can flow into the exact next step: confirm the destination, check the setup path, and review the order details experience. That makes the article more useful for travelers who are genuinely about to buy rather than only browsing.",
      },
    ];
  const baseFaq: SeoProgramContent["faq"] = [
      { q: "What should I compare first?", a: "Start with trip length, number of destinations, data size, hotspot needs, and how easy the service is to manage after purchase." },
      { q: "Is the cheapest option usually the best?", a: "Not always. Extra setup friction, repeated purchases, and poor recovery options can make a very cheap option less attractive overall." },
      { q: "What matters most for first-time users?", a: "Clear setup steps and an easy way to revisit the order details matter a lot for first-time eSIM travelers." },
      { q: "How do I know whether a comparison article is actually useful?", a: "The useful ones go beyond pros and cons. They explain who each option fits, what the hidden limits are, and how the decision changes based on trip style and setup confidence." },
    ];
  const supplement = locale === "en" ? getEnglishComparisonSupplement(entry, title) : null;

  return {
    sections: mergeSupplementSections(baseSections, supplement?.sections),
    faq: mergeSupplementFaq(baseFaq, supplement?.faq),
    dateModified: locale === "en" ? SEO_PROGRAM_OVERRIDE_DATE : undefined,
  };
}

function buildHowtoContent(entry: SeoProgramEntry, locale: GuideLocale, title: string, description: string): SeoProgramContent {
  const intentSummary = getIntentSummary(entry, locale);

  if (locale === "ja") {
    return {
      sections: [
        {
          heading: `${entry.primaryKeyword}で最初に確認したいこと`,
          body: `${description}\n\n${intentSummary} 設定・トラブル系の記事は、ユーザーがどこで止まるかを先回りして説明するほど役に立ちます。`,
        },
        {
          heading: "手順は短く、確認ポイントは明確に",
          body: "eSIMの設定では、QRコードの受け取り、端末の対応状況、回線の有効化タイミング、主回線との切り替え、データローミングの設定が主な確認ポイントです。\n\n記事を読む時は、手順そのものよりも“どの設定を見落とすと失敗するか”を先に押さえるとトラブルを減らせます。",
        },
        {
          heading: "よくある失敗パターン",
          body: "よくあるのは、eSIMを追加しただけでデータ回線が切り替わっていない、ローミングがOFFのまま、主回線が通話・SMSに残っているか確認していない、QRコードの再読込制限を知らない、の4点です。\n\nトラブル系キーワードでは、この分岐を明確に書いてある記事ほど評価されやすくなります。",
        },
        {
          heading: "旅行前に済ませておきたい確認",
          body: "出発前には、端末対応、OS更新、WiFi環境でのインストール、注文詳細ページへの再アクセス方法を確認しておくと安心です。購入後にメールだけでなく注文詳細からも情報を見直せるサービスは復旧しやすいです。",
        },
        {
          heading: "関連ガイドも一緒に見ると判断しやすい",
          body: "設定記事だけでは解決しない場合、対応機種一覧、トラブルシューティング、データ容量の目安、旅行前インストールの考え方まで続けて読むと全体像がつかみやすくなります。",
        },
      ],
      faq: [
        { q: "eSIMは出発前に設定しても大丈夫ですか？", a: "多くの旅行者は出発前にインストールだけ済ませ、到着後に回線を有効化しています。開始条件はプランごとに確認してください。" },
        { q: "QRコードがうまく読み取れない時はどうすればいいですか？", a: "別端末で表示する、明るい画面で拡大する、手動入力コードがあるか確認する、既存eSIMの空き状況を確認する、の順で試すと改善しやすいです。" },
        { q: "eSIM設定で最も見落としやすい項目は何ですか？", a: "データ回線の切り替えとデータローミング設定の2つです。インストールできてもこの設定で止まるケースが多いです。" },
      ],
    };
  }

  if (locale === "ko") {
    return {
      sections: [
        {
          heading: `${title}에서 먼저 확인할 것`,
          body: `${description}\n\n${intentSummary} 설정·문제 해결 글은 사용자가 어디에서 막히는지 먼저 짚어 줄수록 도움이 됩니다.`,
        },
        {
          heading: "단계는 짧게, 확인 포인트는 선명하게",
          body: "eSIM 설정에서는 QR 코드 수령, 단말 호환 여부, 회선 활성화 시점, 주 회선 전환, 데이터 로밍 설정이 핵심 확인 포인트입니다.\n\n단계 그 자체보다 어떤 설정을 놓치면 실패하는지를 먼저 이해하면 문제를 줄일 수 있습니다.",
        },
        {
          heading: "자주 나오는 실패 패턴",
          body: "eSIM을 추가했지만 데이터 회선이 바뀌지 않은 경우, 로밍이 꺼져 있는 경우, 기본 회선이 통화와 문자에 어떻게 남아 있는지 확인하지 않은 경우, QR 코드 재설치 제한을 모르는 경우가 많습니다.\n\n이런 분기를 명확하게 정리한 가이드일수록 검색 의도와 잘 맞습니다.",
        },
        {
          heading: "출발 전에 해두면 좋은 점검",
          body: "단말 호환성, OS 업데이트, WiFi 환경에서의 설치, 주문 상세 재접속 방법까지 미리 확인해 두면 안전합니다. 이메일 외에도 주문 상세 페이지에서 다시 확인할 수 있는 서비스가 복구에 강합니다.",
        },
        {
          heading: "관련 가이드를 함께 보면 더 쉬워집니다",
          body: "설정 글만으로 부족하다면 호환 기기 목록, 트러블슈팅, 필요한 데이터 용량, 출발 전 설치 여부 같은 글을 함께 보면 전체 흐름이 더 잘 보입니다.",
        },
      ],
      faq: [
        { q: "eSIM은 출발 전에 설치해도 되나요?", a: "많은 사용자는 출발 전에 설치만 하고, 도착 후 실제 회선을 켭니다. 시작 조건은 플랜 설명을 확인하세요." },
        { q: "QR 코드가 읽히지 않을 때는 어떻게 하나요?", a: "다른 기기 화면으로 띄우기, 화면 밝기 올리기, 수동 입력 코드 확인, 기존 eSIM 슬롯 상태 확인 순서로 점검해 보세요." },
        { q: "가장 많이 놓치는 설정은 무엇인가요?", a: "데이터 회선 전환과 데이터 로밍 설정입니다. 설치는 됐지만 이 두 항목에서 막히는 경우가 많습니다." },
      ],
    };
  }

  if (locale === "zh") {
    return {
      sections: [
        {
          heading: `${title} 先确认什么`,
          body: `${description}\n\n${intentSummary} 设置和排障文章最重要的是提前回答“用户最容易卡在哪一步”。`,
        },
        {
          heading: "步骤要短，检查点要清楚",
          body: "eSIM 设置里最关键的是：收到二维码、确认手机支持、决定何时启用、切换数据线路、打开数据漫游。\n\n比起只写步骤本身，更重要的是告诉用户哪一步最容易遗漏。",
        },
        {
          heading: "最常见的失败模式",
          body: "很多问题并不是安装失败，而是安装后没有切换数据线路、数据漫游没打开、主卡仍然占用设置、或者不了解二维码重新安装限制。\n\n把这些分支写清楚的文章，更容易真正解决搜索者的问题。",
        },
        {
          heading: "出发前建议先做的检查",
          body: "建议先确认设备支持、系统版本、是否能在 WiFi 下完成安装，以及之后如何重新进入订单详情。除了邮件，还能从订单详情页重新查看信息的服务会更省心。",
        },
        {
          heading: "搭配相关指南一起看更容易理解",
          body: "如果只看设置文章还是不放心，可以继续看兼容机型、排障、需要多少流量、是否应在出发前安装等内容，会更容易形成完整判断。",
        },
      ],
      faq: [
        { q: "可以在出发前先装好 eSIM 吗？", a: "大多数情况下可以先安装，到达后再正式启用。具体何时开始计算有效期，要看套餐说明。" },
        { q: "二维码扫不出来怎么办？", a: "可以尝试换另一台设备显示二维码、调高亮度、查看是否有手动输入码，并确认当前 eSIM 槽位是否可用。" },
        { q: "最容易漏掉的设置是什么？", a: "最常见的是没有切换数据线路，或者忘记打开数据漫游。" },
      ],
    };
  }

  const baseSections: SeoProgramContent["sections"] = [
      {
        heading: `What to confirm first in ${title}`,
        body: `${description}\n\n${intentSummary} Setup and troubleshooting pages work best when they answer the exact point where travelers get blocked.\n\nThat usually means the article has to do more than list the official steps. It needs to explain what the traveler should see on screen, what common detours look like, and which settings matter most if the installation seems successful but the connection still does not work after arrival.`,
      },
      {
        heading: "Keep the steps short, make the checks explicit",
        body: "The main checkpoints are receiving the QR code, confirming device compatibility, choosing the right activation timing, switching the data line, and turning on data roaming.\n\nReaders benefit most when the guide highlights the settings that are commonly missed rather than only listing the clicks. A useful how-to page reduces ambiguity: which line should be used for data, whether the primary SIM should remain the default for calls, and when the traveler should expect the plan to start working.",
      },
      {
        heading: "The most common failure patterns",
        body: "A lot of issues come from installing the eSIM successfully but never switching the active data line, leaving roaming turned off, or not understanding re-installation limits on the QR code. Clear guides should call out those branches directly.\n\nTravelers also get caught by timing mistakes. They install too late while already boarding, or they enable the plan too early and then worry that the validity has started before the trip. The best how-to content explains those timing choices in plain language instead of assuming prior eSIM experience.",
      },
      {
        heading: "What to prepare before departure",
        body: "It helps to confirm device support, update the OS, install on a stable WiFi connection, and make sure you know how to reopen the order details later. Travelers recover more easily when the service provides both email instructions and a reusable order page.\n\nIt is also worth taking a screenshot of the core setup details or at least bookmarking the order page while you still have reliable WiFi. That small step can save a lot of stress if the traveler lands somewhere crowded, loses signal while troubleshooting, or needs to retry the installation under time pressure.",
      },
      {
        heading: "What to do if the first attempt does not work",
        body: "A useful recovery sequence is: confirm the eSIM profile was added, check which line is selected for mobile data, turn on data roaming for the travel line if the provider requires it, verify the device actually supports the profile, and then retry the connection in an area with stable signal. If the issue is QR related, check whether the provider also offers a manual activation code or stored installation details.\n\nHow-to pages become more trustworthy when they describe this recovery sequence clearly. Travelers often search these queries while already stressed, so a calm checklist is more helpful than a broad troubleshooting essay.",
      },
      {
        heading: "What to gather before asking support",
        body: "If self-service does not solve it, the fastest support conversations usually start with the device model, the exact destination, when the traveler installed the profile, what error message appeared, and whether the line is already visible in settings. These details help separate a device setup issue from a network or package mismatch.\n\nSupport is also easier when the order details remain easy to reopen. That is why setup content should not stop at installation. It should prepare the traveler for the recovery path as well.",
      },
      ...(entry.slug === "esim-hotspot-tethering"
        ? [
            {
              heading: "When hotspot support matters most on a trip",
              body: "Hotspot support becomes much more important when the traveler expects to connect a laptop at a station, share data with a second device on a train, upload files from accommodation WiFi that is too weak, or keep navigation running on a separate screen. In those cases, a plan that technically works on the phone may still feel limited if tethering is blocked or heavily restricted.\n\nThat is why hotspot guidance should be specific. Readers need to know whether tethering is central to the trip or just a backup feature, because that changes how much weight the hotspot rule should carry in the final buying decision.",
            },
          ]
        : []),
      ...(entry.slug === "how-much-data-do-i-need-for-travel"
        ? [
            {
              heading: "A simple way to estimate daily travel usage",
              body: "A practical travel estimate starts by grouping usage into light, medium, and heavy days. Light days usually mean maps, messaging, translation, and occasional ride-hailing. Medium days add more photo uploads, social scrolling, and regular background syncing. Heavy days are the ones with hotspot use, cloud backups, video calls, or long streaming sessions.\n\nThinking in daily patterns is more useful than searching for one universal number. Many travelers only need modest data most of the time, but one transfer day, work session, or content-heavy day can push the total up quickly. That is why a sizing guide should help the reader identify their likely heavy days before choosing the plan.",
            },
          ]
        : []),
      {
        heading: "Related guides that usually help next",
        body: "Compatibility lists, troubleshooting checklists, data-sizing guides, and activation timing guides all complement setup articles and make the final decision easier.\n\nTogether, those pages answer the full traveler journey: whether the phone supports eSIM, how much data to buy, when to install, what to do if the QR code fails, and how to recover the order if something goes wrong later.",
      },
    ];
  const baseFaq: SeoProgramContent["faq"] = [
      { q: "Can I install the eSIM before the trip?", a: "Usually yes. Many travelers install before departure and enable the line after arrival. Check exactly when the validity starts." },
      { q: "What if the QR code does not scan?", a: "Try displaying it on another screen, increasing brightness, checking for a manual activation code, and confirming that the device has space for another eSIM profile." },
      { q: "What setting is missed most often?", a: "Switching the active data line and turning on data roaming are the two biggest ones." },
      { q: "What should I have ready if I need support?", a: "Keep the order details, device model, destination, installation timing, and any on-screen error message ready. Those details make support much faster and more accurate." },
    ];
  const supplement = locale === "en" ? getEnglishHowtoSupplement(entry, title) : null;

  return {
    sections: mergeSupplementSections(baseSections, supplement?.sections),
    faq: mergeSupplementFaq(baseFaq, supplement?.faq),
    dateModified: locale === "en" ? SEO_PROGRAM_OVERRIDE_DATE : undefined,
  };
}

function buildReviewOrUsecaseContent(entry: SeoProgramEntry, locale: GuideLocale, title: string, description: string): SeoProgramContent {
  const intentSummary = getIntentSummary(entry, locale);

  if (locale === "ja") {
    return {
      sections: [
        {
          heading: `${entry.primaryKeyword}で見られているポイント`,
          body: `${description}\n\n${intentSummary} 旅行者が知りたいのは“良いか悪いか”だけではなく、自分に向くかどうかです。`,
        },
        {
          heading: "向いている人・向かない人を先に切り分ける",
          body: "レビューや用途別の記事では、価格、データ容量、カバー範囲だけでなく、誰の旅に合うのかを最初に切り分けた方が判断しやすくなります。短期旅行なのか、周遊なのか、仕事利用なのかで必要条件は大きく変わります。",
        },
        {
          heading: "比較で見落としやすい注意点",
          body: "よく見落とされるのは、テザリング制限、無制限表記の実質制限、再購入のしやすさ、サポート言語、注文後に情報を見直せるかです。特に競合サービスのレビューを読む時は、メリットだけでなく制限条件まで確認しておくべきです。",
        },
        {
          heading: "AutoWiFi Travelと比較する時の観点",
          body: "比較する時は、旅行先の網羅性、日本語を含むサポート導線、購入後にQRコードと設定情報を再確認できるか、国別ページから直接プランを選びやすいかを見ると判断しやすくなります。",
        },
        {
          heading: "結局どんな人が候補にしやすいか",
          body: "価格重視、サポート重視、設定の分かりやすさ重視など、自分の優先順位を一つ決めると選択がぶれにくくなります。レビュー記事は結論だけ読むのではなく、条件が合うかで判断するのがポイントです。",
        },
      ],
      faq: [
        { q: "レビュー記事では何を一番重視すべきですか？", a: "料金だけでなく、向いている人・向かない人、制限条件、サポートの分かりやすさまで確認するのがおすすめです。" },
        { q: "用途別記事はどう読むと失敗しにくいですか？", a: "自分の旅程と同じ条件かどうかを確認し、必要な容量やテザリング可否が合うかを先に見てください。" },
        { q: "AutoWiFi Travelと比較する価値はありますか？", a: "はい。価格だけでなく、購入後の復旧導線や多言語メール、国別ページの分かりやすさも比較しやすいポイントです。" },
      ],
    };
  }

  if (locale === "ko") {
    return {
      sections: [
        {
          heading: `${title}에서 많이 보는 포인트`,
          body: `${description}\n\n${intentSummary} 사용자는 단순히 좋고 나쁨보다, 자신에게 맞는지 여부를 가장 궁금해합니다.`,
        },
        {
          heading: "어떤 사람에게 맞는지부터 나누기",
          body: "리뷰나 용도형 글에서는 가격과 데이터량뿐 아니라, 어떤 여행자에게 맞는지를 먼저 나누는 편이 판단하기 쉽습니다. 짧은 여행인지, 여러 나라를 도는지, 업무용인지에 따라 기준이 달라집니다.",
        },
        {
          heading: "비교에서 자주 놓치는 점",
          body: "테더링 제한, 무제한 표시의 실제 제한, 재구매 편의성, 지원 언어, 주문 후 안내 재확인 여부를 놓치기 쉽습니다. 경쟁 서비스 리뷰를 볼 때는 장점뿐 아니라 제한 조건도 함께 확인해야 합니다.",
        },
        {
          heading: "AutoWiFi Travel과 비교할 때의 관점",
          body: "방문 국가 범위, 지원 동선, 구매 후 QR 코드와 설치 정보를 다시 확인할 수 있는지, 국가별 페이지에서 바로 플랜을 선택하기 쉬운지를 보면 판단이 쉬워집니다.",
        },
        {
          heading: "결국 어떤 사람이 후보로 보기 쉬운가",
          body: "가격, 지원, 설정 편의성 중 무엇을 가장 우선할지 하나만 정해도 선택이 훨씬 쉬워집니다. 리뷰 글은 결론만 보기보다 조건이 자신의 여행과 맞는지 확인하는 것이 중요합니다.",
        },
      ],
      faq: [
        { q: "리뷰 글에서는 무엇을 가장 봐야 하나요?", a: "가격뿐 아니라 누구에게 맞는지, 어떤 제한이 있는지, 지원이 얼마나 명확한지를 함께 보는 것이 좋습니다." },
        { q: "용도별 글은 어떻게 읽어야 하나요?", a: "자신의 여행 조건과 비슷한지 먼저 보고, 필요한 데이터량과 테더링 조건이 맞는지 확인하세요." },
        { q: "AutoWiFi Travel과 비교할 가치가 있나요?", a: "네. 가격 외에도 구매 후 복구 동선과 다국어 이메일, 국가별 페이지의 명확성을 함께 비교할 수 있습니다." },
      ],
    };
  }

  if (locale === "zh") {
    return {
      sections: [
        {
          heading: `${title} 搜索者真正关心什么`,
          body: `${description}\n\n${intentSummary} 大多数读者并不只想知道“好不好”，更想知道“适不适合自己”。`,
        },
        {
          heading: "先分清适合谁，不适合谁",
          body: "评测类和场景类文章，除了价格和流量，更重要的是先说明适合哪类旅行者。短途、周游、工作场景、长期停留，判断标准都不一样。",
        },
        {
          heading: "最容易忽略的限制条件",
          body: "容易被忽略的点包括热点共享限制、所谓无限流量的限速条款、补购是否方便、客服语言以及购买后能否重新查看设置说明。看竞品评测时一定不能只看优点。",
        },
        {
          heading: "与 AutoWiFi Travel 对比时看什么",
          body: "对比时建议看覆盖目的地数量、支持流程是否清楚、购买后能否重新查看二维码和设置说明，以及是否能从国家页直接完成选择。",
        },
        {
          heading: "最后怎么判断更适合谁",
          body: "先决定自己最重视的是价格、客服还是设置清晰度，只要优先级明确，选择就不会太摇摆。评测文章不要只看结论，更要看条件是否匹配自己的旅行方式。",
        },
      ],
      faq: [
        { q: "看评测文章时最该重视什么？", a: "除了价格，还要看适合谁、不适合谁、有哪些限制，以及客服和恢复路径是否清楚。" },
        { q: "场景型文章应该怎么读？", a: "先确认文章讨论的旅行条件是否和你的行程接近，再看流量和热点等关键条件是否匹配。" },
        { q: "有必要和 AutoWiFi Travel 一起比吗？", a: "有。除了价格，还可以比较购买后的恢复路径、多语言邮件和国家页的清晰度。" },
      ],
    };
  }

  const baseSections: SeoProgramContent["sections"] = [
      {
        heading: `What readers want to know about ${title}`,
        body: `${description}\n\n${intentSummary} Most users are trying to answer whether the option fits their trip, not just whether it is generally good or bad.\n\nThat is especially true for review and use-case queries. Searchers are usually not looking for a brand summary in the abstract. They want help deciding whether the option is sensible for their route, device confidence, data habits, and level of tolerance for setup friction while traveling.`,
      },
      {
        heading: "Start with fit, not just features",
        body: "Review and use-case articles work best when they explain who the option suits first. A short city break, a multi-country itinerary, remote work, and a longer stay all change the decision criteria.\n\nA useful page should help the reader recognize their own trip pattern inside the article. If the content never gets that specific, the review can feel polished but still fail to answer the real buying question.",
      },
      {
        heading: "Limitations that are easy to miss",
        body: "Hotspot rules, fair-use limits behind “unlimited” messaging, top-up convenience, support language, and the ability to revisit setup details are all easy to miss in a quick comparison.\n\nThese details matter because they only become visible once the traveler is already committed. A review is more trustworthy when it names those limits clearly instead of hiding them behind broad phrases like “good for travel” or “easy to use.”",
      },
      {
        heading: "What to compare against AutoWiFi Travel",
        body: "Coverage breadth, support flow, post-purchase recovery options, and how easily the user can move from an article to a destination plan are practical comparison points.\n\nThe useful question is not whether one option wins in every scenario. It is whether the traveler can move from research to purchase to installation with fewer points of confusion. Reviews become more useful when they compare the full experience rather than only the packaging around the plan.",
      },
      {
        heading: "A clearer way to make the decision",
        body: "Choosing one clear priority such as price, support, or setup simplicity makes the final comparison easier. Review content should guide readers toward that priority rather than only giving a generic verdict.\n\nIn practice, the strongest reviews and use-case pages make the reader feel less uncertain after reading. They narrow the choice, explain the tradeoff, and show what to validate next before paying.",
      },
      {
        heading: "Trip patterns this page should actually help with",
        body: "For a review page, that might mean distinguishing between first-time travelers, repeat eSIM users, and people choosing between multiple providers. For a use-case page, it usually means separating the needs of solo travel, family travel, road trips, long stays, study abroad, or business transit.\n\nWhen the page names those patterns clearly, it becomes far easier for the reader to translate the advice into a confident next step instead of treating the article like a vague opinion piece.",
      },
      {
        heading: "What usually changes the final recommendation",
        body: "The final recommendation often changes when one of a few variables shifts: the traveler needs hotspot, the trip crosses borders, setup confidence is low, support clarity matters more than the lowest price, or the traveler expects to revisit installation details after purchase. Those are the switches that real buying decisions often turn on.\n\nThat is why review-style content should connect naturally to destination pages, setup help, and data-sizing guidance. The recommendation becomes stronger when it is grounded in the wider decision journey, not isolated from it.",
      },
    ];
  const baseFaq: SeoProgramContent["faq"] = [
      { q: "What matters most in a review article?", a: "Look beyond price and features. The best reviews explain fit, limitations, and what alternatives are worth considering." },
      { q: "How should I use a use-case article?", a: "Check whether the trip style in the article matches your itinerary, then compare data size, flexibility, and hotspot support against your own needs." },
      { q: "Why compare with AutoWiFi Travel at all?", a: "It helps anchor the decision in a real purchase flow, including post-purchase support and how easy the service is to use during the trip." },
      { q: "How do I know whether a review actually helps my decision?", a: "The better reviews explain who the option fits, where the limits show up on a real trip, and what factors would change the recommendation for a different traveler." },
    ];
  const supplement = locale === "en" ? getEnglishReviewOrUsecaseSupplement(entry, title) : null;

  return {
    sections: mergeSupplementSections(baseSections, supplement?.sections),
    faq: mergeSupplementFaq(baseFaq, supplement?.faq),
    dateModified: locale === "en" ? SEO_PROGRAM_OVERRIDE_DATE : undefined,
  };
}

export function buildSeoProgramContent(params: {
  slug: string;
  locale: GuideLocale;
  title: string;
  description: string;
}) {
  const entry = getSeoProgramEntry(params.slug);
  if (!entry) return null;

  const override = getSeoProgramOverrideContent({
    entry,
    locale: params.locale,
    title: params.title,
    description: params.description,
  });
  if (override) {
    return override;
  }

  if (entry.intent === "country") {
    return buildCountryContent(entry, params.locale, params.title, params.description);
  }

  if (entry.intent === "comparison") {
    return buildComparisonContent(entry, params.locale, params.title, params.description);
  }

  if (entry.intent === "howto") {
    return buildHowtoContent(entry, params.locale, params.title, params.description);
  }

  return buildReviewOrUsecaseContent(entry, params.locale, params.title, params.description);
}

export function getSeoProgramRelatedSlugs(slug: string) {
  const entry = getSeoProgramEntry(slug);
  if (!entry) return [];

  let related: string[];

  if (entry.intent === "country") {
    related = [
      entry.region === "asia" ? "best-esim-for-asia" : entry.region === "europe" ? "best-esim-for-europe" : "best-esim-providers",
      "travel-internet-options",
      "how-to-setup-esim",
    ];
  } else if (entry.intent === "comparison") {
    related = ["best-esim-providers", "cheapest-esim-plans", "how-much-data-do-i-need-for-travel"];
  } else if (entry.intent === "howto") {
    related = ["esim-compatible-phones", "esim-troubleshooting", "travel-internet-options"];
  } else {
    related = ["best-esim-providers", "cheapest-esim-plans", "travel-internet-options"];
  }

  return Array.from(new Set(related)).filter((item) => item !== slug);
}
