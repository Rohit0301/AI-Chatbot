import Theme from "./theme";
import Layout from "../layout";
import ChatBot from "../pages/ChatBot";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const App = (): JSX.Element => {
  return (
    <Theme>
      <Layout>
        <ChatBot />
        <ToastContainer
          rtl={false}
          closeOnClick
          theme="dark"
          autoClose={2000}
          hideProgressBar
        />
      </Layout>
    </Theme>
  );
};

export default App;
