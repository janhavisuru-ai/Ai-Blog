import { Article, User, Comment } from '../types';

export const SEED_USERS: User[] = [
  {
    id: 'user-1',
    name: 'Elena Rostova',
    handle: '@elenarostova',
    email: 'elena@chronicle.journal',
    avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Elena&backgroundColor=f5ebe0',
    bio: 'Architectural theorist and cultural critic. Writing on the spatial psychology of the digital age.',
    role: 'Contributing Editor',
    location: 'Zurich & Vienna',
    website: 'https://elenarostova.ch',
    twitter: 'elenarostova',
    joinedDate: 'October 2024',
    followersCount: 1420,
    followingCount: 88,
    followingUserIds: ['user-2'],
    bookmarkedArticleIds: ['art-2', 'art-4', 'art-5'],
  },
  {
    id: 'user-2',
    name: 'Marcus Vance',
    handle: '@marcusvance',
    email: 'marcus@chronicle.journal',
    avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Marcus&backgroundColor=e3ede8',
    bio: 'Systems biologist and research fellow studying emergent communication in non-human ecosystems.',
    role: 'Research Fellow',
    location: 'Cambridge, MA',
    website: 'https://vance-lab.org',
    twitter: 'marcus_vance',
    joinedDate: 'January 2025',
    followersCount: 890,
    followingCount: 142,
    followingUserIds: ['user-1', 'user-3'],
    bookmarkedArticleIds: ['art-1', 'art-6'],
  },
  {
    id: 'user-3',
    name: 'Sora Takahashi',
    handle: '@soratakahashi',
    email: 'sora@chronicle.journal',
    avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Sora&backgroundColor=fae1dd',
    bio: 'Book collector, essayist, and founder of the Kyoto Slow Reading Circle. Curious about contemplative crafts.',
    role: 'Essayist & Bibliophile',
    location: 'Kyoto, Japan',
    joinedDate: 'March 2025',
    followersCount: 2150,
    followingCount: 310,
    followingUserIds: ['user-1'],
    bookmarkedArticleIds: ['art-1', 'art-3', 'art-5'],
  },
  {
    id: 'user-4',
    name: 'Julian Mercer',
    handle: '@julianmercer',
    email: 'julian@chronicle.journal',
    avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Julian&backgroundColor=d8e2dc',
    bio: 'Typographer, book designer, and interface craftsman. Exploring tactile typography and enduring software.',
    role: 'Typographer & Designer',
    location: 'London, UK',
    joinedDate: 'May 2025',
    followersCount: 1740,
    followingCount: 95,
    followingUserIds: ['user-2'],
    bookmarkedArticleIds: ['art-1', 'art-6'],
  },
];

