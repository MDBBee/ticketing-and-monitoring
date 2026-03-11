// import { Button } from '@base-ui/react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FaTicketAlt } from 'react-icons/fa';

const HomePage = () => {
  return (
    <main className="flex flex-col text-center items-center justify-center min-h-screen px-4">
      <FaTicketAlt className="mx-auto mb-4 text-red-600" size={60} />
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-blue-600">
        Welcome to Quick Ticket
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Fast and simple support ticket management system.
      </p>

      <div className="flex flex-col md:flex-row gap-4 justify-center animate-slide">
        <Button>
          <Link href="/tickets/new" className=" px-6 py-3 rounded shadow">
            Submit a Ticket
          </Link>
        </Button>
        <Button>
          <Link href="/tickets" className=" px-6 py-3 rounded shadow ">
            View Tickets
          </Link>
        </Button>
      </div>
    </main>
  );
};

export default HomePage;
