// Flux "Actualités" auto-publié pour meyeclinic.fr (clinique généraliste).
// Servi avec CORS pour être lu par meyeclinic.fr (page /actualites) via injection Netlify.
// La tâche programmée insère chaque nouvel article JUSTE APRÈS le marqueur ci-dessous
// (donc en tête = le plus récent). Format : { cat, title, excerpt }.
const ARTICLES = [
  /* === NOUVEL ARTICLE ICI : insérer un objet { cat, title, excerpt }, suivi d'une virgule, juste après cette ligne === */
  { ill: "diabete", cat: "Rétine", title: "Diabète et vision : pourquoi un fond d'œil chaque année ?", excerpt: "Le diabète peut abîmer les petits vaisseaux de la rétine, souvent sans aucun symptôme au début. Un fond d'œil (ou une imagerie de la rétine) une fois par an permet de repérer ces atteintes avant qu'elles ne touchent la vision, et de traiter à temps par laser ou injections si besoin. Un bon équilibre du diabète et de la tension reste la meilleure protection." },
  { ill: "urgence", cat: "Urgences", title: "Éclairs et pluie de corps flottants : quand consulter en urgence ?", excerpt: "L'apparition soudaine d'éclairs lumineux, d'une pluie de points noirs ou d'un voile dans le champ de vision doit alerter : ce sont des signes possibles de déchirure ou de décollement de la rétine. Pris à temps, cela se traite très bien ; négligé, le pronostic est plus lourd. En cas de doute, mieux vaut un examen pour rien qu'un retard — Urgences SOS Œil au 04 97 19 30 46." },
  { ill: "secheresse", cat: "Surface oculaire", title: "Yeux qui piquent devant les écrans : et si c'était une sécheresse oculaire ?", excerpt: "Picotements, sensation de sable, vision qui fluctue en fin de journée : la sécheresse oculaire est très fréquente, favorisée par les écrans et la climatisation. Quelques réflexes aident : cligner volontairement, faire des pauses régulières, aérer les pièces et utiliser des larmes artificielles. Si la gêne persiste, un examen permet d'en identifier la cause et d'adapter le traitement." },
  { ill: "glaucome", cat: "Glaucome", title: "Glaucome : pourquoi un dépistage régulier après 40 ans change tout", excerpt: "Le glaucome abîme le nerf optique lentement et sans douleur : quand la vision baisse, les dégâts sont déjà installés. D'où l'importance d'un contrôle régulier de la pression oculaire et du nerf optique, surtout après 40 ans ou en cas d'antécédents familiaux. Dépisté tôt, il se contrôle très bien par collyres, laser ou chirurgie. Un simple examen suffit à faire le point." }
];

export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Cache-Control", "public, max-age=300");
  if (req.method === "OPTIONS") { res.status(204).end(); return; }
  res.status(200).json({ articles: ARTICLES });
}
