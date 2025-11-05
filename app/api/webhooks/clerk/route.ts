import { verifyWebhook } from '@clerk/nextjs/webhooks'
import { NextRequest } from 'next/server'
import { prisma } from '@/lib/db'
import { PrismaClient } from '@prisma/client'

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req)

    if (evt.type === 'user.created') {
      const { id, email_addresses, first_name, last_name } = evt.data

      try {
        if (!email_addresses?.[0]?.email_address) {
          throw new Error('No email address found in webhook payload')
        }

        const fullName = `${first_name || ''} ${last_name || ''}`.trim()
        const email = email_addresses[0].email_address

        await prisma.user.create({
          data: {
            id,
            email,
            name: fullName || email.split('@')[0] // Use email prefix if no name provided
          }
        })
        
        console.log(`User with ID ${id} was successfully created in the database.`)
      } catch (error) {
        console.error('Error saving user to the database:', error)
        return new Response(
          JSON.stringify({ 
            error: 'Failed to process user creation',
            details: error instanceof Error ? error.message : 'Unknown error'
          }), 
          { 
            status: 500,
            headers: { 'Content-Type': 'application/json' }
          }
        )
      }
    }
    
    return new Response(
      JSON.stringify({ message: 'Webhook processed successfully' }),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  } catch (err) {
    console.error('Error processing webhook:', err)
    return new Response(
      JSON.stringify({ 
        error: 'Invalid webhook',
        details: err instanceof Error ? err.message : 'Unknown error'
      }),
      { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }
}