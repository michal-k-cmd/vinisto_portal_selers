// Časté dotazy prodejců — texty převzaté ze starého portálu (cs.json, faq.*).

export type FaqItem = { q: string; a: string[] };
export type FaqSection = { heading: string; items: FaqItem[] };

const PHONE = "+420 606 758 080";

export const FAQ: FaqSection[] = [
  {
    heading: "Než začnu prodávat",
    items: [
      {
        q: "Proč prodávat na vinistu?",
        a: [
          "vinisto je první online tržiště a logistická služba s víny a destiláty na českém trhu. vinisto je platforma, která vinařům pomáhá oslovit více zákazníků, budovat svou značku a povědomí o produktech. vinisto je logistická služba – doprava, skladování, balení a dovoz od Vás až k zákazníkovi. vinisto buduje komunitu zapojením profesionálů i laické veřejnosti pomocí článků, hodnocení a edukace. S vinistem šetříte čas, zvyšujete zisky a stáváte se nezávislými. Vizí vinista je prodávat Vaše zboží bez starostí přímo k zákazníkům po celém světě.",
        ],
      },
      {
        q: "Jak funguje vinisto?",
        a: [
          "vinisto funguje jako tržnice, v češtině se také zabíhá anglický výraz „marketplace“. vinisto však za prodejce řeší kompletní logistický proces. Tedy prodejce se zaregistruje, zalistuje na vinisto své produkty, nastaví jim ceny a prodává. vinisto si pro zboží přijede a uskladní jej na svém skladě. Zboží je pojištěné a až do prodeje je majetkem prodejce. Při objednávce vinisto zboží zabalí a dopraví zákazníkovi.",
          "Pro vinaře je specializovaná platforma vinisto způsob, jak prodávat své zboží přímo zákazníkům na internetu, aniž by museli řešit logistický proces. Pro zákazníky je velkou výhodou možnost nákupu přímo od vinaře, respektive od více vinařů najednou, přičemž mu vše bude dovezeno v jedné zásilce. Velkou přidanou hodnotou prodeje na vinisto je, že platforma umožňuje budování komunity a povědomí o Vaší značce. Můžete zde prezentovat své vinařství, produkty, nebo můžete vína hodnotit a psát o nich. Můžete se stát součástí komunity vinisto.",
        ],
      },
      {
        q: "Jak mohu začít prodávat na vinistu?",
        a: [
          "Krok 1) Registrace – Registrace nového prodejce, vinaře nebo distributora je možná na adrese prodejce.vinisto.cz. Pro registraci stačí zadat Vaše kontaktní údaje a IČO Vaší firmy, vše ostatní se Vám doplní automaticky. Musíme si ověřit, že jste to Vy, takže Vám následně zavoláme, nebo Vám zašleme ověřovací e-mail. Čím více v profilu představíte Vaši firmu, tím lépe se Vaše produkty budou prodávat.",
          "Krok 2) Zalistování produktů – Produkty lze vyhledat v naší databázi vín z celého světa, naimportovat je, nebo máte možnost produkty přidat ručně. Okamžitě vidíte, zda Vaše produkty na vinisto prodává jiný prodejce. Cenu svého produktu si nastavíte sami – doporučujeme zvolit stejnou, nebo nižší cenu než za jakou je Váš produkt obvykle na internetu prodáván.",
          "Krok 3) Prodej – Zkontrolujeme Váš profil a Vaše produkty a v případě, že najdeme něco, co je nutné doplnit, obratem Vás kontaktujeme. Následně Vám zašleme první požadavek na naskladnění. Požadované množství je zvoleno pečlivě s ohledem na co nejnižší skladové zásoby a zároveň na pohodlí zákazníka, tak abychom mu jeho nákup mohli doručit co nejdříve a v jednom balíčku. Dojedeme si pro zboží, či nám zboží dodáte na sklad a… prodáváte.",
        ],
      },
      { q: "Co musím splňovat, abych mohl prodávat na vinisto?", a: ["Být výrobcem, importérem, distributorem vína a destilátů a být plátcem DPH."] },
      {
        q: "Proč potřebuji smlouvu?",
        a: [
          "Každý profesionální, upřímný a transparentní obchodní vztah by měl být jasně zasmluvněný, aby obě strany vztahu znaly svá práva a povinnosti. Ve smlouvě jsou řešena všechna práva a povinnosti prodejce, tak abychom zajistili kvalitní službu pro zákazníky a vlastně i pro prodejce.",
        ],
      },
    ],
  },
  {
    heading: "Co lze na vinistu prodávat",
    items: [
      { q: "Co mohu na vinistu prodávat?", a: ["Na vinistu můžete prodávat vína, portské, destiláty. V nejbližší době umožníme také prodej služeb jako jsou degustace, pobyty ve sklípku apod."] },
      {
        q: "Mohu dělat akce a slevy?",
        a: [
          "Ano, s cenami Vašich produktů můžete kdykoliv libovolně pracovat. Nastavení cen provedete jednoduše v administraci Vašeho účtu. Pokud produkt zlevníte, zobrazíme u produktu po dobu 30 dnů vždy původní cenu a cenu po slevě. Pokud produkt naopak zdražíte, zobrazíme pouze novou, vyšší cenu.",
        ],
      },
      {
        q: "Mohu na vinistu prodávat degustace a akce ve vinařství?",
        a: [
          "Prodej služeb jako jsou degustace a jiné akce ve vinařství aktuálně připravujeme. Jejich prodej bude umožněn v nejbližší době. Poplatky za prodej budou stejné jako u prodeje produktů. Neplatíte však poplatky za logistiku – prodej probíhá pouze online, nic neskladujeme a fyzicky zákazníkovi nic neposíláme.",
        ],
      },
    ],
  },
  {
    heading: "Jak funguje prodej přes vinisto",
    items: [
      {
        q: "Jak funguje spolupráce s vinisto?",
        a: [
          `Podmínkou prodeje na vinisto je držení minimálního avšak dostatečného množství zásob na skladě vinista. vinisto nabízí prodejcům dvě možnosti spolupráce. Prodejci mohou své zboží zavážet přímo na sklad vinista na adrese Sanderova 1366/26 na Praze 7 sami a platí pak nižší provizi za logistiku. Druhou možností je využití svozu přímo od vinista, přičemž je provize z prodeje o několik procent nižší. Na způsobu, který Vám bude vyhovovat se vždy domluvte se svým obchodním zástupcem nebo podporou na tel. ${PHONE}, nebo si ho můžete libovolně měnit ve svém administrativním rozhraní.`,
        ],
      },
      { q: "Lze změnit způsob spolupráce?", a: ["Způsob spolupráce si volíte při registraci. Tento způsob spolupráce, respektive způsob dopravy od Vás k nám můžete kdykoliv změnit ve Vašem administrativním rozhraní."] },
      { q: "Může můj produkt na vinisto prodávat i někdo jiný?", a: ["vinisto je tržiště. Může se tedy stát, že Vaše zboží bude nabízet jiný distributor nebo přímo výrobce."] },
      {
        q: "Zajišťuje vinisto podporu pro zákazníky? V jakém rozsahu?",
        a: [
          "vinisto má k dispozici celé oddělení zákaznické péče. Veškeré dotazy a požadavky zákazníků, včetně reklamací tedy řeší vinisto. Prodejce v tomto směru se zákazníkem nic řešit nemusí. Oddělení zákaznické péče nefunguje jako nákupní rádce. Pokud si zákazník neví rady s výběrem vhodného zboží, jsou mu na vinistu k dispozici hodnocení, články a další.",
        ],
      },
    ],
  },
  {
    heading: "Provize a platby",
    items: [
      {
        q: "Kdy platím provizi ze zboží, které přes vinisto nabízím?",
        a: ["Provizi za prodej na vinistu platíte až z prodaného zboží. Za dopravu na sklad a skladování zboží nic neplatíte. Vždy na konci měsíce Vám vinisto zašle vyúčtování a na jeho základě vystaví samo sobě fakturu se splatností 14 dnů."],
      },
      {
        q: "Jakým způsobem mi bude vyplacena provize za prodej?",
        a: [
          "Provizi za prodej vám vinisto vyplatí 1× za měsíc. vinisto vždy na konci měsíce připraví vyúčtování prodaného zboží a provizí, na jehož základě vystaví fakturu samo sobě. V případě, že neproběhl v uplynulém měsíci žádný prodej Vašeho zboží, nic neplatíte a žádná faktura Vám nepřijde.",
        ],
      },
      {
        q: "Může vinisto měnit poplatky za prodej a logistiku?",
        a: [
          "Ano může se to stát. Poplatky za prodej i logistiku chceme měnit co nejméně, nicméně pokud se to bude muset stát, například z důvodu enormního zdražení dopravy, prodejce vše transparentně uvidí a může se rozhodnout, že na vinistu již prodávat nebude.",
        ],
      },
    ],
  },
  {
    heading: "Ceny produktů",
    items: [
      { q: "Jak nastavit ceny pro prodej na vinisto?", a: ["Cenu svého produktu si nastavíte sami – doporučujeme zvolit stejnou, nebo nižší cenu než za jakou je Váš produkt obvykle na internetu prodáván."] },
      {
        q: "Může vinisto upravovat ceny mých produktů?",
        a: [
          "Ano může, nicméně pouze v rámci své provize za prodej zboží. Tedy pokud se vinisto rozhodne zlevnit produkt o 10 %, sleva jde z provize vinista a prodejce dostane celou částku za prodej bez slevy. vinisto však bude se slevou z vlastního poplatku za prodej pracovat co nejméně, protože jinak by platforma neměla finance na fungování.",
        ],
      },
    ],
  },
  {
    heading: "Propagace a marketing",
    items: [
      {
        q: "Jakým způsobem vinisto mé produkty propaguje?",
        a: [
          "vinisto využívá všechny marketingové kanály pro propagaci Vašeho zboží a portálu jako takového. Kromě sociálních sítí, kde se zaměřuje především na budování povědomí o portálu a budování komunity, využívá také výkonnostní kampaně, brandové kampaně a reklamu na zbožových srovnávačích. Veškeré tyto marketingové aktivity jsou již zahrnuty v paušálu a neplatíte za ně nic navíc.",
        ],
      },
      {
        q: "Mohu své produkty přímo na vinisto více zviditelnit?",
        a: [
          `Ano, Vaše produkty i vinařství bude do budoucna možné na vinisto propagovat. Pro prodejce budeme mít k dispozici několik typů marketingových balíčků. Marketingový balíček si pak může prodejce zvolit již při registraci v administrativním rozhraní nebo si ho v administrativním rozhraní kdykoliv objednat. Pro bližší informace můžete kontaktovat svého obchodního zástupce nebo podporu na tel. ${PHONE}.`,
        ],
      },
    ],
  },
  {
    heading: "Doprava a skladování",
    items: [
      { q: "Kde je zboží uskladněno?", a: ["Zboží skladujeme na adrese Sanderova 1366/26 na Praze 7. Sklad vinista je svými podmínkami vhodný i pro skladování naturálních vín. Veškeré zboží na skladě je pojištěno."] },
      {
        q: "Jak funguje zavážení zboží na vinisto?",
        a: [
          "Zboží skladujeme na adrese Sanderova 1366/26 na Praze 7. Při registraci si zvolíte, jaký způsob dopravy zboží na náš sklad Vám bude vyhovovat a orientační čas svozu. Tento způsob i čas lze kdykoliv změnit v nastavení v administrativním rozhraní nebo po domluvě s podporou pro prodejce.",
        ],
      },
      {
        q: "Zavážím zboží na sklad vinisto, ale nemůžu dorazit v domluvený termín, jak mám postupovat?",
        a: ["Víme, že zpoždění může vzniknout z mnoha důvodů, a proto pokud se stane, že nedokážete přijet ve smluvený čas, informujte přes administrativní rozhraní nebo telefonní linku podpory pro prodejce vinisto o zpoždění."],
      },
      {
        q: "Zboží si vinisto vyzvedává u mě v domluvený termín, ale nikdo nedorazil, jak mám postupovat?",
        a: ["V takovém případě nás prosím co nejdříve informujte, a to buď v administrativním rozhraní, nebo na telefonní lince podpory pro prodejce."],
      },
    ],
  },
];
