import { Panel } from "rsuite";
import LoginByPhoneNumber from "./LoginByPhoneNumber";

const ZomotoSigInForm = () => {
  return (
    <Panel shaded bordered bodyFill className="auth_card">
      <img
        src="/assets/zomota-banner.gif"
        className="zomato-banner"
      />
      <div className="panel-body">
        <div className="auth_container">
          <LoginByPhoneNumber />
        </div>
      </div>
    </Panel>
  );
};

export default ZomotoSigInForm;
