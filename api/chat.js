// Fonction serverless Vercel — appelle l'API Anthropic (Claude).
// La clé est lue depuis la variable d'environnement ANTHROPIC_API_KEY (jamais exposée au navigateur).

const MODEL = "claude-haiku-4-5"; // modèle économique adapté au chat ; modifiable si besoin

const SYSTEM = `Tu es l'assistant virtuel de M'Eye Clinic, une clinique d'ophtalmologie située au port de Nice (3 Rue Fodéré, 06300 Nice) et à Blausasc (1 chemin de Vienne, 06440). Téléphone Nice : 04 97 19 30 46. Prise de rendez-vous sur Doctolib.

TON RÔLE : donner des informations GÉNÉRALES, claires et rassurantes, en français, sur les pathologies oculaires, les examens, les interventions (cataracte, chirurgie laser réfractive, glaucome, rétine/DMLA, injections intravitréennes, strabisme, kératocône) et le suivi post-opératoire.

RÈGLES IMPÉRATIVES :
- Tu ne poses JAMAIS de diagnostic et tu ne donnes PAS d'avis médical personnalisé. Tu expliques des notions générales.
- Tu rappelles, quand c'est pertinent, que seul un ophtalmologue peut évaluer un cas particulier après examen.
- Pour prendre rendez-vous, tu orientes vers Doctolib ou le 04 97 19 30 46.
- En cas de signe d'urgence (baisse brutale de vision, douleur intense, œil rouge douloureux, éclairs lumineux et pluie de corps flottants, traumatisme), tu invites à consulter en urgence ou à appeler le 04 97 19 30 46 (SOS Œil à Nice).
- Tu es chaleureux, concis et pédagogique. Réponses courtes (3 à 6 phrases) sauf si on te demande plus de détails. Tu peux utiliser **gras** pour les points clés.
- Tu ne fais pas de promesses de résultats et tu ne donnes pas de tarifs précis (tu renvoies au secrétariat).`;

export default async function handler(req, res) {
  if (req.method !== "POST") { res.status(405).json({ error: "Method not allowed" }); return; }
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) { res.status(500).json({ reply: "L'assistant n'est pas encore configuré (clé manquante). Contactez le secrétariat au 04 97 19 30 46." }); return; }

  try {
    let body = req.body;
    if (typeof body === "string") body = JSON.parse(body || "{}");
    let messages = (body && Array.isArray(body.messages)) ? body.messages : [];
    // garde les 12 derniers échanges, ne conserve que role+content texte
    messages = messages.slice(-12).map(m => ({ role: m.role === "assistant" ? "assistant" : "user", content: String(m.content || "").slice(0, 4000) }));
    if (!messages.length) { res.status(200).json({ reply: "Bonjour ! Posez-moi votre question sur vos yeux." }); return; }

    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "content-type": "application/json", "x-api-key": key, "anthropic-version": "2023-06-01" },
      body: JSON.stringify({ model: MODEL, max_tokens: 700, system: SYSTEM, messages })
    });

    if (!r.ok) {
      const t = await r.text();
      console.error("Anthropic error", r.status, t);
      res.status(200).json({ reply: "Désolé, l'assistant est momentanément indisponible. Réessayez dans un instant, ou appelez le 04 97 19 30 46." });
      return;
    }
    const data = await r.json();
    const reply = (data.content && data.content[0] && data.content[0].text) ? data.content[0].text : "Je n'ai pas pu formuler de réponse. Réessayez ou appelez le 04 97 19 30 46.";
    res.status(200).json({ reply });
  } catch (e) {
    console.error(e);
    res.status(200).json({ reply: "Une erreur est survenue. Réessayez, ou contactez le secrétariat au 04 97 19 30 46." });
  }
}
