import ZomotoSigInForm from "./components/ZomatoSignIn";
import { Container, Content } from "rsuite";
import { Grid, Row, HStack, Col } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import "./zomoto-theme.css";

function App() {
  return (
    <Container>
      <Content>
        <HStack
          alignItems="center"
          justifyContent="center"
        >
          <Row className="show-grid">
            <Col xl={12}>
              <ZomotoSigInForm />
            </Col>
          </Row>
        </HStack>
      </Content>
    </Container>
  );
}

export default App;
