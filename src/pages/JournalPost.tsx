import { Link, useParams } from 'react-router-dom';
import { JOURNAL } from '../data/collections';
import Breadcrumb from '../components/ui/Breadcrumb';

const JournalPost = () => {
  const { slug = '' } = useParams();
  const post = JOURNAL.find((p) => p.slug === slug) || JOURNAL[0];
  return (
    <article className="pb-24">
      <div className="max-w-3xl mx-auto px-6 pt-6">
        <Breadcrumb trail={[{ label: 'Home', to: '/' }, { label: 'Journal', to: '/journal' }, { label: post.title }]} />
      </div>
      <div className="max-w-3xl mx-auto px-6 py-10">
        <p className="eyebrow text-clay mb-4">{post.category} · {post.readTime} · {post.date}</p>
        <h1 className="font-display text-4xl lg:text-6xl leading-tight">{post.title}</h1>
        <p className="text-xl text-ink-soft mt-4 italic">{post.excerpt}</p>
      </div>
      <div className="max-w-6xl mx-auto px-6">
        <img src={post.image} alt={post.title} className="w-full ratio-3-2 object-cover" />
      </div>
      <div className="max-w-2xl mx-auto px-6 py-16 prose prose-lg">
        <p className="font-display text-2xl leading-relaxed first-letter:text-6xl first-letter:font-normal first-letter:mr-2 first-letter:float-left first-letter:leading-[0.85] first-letter:text-crimson">
          Kumar wakes at 4:30. The temple bells at Ekambaranathar have started their rounds. He walks the seven minutes to his workshop — a single room on the ground floor of a house his grandfather built in 1954. Inside, three looms. One is his; the other two belong to his sons.
        </p>
        <p className="mt-6 leading-relaxed text-ink-soft">The loom Kumar sits at is 47 years old. It has been repaired four times and rebuilt once. It has produced, by his count, 391 sarees. He can name most of the weddings.</p>
        <p className="mt-6 leading-relaxed text-ink-soft">A Kanjivaram in mulberry silk takes eleven days on this loom. On the first day, Kumar sets the warp — 5,300 threads, laid parallel, drawn tight across the frame. On the second day, the weft begins. The pallu, at either end, is the most technical: he switches to the extra-weft, threading real gold zari through motifs he has been weaving for forty years without a chart.</p>
        <p className="mt-6 leading-relaxed text-ink-soft">By the sixth day he is halfway through. On the eleventh day he cuts the saree from the loom, folds it once, and lets it sit for a night. In the morning he signs the pallu with a needle-and-thread mark that only another weaver would recognise. It is a signature, and it is a certificate.</p>
        <p className="mt-6 leading-relaxed text-ink-soft">This is the eleven-day story of one of them.</p>
      </div>
      <div className="max-w-6xl mx-auto px-6 border-t border-hairline pt-16">
        <h3 className="font-display text-3xl mb-6">More from the Journal</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {JOURNAL.filter((p) => p.slug !== post.slug).slice(0, 3).map((p) => (
            <Link key={p.slug} to={`/journal/${p.slug}`} className="group">
              <div className="overflow-hidden ratio-4-5 bg-parchment mb-3">
                <img src={p.image} alt={p.title} className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
              </div>
              <p className="eyebrow text-clay">{p.category}</p>
              <p className="font-display text-lg mt-1">{p.title}</p>
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
};

export default JournalPost;
