/* Design system of the CG Performance dashboard, rebuilt live with the values from the Figma file */

const colors = [
  {
    group: "Surfaces",
    items: [
      { name: "Background", hex: "#101011" },
      { name: "Sidebar", hex: "#1B1B1B" },
      { name: "Card", hex: "#212122", to: "#1A1A1B" },
      { name: "Field", hex: "#2D2D2D" },
    ],
  },
  {
    group: "Text",
    items: [
      { name: "Primary", hex: "#FFFFFF" },
      { name: "Metric", hex: "#ECECEC" },
      { name: "Body", hex: "#BCBCBC" },
      { name: "Muted", hex: "#999999" },
      { name: "Placeholder", hex: "#6A6A6A" },
    ],
  },
  {
    group: "Status",
    items: [
      { name: "Success", hex: "#06A05B" },
      { name: "Warning", hex: "#FFA407" },
      { name: "Active", hex: "#6EBE49" },
      { name: "Pending", hex: "#FBBF24" },
      { name: "Info", hex: "#0082FB" },
    ],
  },
  {
    group: "Labels",
    items: [
      { name: "Draft", hex: "#193CB8" },
      { name: "Mock", hex: "#6D11B0" },
      { name: "Sent", hex: "#007D45" },
    ],
  },
];

const type = [
  { role: "Page title", spec: "Inter SemiBold · 32 / -3%", sample: "Performance Dashboard", cls: "ds-t-page" },
  { role: "Section title", spec: "Inter SemiBold · 22 / -3%", sample: "Leads Report", cls: "ds-t-section" },
  { role: "Metric", spec: "Inter SemiBold · 20 / -3%", sample: "3,351", cls: "ds-t-metric" },
  { role: "Body", spec: "Inter Regular · 16 / -3%", sample: "Overview of the Metrics", cls: "ds-t-body" },
  { role: "Card title / Nav", spec: "Inter Medium · 14 / -3%", sample: "Site Health Score", cls: "ds-t-label" },
  { role: "Caption", spec: "Inter Regular · 10", sample: "Site structure and SEO performance are stable.", cls: "ds-t-caption" },
];

function Icon({ d }: { d: string }) {
  return (
    <span className="ds-icon" aria-hidden="true">
      <svg viewBox="0 0 12 12"><path d={d} /></svg>
    </span>
  );
}

const ICONS = {
  user: "M6 6.2a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4Zm-4 4.3c0-2 1.8-3.2 4-3.2s4 1.2 4 3.2",
  trophy: "M3.5 1.5h5v2.6a2.5 2.5 0 0 1-5 0V1.5Zm2.5 5.1v2.2m-2 1.7h4M3.5 2.5H2v.6c0 .9.6 1.6 1.5 1.7m5-2.3H10v.6c0 .9-.6 1.6-1.5 1.7",
  gauge: "M2 8.5a4 4 0 1 1 8 0M6 8.5l2-2.5",
  hourglass: "M3.5 1.5h5M3.5 10.5h5M4 1.5c0 2.2 4 2.3 4 4.5S4 8.3 4 10.5M8 1.5c0 2.2-4 2.3-4 4.5s4 2.3 4 4.5",
};

