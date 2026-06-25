import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { name, email, subject, message, highPriority } = await request.json()

    // 1. Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields (name, email, subject, message) are required.' },
        { status: 400 }
      )
    }

    const accessKey = process.env.WEB3FORMS_ACCESS_KEY

    // 2. Check configuration
    if (!accessKey) {
      console.warn(
        '[Contact API] WEB3FORMS_ACCESS_KEY is not set in environment variables. Simulating success.'
      )
      return NextResponse.json({
        success: true,
        message: 'Signal composed (Simulated - WEB3FORMS_ACCESS_KEY not configured).',
      })
    }

    console.log('[Contact API] Access Key present:', !!accessKey)
    console.log('[Contact API] Request payload:', { name, email, subject, highPriority })

    // 3. Submit to Web3Forms API
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
      body: JSON.stringify({
        access_key: accessKey,
        name: name,
        email: email,
        subject: `[Portfolio Signal] ${subject} ${highPriority ? '🚨' : ''}`,
        message: message,
        from_name: `${name} (Via Portfolio)`,
        replyto: email,
      }),
    })

    const responseText = await response.text()
    console.log('[Contact API] Web3Forms status:', response.status)
    console.log('[Contact API] Web3Forms response body:', responseText)

    let data
    try {
      data = JSON.parse(responseText)
    } catch (e: any) {
      throw new Error(`Web3Forms returned non-JSON response (Status ${response.status}): ${responseText.substring(0, 200)}`)
    }

    if (!response.ok || !data.success) {
      throw new Error(data.message || 'Web3Forms API call failed')
    }

    return NextResponse.json({
      success: true,
      message: 'Signal broadcasted successfully to orbital headquarters.',
    })
  } catch (error: any) {
    console.error('[Contact API] Error forwarding to Web3Forms:', error)
    return NextResponse.json(
      { error: 'Failed to broadcast signal. Please try again later.', details: error.message || error.toString() },
      { status: 500 }
    )
  }
}
