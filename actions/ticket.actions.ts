'use server';
// import * as Sentry from '@sentry/nextjs';
import { prisma } from '@/db/prisma';
import { revalidatePath } from 'next/cache';
import { logEvent } from '@/utils/sentry';
// import { getCurrentUser } from '@/lib/current-user';

// Create New Ticket
export async function createTicket(
  prevState: { success: boolean; message: string },
  formData: FormData,
): Promise<{ success: boolean; message: string }> {
  try {
    // const user = await getCurrentUser();

    // if (!user) {
    //   logEvent('Unauthorized ticket creation attempt', 'ticket', {}, 'warning');

    //   return {
    //     success: false,
    //     message: 'You must be logged in to create a ticket',
    //   };
    // }

    // await new Promise((res) => setTimeout(res, 3000));

    const subject = formData.get('subject') as string;
    const description = formData.get('description') as string;
    const priority = formData.get('priority') as string;

    if (!subject || !description || !priority) {
      logEvent(
        'Validation Error: Missing ticket fields',
        'ticket',
        { subject, description, priority },
        'warning',
      );
      return { success: false, message: 'All fields are required' };
    }

    const ticket = await prisma.ticket.create({
      data: {
        subject,
        description,
        priority,
        // user: {
        //   connect: { id: user.id },
        // },
      },
    });

    logEvent(
      `Ticket created successfully: ${ticket.id}`,
      'ticket',
      { ticketId: ticket.id },
      'info',
    );

    revalidatePath('/tickets');

    return { success: true, message: 'Ticket created successfully' };
  } catch (error) {
    logEvent(
      'An error occured while creating the ticket',
      'ticket',
      {
        formData: Object.fromEntries(formData.entries()),
      },
      'error',
      error,
    );

    return {
      success: false,
      message: 'An error occured while creating the ticket',
    };
  }
}
