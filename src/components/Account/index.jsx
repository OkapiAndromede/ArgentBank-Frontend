import "./style.scss";
function Account({ title, amount, description }) {
  return (
    <div className="accountContent">
      <h3 className="accountContent__title">{title}</h3>
      <p className="accountContent__amount">{amount}</p>
      <p className="accountContent__description">{description}</p>
    </div>
  );
}
export default Account;
