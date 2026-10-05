const SITE_URL = 'https://courierpr.com';

const tabsEl = document.getElementById('tabs');
const feedList = document.getElementById('feed-list');

function timeAgo(iso) {
  const minutes = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

function renderSection(section) {
  feedList.innerHTML = '';

  if (!section.items.length) {
    const empty = document.createElement('div');
    empty.className = 'feed-empty';
    empty.textContent = 'No releases here yet.';
    feedList.appendChild(empty);
  }

  for (const r of section.items) {
    const a = document.createElement('a');
    a.className = 'story';
    a.href = r.url;
    a.target = '_blank';
    a.rel = 'noopener';

    const meta = document.createElement('div');
    meta.className = 'story-meta';
    const company = document.createElement('span');
    company.className = 'story-company';
    company.textContent = r.company || '';
    const time = document.createElement('span');
    time.className = 'story-time';
    time.textContent = timeAgo(r.publishedAt);
    meta.append(company, time);

    const title = document.createElement('div');
    title.className = 'story-title serif';
    title.textContent = r.title;

    a.append(meta, title);

    if (r.blurb) {
      const blurb = document.createElement('div');
      blurb.className = 'story-blurb';
      blurb.textContent = r.blurb;
      a.appendChild(blurb);
    }
    feedList.appendChild(a);
  }

  const more = document.createElement('div');
  more.className = 'feed-more';
  const link = document.createElement('a');
  link.href = section.url;
  link.target = '_blank';
  link.rel = 'noopener';
  link.textContent = section.label === 'Latest' ? 'View more on CourierPR.com' : `More ${section.label} on CourierPR.com`;
  more.appendChild(link);
  feedList.appendChild(more);
  feedList.scrollTop = 0;
}

function renderTabs(sections) {
  tabsEl.innerHTML = '';
  sections.forEach((section, i) => {
    const btn = document.createElement('button');
    btn.className = 'tab' + (i === 0 ? ' active' : '');
    btn.setAttribute('role', 'tab');
    btn.setAttribute('aria-selected', String(i === 0));
    btn.textContent = section.label;
    btn.addEventListener('click', () => {
      for (const b of tabsEl.children) {
        b.classList.toggle('active', b === btn);
        b.setAttribute('aria-selected', String(b === btn));
      }
      btn.scrollIntoView({ block: 'nearest', inline: 'nearest' });
      renderSection(section);
    });
    tabsEl.appendChild(btn);
  });
}

(async () => {
  try {
    const resp = await fetch(`${SITE_URL}/api/public/feed`);
    if (!resp.ok) throw new Error('bad response');
    const data = await resp.json();
    const sections = [
      { label: 'Latest', url: data.latest.url, items: data.latest.items },
      // Site category names run long ("Business, Economy, Finances, Banking & Insurance"); the tab
      // takes the part before the first comma.
      ...data.categories.map((c) => ({ label: c.name.split(',')[0].trim(), url: c.url, items: c.items })),
    ];
    renderTabs(sections);
    renderSection(sections[0]);
  } catch {
    feedList.innerHTML = '<div class="feed-empty">Couldn’t reach CourierPR.com. Try again later.</div>';
  }
})();
