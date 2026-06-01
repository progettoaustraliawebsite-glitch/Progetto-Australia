import { NextRequest, NextResponse } from 'next/server';

const PORTAL_ID = '148473815';
const FORM_GUID = '4766db48-0d61-47dd-b799-5a944b1af02a';

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }

  const res = await fetch(
    `https://api.hsforms.com/submissions/v3/integration/submit/${PORTAL_ID}/${FORM_GUID}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fields: [{ name: 'email', value: email }],
        context: { pageUri: req.headers.get('referer') ?? '', pageName: 'Newsletter' },
      }),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    console.error('HubSpot error:', err);
    return NextResponse.json({ error: 'HubSpot submission failed' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
