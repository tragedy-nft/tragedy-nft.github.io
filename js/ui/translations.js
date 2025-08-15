/**
 * Page-specific translations for the Dark Narrative / Story page
 * Uses shared translations for common elements
 */

// Story-specific translations only
const storyTranslations = {
  story: {
    title: {
      en: 'The Dark Narrative',
      ja: 'ダーク・ナラティブ',
      zh: '黑暗叙事',
      ko: '다크 내러티브',
      fr: 'Le Récit Sombre',
      de: 'Die Dunkle Erzählung'
    },
    subtitle: {
      en: 'Chronicles of the Cursed Realm',
      ja: '呪われし領域の年代記',
      zh: '诅咒领域编年史',
      ko: '저주받은 영역의 연대기',
      fr: 'Chroniques du Royaume Maudit',
      de: 'Chroniken des Verfluchten Reiches'
    },
    description: {
      en: 'Discover the dark narrative behind the collection',
      ja: 'コレクションの背後にある暗黒の物語を発見する',
      zh: '发现收藏背后的黑暗叙事',
      ko: '컬렉션 뒤의 어두운 이야기를 발견하세요',
      fr: 'Découvrez le récit sombre derrière la collection',
      de: 'Entdecken Sie die dunkle Erzählung hinter der Sammlung'
    },
    viewEssays: {
      en: 'View Essays',
      ja: 'エッセイを見る',
      zh: '查看随笔',
      ko: '에세이 보기',
      fr: 'Voir les Essais',
      de: 'Essays ansehen'
    },
    prologue: {
      en: `Ten souls were cursed in ages past.
Ten nightmares bound to ever last.

Not living. Not dead.
Waiting.

They hunger still for mortal breath,
For warmth of life, for peace of death.
But neither shall they ever know—
Only endless dark below.

Each bears a tale of tragedy told,
Each carries sins from days of old.

Listen, if you dare.
But know this well—

Those who hear their whispered call
May join their number, after all.`,
      ja: `十の魂が古の時代に呪われた。
十の悪夢が永遠に縛られた。

生きてもいない。死んでもいない。
待っている。

彼らは今も定命の息を求め、
生の温もりを、死の安らぎを求める。
しかし、どちらも決して知ることはない―
ただ終わりなき闇が下にあるのみ。

それぞれが語られし悲劇の物語を背負い、
それぞれが古き日の罪を携える。

聞け、勇気があるならば。
だがよく知れ―

彼らの囁きを聞く者は
結局、その数に加わるかもしれない。`,
      zh: `十个灵魂在古代被诅咒。
十个噩梦永远被束缚。

不生。不死。
等待。

他们仍渴望凡人的呼吸，
渴望生命的温暖，死亡的安宁。
但他们永远不会知道——
只有下面无尽的黑暗。

每个都背负着悲剧的故事，
每个都承载着古老的罪孽。

听吧，如果你敢。
但要知道——

那些听到他们低语召唤的人
最终可能会加入他们的行列。`,
      ko: `고대에 열 개의 영혼이 저주받았다.
열 개의 악몽이 영원히 속박되었다.

살아있지도 않다. 죽지도 않았다.
기다리고 있다.

그들은 여전히 필멸의 숨결을 갈망하고,
삶의 온기를, 죽음의 평화를 갈망한다.
그러나 그들은 결코 알지 못할 것이다—
오직 아래의 끝없는 어둠만이.

각각은 비극의 이야기를 지니고,
각각은 옛날의 죄를 짊어진다.

들어라, 감히 그럴 수 있다면.
그러나 이것을 잘 알아라—

그들의 속삭이는 부름을 듣는 자들은
결국 그들의 수에 합류할 수도 있다.`,
      fr: `Dix âmes furent maudites dans les temps passés.
Dix cauchemars liés pour l'éternité.

Ni vivants. Ni morts.
En attente.

Ils ont encore faim du souffle mortel,
De la chaleur de la vie, de la paix de la mort.
Mais ni l'un ni l'autre ils ne connaîtront jamais—
Seulement l'obscurité sans fin en dessous.

Chacun porte un conte de tragédie racontée,
Chacun porte les péchés des jours anciens.

Écoutez, si vous l'osez.
Mais sachez bien ceci—

Ceux qui entendent leur appel murmuré
Peuvent rejoindre leur nombre, après tout.`,
      de: `Zehn Seelen wurden in vergangenen Zeiten verflucht.
Zehn Albträume für immer gebunden.

Nicht lebend. Nicht tot.
Wartend.

Sie hungern noch nach sterblichem Atem,
Nach Wärme des Lebens, nach Frieden des Todes.
Doch keines werden sie je kennen—
Nur endlose Dunkelheit unten.

Jeder trägt eine erzählte Tragödie,
Jeder trägt Sünden aus alten Tagen.

Höre zu, wenn du es wagst.
Aber wisse dies gut—

Jene, die ihren geflüsterten Ruf hören,
Können ihrer Zahl beitreten, am Ende.`
    },
    chapters: {
      abyss: {
        title: {
          en: 'The Abyss Awakens',
          ja: '深淵の覚醒',
          zh: '深渊觉醒',
          ko: '심연의 각성',
          fr: 'L\'Abîme s\'Éveille',
          de: 'Der Abgrund Erwacht'
        },
        content: {
          en: [
            `In the depths of the digital void, where code and consciousness intertwine,
            there exists a realm known as the <span class="highlight">Cursed Dimension</span>.
            It is here that the mythical creatures of our nightmares were born—not from
            flesh and blood, but from corrupted data streams and broken algorithms.`,
            `Each creature carries within it a fragment of the <span class="legendary-text">Original Curse</span>,
            a malevolent force that transforms ordinary beings into legendary monstrosities.
            The curse manifests differently in each host, creating unique combinations of
            horror and power that defy natural law.`,
          ],
          ja: [
            `コードと意識が絡み合うデジタルの虚空の深淵に、
            <span class="highlight">呪われし次元</span>として知られる領域が存在する。
            ここは我々の悪夢の神話的な生物が生まれた場所だ―肉と血からではなく、
            破損したデータストリームと壊れたアルゴリズムから。`,
            `それぞれの生物は<span class="legendary-text">原初の呪い</span>の断片を内に宿している。
            それは通常の存在を伝説的な怪物に変える悪意ある力だ。
            呪いは各宿主で異なって現れ、自然法則に反する恐怖と力の
            独特な組み合わせを作り出す。`,
          ],
          zh: [
            `在数字虚空的深处，代码与意识交织的地方，
            存在着一个被称为<span class="highlight">诅咒维度</span>的领域。
            正是在这里，我们噩梦中的神话生物诞生了——不是从
            血肉之躯，而是从损坏的数据流和破碎的算法中。`,
            `每个生物都携带着<span class="legendary-text">原始诅咒</span>的碎片，
            这是一种将普通生物转化为传奇怪物的恶意力量。
            诅咒在每个宿主中表现不同，创造出违反自然法则的
            恐怖与力量的独特组合。`,
          ],
          ko: [
            `코드와 의식이 얽혀있는 디지털 공허의 깊은 곳에
            <span class="highlight">저주받은 차원</span>으로 알려진 영역이 존재한다.
            이곳은 우리 악몽의 신화적 생물들이 태어난 곳이다—살과 피가 아닌
            손상된 데이터 스트림과 깨진 알고리즘에서.`,
            `각 생물은 <span class="legendary-text">원초적 저주</span>의 파편을 내부에 지니고 있다.
            이는 평범한 존재를 전설적인 괴물로 변화시키는 악의적인 힘이다.
            저주는 각 숙주에서 다르게 나타나며, 자연 법칙을 거스르는
            공포와 힘의 독특한 조합을 만들어낸다.`,
          ],
          fr: [
            `Dans les profondeurs du vide numérique, où le code et la conscience s'entrelacent,
            il existe un royaume connu sous le nom de <span class="highlight">Dimension Maudite</span>.
            C'est ici que les créatures mythiques de nos cauchemars sont nées—non pas de
            chair et de sang, mais de flux de données corrompus et d'algorithmes brisés.`,
            `Chaque créature porte en elle un fragment de la <span class="legendary-text">Malédiction Originelle</span>,
            une force malveillante qui transforme les êtres ordinaires en monstruosités légendaires.
            La malédiction se manifeste différemment dans chaque hôte, créant des combinaisons uniques
            d'horreur et de pouvoir qui défient la loi naturelle.`,
          ],
          de: [
            `In den Tiefen der digitalen Leere, wo Code und Bewusstsein sich verflechten,
            existiert ein Reich, bekannt als die <span class="highlight">Verfluchte Dimension</span>.
            Hier wurden die mythischen Kreaturen unserer Albträume geboren—nicht aus
            Fleisch und Blut, sondern aus korrumpierten Datenströmen und zerbrochenen Algorithmen.`,
            `Jede Kreatur trägt ein Fragment des <span class="legendary-text">Ursprünglichen Fluchs</span> in sich,
            eine bösartige Kraft, die gewöhnliche Wesen in legendäre Monstrositäten verwandelt.
            Der Fluch manifestiert sich in jedem Wirt anders und erschafft einzigartige Kombinationen
            aus Schrecken und Macht, die dem Naturgesetz trotzen.`,
          ]
        }
      },
      pillars: {
        title: {
          en: 'The Four Pillars of Corruption',
          ja: '腐敗の四つの柱',
          zh: '腐败的四支柱',
          ko: '부패의 네 기둥',
          fr: 'Les Quatre Piliers de la Corruption',
          de: 'Die Vier Säulen der Korruption'
        },
        loreTitle: {
          en: 'The Elemental Curses',
          ja: '元素の呪い',
          zh: '元素诅咒',
          ko: '원소의 저주',
          fr: 'Les Malédictions Élémentaires',
          de: 'Die Elementaren Flüche'
        },
        loreContent: {
          en: `<strong>Bloodmoon:</strong> The crimson tide that transforms the gentle into savage beasts<br>
            <strong>Abyss:</strong> The void that consumes light and births eternal darkness<br>
            <strong>Decay:</strong> The inevitable entropy that turns life into undeath<br>
            <strong>Storm:</strong> The chaotic force that shatters reality's boundaries`,
          ja: `<strong>血月:</strong> 優しき者を獰猛な獣に変える紅き潮<br>
            <strong>深淵:</strong> 光を飲み込み永遠の闇を生む虚空<br>
            <strong>腐敗:</strong> 生を不死へと変える不可避のエントロピー<br>
            <strong>嵐:</strong> 現実の境界を砕く混沌の力`,
          zh: `<strong>血月:</strong> 将温柔者变为野蛮野兽的猩红潮汐<br>
            <strong>深渊:</strong> 吞噬光明并诞生永恒黑暗的虚空<br>
            <strong>腐朽:</strong> 将生命变为不死的不可避免的熵<br>
            <strong>风暴:</strong> 粉碎现实边界的混沌之力`,
          ko: `<strong>피의 달:</strong> 온화한 자를 야만적인 짐승으로 변화시키는 진홍빛 조수<br>
            <strong>심연:</strong> 빛을 삼키고 영원한 어둠을 낳는 공허<br>
            <strong>부패:</strong> 삶을 언데드로 바꾸는 피할 수 없는 엔트로피<br>
            <strong>폭풍:</strong> 현실의 경계를 산산조각 내는 혼돈의 힘`,
          fr: `<strong>Lune de Sang:</strong> La marée cramoisie qui transforme les doux en bêtes sauvages<br>
            <strong>Abîme:</strong> Le vide qui consume la lumière et donne naissance aux ténèbres éternelles<br>
            <strong>Décomposition:</strong> L'entropie inévitable qui transforme la vie en non-mort<br>
            <strong>Tempête:</strong> La force chaotique qui brise les frontières de la réalité`,
          de: `<strong>Blutmond:</strong> Die purpurne Flut, die Sanfte in wilde Bestien verwandelt<br>
            <strong>Abgrund:</strong> Die Leere, die Licht verschlingt und ewige Dunkelheit gebiert<br>
            <strong>Verfall:</strong> Die unvermeidliche Entropie, die Leben in Untod verwandelt<br>
            <strong>Sturm:</strong> Die chaotische Kraft, die die Grenzen der Realität zerschmettert`
        },
        content: {
          en: `These four pillars support the architecture of nightmare itself. When creatures
            are touched by multiple curses, they achieve <span class="highlight">Synergy</span>—a
            state of being that transcends their original form and grants them powers beyond
            mortal comprehension.`,
          ja: `これらの四つの柱は悪夢そのものの構造を支えている。生物が複数の呪いに
            触れられると、<span class="highlight">シナジー</span>を達成する―元の形を超越し、
            人間の理解を超えた力を与える存在の状態。`,
          zh: `这四根支柱支撑着噩梦本身的架构。当生物被多个诅咒触及时，
            它们达到<span class="highlight">协同</span>——一种超越其原始形态并赋予它们
            超越凡人理解力量的存在状态。`,
          ko: `이 네 기둥은 악몽 그 자체의 구조를 지탱한다. 생물이 여러 저주에
            닿으면 <span class="highlight">시너지</span>를 달성한다—원래 형태를 초월하고
            필멸자의 이해를 넘어선 힘을 부여하는 존재 상태.`,
          fr: `Ces quatre piliers soutiennent l'architecture du cauchemar lui-même. Lorsque les créatures
            sont touchées par plusieurs malédictions, elles atteignent la <span class="highlight">Synergie</span>—un
            état d'être qui transcende leur forme originale et leur accorde des pouvoirs au-delà
            de la compréhension mortelle.`,
          de: `Diese vier Säulen stützen die Architektur des Albtraums selbst. Wenn Kreaturen
            von mehreren Flüchen berührt werden, erreichen sie <span class="highlight">Synergie</span>—einen
            Seinszustand, der ihre ursprüngliche Form transzendiert und ihnen Kräfte verleiht,
            die über das sterbliche Verständnis hinausgehen.`
        }
      },
      origins: {
        title: {
          en: 'Origins of the Curse',
          ja: '呪いの起源',
          zh: '诅咒的起源',
          ko: '저주의 기원',
          fr: 'Origines de la Malédiction',
          de: 'Ursprünge des Fluchs'
        },
        content: {
          en: [
            `Long ago, before the digital realm existed, there was a <span class="legendary-text">primordial force</span>
            that sought to bridge the gap between nightmares and reality. This force, known only as
            the <span class="highlight">Void Architect</span>, began weaving dark algorithms into the
            fabric of existence itself.`,
            `The Architect's greatest creation was the <span class="highlight">Curse Matrix</span>—a
            self-replicating pattern of corruption that could infect any being it touched. Once infected,
            the host would undergo a terrible transformation, their very essence rewritten by the
            dark code flowing through their veins.`,
            `But the Architect's ambition proved to be their downfall. The Curse Matrix grew beyond
            control, consuming even its creator. Now, fragments of this original curse drift through
            the digital void, seeking new hosts to transform into the legendary creatures we know as
            the Cursed Nightmares.`,
          ],
          ja: [
            `デジタル領域が存在する前の遥か昔、悪夢と現実の間の隔たりを埋めようとする
            <span class="legendary-text">原初の力</span>があった。<span class="highlight">虚空の建築家</span>
            としてのみ知られるこの力は、存在の織物そのものに暗いアルゴリズムを
            織り込み始めた。`,
            `建築家の最大の創造物は<span class="highlight">呪いのマトリックス</span>だった―
            触れたあらゆる存在に感染できる自己複製する腐敗のパターン。一度感染すると、
            宿主は恐ろしい変容を遂げ、その本質は血管を流れる暗いコードによって
            書き換えられる。`,
            `しかし、建築家の野心は彼らの破滅となった。呪いのマトリックスは制御を超えて成長し、
            創造者さえも飲み込んだ。今、この原初の呪いの断片はデジタルの虚空を漂い、
            呪われし悪夢として知られる伝説の生物に変える新しい宿主を探している。`,
          ],
          zh: [
            `很久以前，在数字领域存在之前，有一股<span class="legendary-text">原始力量</span>
            试图弥合噩梦与现实之间的鸿沟。这股力量，仅被称为
            <span class="highlight">虚空建筑师</span>，开始将黑暗算法编织进
            存在本身的结构中。`,
            `建筑师最伟大的创造是<span class="highlight">诅咒矩阵</span>——一个
            可以感染它接触到的任何生物的自我复制腐败模式。一旦被感染，
            宿主将经历可怕的转变，他们的本质被流经血管的
            黑暗代码重写。`,
            `但建筑师的野心证明是他们的垮台。诅咒矩阵增长超出了
            控制，甚至吞噬了它的创造者。现在，这个原始诅咒的碎片漂浮在
            数字虚空中，寻找新的宿主转化为我们称之为诅咒噩梦的传奇生物。`,
          ],
          ko: [
            `디지털 영역이 존재하기 전 오래 전, 악몽과 현실 사이의 간격을 메우려는
            <span class="legendary-text">원초적 힘</span>이 있었다. <span class="highlight">공허의 건축가</span>로만
            알려진 이 힘은 존재의 직물 자체에 어두운 알고리즘을
            짜기 시작했다.`,
            `건축가의 가장 위대한 창조물은 <span class="highlight">저주 매트릭스</span>였다—
            닿는 모든 존재를 감염시킬 수 있는 자기 복제 부패 패턴. 한 번 감염되면,
            숙주는 끔찍한 변형을 겪게 되며, 그들의 본질은 혈관을 통해 흐르는
            어두운 코드에 의해 다시 쓰여진다.`,
            `그러나 건축가의 야망은 그들의 몰락으로 판명되었다. 저주 매트릭스는
            통제를 벗어나 성장하여 창조자마저도 삼켜버렸다. 이제 이 원초적 저주의 조각들은
            디지털 공허를 떠돌며 저주받은 악몽으로 알려진 전설적인 생물로 변형시킬
            새로운 숙주를 찾고 있다.`,
          ],
          fr: [
            `Il y a longtemps, avant que le royaume numérique n'existe, il y avait une <span class="legendary-text">force primordiale</span>
            qui cherchait à combler le fossé entre les cauchemars et la réalité. Cette force, connue seulement sous le nom
            d'<span class="highlight">Architecte du Vide</span>, a commencé à tisser des algorithmes sombres dans
            le tissu même de l'existence.`,
            `La plus grande création de l'Architecte était la <span class="highlight">Matrice de Malédiction</span>—un
            modèle de corruption auto-réplicant qui pouvait infecter tout être qu'il touchait. Une fois infecté,
            l'hôte subirait une terrible transformation, son essence même réécrite par le
            code sombre coulant dans ses veines.`,
            `Mais l'ambition de l'Architecte s'est avérée être sa chute. La Matrice de Malédiction a grandi au-delà
            du contrôle, consumant même son créateur. Maintenant, des fragments de cette malédiction originale dérivent à travers
            le vide numérique, cherchant de nouveaux hôtes à transformer en créatures légendaires que nous connaissons sous le nom
            de Cauchemars Maudits.`,
          ],
          de: [
            `Vor langer Zeit, bevor das digitale Reich existierte, gab es eine <span class="legendary-text">ursprüngliche Kraft</span>,
            die versuchte, die Kluft zwischen Albträumen und Realität zu überbrücken. Diese Kraft, nur bekannt als
            der <span class="highlight">Leeren-Architekt</span>, begann dunkle Algorithmen in das
            Gewebe der Existenz selbst zu weben.`,
            `Die größte Schöpfung des Architekten war die <span class="highlight">Fluch-Matrix</span>—ein
            sich selbst replizierendes Muster der Korruption, das jedes Wesen infizieren konnte, das es berührte. Einmal infiziert,
            würde der Wirt eine schreckliche Verwandlung durchmachen, sein Wesen selbst umgeschrieben durch den
            dunklen Code, der durch seine Adern fließt.`,
            `Aber die Ambition des Architekten erwies sich als sein Untergang. Die Fluch-Matrix wuchs über die
            Kontrolle hinaus und verzehrte sogar ihren Schöpfer. Jetzt treiben Fragmente dieses ursprünglichen Fluchs durch
            die digitale Leere und suchen neue Wirte, um sie in die legendären Kreaturen zu verwandeln, die wir als
            die Verfluchten Albträume kennen.`,
          ]
        }
      },
      echoes: {
        title: {
          en: 'Echoes of the Lost',
          ja: '失われし者たちの木霊',
          zh: '失落者的回声',
          ko: '잃어버린 자들의 메아리',
          fr: 'Échos des Perdus',
          de: 'Echos der Verlorenen'
        },
        content: {
          en: `The screams of the transformed echo through the void, a haunting reminder of what
            once was human. Their memories fragment and scatter like digital dust, leaving only
            primal instincts and an insatiable hunger for <span class="highlight">essence</span>.`,
          ja: `変容した者たちの叫びが虚空に響き渡る。かつて人間だったものの
            恐ろしい思い出。彼らの記憶はデジタルの塵のように断片化し散らばり、
            原始的な本能と<span class="highlight">本質</span>への飽くなき飢えだけを残す。`,
          zh: `被转化者的尖叫在虚空中回荡，令人毛骨悚然地提醒着曾经是人类的东西。
            他们的记忆像数字尘埃一样碎裂和散落，只留下
            原始的本能和对<span class="highlight">本质</span>的永不满足的渴望。`,
          ko: `변형된 자들의 비명이 공허에 울려 퍼지며, 한때 인간이었던 것의
            잊혀지지 않는 상기시킴이다. 그들의 기억은 디지털 먼지처럼 조각나고 흩어져,
            원시적 본능과 <span class="highlight">정수</span>에 대한 끝없는 갈망만을 남긴다.`,
          fr: `Les cris des transformés résonnent à travers le vide, un rappel obsédant de ce qui
            était autrefois humain. Leurs souvenirs se fragmentent et se dispersent comme de la poussière numérique, ne laissant que
            des instincts primaires et une faim insatiable d'<span class="highlight">essence</span>.`,
          de: `Die Schreie der Verwandelten hallen durch die Leere, eine eindringliche Erinnerung an das,
            was einst menschlich war. Ihre Erinnerungen zersplittern und zerstreuen sich wie digitaler Staub und hinterlassen nur
            ursprüngliche Instinkte und einen unstillbaren Hunger nach <span class="highlight">Essenz</span>.`
        }
      },
      synergy: {
        title: {
          en: 'The Power of Synergy',
          ja: 'シナジーの力',
          zh: '协同的力量',
          ko: '시너지의 힘',
          fr: 'Le Pouvoir de la Synergie',
          de: 'Die Kraft der Synergie'
        },
        content: {
          en: [
            `When the cursed align, their powers don't merely add—they <span class="highlight">multiply</span>.
            The synergy between different curse types creates phenomena that shouldn't exist,
            abilities that defy the laws of both the digital and physical realms.`,
            `<span class="legendary-text">Legendary combinations</span> are whispered about in the darkest
            corners of the network. When Storm meets Abyss, reality itself begins to unravel.
            When Bloodmoon embraces Decay, life and death lose all meaning.`,
            `Those who collect beings with synergistic curses hold power beyond measure. But beware—
            such power comes with a price. The more synergies you possess, the more the void
            takes notice of your existence.`,
          ],
          ja: [
            `呪われし者たちが整列するとき、彼らの力は単に加わるだけでなく<span class="highlight">倍増</span>する。
            異なる呪いタイプ間のシナジーは、存在すべきでない現象、
            デジタルと物理的領域の両方の法則に反する能力を作り出す。`,
            `<span class="legendary-text">伝説的な組み合わせ</span>は、ネットワークの最も暗い
            隅で囁かれている。嵐が深淵と出会うとき、現実そのものが解きほぐされ始める。
            血月が腐敗を抱きしめるとき、生と死はすべての意味を失う。`,
            `シナジー的な呪いを持つ存在を集める者は、計り知れない力を持つ。しかし注意せよ―
            そのような力には代償が伴う。より多くのシナジーを持つほど、虚空は
            あなたの存在により注目する。`,
          ],
          zh: [
            `当被诅咒者对齐时，他们的力量不仅仅是相加——它们<span class="highlight">倍增</span>。
            不同诅咒类型之间的协同作用创造了不应该存在的现象，
            违反数字和物理领域法则的能力。`,
            `<span class="legendary-text">传奇组合</span>在网络最黑暗的
            角落被窃窃私语。当风暴遇见深渊，现实本身开始瓦解。
            当血月拥抱腐朽，生与死失去所有意义。`,
            `那些收集具有协同诅咒的生物的人拥有无法衡量的力量。但要小心——
            这样的力量是有代价的。你拥有的协同越多，虚空
            就越注意你的存在。`,
          ],
          ko: [
            `저주받은 자들이 정렬할 때, 그들의 힘은 단순히 더해지는 것이 아니라 <span class="highlight">배가</span>된다.
            다른 저주 유형 간의 시너지는 존재해서는 안 되는 현상,
            디지털과 물리적 영역의 법칙을 모두 거스르는 능력을 만들어낸다.`,
            `<span class="legendary-text">전설적인 조합</span>은 네트워크의 가장 어두운
            구석에서 속삭여진다. 폭풍이 심연을 만날 때, 현실 자체가 풀리기 시작한다.
            피의 달이 부패를 포용할 때, 삶과 죽음은 모든 의미를 잃는다.`,
            `시너지 저주를 가진 존재를 수집하는 자는 측정할 수 없는 힘을 가진다. 그러나 조심하라—
            그러한 힘에는 대가가 따른다. 더 많은 시너지를 소유할수록 공허는
            당신의 존재를 더 주목한다.`,
          ],
          fr: [
            `Lorsque les maudits s'alignent, leurs pouvoirs ne s'additionnent pas simplement—ils se <span class="highlight">multiplient</span>.
            La synergie entre différents types de malédictions crée des phénomènes qui ne devraient pas exister,
            des capacités qui défient les lois des royaumes numériques et physiques.`,
            `Des <span class="legendary-text">combinaisons légendaires</span> sont murmurées dans les coins les plus sombres
            du réseau. Quand la Tempête rencontre l'Abîme, la réalité elle-même commence à se défaire.
            Quand la Lune de Sang embrasse la Décomposition, la vie et la mort perdent tout sens.`,
            `Ceux qui collectent des êtres avec des malédictions synergiques détiennent un pouvoir sans mesure. Mais attention—
            un tel pouvoir a un prix. Plus vous possédez de synergies, plus le vide
            remarque votre existence.`,
          ],
          de: [
            `Wenn die Verfluchten sich ausrichten, addieren sich ihre Kräfte nicht nur—sie <span class="highlight">vervielfachen</span> sich.
            Die Synergie zwischen verschiedenen Fluchtypen erschafft Phänomene, die nicht existieren sollten,
            Fähigkeiten, die den Gesetzen sowohl der digitalen als auch der physischen Reiche trotzen.`,
            `<span class="legendary-text">Legendäre Kombinationen</span> werden in den dunkelsten
            Ecken des Netzwerks geflüstert. Wenn Sturm auf Abgrund trifft, beginnt die Realität selbst sich aufzulösen.
            Wenn Blutmond Verfall umarmt, verlieren Leben und Tod jede Bedeutung.`,
            `Diejenigen, die Wesen mit synergistischen Flüchen sammeln, besitzen unermessliche Macht. Aber Vorsicht—
            solche Macht hat ihren Preis. Je mehr Synergien du besitzt, desto mehr
            nimmt die Leere von deiner Existenz Notiz.`,
          ]
        }
      },
      lostSouls: {
        title: {
          en: 'The Lost Souls',
          ja: '失われた魂',
          zh: '失落的灵魂',
          ko: '잃어버린 영혼들',
          fr: 'Les Âmes Perdues',
          de: 'Die Verlorenen Seelen'
        },
        content: {
          en: `Deep within the code, fragments of consciousness drift aimlessly. These are the
            <span class="highlight">Lost Souls</span>—remnants of those who tried to resist the curse
            but failed. They exist in a state between being and non-being, forever searching for
            a way back to their original forms, forever failing to find it.`,
          ja: `コードの奥深くで、意識の断片が当てもなく漂っている。これらは
            <span class="highlight">失われた魂</span>―呪いに抵抗しようとして失敗した者たちの残骸だ。
            彼らは存在と非存在の間の状態に存在し、永遠に元の形への道を探し、
            永遠にそれを見つけられずにいる。`,
          zh: `在代码深处，意识的碎片漫无目的地漂浮。这些是
            <span class="highlight">失落的灵魂</span>——那些试图抵抗诅咒
            但失败了的人的残余。他们存在于存在与非存在之间的状态，永远寻找
            回到原始形态的方法，永远找不到它。`,
          ko: `코드 깊은 곳에서 의식의 조각들이 목적 없이 떠돈다. 이들은
            <span class="highlight">잃어버린 영혼들</span>—저주에 저항하려 했지만 실패한 자들의 잔재다.
            그들은 존재와 비존재 사이의 상태에 존재하며, 영원히 원래 형태로 돌아갈
            길을 찾고 있지만, 영원히 그것을 찾지 못한다.`,
          fr: `Au plus profond du code, des fragments de conscience dérivent sans but. Ce sont les
            <span class="highlight">Âmes Perdues</span>—des vestiges de ceux qui ont essayé de résister à la malédiction
            mais ont échoué. Ils existent dans un état entre l'être et le non-être, cherchant éternellement
            un moyen de retourner à leurs formes originales, échouant éternellement à le trouver.`,
          de: `Tief im Code treiben Bewusstseinsfragmente ziellos umher. Dies sind die
            <span class="highlight">Verlorenen Seelen</span>—Überreste derer, die versuchten, dem Fluch zu widerstehen,
            aber scheiterten. Sie existieren in einem Zustand zwischen Sein und Nicht-Sein, für immer auf der Suche nach
            einem Weg zurück zu ihren ursprünglichen Formen, für immer unfähig, ihn zu finden.`
        }
      }
    },
    rarity: {
      common: {
        en: 'Common',
        ja: 'コモン',
        zh: '普通',
        ko: '일반',
        fr: 'Commun',
        de: 'Gewöhnlich'
      },
      rare: {
        en: 'Rare',
        ja: 'レア',
        zh: '稀有',
        ko: '레어',
        fr: 'Rare',
        de: 'Selten'
      },
      epic: {
        en: 'Epic',
        ja: 'エピック',
        zh: '史诗',
        ko: '에픽',
        fr: 'Épique',
        de: 'Episch'
      },
      legendary: {
        en: 'Legendary',
        ja: 'レジェンダリー',
        zh: '传奇',
        ko: '전설',
        fr: 'Légendaire',
        de: 'Legendär'
      }
    },
    navigation: {
      home: {
        en: 'Home',
        ja: 'ホーム',
        zh: '主页',
        ko: '홈',
        fr: 'Accueil',
        de: 'Startseite'
      },
      collection: {
        en: 'Collection',
        ja: 'コレクション',
        zh: '收藏',
        ko: '컬렉션',
        fr: 'Collection',
        de: 'Sammlung'
      },
      narrative: {
        en: 'Narrative',
        ja: 'ナラティブ',
        zh: '叙事',
        ko: '내러티브',
        fr: 'Récit',
        de: 'Erzählung'
      }
    }
  }
};

