import React, { Component } from "react";
import {
  Button,
  Container,
  Header,
  Icon,
  Segment,
  Image,
  Divider
} from "semantic-ui-react";
import KSZKbiglogo from "../images/kszk_big_logo.png";

export default class Home extends Component {
  render() {
    return (
      <div>
        <Segment inverted textAlign="center" vertical>
          <Header
            as="h1"
            content="Üdvözlünk a"
            inverted
            style={{
              fontSize: "3em",
              fontWeight: "normal",
              marginBottom: 0,
              marginTop: "0.5em"
            }}
          />
          <Header
            as="h1"
            content="Kollégiumi Számítástechnikai Kör"
            inverted
            style={{
              fontSize: "4em",
              fontWeight: "bold",
              marginBottom: "0.5em",
              marginTop: "0.5em"
            }}
          />
          <Header
            as="h1"
            content="érdeklődőinek szánt weboldalán!"
            inverted
            style={{
              fontSize: "3em",
              fontWeight: "normal",
              marginBottom: 0,
              marginTop: "0.5em"
            }}
          />
          <Image
            verticalAlign="middle"
            size="small"
            src={KSZKbiglogo}
            style={{ marginTop: "4em" }}
          />
          <Header
            as="h1"
            content="Mindenkit szeretettel várunk a KSZKépzés-re!"
            inverted
            style={{
              fontSize: "3em",
              fontWeight: "normal",
              marginBottom: 0,
              marginTop: "1em"
            }}
          />
          <Container>
            <Button
            href="/api/v1/login/authsch/"
              primary
              size="huge"
              style={{
                fontSize: "2em",
                marginTop: "1em",
                marginBottom: "1em"
              }}
            >
              Jelentkezés
              <Icon name="right arrow" />
            </Button>
          </Container>
        </Segment>
        <Segment style={{ padding: "8em 0em" }} vertical>
          <Container text>
            <Header as="h3" style={{ fontSize: "2em" }}>
              Kik is vagyunk mi?
            </Header>
            <p style={{ fontSize: "1.33em" }}>
              A Kollégiumi Számítástechnikai Kör az Egyetem legrégebben működő
              és legnagyobb aktív, informatikával foglalkozó öntevékeny
              csoportosulása, tavaly ünnepeltük 40. születésnapunkat. A patinás
              név mögött vidám hangulatú, alkotó kedvű csapat rejlik, mely a Kar
              jó szakmai képességű, számítástechnika iránt kiemelten érdeklődő
              tagjaiból verbuválódott, és bővül évente új tehetségekkel, lelkes
              informatikusokkal, villamosmérnökökkel.
            </p>
            <Button size="large" href="/circles">
              Ismerd meg a köreinket! <Icon name="right arrow" />
            </Button>
            <Divider as="h4" className="header" style={{ margin: "3em 0em" }} />
            <Header as="h3" style={{ fontSize: "2em" }}>
              Lehetőségek
            </Header>
            <p style={{ fontSize: "1.33em" }}>
              A KSZK a lehetőségek tárháza, a hely ahol Te – leendő mérnök –
              minden területen kipróbálhatod, továbbképezheted magad. Nálunk
              kibontakoztathatod kreativitásod, tapasztalatot, mérnöki
              szemléletet szerezhetsz, miközben az ún. soft skill-jeidet is
              fejlesztheted. Ha számodra a szakma hivatás, ha szeretsz új
              dolgokat alkotni vagy csak jó társaságra vágysz, a legjobb helyre
              kerültél. A reszort körei a szakma egy-egy meghatározó területével
              foglalkoznak a fejlesztés és üzemeltetés területén.
            </p>
            <Divider as="h4" className="header" style={{ margin: "3em 0em" }} />
            <Header as="h3" style={{ fontSize: "2em" }}>
              Képzésünk
            </Header>
            <p style={{ fontSize: "1.33em" }}>
              Kilenc alkalmas képzésünk végén Te is igazi KSZK-ssá válhatsz,
              hiszen rengeteg szakmai tudást igyekszünk átadni nektek. A
              képzésalkalmak rendkívül jó hangulatban telnek, és a szociális
              irányultságú foglalkozások alatt egy nagyon jó csapat kovácsolódik
              az érdeklődőkből. Az első képzés időpontja február 20. hétfő
              19:30, ettől kezdve minden héten találkozunk ugyanabban az
              időpontban. A képzés ideje alatt március 10-12 között rendezünk
              tábort. Az alkalmakon és a táborban kötelező a részvétel.
            </p>
          </Container>
        </Segment>
      </div>
    );
  }
}
