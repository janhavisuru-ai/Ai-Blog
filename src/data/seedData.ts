import { Article, User, Comment } from '../types';
import {
  heroEditorialSpaces,
  coverNeuralNature,
  coverTypographyInk,
  figureMonasticCourtyard,
  figureMyceliumMicro,
} from '../assets/images';

export const SEED_USERS: User[] = [
  {
    id: 'user-1',
    name: 'Elena Rostova',
    handle: '@elenarostova',
    email: 'elena@chronicle.journal',
    avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Elena&backgroundColor=f5ebe0',
    bio: 'Cultural critic writing on feminism, work, and the slow craft of becoming who you are.',
    role: 'Contributing Editor',
    location: 'Zurich & Vienna',
    website: 'https://elenarostova.ch',
    twitter: 'elenarostova',
    joinedDate: 'October 2024',
    followersCount: 1420,
    followingCount: 88,
    followingUserIds: ['user-2'],
    bookmarkedArticleIds: ['art-2', 'art-4'],
  },
  {
    id: 'user-2',
    name: 'Marcus Vance',
    handle: '@marcusvance',
    email: 'marcus@chronicle.journal',
    avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Marcus&backgroundColor=e3ede8',
    bio: 'Food systems researcher studying how what we eat shapes land, water, and climate.',
    role: 'Food Systems Researcher',
    location: 'Cambridge, MA',
    website: 'https://vance-lab.org',
    twitter: 'marcus_vance',
    joinedDate: 'January 2025',
    followersCount: 890,
    followingCount: 142,
    followingUserIds: ['user-1', 'user-3'],
    bookmarkedArticleIds: ['art-1'],
  },
  {
    id: 'user-3',
    name: 'Sora Takahashi',
    handle: '@soratakahashi',
    email: 'sora@chronicle.journal',
    avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Sora&backgroundColor=fae1dd',
    bio: 'Essayist and home cook in Kyoto. Writing on plant-based temple cooking, journaling, and gentle self-discipline.',
    role: 'Essayist & Home Cook',
    location: 'Kyoto, Japan',
    joinedDate: 'March 2025',
    followersCount: 2150,
    followingCount: 310,
    followingUserIds: ['user-1'],
    bookmarkedArticleIds: ['art-1'],
  },
  {
    id: 'user-4',
    name: 'Julian Mercer',
    handle: '@julianmercer',
    email: 'julian@chronicle.journal',
    avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Julian&backgroundColor=d8e2dc',
    bio: 'Historian of science and editor, recovering the stories of women whose discoveries were credited to others.',
    role: 'Science Historian',
    location: 'London, UK',
    joinedDate: 'May 2025',
    followersCount: 1740,
    followingCount: 95,
    followingUserIds: ['user-2'],
    bookmarkedArticleIds: ['art-1'],
  },
];

