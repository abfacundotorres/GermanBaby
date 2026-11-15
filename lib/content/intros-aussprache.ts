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
};
