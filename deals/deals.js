'use strict';

(() => {
  const grid = document.getElementById('deal-grid');
  const status = document.getElementById('deal-status');
  const filters = document.getElementById('deal-filters');
  const validDate = value => typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value + 'T00:00:00Z')) && new Date(value + 'T00:00:00Z').toISOString().slice(0, 10) === value;
  const text = (tag, className, value) => {
    const element = document.createElement(tag);
    element.className = className;
    element.textContent = value;
    return element;
  };
  const now = Date.now();
  const day = 86400000;

  function normalize(deal, trackingId) {
    if (!deal || deal.active === false || !/^[A-Z0-9]{10}$/.test(deal.asin || '') ||
        !['name', 'category', 'description'].every(key => typeof deal[key] === 'string' && deal[key].trim()) ||
        !validDate(deal.checkedOn)) return null;
    const checked = Date.parse(deal.checkedOn + 'T00:00:00Z');
    // Hide offers after seven days unless manually rechecked. This is not live price verification.
    if (checked > now || now >= checked + 7 * day) return null;
    if (deal.expiresOn !== undefined && (!validDate(deal.expiresOn) || now >= Date.parse(deal.expiresOn + 'T00:00:00Z') + day)) return null;
    const url = new URL('https://www.amazon.com/dp/' + deal.asin);
    url.searchParams.set('tag', trackingId);
    return { ...deal, url: url.href, checked };
  }

  function card(deal) {
    const article = document.createElement('article');
    article.className = 'card deal-card';
    article.append(text('span', 'deal-category', deal.category), text('h3', '', deal.name), text('p', 'deal-description', deal.description));
    const checked = document.createElement('time');
    checked.className = 'deal-checked';
    checked.dateTime = deal.checkedOn;
    checked.textContent = 'Checked ' + new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).format(deal.checked);
    const link = text('a', 'button', 'Check price on Amazon');
    link.href = deal.url;
    link.rel = 'sponsored noopener';
    article.append(checked, link, text('small', 'deal-paid', 'Paid link · We may earn a commission.'));
    return article;
  }

  fetch('./deals.json', { cache: 'no-store' })
    .then(response => {
      if (!response.ok) throw new Error('Could not load deals');
      return response.json();
    })
    .then(data => {
      if (!Array.isArray(data.deals)) throw new Error('Invalid deal list');
      const trackingId = typeof data.trackingId === 'string' ? data.trackingId.trim() : '';
      if (!/^[A-Za-z0-9_-]+-\d+$/.test(trackingId)) {
        status.textContent = 'Our first tech deals are on the way. Check back soon for our curated picks.';
        return;
      }
      const deals = data.deals.map(deal => normalize(deal, trackingId)).filter(Boolean);
      if (!deals.length) {
        status.textContent = 'No current deals to share. We’ll add new offers after we’ve checked them.';
        return;
      }
      function render(category) {
        const selected = category === null ? deals : deals.filter(deal => deal.category === category);
        grid.replaceChildren(...selected.map(card));
        status.textContent = selected.length + (selected.length === 1 ? ' deal' : ' deals') + ' · Manually curated';
        filters.querySelectorAll('button').forEach(button => button.setAttribute('aria-pressed', String(button._category === category)));
      }
      const categories = [null, ...new Set(deals.map(deal => deal.category))];
      categories.forEach(category => {
        const button = text('button', 'deal-filter', category === null ? 'All deals' : category);
        button.type = 'button';
        button._category = category;
        button.addEventListener('click', () => render(category));
        filters.append(button);
      });
      filters.hidden = categories.length < 3;
      render(null);
    })
    .catch(() => { status.textContent = 'We couldn’t load the deals right now. Please try again later.'; });
})();