export const SEED_ARTICLES: Article[] = [
  {
    id: 'art-1',
    slug: 'how-long-to-form-a-habit',
    title: 'How Long Does It Take to Form a Habit? What the Science Says',
    titleHighlights: ['Form a Habit'],
    subtitle: 'Forget the 21-day myth. Research shows a new habit takes 66 days on average to stick, and real self growth comes from small, repeatable steps.',
    subtitleHighlights: ['66 days', 'self growth'],
    category: 'Self Growth',
    tags: ['Habits', 'Mindset', 'Personal Growth', 'Patience'],
    authorId: 'user-1',
    author: {
      id: 'user-1',
      name: 'Elena Rostova',
      handle: '@elenarostova',
      avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Elena&backgroundColor=f5ebe0',
      role: 'Contributing Editor',
      bio: 'Cultural critic writing on feminism, work, and becoming.',
    },
    coverImage: heroEditorialSpaces,
    coverImageAlt: 'A man reading alone at a long wooden table in a sunlit library',
    coverCaption: 'Figure 1. Growth rarely looks dramatic from the outside. Mostly, it looks like showing up.',
    publishedAt: 'October 1, 2026',
    readTime: 6,
    claps: 342,
    clappedBy: { 'user-2': 15, 'user-3': 25 },
    views: 4820,
    isDraft: false,
    isFeatured: true,
    commentsCount: 3,
    content: `We are sold transformation as an event: the thirty-day challenge, the dramatic before-and-after, the morning routine that promises to rewire a life by Friday. When the change does not arrive on schedule, we conclude that we lack discipline, and we quit.

But the people who actually change rarely describe a single turning point. They describe a long, quiet middle—weeks in which nothing seemed to happen, followed by the slow realisation that something had.

### What the Research Actually Says

In a study published in 2010, a team at University College London led by Phillippa Lally followed 96 volunteers as they tried to turn a new daily behaviour—drinking water with lunch, a short run before dinner—into a habit.

On average, it took 66 days for the behaviour to feel automatic. Individual results ranged from 18 days to an estimated 254. And crucially, missing a single day made no meaningful difference to the outcome.

> "Growth is not a breakthrough. It is the accumulation of ordinary days you decided not to waste."

The popular "21 days to a new habit" is not a finding; it is a hope. Expecting change on that timeline is how most of us talk ourselves out of change that was already under way.

### Designing for the Long Middle

![Figure 2. A shaft of sunlight falls across the stone wall of a quiet cloister, mirrored in a still pool. Growth needs unhurried space.](${figureMonasticCourtyard})

If boredom is the texture of real progress, then the goal is not more motivation. It is a practice that survives the dull weeks:

1. **Shrink the Starting Line**: Two pages, not two chapters. Five minutes of stretching, not an hour at the gym. A habit you can do on your worst day is a habit you will still be doing in a year.
2. **Track the Streak, Forgive the Gap**: Record what you do, but treat a missed day as data rather than a verdict. The research is clear that one lapse does not reset the clock.
3. **Measure in Seasons, Not Weeks**: Compare yourself to who you were three months ago, never to who you were last Tuesday. Weekly progress is noise; seasonal progress is signal.

The most important skill in self growth is not willpower. It is the patience to keep going while nothing visible is happening—because that is exactly when the work is being done.`,
  },
  {
    id: 'art-2',
    slug: 'veganism-environmental-impact',
    title: 'How Does Veganism Impact the Planet?',
    titleHighlights: ['Veganism'],
    subtitle: 'Animal farming occupies most of the world’s farmland yet supplies a small share of our calories. Here is what changes when the plate changes.',
    subtitleHighlights: ['Animal farming'],
    category: 'Veganism',
    tags: ['Plant-Based', 'Climate', 'Food Systems', 'Sustainability'],
    authorId: 'user-2',
    author: {
      id: 'user-2',
      name: 'Marcus Vance',
      handle: '@marcusvance',
      avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Marcus&backgroundColor=e3ede8',
      role: 'Food Systems Researcher',
      bio: 'Food systems researcher.',
    },
    coverImage: coverNeuralNature,
    coverImageAlt: 'Glowing fungal mycelium threading through a mossy forest floor',
    coverCaption: 'Healthy soil is a living network. How much land we farm, and for what, decides how much of it survives.',
    publishedAt: 'September 28, 2026',
    readTime: 5,
    claps: 218,
    clappedBy: { 'user-1': 12 },
    views: 2940,
    isDraft: false,
    commentsCount: 2,
    content: `In 2018, Joseph Poore and Thomas Nemecek published what remains one of the most comprehensive studies of food's environmental impact. Writing in *Science*, they assembled data from roughly 38,700 farms across 119 countries, covering about 40 of the foods that make up most of what humanity eats.

Their conclusion was blunt: of all the choices an individual can make to shrink their environmental footprint, few are as powerful as what they put on their plate.

### Most of the Land, a Fraction of the Food

![Figure 2. Golden and blue fungal threads branch through dark soil in close-up. Land released from grazing can return to living habitat.](${figureMyceliumMicro})

The study's most striking finding is a mismatch between what animal farming takes and what it gives back:

\`\`\`
Global farmland vs. what it returns (Poore & Nemecek, 2018)
Meat, dairy, eggs, aquaculture  -> 83% of farmland -> 18% of calories, 37% of protein
Plant foods                     -> 17% of farmland -> 82% of calories, 63% of protein
\`\`\`

Even the comparison most favourable to meat holds the pattern. The study found that the lowest-impact beef still produced around six times more greenhouse gas emissions, and used about thirty-six times more land, than peas.

Modelled at a global scale, a shift to diets without animal products would cut food's land use by about 3.1 billion hectares—a reduction of 76%, an area roughly the size of Africa—and food's greenhouse gas emissions by about 49%.

> "Going vegan is not a sacrifice in this arithmetic. It is the single largest lever most of us will ever hold over our own footprint."

### Progress, Not Purity

None of this demands perfection on day one. The numbers reward direction, not dogma:

1. **Start With the Biggest Swaps**: Beef and lamb carry the heaviest footprint per gram of protein. Replacing them with lentils, beans, or tofu a few nights a week moves the needle more than any other single change.
2. **Rethink Dairy Quietly**: Oat, soy, and pea milks are now easy defaults in most cafés. A daily latte is a habit worth switching once.
3. **Cook, Don't Just Substitute**: The most sustainable vegans are rarely the ones living on processed imitations. They are the ones who learned to love chickpeas.

The plant-based plate is not a trend. It is what the data has been saying for years.`,
  },
  {
    id: 'art-4',
    slug: 'matilda-effect-women-in-science',
    title: 'The Matilda Effect: The Women Whose Discoveries Were Credited to Men',
    titleHighlights: ['Matilda Effect'],
    subtitle: 'From DNA to nuclear fission to pulsars, the history of science is full of women who did the work while others collected the prize.',
    subtitleHighlights: ['history of science', 'full of women'],
    category: 'Feminism',
    tags: ['Feminism', 'History', 'Women in Science', 'Equality'],
    authorId: 'user-4',
    author: {
      id: 'user-4',
      name: 'Julian Mercer',
      handle: '@julianmercer',
      avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Julian&backgroundColor=d8e2dc',
      role: 'Science Historian',
      bio: 'Historian of science and editor.',
    },
    coverImage: coverTypographyInk,
    coverImageAlt: 'Vintage metal letterpress movable type blocks coated in dark ink',
    coverCaption: 'Figure 4. History is set in type by whoever controls the press.',
    publishedAt: 'September 19, 2026',
    readTime: 4,
    claps: 189,
    clappedBy: { 'user-3': 15 },
    views: 3200,
    isDraft: false,
    commentsCount: 1,
    content: `In 1993, historian of science Margaret Rossiter gave a name to a pattern she had spent her career documenting: the systematic tendency to credit women's scientific work to the men around them. She called it the *Matilda effect*, after the American suffragist Matilda Joslyn Gage, who had described the same injustice more than a century earlier.

Once you know the name, you start to see it everywhere.

### Three Stories, One Pattern

1. **Rosalind Franklin**: In 1952, Franklin and her student Raymond Gosling produced an X-ray diffraction image of DNA known as Photo 51. It was shown to James Watson without her knowledge and became key evidence for the double helix. Watson, Francis Crick, and Maurice Wilkins received the 1962 Nobel Prize. Franklin had died four years earlier, at 37.
2. **Lise Meitner**: Working with her nephew Otto Frisch, Meitner provided the physical explanation of nuclear fission in 1939. The 1944 Nobel Prize in Chemistry for the discovery went to her long-time collaborator Otto Hahn alone.
3. **Jocelyn Bell Burnell**: As a graduate student in 1967, Bell Burnell noticed the strange signal that turned out to be the first known pulsar. The 1974 Nobel Prize in Physics went to her supervisor, Antony Hewish, and to Martin Ryle.

Bell Burnell has answered the story with remarkable grace. In 2018, she received the Breakthrough Prize in Fundamental Physics and donated the entire $3 million award to fund scholarships for under-represented students in physics.

> "Credit is not vanity. It decides who gets funded, who gets hired, and who the next generation believes a scientist looks like."

### Why It Still Matters

The Matilda effect is not only a historical footnote. It persists in quieter forms: in whose papers get cited, whose names go first on author lists, and whose ideas are repeated in meetings only after a man says them.

Feminism, in this sense, is partly an act of accurate record-keeping. Telling these stories correctly is not rewriting history. It is finally finishing it.`,
  },
];

