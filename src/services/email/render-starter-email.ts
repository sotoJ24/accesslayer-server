export default function renderStarterEmail(
   title: string,
   message: string
): string {
   return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${title}</title>
      </head>
      <body style="margin:0;padding:0;background:#f5f7fb;font-family:Arial,Helvetica,sans-serif;color:#111827;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="padding:32px 16px;">
          <tr>
            <td align="center">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;background:#ffffff;border-radius:16px;padding:32px;border:1px solid #e5e7eb;">
                <tr>
                  <td>
                    <p style="margin:0 0 8px;font-size:12px;letter-spacing:0.14em;text-transform:uppercase;color:#6b7280;">
                      Access Layer
                    </p>
                    <h1 style="margin:0 0 16px;font-size:28px;line-height:1.2;color:#0f172a;">
                      ${title}
                    </h1>
                    <div style="font-size:16px;line-height:1.7;color:#374151;">
                      ${message}
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
   `;
}
