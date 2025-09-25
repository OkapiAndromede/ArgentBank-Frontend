import "./style.scss";
function Feature({ imageSrc, imageAlt, title, text }) {
  return (
    <article className="featureItem">
      <img src={imageSrc} alt={imageAlt} className="featureItem__icon" />
      <h3 className="featureItem__title">{title}</h3>
      <p>{text}</p>
    </article>
  );
}

export default Feature;