export const SEED_COMMENTS: Comment[] = [
  {
    id: 'c-1',
    articleId: 'art-1',
    authorId: 'user-2',
    authorName: 'Marcus Vance',
    authorHandle: '@marcusvance',
    authorAvatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Marcus&backgroundColor=e3ede8',
    content: 'The 66-day figure is such a relief. I have abandoned habits at week three thinking I was failing, when I was simply still in the long middle.',
    createdAt: '2 days ago',
    likes: 18,
    likedBy: ['user-1', 'user-3'],
  },
  {
    id: 'c-2',
    articleId: 'art-1',
    authorId: 'user-3',
    authorName: 'Sora Takahashi',
    authorHandle: '@soratakahashi',
    authorAvatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Sora&backgroundColor=fae1dd',
    content: 'Measuring in seasons rather than weeks is exactly what my vegetable garden taught me. Nothing grows faster because you stare at it.',
    createdAt: '1 day ago',
    likes: 14,
    likedBy: ['user-1'],
  },
  {
    id: 'c-3',
    articleId: 'art-1',
    authorId: 'user-4',
    authorName: 'Julian Mercer',
    authorHandle: '@julianmercer',
    authorAvatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Julian&backgroundColor=d8e2dc',
    content: '"Track the streak, forgive the gap." Writing that on an index card for my desk.',
    createdAt: '12 hours ago',
    likes: 9,
    likedBy: ['user-2'],
  },
];

export const CATEGORIES = [
  'All Topics',
  'Veganism',
  'Feminism',
  'Self Growth',
];

// Seed articles/comments that have been removed. Browsers that loaded them earlier still hold
// them in localStorage, so hydration skips these IDs instead of keeping them as user-written.
export const RETIRED_SEED_IDS = ['art-3', 'art-5', 'art-6', 'c-4', 'c-5', 'c-6'];
