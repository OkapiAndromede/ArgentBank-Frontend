import "./style.scss";
function HeroBanner() {
  return (
    <div className="heroBanner">
      <section className="heroBanner__content">
        <h2 className="srOnly">Promoted Content</h2>
        <p className="heroBanner__content--subtitle">No fees.</p>
        <p className="heroBanner__content--subtitle">No minimum deposit</p>
        <p className="heroBanner__content--subtitle">High interest rates.</p>
        <p className="heroBanner__content--text">
          Open a savings account with Argent Bank today !
        </p>
      </section>
    </div>
  );
}

export default HeroBanner;
