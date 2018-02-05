import React, { Component } from 'react';
import { Container, Header, Segment, Divider } from 'semantic-ui-react';

export default class Groups extends Component {
  render() {
    return (
      <div>
        <Segment inverted textAlign='center' vertical>
          <Container>
            <Header
              as='h1'
              content='Köreink'
              inverted
              style={{
                fontSize: '3em',
                fontWeight: 'normal',
                marginBottom: 0,
                marginTop: '0.5em',
              }}
            />
          </Container>
        </Segment>

        <Segment style={{ padding: '8em 0em' }} vertical>
          <Container text>
            <Header as='h3' style={{ fontSize: '2em' }}>DevTeam</Header>
            <p style={{ fontSize: '1.33em' }}>
              A DevTeam a KSZK fejlesztő köre. Az informatika számos területével foglalkoznak, többek között például alkalmazás- és mobilszoftver fejlesztéssel, weblapkészítéssel. Ezen felül találkozhatsz mikrokontrollerek programozásával, legyen az akár Raspberry Pi vagy Arduino. Saját ötleteid megvalósításában is szívesen nyújtanak segítő kezet, illetve egyes gyűléseiken gyorstalpalókat tartanak, hogy az érdeklődők mielőbb be tudjanak csatlakozni a munkába.
              Jelenlegi projektjeik közé tartozik egy Schönherz szintű kölcsönzési rendszer kialakítása, egy gyakorlóoldal készítése, melyen egyetemi tárgyak ZH-ira, vizsgáira lehet készülni, a tanuló helyiségek foglaltságát vizsgáló rendszer bevezetése, de szívesen viszik érdeklődő, lelkes tagjaik új projektötleteit is.
              A kör szeretettel vár mindenkit, legyen akár profi fejlesztő, vagy olyan, aki csak most ismerkedik a fejlesztés szépségeivel – náluk mindenki talál a képességeinek megfelelő elfoglaltságot.
            </p>

            <Divider as='h4' className='header' style={{ margin: '3em 0em' }} />
            <Header as='h3' style={{ fontSize: '2em' }}>Hallgatói Tudásbázis</Header>
            <p style={{ fontSize: '1.33em' }}>
              A HaT (Hallgatói Tudásbázis) a VIK Wiki adminisztrációjáért, illetve üzemeltetéséért, fejlesztéséért felelős kör. Nekik köszönhető a Wiki rendezett állapota. Odafigyelnek rá, hogy kövessék a szerkesztői szokásokat, és rendszeresen felmérik, milyen újításra van kereslet. Azoknak a jelentkezését várják, akik nem riadnak vissza egy (rosszabb napjain) napi ötezer oldalmegtekintést produkáló rendszer ápolgatásától.
            </p>

            <Divider as='h4' className='header' style={{ margin: '3em 0em' }} />
            <Header as='h3' style={{ fontSize: '2em' }}>NETeam</Header>
            <p style={{ fontSize: '1.33em' }}>
              A NETeam foglalkozik a kollégiumi hálózati infrastruktúra üzemeltetésével és fejlesztésével. Biztosítják a hálózat folyamatos működését, követik az új hálózati technológiák alakulását, igyekeznek gyakorlatban is kipróbálni őket, alkalomadtán pedig cégekkel kapcsolatot tartva vesznek részt új megoldások tesztelésében is.

              A Schönherzben a 90-es évek óta üzemelteti a Házat lefedő hálózatot a KSZK, mely azóta többször teljes cserén esett át. A KSZK reszorttá válása előtt a NETeam egy erre szakosodott csoportja volt, 2014 óta pedig önálló körként folytatja tevékenységét. A kör tagjai hagyományosan a NetAdmin és segéd-NetAdminok, akik a kollégiumi hálózat fenntartásáért felelősek, illetve a Netikai Bizottság elnöke és tagjai, akik a hálózathasználati szabályzatot tartatják be, illetve a hálózathasználati szabályzattal szemben elkövetett kihágásokat felügyelik és szankcionálják.
              Az ide kerülőknek lehetőségük van bekapcsolódni az ISO/OSI modell majdnem minden rétegében működő szolgáltatások üzemeltetésébe és fejlesztésébe, amit szolgáltatástól függően akár az egész karon használnak. Ilyen például a Cisco eszközök konfigurációja, WiFi hálózat, VoIP, VPN, DNS/Dinamikus DNS üzemeltetése, fejlesztése, felhasználói adatbázis kezelése, forgalommonitorozás. Ezek széleskörű rálátást engednek egy komplex hálózatra és a használt technológiák működésére. A használt hálózattól függetlenül kialakított router laborban pedig lehetőség van szinte bármilyen, az iparban használt switching/routing megoldás próba szintű felépítésére.
              Jelenleg várható legnagyobb projektjük a Házat teljes egészében lefedő WiFi hálózat kiépítése lesz, de a következő évben kilátásban van a Software Defined Networking megoldásokkal való ismerkedés, illetve a router labor továbbfejlesztése is.
              Aki csatlakozik a körbe és hálózatot vagy szolgáltatásokat üzemeltet, fejleszt, felelősséggel fog tartozni az általa irányított rendszerért, ezzel pedig fontos része lesz a Schönherzes közéletnek. Ez a felelősség, az ezzel járó nem kizárólag szakmai tapasztalat és technikai tudás pedig egy későbbi önéletrajzban is olyan tényező tud lenni, amivel kevés frissen végzett hálózati szakember rendelkezik.
            </p>

            <Divider as='h4' className='header' style={{ margin: '3em 0em' }} />
            <Header as='h3' style={{ fontSize: '2em' }}>SecurITeam</Header>
            <p style={{ fontSize: '1.33em' }}>
              A SecurITeam-ben te is megismerkedhetsz az IT biztonságban használt technikákkal: weboldalakat, szervereket, zárakat és még hardvereket is törnek.
  Csináltál egy weboldalt vagy appot, de nem vagy meggyőződve arról, hogy biztonságos? Náluk mind a támadó, mind a védekező oldal technikáiról tanulhatsz, és ki is próbálhatod a tudásodat élőben. Az SQL injection, programok visszafejtése és exploitálása, webes alkalmazások biztonságának vizsgálata, ismert támadások (pl. Shellshock, Meltdown) kipróbálása, gyenge titkosítások megkerülése, valamint a privacy védelme mind olyan dolgok, amivel ez a kör foglalkozik. A szoftveres témák mellett a fizikai biztonságra is hangsúlyt fektetnek, legyen az Bluetooth sniffing, rádiós lehallgatás, RFID klónozás vagy lockpicking, náluk megtalálod ez ehhez szükséges eszközöket és szaktudást!
  A kör előadásokat, tanfolyamokat és workshopokattart, illetve a Schönherzes infrastruktúra biztonságát rendszeresen pentestekkel ellenőrzik.
  A körben lehetőséged adódik arra, hogy a korábban felsorolt tevékenységek bármelyikével foglalkozz, tanulj, versenyezz IT biztonsági versenyeken (CTF), illetve a Wargame fejlesztésébe is be tudsz csatlakozni.
            </p>

            <Divider as='h4' className='header' style={{ margin: '3em 0em' }} />
            <Header as='h3' style={{ fontSize: '2em' }}>Sysadmin</Header>
            <p style={{ fontSize: '1.33em' }}>
              A Sysadmin a Schönherz szerverüzemeltetésével foglalkozó öntevékeny köre. A kollégiumban működő IT szolgáltatásokat nyújtó infrastruktúrát ők felügyelik, fejlesztik. Az általuk használt szoftverek között megtalálhatóak Linux, BSD, Solaris valamint Windows alapú megoldások is. Az infrastruktúra VPN szerverének segítségével akár otthonról is hozzáférhetsz azokhoz az erőforrásokhoz, amelyek csak az egyetemi hálózatból elérhetők. 2014 végén indult a legfiatalabb, RemoteApp névre hallgató szolgáltatásuk, mellyel úgy értheted el az oktatásban is használt (és egyéb) szoftvereket, hogy nem szükséges azokat telepítened a gépedre. A felhasználói igények alapján folyamatosan bővítik szolgáltatásaik palettáját.
Minden félévben indítanak új projekteket. Jelenleg és a következő félévekben egy Docker (Kubernetes) alapú container cluster fejlesztésén és üzembe helyezésén, illetve konfiguráció menedzsment bevezetésén dolgoznak. Az új dolgok mellett persze komoly hangsúlyt fektetnek a jelenleg üzemelő szerverek folyamatos karbantartására is. Náluk megtanulhatod, hogyan kell egy több fizikai hosztból álló, körülbelül 150 virtuális szervert kiszolgáló virtualizációs clustert üzemeltetni, de akár a webhosting területén is fejlesztheted tudásod a Ház legnagyobb (~200 weboldat kiszolgáló) szerverének felügyelete során. Ha szeretnél a felszín mögé látni, és releváns szakmai tapasztalatot szerezni a területen, akkor köztük a helyed. Az előismeret nem követelmény, a lelkesedés igen.
            </p>

          </Container>
        </Segment>
      </div>
    );
  }
}