export default function DesignSystem() {
  return (
    <section className="pd-ds" aria-labelledby="design-system">
      <div className="pd-ds__intro">
        <p className="pd-screen__eyebrow">Design System</p>
        <h2 className="cs-h2" id="design-system">The building blocks</h2>
        <p>
          A small, strict set of tokens and components behind every screen: quiet dark surfaces, one type family, and
          status colors that always mean the same thing.
        </p>
      </div>

      {/* ---------- Color ---------- */}
      <div className="ds-block">
        <h3 className="ds-block__title">Color</h3>
        <div className="ds-colors">
          {colors.map((g) => (
            <div key={g.group} className="ds-colors__group">
              <p className="ds-label">{g.group}</p>
              <ul>
                {g.items.map((c) => (
                  <li key={c.name}>
                    <span
                      className="ds-swatch"
                      style={{ background: c.to ? `linear-gradient(180deg, ${c.hex}, ${c.to})` : c.hex }}
                    />
                    <span className="ds-swatch__name">{c.name}</span>
                    <span className="ds-swatch__hex">{c.to ? `${c.hex} → ${c.to}` : c.hex}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ---------- Typography ---------- */}
      <div className="ds-block">
        <h3 className="ds-block__title">Typography</h3>
        <ul className="ds-type">
          {type.map((t) => (
            <li key={t.role}>
              <div className="ds-type__meta">
                <span className="ds-type__role">{t.role}</span>
                <span className="ds-type__spec">{t.spec}</span>
              </div>
              <span className={`ds-type__sample ${t.cls}`}>{t.sample}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* ---------- Components ---------- */}
      <div className="ds-block">
        <h3 className="ds-block__title">Components</h3>
        <div className="ds-components">
          <div className="ds-comp ds-comp--wide">
            <p className="ds-label">Metric cards</p>
            <div className="ds-cards" aria-hidden="true">
              <div className="ds-card">
                <div className="ds-card__head"><Icon d={ICONS.user} />Total Leads</div>
                <div>
                  <p className="ds-card__value">3,351</p>
                  <p className="ds-card__caption">All time</p>
                </div>
              </div>
              <div className="ds-card ds-card--highlight">
                <div className="ds-card__head"><Icon d={ICONS.trophy} />Best Day</div>
                <div>
                  <p className="ds-card__value">46 leads</p>
                  <p className="ds-card__caption">Jun 30</p>
                </div>
              </div>
              <div className="ds-card">
                <div className="ds-card__head"><Icon d={ICONS.gauge} />Site Health Score</div>
                <div>
                  <p className="ds-card__value">88%</p>
                  <span className="ds-bar"><span style={{ width: "70%", background: "#FFA407" }} /></span>
                  <p className="ds-card__caption">Stable, with room to improve.</p>
                </div>
              </div>
              <div className="ds-card">
                <div className="ds-card__head"><Icon d={ICONS.hourglass} />Real Experience Score</div>
                <div>
                  <p className="ds-card__value">99.2%</p>
                  <span className="ds-bar"><span style={{ width: "88%", background: "#06A05B" }} /></span>
                  <p className="ds-card__caption">Your score is excellent.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="ds-comp">
            <p className="ds-label">Navigation</p>
            <div className="ds-nav" aria-hidden="true">
              <span className="ds-nav__item ds-nav__item--active">Overview</span>
              <span className="ds-nav__item">Speed Insights</span>
              <span className="ds-nav__item">Leads</span>
            </div>
          </div>

          <div className="ds-comp">
            <p className="ds-label">Buttons</p>
            <div className="ds-row" aria-hidden="true">
              <span className="ds-btn ds-btn--primary">Send</span>
              <span className="ds-btn ds-btn--dark">Back to Templates</span>
              <span className="ds-btn ds-btn--outline">← Previous</span>
            </div>
          </div>

          <div className="ds-comp">
            <p className="ds-label">Segmented control</p>
            <div className="ds-seg" aria-hidden="true">
              <span className="ds-seg__item ds-seg__item--active">All</span>
              <span className="ds-seg__item">Sent</span>
              <span className="ds-seg__item">Draft</span>
            </div>
          </div>

          <div className="ds-comp">
            <p className="ds-label">Badges &amp; status</p>
            <div className="ds-row" aria-hidden="true">
              <span className="ds-chip"><i style={{ background: "#6EBE49" }} />Law Firm 1</span>
              <span className="ds-chip"><i style={{ background: "#0082FB" }} />Draft</span>
              <span className="ds-tag" style={{ background: "#193CB8" }}>Draft</span>
              <span className="ds-tag" style={{ background: "#6D11B0" }}>Mock</span>
              <span className="ds-tag" style={{ background: "#007D45" }}>Sent</span>
              <span className="ds-dot" style={{ background: "#6EBE49" }} />
              <span className="ds-dot" style={{ background: "#FBBF24" }} />
            </div>
          </div>
        </div>
      </div>

      {/* ---------- Radius & spacing ---------- */}
      <div className="ds-block ds-block--split">
        <div>
          <h3 className="ds-block__title">Radius</h3>
          <ul className="ds-radius" aria-label="Corner radius tokens">
            <li><span style={{ borderRadius: 8 }} />8 · controls</li>
            <li><span style={{ borderRadius: 12 }} />12 · cards</li>
            <li><span style={{ borderRadius: 20 }} />20 · app frame</li>
            <li><span style={{ borderRadius: 999 }} />Full · pills</li>
          </ul>
        </div>
        <div>
          <h3 className="ds-block__title">Spacing</h3>
          <ul className="ds-space" aria-label="Spacing scale">
            {[6, 8, 12, 14, 20, 24, 50].map((n) => (
              <li key={n}><span style={{ width: n }} />{n}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
