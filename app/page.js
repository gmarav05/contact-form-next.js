import ContactForm from "@/components/contact-form";
import Link from "next/link";

export default function Home() {
 
  return (
   <main className="min-h-screen py-12 px-4">
    <div className="container mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Server actions Demo project</h1>
        <p className="text-xl text-gray-600 max-2xl mx-auto">Contact form with MongoDB and Revalidation.</p>
      </div>
      <ContactForm/>
      <div className="flex justify-center mt-6">
        <Link
          href="/contacts"
          className="inline-block px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 mt-10"
        >
          View Contacts
        </Link>
      </div>
    </div>
   </main>
  );
}