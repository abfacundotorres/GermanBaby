// Explicación previa y puntos para recordar de la unidad de pronunciación (Aussprache).
import type { LessonNotes } from "./intros-a2.ts";

export const INTROS_AUSSPRACHE: Record<string, LessonNotes> = {
  "aussprache/umlaute": {
    intro: [
      "El español no tiene tres vocales del alemán: «ä», «ö» y «ü». Se escriben con dos puntitos (diéresis) y cambian el sonido. Si las pronunciás como «a», «o» y «u», se oye distinto y a veces cambia la palabra: «schon» (ya) y «schön» (lindo).",
      "Truco para la «ü»: poné los labios como para decir «u», pero decí «i». Para la «ö»: labios de «o», decí «e». La «ä» suena como una «e» abierta. En esta lección vas a escuchar pares parecidos para entrenar el oído.",
    ],
    summary: [
      "ü = labios de «u» + lengua de «i» (für, über, Büro).",
      "ö = labios de «o» + lengua de «e» (hören, Löffel, Österreich).",
      "ä = una «e» abierta (spät, Mädchen).",
    ],
  },
  "aussprache/ch-sch": {
    intro: [
      "La «ch» alemana tiene dos sonidos, y ninguno es la «ch» de «chau». Después de «i», «e», «ä», «ö» y «ü» es suave, un soplido con la lengua cerca del paladar («ich», «nicht»). Después de «a», «o», «u» y «au» es fuerte, de garganta, como una «j» española («Buch», «Nacht»).",
      "«sch» suena como el «yo» rioplatense («falsch»), y al principio de una palabra «sp» y «st» suenan «shp» y «sht» («sprechen», «stehen»). El sonido «tsch» sí es como «ch»: «Tschüss».",
    ],
    summary: [
      "ich / nicht: «ch» suave · Buch / Nacht: «ch» fuerte de garganta.",
      "sch = «sh» · sp- = «shp» · st- = «sht».",
      "tsch = «ch» de «chau» (Tschüss).",
    ],
  },
  "aussprache/z-w-v-j": {
    intro: [
      "Cuatro letras que se leen distinto del español. La «z» suena siempre «ts» («Zeit», «Zucker»). La «w» suena como una «v» («wo», «wer», «Welt»). La «v» suena casi siempre como una «f» («Vogel», «vielleicht»), y la «j» suena como una «i» corta («ja»), no como la «j» española ni como el «yo» rioplatense.",
      "Esos pares generan confusiones reales: «Wein» (vino) y «fein» (fino) se escriben distinto y se oyen distinto, y «Zahl» (número) y «Saal» (salón) también.",
    ],
    summary: [
      "z = «ts» · w = «v» · v = «f» · j = «i» corta.",
      "«Zeit» = «tsait» · «Welt» = «velt» · «Vogel» = «fógel» · «ja» = «ia».",
    ],
  },
  "aussprache/r-vokale": {
    intro: [
      "La «r» alemana no se hace con la punta de la lengua: se hace en la garganta, como una «j» suave que vibra un poco. Al final de una palabra, o después de una vocal larga, casi desaparece y suena como una «a» débil: «sehr», «Uhr», «Computer».",
      "Y cuidado con las vocales dobles: «ie» es una «i» larga («Bier»), «ei» suena «ai» («weit», «Zeit») y «eu» suena «oi» («Leute»). Confundir «ie» con «ei» es el error más común de quienes hablan español.",
    ],
    summary: [
      "r = de garganta; al final, casi una «a» débil (sehr, Uhr, -er).",
      "ie = «i» larga · ei = «ai» · eu / äu = «oi».",
    ],
  },

  // ---------- Aussprache II (A2)
  "aussprache-2/vokallaenge": {
    intro: [
      "En alemán la duración de la vocal cambia el significado: «Miete» (alquiler, «i» larga) y «Mitte» (centro, «i» corta) no son la misma palabra. En español las vocales casi no cambian de duración, por eso conviene entrenar el oído.",
      "Regla práctica: antes de una consonante doble (tt, ff, nn) o de varias consonantes la vocal es corta; antes de una sola consonante, de «h» o con «ie» suele ser larga.",
    ],
    summary: [
      "Consonante doble o varias: vocal corta (Mitte, offen, wenn).",
      "Una consonante, «h» o «ie»: vocal larga (Miete, Ofen, wen).",
      "La duración cambia el significado.",
    ],
  },
  "aussprache-2/auslaut": {
    intro: [
      "Al final de una sílaba, «b», «d» y «g» se dicen como «p», «t» y «k»: «Tag» suena «tak», «Kind» suena «kint». Si la palabra se alarga («Tage», «Kinder»), el sonido vuelve a ser el de la letra porque ya no está al final.",
      "Además hay dos grupos que el español no tiene: «pf» (una «p» y enseguida una «f», sin separar) y «kn» (se dicen las dos letras: «k-nii»).",
    ],
    summary: [
      "b, d, g al final de sílaba = p, t, k (Tag, Kind, Korb).",
      "«pf»: p y f pegadas (Pferd, Pfeffer, Pfanne).",
      "«kn»: se dicen las dos letras (Knie).",
    ],
  },
  "aussprache-2/wortakzent": {
    intro: [
      "El español tiene reglas de acento claras (tilde); el alemán no se escribe, y el acento mal puesto hace que no te entiendan. Hay pautas útiles: en los verbos separables el acento va en el prefijo («ÁNrufen»), en los compuestos en la primera parte («FLÚGhafen»).",
      "Los prefijos inseparables («be-», «ge-», «ver-», «er-», «zer-», «ent-») no llevan acento («beSÚchen»), y las terminaciones «-ität», «-ion» y «-ieren» sí («UniversiTÄT»).",
    ],
    summary: [
      "Separables: acento en el prefijo.",
      "Compuestos: acento en la primera parte.",
      "be-, ge-, ver-, er-, zer-, ent-: sin acento.",
      "-ität, -ion, -ieren: acento en la terminación.",
    ],
  },
  // ---------- Aussprache III (B1)
  "aussprache-3/satzmelodie": {
    intro: [
      "La melodía de la oración también es distinta. En alemán las preguntas con palabra interrogativa terminan bajando la voz, las de sí o no suben, y en una lista la voz sube en cada elemento y baja en el último.",
      "Para enfatizar, la palabra importante se dice más alta y fuerte; en un contraste se acentúan las dos palabras que se oponen.",
    ],
    summary: [
      "Palabra interrogativa: baja al final.",
      "Sí o no: sube al final.",
      "Lista: sube y baja en el último elemento.",
      "Contraste: se acentúan las dos palabras que se oponen.",
    ],
  },
  "aussprache-3/schwa": {
    intro: [
      "En español cada vocal se dice completa. En alemán las sílabas sin acento se debilitan: la «-e» final es muy débil, la «-en» casi pierde su vocal («haben» ≈ «haa-bn») y la «-er» final suena como una «a» débil («Lehrer» ≈ «Léehra»).",
      "Reducir bien esas sílabas hace que hables con un ritmo más natural y que se te entienda más fácil.",
    ],
    summary: [
      "-e final: vocal muy débil.",
      "-en: la vocal casi desaparece (haa-bn).",
      "-er final: como una «a» débil (Lehrer = Léehra).",
    ],
  },
  "aussprache-3/pausen": {
    intro: [
      "El español enlaza las palabras («un amigo» ≈ «u-na-mi-go»). El alemán las separa: antes de una vocal inicial hay un golpe suave de glotis, como en «in | Ordnung» o «ein | Apfel».",
      "Además, las comas y las frases largas piden pausas breves. Separar bien las palabras ayuda a que se entienda lo que decís.",
    ],
    summary: [
      "No enlazar palabras: in | Ordnung, ein | Apfel.",
      "Golpe suave antes de una vocal inicial.",
      "Pausa breve en las comas.",
    ],
  },
};
