const Anthropic = require('@anthropic-ai/sdk');

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const EXTRACTION_PROMPT = `Sos un asistente que extrae requisitos de una vacante laboral.
Devolvé EXCLUSIVAMENTE un JSON válido (sin texto adicional, sin markdown, sin backticks) con esta forma exacta:

{
  "mustHave": ["skill1", "skill2"],
  "niceToHave": ["skill1", "skill2"],
  "seniority": "junior|semi-senior|senior",
  "technologies": ["tech1", "tech2"]
}

Texto de la vacante:
`;

exports.extractJobRequirements = async (jobText) => {
    const response = await anthropic.messages.create({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1000,
        messages: [
            {
                role: 'user',
                content: EXTRACTION_PROMPT + jobText
            }
        ]
    });

    let rawText = response.content[0].text.trim();

    // Si la IA envolvió la respuesta en un bloque de markdown, lo limpiamos
    rawText = rawText.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/i, '').trim();

    try {
        return JSON.parse(rawText);
    } catch(err) {
        throw new Error('La IA devolvio un formato invalido. ' + rawText.slice(0, 200));
    }
}