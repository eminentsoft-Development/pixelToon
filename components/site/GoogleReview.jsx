'use client';

import { useRef, useState } from 'react';
import Script from 'next/script';
import ReviewCard from './ReviewCard';

// ─── Demo data — replace with your real reviews / API ─────────────────────────
const DEMO_REVIEWS = [
  { id: 1, name: 'Anjali Menon',   rating: 5, date: 'March 2025',    avatarColor: '#e07b54', text: 'Absolutely transformative experience. The faculty genuinely cares about each student\'s growth. I cleared my exam on the first attempt and couldn\'t have done it without this team.' },
  { id: 2, name: 'Rohan Das',      rating: 5, date: 'February 2025', avatarColor: '#5b8dd9', text: 'The study material is incredibly well-structured and the live doubt sessions are a lifesaver. Worth every rupee.' },
  { id: 3, name: 'Priya Krishnan', rating: 4, date: 'January 2025',  avatarColor: '#7dba84', text: 'Great environment and knowledgeable instructors. Would have loved slightly longer recorded session access, but overall a fantastic course.' },
  { id: 4, name: 'Arjun Nair',     rating: 5, date: 'December 2024', avatarColor: '#c777b7', text: 'From the very first class I knew this was different. Small batches, personal attention, and exam-focused content. Highly recommend to anyone serious about results.' },
  { id: 5, name: 'Sneha Pillai',   rating: 5, date: 'November 2024', avatarColor: '#e0a030', text: 'Cleared with distinction. The mock tests were almost identical in difficulty to the real exam. This program really prepares you.' },
  { id: 6, name: 'Kiran Thomas',   rating: 5, date: 'October 2024',  avatarColor: '#5badb0', text: "The support doesn't stop after class. WhatsApp group, revision sessions, everything is there. Brilliant institute." },
];

