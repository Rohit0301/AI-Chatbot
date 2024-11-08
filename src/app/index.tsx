import Layout from "../layout/intex";
import ChatBot from "../pages/ChatBot";
import Theme from "./theme";

const App = (): JSX.Element => {
  return (
    <Theme>
      <Layout>
        <ChatBot />
      </Layout>
    </Theme>
  );
};

export default App;
