import React, { Component } from 'react';
import { Container, Form, Dropdown, Divider, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { textChange, submitRegistration, groupChange } from '../../actions';

const options = [
  { key: 'DT', text: 'DevTeam', value: 'DT' },
  { key: 'NET', text: 'NETeam', value: 'NET' },
  { key: 'ST', text: 'SecurITeam', value: 'ST' },
  { key: 'SYS', text: 'SysAdmin', value: 'SYS' },
  { key: 'HAT', text: 'Hallgatói Tudásbázis', value: 'HAT' },
];

class Profile extends Component {
  componentWillMount() {
    if (!this.props.id) {
      this.props.history.push('/home');
    }
  }

  render() {
    const {
      nick, groups, motivationAbout, motivationProfession, motivationExercise, signed, id,
    } = this.props;
    return (
      <Container
        style={{
          marginTop: '0.5em',
        }}
      >
        <Segment inverted color='red' tertiary>
          <p style={{ fontSize: '1.33em' }}>
            A profilod mentés után is módosítható a későbbiekben, egészen február 14. 23:59-ig.
          </p>
        </Segment>
        <Form>
          <Form.Input
            fluid
            name='nick'
            label='Becenév'
            onChange={e => this.props.textChange(e)}
            placeholder='Becenév'
            value={nick}
          />

          <Divider horizontal>Motiváció</Divider>
          <Form.TextArea
            rows={10}
            name='motivationAbout'
            label='Mesélj nekünk egy kicsit magadról. Milyen szakmai vagy más eredményeket értél el, amikre büszke vagy?'
            onChange={e => this.props.textChange(e)}
            placeholder='Mesélj nekünk egy kicsit magadról. Milyen szakmai vagy más eredményeket értél el, amikre büszke vagy?'
            value={motivationAbout}
          />

          <Divider horizontal />
          <Form.TextArea
            rows={10}
            label='Mit vársz el a képzéstől, miért szeretnél rá jelentkezni, szerinted mire tudod majd használni az itt megszerzett tudást? Mit szeretnél elérni a szakmádban?'
            name='motivationProfession'
            onChange={e => this.props.textChange(e)}
            placeholder='Mit vársz el a képzéstől, miért szeretnél rá jelentkezni, szerinted mire tudod majd használni az itt megszerzett tudást? Mit szeretnél elérni a szakmádban?'
            value={motivationProfession}
          />

          <Divider horizontal />
          <Form.TextArea
            rows={10}
            name='motivationExercise'
            onChange={e => this.props.textChange(e)}
            placeholder=''
            label={
              <div>
                <b>Alább találsz néhány elgondolkodtató kérdést, megoldandó feladatot.
                  A kérdések és feladatok elkészítése opcionális,
                  nem titkolt célunk ezzel a lelkesedés felmérése.
                  A válaszokat a kérdések alatti szövegdobozba várjuk.
                </b>
                <ol>
                  <li>
                  Szeretnéd kedvenc tantárgyad vik.wiki oldalát elérni,
                  de szomorúan látod, hogy az oldal nem jön be.
                  A Steam pedig hibátlanul megy a háttérben és az emailek is megérkeznek...
                  Szobatársadnak pont megvan a vik.wiki szerverének IP-címe.
                  Csodálkozva látod, hogy a böngésző címsorába írva eléred a kiszolgáló webszervert.
                  Mi lehet a baj?
                  </li>
                  <br />
                  <li>
                  Két előadás közti szünetben úgy döntesz,
                  hogy laptopoddal az index.hu tech cikkeit fogod görgetni.
                  Ám az oldal nem válaszol, a hiba okát megpróbálod kideríteni.
                  Ekkor veszed észre, hogy az alábbiakat sem éred el:
                  sze.hu, 444.hu, corvinus.hu, startlap.hu.
                  Ugyanakkor a Facebook, a Gmail, a YouTube, de még az egyetemi
                  oldalak többsége is működik. Szerinted mi lehet a hiba oka?
                  </li>
                  <br />
                  <li>
                  Találsz egy értelmetlen szöveget egy honlapon (például: <a href='http://kszkepzes18.sch.bme.hu/zebra.html'>http://kszkepzes18.sch.bme.hu/zebra.html</a>), de feltűnik, hogy két egyenlőségjellel fejeződik be. Nyomozz, s a végeredményt (amit találtál) írd ide!
                  </li>
                  <br />
                  <li>
                  A <b>kszkepzes18.sch.bme.hu</b> címen elérhető gépen
                  fut egy szolgáltatás az alapértelmezett <b>5432</b> porton
                  (használd az előző feladatban kapott adatokat).
                  Belépés után keresd meg a feladat megoldását!
                  </li>
                </ol>
              </div>
            }
            value={motivationExercise}
          />

          <Divider horizontal>Érdekelődés</Divider>
          <Dropdown
            fluid
            multiple
            selection
            placeholder='DevTeam, ...'
            onChange={(_, v) => this.props.groupChange(v.value)}
            options={options}
            defaultValue={groups}
          />
          <br />
          <Form.Checkbox
            name='signed'
            label='Szeretnék jelentkezni a KSZKépzésre'
            onChange={(_, v) =>
              this.props.textChange({ target: { name: v.name, value: v.checked } })
            }
            checked={signed}
          />
          <Form.Button
            primary
            style={{ marginBottom: '10em' }}
            onClick={() => this.props.submitRegistration({
              nick, motivationAbout, motivationProfession, motivationExercise, signed, groups, id,
            })}
          >
            Mentés
          </Form.Button>
        </Form>
      </Container>
    );
  }
}

const mapStateToProps = ({
  user: {
    nick, groups, motivationAbout, motivationProfession, motivationExercise, signed, id,
  },
}) => ({
  nick,
  groups,
  motivationAbout,
  motivationProfession,
  motivationExercise,
  signed,
  id,
});

export default connect(mapStateToProps, { textChange, submitRegistration, groupChange })(Profile);