const SUMMARY = {
  rating: 4.9,
  total: 214,
  stars:  [5, 4, 3, 2, 1],
  counts: [198, 12, 3, 1, 0],
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" aria-label="Google">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

const BigStar = ({ fill = 'full' }) => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none">
    {fill === 'full' && <path fill="#FBBF24" d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l7.1-1.01L12 2z"/>}
    {fill === 'half' && (<><path fill="#FBBF24" d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77V2z"/><path fill="#e5e7eb" d="M12 2v15.77l-6.18 3.25L7 14.14 2 9.27l7.1-1.01L12 2z"/></>)}
    {fill === 'empty' && <path fill="#e5e7eb" d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l7.1-1.01L12 2z"/>}
  </svg>
);

const RatingBar = ({ stars, count, total }) => {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  return (
    <div className="flex items-center gap-2 text-xs text-stone-500">
      <span className="w-3 text-right">{stars}</span>
      <svg viewBox="0 0 12 12" className="w-3 h-3 text-amber-400 shrink-0" fill="currentColor">
        <path d="M6 1l1.545 3.13L11 4.635l-2.5 2.437.59 3.44L6 8.885l-3.09 1.627.59-3.44L1 4.635l3.455-.505L6 1z"/>
      </svg>
      <div className="flex-1 h-1.5 bg-stone-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-amber-400 rounded-full transition-all duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="w-5 text-right tabular-nums">{count}</span>
    </div>
  );
};

// ─── Main component ────────────────────────────────────────────────────────────
export default function GoogleReviews({ widgetId = '25673464' }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [useLiveWidget, setUseLiveWidget] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const widgetRef = useRef(null);

  const FILTERS = [
    { key: 'all', label: 'All reviews' },
    { key: '5',   label: '5 stars' },
    { key: '4',   label: '4 stars' },
  ];

  const filtered =
    activeFilter === 'all'
      ? DEMO_REVIEWS
      : DEMO_REVIEWS.filter((r) => String(r.rating) === activeFilter);

  return (
    <section className="relative bg-[#faf8f5] py-20 px-4 overflow-hidden">

      {/* Background mesh */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 20%, #f0ebe3 0%, transparent 50%), radial-gradient(circle at 80% 80%, #ede8e0 0%, transparent 50%)',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto">

        {/* ── Header ─────────────────────────────────────────────────── */}
        <header className="text-center mb-12">
          {/* Eyebrow pill */}
          <div className="inline-flex items-center gap-1.5 bg-white border border-stone-200 rounded-full px-3.5 py-1.5 mb-5">
            <GoogleIcon />
            <span className="font-sans text-[11px] font-semibold text-stone-500 uppercase tracking-widest">
              Google Reviews
            </span>
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl font-normal text-stone-900 leading-[1.15] tracking-tight mb-4">
            What our students<br />
            <em className="italic text-amber-700">actually say</em>
          </h2>

          <p className="font-sans text-[15px] text-stone-500">
            Unfiltered feedback from verified students on our Google Business profile.
          </p>
        </header>

        {/* ── Summary card ───────────────────────────────────────────── */}
        <div className="bg-white border border-stone-200 rounded-2xl px-8 py-7 flex flex-wrap items-center gap-8 mb-9">
          {/* Score */}
          <div className="flex items-center gap-4">
            <span className="font-serif text-[56px] font-bold text-stone-900 leading-none tracking-tighter">
              {SUMMARY.rating}
            </span>
            <div>
              <div className="flex gap-0.5 mb-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <BigStar
                    key={s}
                    fill={
                      s <= Math.floor(SUMMARY.rating)
                        ? 'full'
                        : SUMMARY.rating % 1 >= 0.5
                        ? 'half'
                        : 'empty'
                    }
                  />
                ))}
              </div>
              <p className="font-sans text-xs text-stone-400">
                Based on {SUMMARY.total.toLocaleString()} reviews
              </p>
            </div>
          </div>

          {/* Breakdown bars */}
          <div className="flex-1 min-w-[180px] flex flex-col gap-1.5">
            {SUMMARY.stars.map((s, i) => (
              <RatingBar key={s} stars={s} count={SUMMARY.counts[i]} total={SUMMARY.total} />
            ))}
          </div>
        </div>

        {/* ── View toggle ────────────────────────────────────────────── */}
        <div className="flex gap-0 bg-white border border-stone-200 rounded-[10px] p-1 w-fit mb-7">
          {[
            { key: false, label: 'Featured Reviews' },
            { key: true,  label: 'Live Feed' },
          ].map(({ key, label }) => (
            <button
              key={String(key)}
              onClick={() => setUseLiveWidget(key)}
              className={`
                px-5 py-2 rounded-[7px] font-sans text-[13px] font-medium transition-all duration-200 cursor-pointer
                ${useLiveWidget === key
                  ? 'bg-stone-900 text-[#faf8f5] shadow-md'
                  : 'text-stone-500 hover:text-stone-700'}
              `}
            >
              {label}
            </button>
          ))}
        </div>

        {/* ── Content ────────────────────────────────────────────────── */}
        {useLiveWidget ? (
          /* Live SociableKit embed */
          <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden min-h-[300px]">
            {!scriptLoaded && (
              <div className="flex flex-col items-center justify-center py-16 gap-3 font-sans text-sm text-stone-400">
                <div className="w-7 h-7 border-2 border-stone-200 border-t-amber-600 rounded-full animate-spin" />
                <p>Loading live reviews…</p>
              </div>
            )}
            <div
              ref={widgetRef}
              className={scriptLoaded ? 'opacity-100 transition-opacity duration-300' : 'opacity-0 h-0 overflow-hidden'}
              data-embed-id={widgetId}
            >
              {/* SociableKit populates this div */}
            </div>
            <Script
              src="https://widgets.sociablekit.com/google-reviews/widget.js"
              strategy="lazyOnload"
              onLoad={() => setScriptLoaded(true)}
            />
          </div>
        ) : (
          <>
            {/* Filter tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
              {FILTERS.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setActiveFilter(f.key)}
                  className={`
                    px-4 py-1.5 rounded-full border font-sans text-[13px] font-medium transition-all duration-150 cursor-pointer
                    ${activeFilter === f.key
                      ? 'bg-stone-900 border-stone-900 text-white'
                      : 'bg-white border-stone-200 text-stone-500 hover:border-stone-400 hover:text-stone-700'}
                  `}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((review, i) => (
                <ReviewCard key={review.id} review={review} index={i} />
              ))}
            </div>
          </>
        )}

        {/* ── CTA ────────────────────────────────────────────────────── */}
        <div className="text-center mt-10">
          <a
            href={`https://search.google.com/local/reviews?placeid=${widgetId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center gap-2 bg-white border border-stone-200 rounded-full
              px-6 py-3 font-sans text-sm font-semibold text-stone-700 no-underline
              shadow-sm transition-all duration-200
              hover:bg-stone-900 hover:text-white hover:border-stone-900 hover:shadow-lg
            "
          >
            See all reviews on Google
            <svg viewBox="0 0 16 16" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

      </div>
    </section>
  );
}