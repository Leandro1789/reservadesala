import { Resend } from 'resend';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  const { nome, emailResponsavel, emailParoquia, sala, evento, data, horario } = req.body;

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: 'reservas@paroquia.com.br',
      to: [emailResponsavel, emailParoquia],
      subject: `Confirmação de Reserva - ${evento}`,
      html: `
        <h3>Reserva Confirmada</h3>
        <p><strong>Responsável:</strong> ${nome}</p>
        <p><strong>Sala:</strong> ${sala}</p>
        <p><strong>Evento:</strong> ${evento}</p>
        <p><strong>Data/Horário:</strong> ${data} - ${horario}</p>
        <p>Paróquia Cristo Rei - Blumenau/SC</p>
      `
    });

    return res.status(200).json({ message: 'E-mail enviado com sucesso!' });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao enviar e-mail', error });
  }
}