export const SEED_ARTICLES: Article[] = [
  {
    id: 'art-1',
    slug: 'quiet-architecture-of-digital-spaces',
    title: 'The Quiet Architecture of Digital Spaces: Reclaiming Solitude in a Hyper-Connected Century',
    subtitle: 'Why our software environments need silent courtyards, thicker digital walls, and spaces designed for reverie rather than velocity.',
    category: 'Architecture & Design',
    tags: ['Solitude', 'Spatial Design', 'Digital Well-being', 'Architecture'],
    authorId: 'user-1',
    author: {
      id: 'user-1',
      name: 'Elena Rostova',
      handle: '@elenarostova',
      avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Elena&backgroundColor=f5ebe0',
      role: 'Contributing Editor',
      bio: 'Architectural theorist and cultural critic.',
    },
    coverImage: '/src/assets/images/hero_editorial_spaces_1791176660658.jpg',
    coverImageAlt: 'Minimalist library pavilion with morning sunlight casting geometric shadows',
    coverCaption: 'Figure 1. Light and void in contemplative civic spaces. Photographed at the Serpentine Pavilion.',
    publishedAt: 'October 1, 2026',
    readTime: 6,
    claps: 342,
    clappedBy: { 'user-2': 15, 'user-3': 25 },
    views: 4820,
    isDraft: false,
    isFeatured: true,
    commentsCount: 3,
    content: `When Juhani Pallasmaa wrote *The Eyes of the Skin*, he warned against an architectural culture obsessed with ocular dominance—spaces designed solely to be photographed rather than inhabited. Decades later, software design succumbed to precisely this pathology.

We have built an entire planetary information architecture composed entirely of bustling metropolitan thoroughfares. Every screen is a neon-lit crosswalk. There are no quiet cloisters, no monastic reading desks, no anterooms where one might sit in undisturbed contemplation before opening a letter.

### The Tyranny of the Urgent Feed

In physical architecture, transitions matter. A monastery does not place its inner altar onto the city boulevard. You cross an outer threshold, traverse a gravel courtyard where your footsteps sound out your deceleration, step through a heavy cedar portal, and only then enter the sacred quietude.

> "A room is not simply an enclosure of cubic meters; it is a membrane that calibrates the speed of thought."

Our digital interfaces lack this spatial graduation. We flip in eight milliseconds from a grief-stricken personal dispatch to an algorithmic advertising banner to an urgent group chat alert. The psychological consequence is not merely cognitive exhaustion; it is an incapacity for sustained synthetic thought.

### Designing Digital Courtyards

![Figure 2. Light and quiet stone courtyards in contemplative monastic architecture](/src/assets/images/figure_monastic_courtyard_1791961018190.jpg)

What would it mean to construct an interface governed by the logic of stone and timber rather than ticker tape?

1. **Deliberate Latency**: Introducing friction into dispatch. The beauty of physical letters was partly the knowledge that hours passed between writing, sealing, and reading.
2. **Negative Screen Space as Sanctuary**: White space on a page is not "unused inventory." It is the oxygen that permits an idea to resonate.
3. **Absence of Ambient Surveillance**: A room where you feel watched changes how you posture. A text editor with telemetry indicators is fundamentally inhospitable to vulnerability.

If the first forty years of computing were dedicated to speed, interconnectivity, and ubiquity, the next forty must be dedicated to boundary, sanctuary, and stillness. We do not need more notification chimes; we need digital spaces with the acoustic dignity of ancient stone chapels.`,
  },
  {
    id: 'art-2',
    slug: 'biomimicry-in-the-age-of-silicon',
    title: 'Biomimicry in the Age of Silicon: What Slime Molds Teach Us About Distributed Networks',
    subtitle: 'Looking beyond human engineering hubris toward billion-year-old subterranean routing algorithms.',
    category: 'Science & Technology',
    tags: ['Biomimicry', 'Networks', 'Biology', 'Algorithms'],
    authorId: 'user-2',
    author: {
      id: 'user-2',
      name: 'Marcus Vance',
      handle: '@marcusvance',
      avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Marcus&backgroundColor=e3ede8',
      role: 'Research Fellow',
      bio: 'Systems biologist and research fellow.',
    },
    coverImage: '/src/assets/images/cover_neural_nature_1791176673263.jpg',
    coverImageAlt: 'Bioluminescent fungal mycelium and optic light fibers in forest floor',
    coverCaption: 'Subterranean hyphal networks displaying adaptive resource routing.',
    publishedAt: 'September 28, 2026',
    readTime: 5,
    claps: 218,
    clappedBy: { 'user-1': 12 },
    views: 2940,
    isDraft: false,
    commentsCount: 2,
    content: `In 2010, Japanese researcher Atsushi Tero placed oat flakes on a wet agar surface arranged in the precise geographic configuration of the cities surrounding Tokyo. At the center, he inoculated a single sample of *Physarum polycephalum*—the yellow slime mold.

Within twenty-six hours, the organism had deployed a network of tubular veins linking the food sources. When transport engineers compared the organism's biological vascular network with the Tokyo subway rail system—designed over decades by teams of elite civil engineers—they found them almost topologically identical.

### Redundancy Without Bureaucracy

![Figure 2. Subterranean mycelium network exhibiting non-centralized topological routing](/src/assets/images/figure_mycelium_micro_1791961017872.jpg)

How does an organism without a central nervous system, without a supervisor, and without a global map solve NP-hard routing problems with such effortless grace?

The secret lies in local feedback loops. If a nutrient stream flows vigorously through a particular vein, the shear stress expands the wall diameter. If flow drops, the vein withers and is recycled into raw biomass.

\`\`\`
Algorithm: Slime Mold Edge Relaxation
1. Deploy exploratory pseudopodia uniformly across space.
2. On contact with nutrient node, amplify metabolic oscillation.
3. Reinforce high-flux conduit (Width proportional to Flow Rate).
4. Prune redundant loops below threshold epsilon.
\`\`\`

Our modern distributed server architectures, by contrast, frequently rely on fragile centralized orchestrators. When a coordination cluster suffers a split-brain condition, cascades bring down continents of cloud computation. Subterranean nature solved fault-tolerance over a billion years ago: no master node, purely localized physics, perpetual self-healing.`,
  },
  {
    id: 'art-3',
    slug: 'the-lost-art-of-deep-reading',
    title: 'The Lost Art of Deep Reading in a Fragmented World',
    subtitle: 'Rediscovering the profound cognitive communion between solitary reader and enduring prose.',
    category: 'Culture & Essay',
    tags: ['Reading', 'Literature', 'Focus', 'Philosophy'],
    authorId: 'user-3',
    author: {
      id: 'user-3',
      name: 'Sora Takahashi',
      handle: '@soratakahashi',
      avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Sora&backgroundColor=fae1dd',
      role: 'Essayist & Bibliophile',
      bio: 'Book collector, essayist, and founder of Kyoto Slow Reading.',
    },
    coverImage: '/src/assets/images/cover_kyoto_solitude_1791176687903.jpg',
    coverImageAlt: 'Rain-streaked bookstore window in Kyoto at dusk with warm interior glow',
    coverCaption: 'Figure 3. Solitary hours among secondhand volumes, Kyoto.',
    publishedAt: 'September 24, 2026',
    readTime: 7,
    claps: 512,
    clappedBy: { 'user-1': 20, 'user-4': 10 },
    views: 6110,
    isDraft: false,
    commentsCount: 4,
    content: `In the northern quarter of Kyoto, down an alley too narrow for taxis, sits a wooden storefront with a faded indigo noren. Inside, shelves sag beneath forty thousand volumes of translated poetry, German metaphysics, and botanical treatises.

There is no Wi-Fi here. The only sound is the rhythmic hiss of an iron kettle on a charcoal brazier and the dry rustle of aging mulberry paper.

### Skimming is Not Reading

Neuroscientist Maryanne Wolf has demonstrated that the digital reading brain behaves fundamentally differently from the book-reading brain. When reading on a backlit glass screen, the eye tracks in an F-pattern: scanning the first two lines, grazing the middle left margin, and darting to the conclusion.

We become hunters of keywords rather than companions of sentences.

> "To read deeply is to loan one's consciousness to another human mind across centuries of darkness."

When you read a dense paragraph of Virginia Woolf or Montaigne, you are forced to surrender your pacing to the author's internal breath. You cannot '1.5x' a lyric essay without destroying the rhythmic tension that carries its philosophical payload.

### A Modest Manifesto for Slow Literacy

1. **One Window, One Mind**: Close all other viewports. A reader who balances an essay against a chat sidebar has already ceded the territory.
2. **Read with a Pencil**: The marginal note is an act of defiance against disposable consumption. It marks the moment where reading shifts from passive absorption into dialogue.
3. **The Twenty-Minute Threshold**: The mind will resist for the first ten minutes. It will crave the dopamine twitch of notifications. If you hold through the sixteenth minute, the cognitive water clears, and deep immersion takes root.`,
  },
  {
    id: 'art-4',
    slug: 'crafting-timeless-interfaces',
    title: 'Crafting Timeless Interfaces in an Era of Ephemera',
    subtitle: 'Principles borrowed from classical typography and bookmaking for digital products that will outlive next year’s design trend.',
    category: 'Craft & Writing',
    tags: ['Typography', 'UI Design', 'Craftsmanship', 'Design Systems'],
    authorId: 'user-4',
    author: {
      id: 'user-4',
      name: 'Julian Mercer',
      handle: '@julianmercer',
      avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Julian&backgroundColor=d8e2dc',
      role: 'Typographer & Designer',
      bio: 'Typographer, book designer, and interface craftsman.',
    },
    coverImage: '/src/assets/images/cover_typography_ink_1791176701904.jpg',
    coverImageAlt: 'Vintage metal letterpress movable type blocks coated in dark ink',
    coverCaption: 'Figure 4. Lead and antimony type matrices at the Whittington Press.',
    publishedAt: 'September 19, 2026',
    readTime: 4,
    claps: 189,
    clappedBy: { 'user-3': 15 },
    views: 3200,
    isDraft: false,
    commentsCount: 1,
    content: `Every few years, the software industry changes its skin. We have lived through glossy skeuomorphism, severe flat minimalism, pastel neomorphism, and now frosted glass gradients. Each generation mocks the previous one while earnestly believing its current aesthetic represents the apex of modern taste.

Yet pick up an edition of the *Aldine Press* printed in Venice in 1501, or Jan Tschichold’s Penguin paperbacks from 1947. They do not feel dated. They feel authoritative, serene, and immediately legible.

### Why Classical Books Do Not Age

Classical typography survives because it is grounded in optical physiology rather than technological novelty:

- **The Reading Measure**: Human binocular vision comfortably scans lines between 60 and 75 characters. Exceed that, and the eye tires jumping back to find the next line start.
- **Rhythm Over Ornament**: A great layout requires neither drop shadows nor borders; it requires an uncompromising proportional ratio between title, subtitle, paragraph, and margins.
- **Ink Contrast**: Black ink on unbleached warm cotton. High enough contrast to prevent eye strain; soft enough to avoid glare.

When building web software, resist the temptation to decorate every empty quadrant with translucent pill capsules and floating badges. Let the prose speak with the gravitas of lead type on warm paper.`,
  },
  {
    id: 'art-5',
    slug: 'the-ethics-of-artificial-memory',
    title: 'The Ethics of Artificial Memory: What Happens When We Can Never Forget?',
    subtitle: 'Exploring the cognitive necessity of forgetting, digital permanence, and the human soul.',
    category: 'Philosophy',
    tags: ['Philosophy', 'Memory', 'Consciousness', 'Ethics'],
    authorId: 'user-1',
    author: {
      id: 'user-1',
      name: 'Elena Rostova',
      handle: '@elenarostova',
      avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Elena&backgroundColor=f5ebe0',
      role: 'Contributing Editor',
      bio: 'Architectural theorist and cultural critic.',
    },
    coverImage: '/src/assets/images/cover_philosophy_memory_1791961016425.jpg',
    coverImageAlt: 'Classical marble statue with translucent optical prisms in warm library light',
    coverCaption: 'Figure 5. The refraction of memory and human cognition through technological prisms.',
    publishedAt: 'October 3, 2026',
    readTime: 6,
    claps: 295,
    clappedBy: { 'user-3': 18, 'user-2': 24 },
    views: 3840,
    isDraft: false,
    commentsCount: 2,
    content: `Jorge Luis Borges once conceived of Funes the Memorious—a youth from Fray Bentos who, following a fall from a horse, lost the capacity to forget. Funes remembered not only every tree on every hill, but every leaf on every branch at every distinct hour of the afternoon.

Yet Borges made a devastating observation: Funes was virtually incapable of profound thought. For to think is to ignore differences, to generalize, to abstract. In the over-stocked world of Funes, there was only immediate detail.

### The Gentle Mercy of Erosion

For millennia, human civilization developed within the grace of organic oblivion. Memories softened around the edges. Youthful humiliations faded into fond anecdotes. An argument between neighbors was slowly smoothed over by the sedimentation of seasons.

Today, our recording devices preserve every sentence, every casual remark, every timestamped transgression in cold crystalline storage. We have created a technological substrate that refuses to let the past recede into gentle shadow.

> "Forgetting is not an error in biological storage; it is the very engine of psychological synthesis."

### Designing for Oblivion

If we wish to build humane systems, we must design software that knows how to let go. We must build into our databases the digital equivalent of autumn leaves—data that degrades gracefully, records that lose their sharp punitive resolution over time, and spaces where forgiveness is architecturally native rather than legally demanded.`,
  },
  {
    id: 'art-6',
    slug: 'the-nocturnal-city-quiet-imagination',
    title: 'The Nocturnal City: How Urban Darkness Cultivates Human Imagination',
    subtitle: 'Why modern cities must protect the night from artificial perpetual daylight to restore psychological wonder.',
    category: 'Urbanism',
    tags: ['Urbanism', 'Architecture', 'Night', 'Psychology'],
    authorId: 'user-3',
    author: {
      id: 'user-3',
      name: 'Sora Takahashi',
      handle: '@soratakahashi',
      avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Sora&backgroundColor=fae1dd',
      role: 'Essayist & Bibliophile',
      bio: 'Book collector, essayist, and founder of Kyoto Slow Reading.',
    },
    coverImage: '/src/assets/images/cover_nocturnal_urbanism_1791961017486.jpg',
    coverImageAlt: 'Quiet European cobblestone street at midnight illuminated by warm lanterns',
    coverCaption: 'Figure 6. The quiet dignity of midnight streets in European old towns.',
    publishedAt: 'October 6, 2026',
    readTime: 5,
    claps: 367,
    clappedBy: { 'user-1': 30, 'user-4': 22 },
    views: 4120,
    isDraft: false,
    commentsCount: 3,
    content: `Stand at 2:00 AM on the wet cobblestones of an ancient quarter when the shops are shuttered and the cars have vanished into subterranean garages. The buildings appear taller, their pediments reaching into an ink-black sky.

In the dark, the city ceases to be a machine for commerce and becomes a theater for the interior life.

### The Curse of Perpetual Noon

Since the mass adoption of ultra-bright cold LED streetlights, our metropolitan regions have banished the twilight. We have colonized the midnight hours with high-lumen glare designed to eliminate any pocket of mystery.

Yet psychologists and urban poets alike have long recognized that darkness is the companion of interiority:

- **Acoustic Softening**: At night, sound carries differently. Footsteps strike the stone with resonance, making the walker aware of their own cadence.
- **The Threshold of the Visible**: When you cannot see every millimeter of a facade, your imagination fills the void. The gargoyle is sketched in the mind rather than broadcast in 4K.
- **Reclaiming the Celestial Canopy**: A city that cannot see the stars has forgotten its place in the cosmos.

To redesign the nocturnal city is not to invite danger; it is to replace harsh illumination with warm, directed pools of golden light—inviting conversation, contemplation, and restorative silence.`,
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
    content: 'The architectural metaphor of the monastery cloister is brilliant here. In biological networks, separation is just as essential as transmission. Without cellular membranes, there is no homeostasis.',
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
    content: 'Reminds me strongly of Jun’ichiro Tanizaki’s "In Praise of Shadows"—the idea that beauty exists not in the luminosity itself, but in the variety of shadows and quiet obscurity.',
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
    content: 'Particularly agree on the point about telemetry indicators. A flashing green status dot in an editor destroys the illusion of solitary composition.',
    createdAt: '12 hours ago',
    likes: 9,
    likedBy: ['user-2'],
  },
  {
    id: 'c-4',
    articleId: 'art-3',
    authorId: 'user-1',
    authorName: 'Elena Rostova',
    authorHandle: '@elenarostova',
    authorAvatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Elena&backgroundColor=f5ebe0',
    content: 'The 20-minute threshold rule is something I have now instituted in my morning routine. The friction of the first ten minutes is remarkable, but the other side is pure gold.',
    createdAt: '3 days ago',
    likes: 22,
    likedBy: ['user-3', 'user-2'],
  },
  {
    id: 'c-5',
    articleId: 'art-5',
    authorId: 'user-3',
    authorName: 'Sora Takahashi',
    authorHandle: '@soratakahashi',
    authorAvatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Sora&backgroundColor=fae1dd',
    content: 'Borges’ Funes is the patron saint of our digital dilemma. This distinction between archiving data and genuine human synthesis is profound.',
    createdAt: '1 day ago',
    likes: 16,
    likedBy: ['user-1', 'user-4'],
  },
  {
    id: 'c-6',
    articleId: 'art-6',
    authorId: 'user-1',
    authorName: 'Elena Rostova',
    authorHandle: '@elenarostova',
    authorAvatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Elena&backgroundColor=f5ebe0',
    content: 'Lighting design is the most neglected realm of contemporary urbanism. Cold 5000K LEDs have stripped our streets of romance and twilight contemplation.',
    createdAt: '18 hours ago',
    likes: 21,
    likedBy: ['user-3'],
  },
];

export const CATEGORIES = [
  'All Topics',
  'Architecture & Design',
  'Science & Technology',
  'Culture & Essay',
  'Craft & Writing',
  'Philosophy',
  'Urbanism',
];
