import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// pour Vercel : force le runtime Node.js 
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// --- Helpers ---

// Échappe les caractères HTML dangereux 
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Vérifie qu'un email est valide
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// --- Route API ---

export async function POST(req: Request) {
  try {
    // 1. Vérifie les variables d'environnement
    const apiKey = process.env.RESEND_API_KEY;
    const contactEmail = process.env.CONTACT_EMAIL;

    if (!apiKey || !contactEmail) {
      console.error('[CONTACT] Variables manquantes : RESEND_API_KEY ou CONTACT_EMAIL');
      return NextResponse.json(
        { error: 'Configuration serveur manquante' },
        { status: 500 }
      );
    }

    // 2. Parse le body
    let body: { name?: string; email?: string; message?: string };
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: 'Requête invalide' }, { status: 400 });
    }

    const { name, email, message } = body;

    // 3. Valide les champs
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Champs manquants' }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Email invalide' }, { status: 400 });
    }

    if (name.length > 100 || email.length > 150 || message.length > 5000) {
      return NextResponse.json({ error: 'Contenu trop long' }, { status: 400 });
    }

    // 4. Échappe les valeurs pour éviter l'injection HTML
    const safeName = escapeHtml(name.trim());
    const safeEmail = escapeHtml(email.trim());
    const safeMessage = escapeHtml(message.trim());

    // 5. Envoie l'email
    const resend = new Resend(apiKey);

    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: contactEmail,
      subject: `💬 Nouveau message de ${safeName}`,
      replyTo: email.trim(),
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0f0f16; color: #e5e7eb; padding: 24px; border-radius: 12px;">
          <h2 style="color: #22d3ee; margin-top: 0;">Nouveau message depuis ton portfolio</h2>
          <hr style="border: none; border-top: 1px solid #1f1f2e; margin: 20px 0;">
          <p><strong style="color: #a855f7;">Nom :</strong> ${safeName}</p>
          <p><strong style="color: #a855f7;">Email :</strong> <a href="mailto:${safeEmail}" style="color: #22d3ee;">${safeEmail}</a></p>
          <p><strong style="color: #a855f7;">Message :</strong></p>
          <div style="background: #14141c; padding: 16px; border-radius: 8px; border-left: 3px solid #22d3ee;">
            <p style="white-space: pre-wrap; margin: 0;">${safeMessage}</p>
          </div>
          <hr style="border: none; border-top: 1px solid #1f1f2e; margin: 20px 0;">
          <p style="font-size: 12px; color: #6b7280; text-align: center;">
            Envoyé depuis ton portfolio • <a href="mailto:${safeEmail}" style="color: #22d3ee;">Répondre à ${safeName}</a>
          </p>
        </div>
      `
    });

    if (error) {
      console.error('[CONTACT] Erreur Resend:', error);
      return NextResponse.json(
        { error: "Erreur d'envoi", details: error.message },
        { status: 500 }
      );
    }

    console.log('[CONTACT] Email envoyé avec succès. ID:', data?.id);

    return NextResponse.json({ ok: true, id: data?.id });
  } catch (error) {
    console.error('[CONTACT] Erreur inattendue:', error);
    return NextResponse.json(
      {
        error: 'Erreur serveur',
        details: error instanceof Error ? error.message : 'Inconnue'
      },
      { status: 500 }
    );
  }
}