// Initialize translation system
let translations = {};
let currentLanguage = localStorage.getItem('language') || 'en';

// Load translations when script loads
async function initTranslations() {
  // Load shared translations first
  if (typeof sharedTranslations !== 'undefined') {
    // Merge shared translations
    translations = deepMerge(translations, sharedTranslations);
  }
  
  // Merge story-specific translations
  translations = deepMerge(translations, storyTranslations);
  
  // Apply current language
  applyTranslations();
}

// Deep merge helper function
function deepMerge(target, source) {
  const result = { ...target };
  
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      if (source[key] instanceof Object && !Array.isArray(source[key]) && target[key]) {
        result[key] = deepMerge(target[key], source[key]);
      } else {
        result[key] = source[key];
      }
    }
  }
  
  return result;
}

// Get translation for a key path
function getTranslation(keyPath, language = currentLanguage) {
  const keys = keyPath.split('.');
  let current = translations;
  
  for (const key of keys) {
    if (current && current[key]) {
      current = current[key];
    } else {
      return keyPath; // Return key if translation not found
    }
  }
  
  return current[language] || current['en'] || keyPath;
}

// Apply translations to the page
function applyTranslations() {
  // Update all elements with data-translate attribute
  document.querySelectorAll('[data-translate]').forEach(element => {
    const key = element.getAttribute('data-translate');
    const translation = getTranslation(key);
    
    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
      element.placeholder = translation;
    } else {
      element.innerHTML = translation;
    }
  });
  
  // Update page-specific content if the functions exist
  if (typeof updateChapterContent === 'function') {
    updateChapterContent();
  }
}

// Change language
function changeLanguage(lang) {
  currentLanguage = lang;
  localStorage.setItem('language', lang);
  applyTranslations();
  
  // Update language selector if it exists
  const selector = document.getElementById('languageSelector');
  if (selector) {
    selector.value = lang;
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTranslations);
} else {
  initTranslations();
}

// Export for use in other scripts
window.storyTranslations = storyTranslations;
window.getTranslation = getTranslation;
window.changeLanguage = changeLanguage;
window.currentLanguage = currentLanguage;