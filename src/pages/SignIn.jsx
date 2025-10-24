import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import Form from "../containers/Form";
function SignIn() {
  return (
    <>
      <Navigation wantToConnect={true} />
      <main className="mainSignIn">
        <Form />
      </main>
      <Footer />
    </>
  );
}

export default SignIn;
