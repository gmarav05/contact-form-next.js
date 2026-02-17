import { Button } from "@/components/ui/button";
import Link from 'next/link';
import React from "react";
import ContactsLists from "@/components/contact-list.jsx";
import ContactStats from "@/components/contact-stats.jsx";

const Contacts = () => {
    return (
        <main className="min-h-screen py-8 px-4">
            <div className="container mx-auto max-w-4xl">
                <div className="mb-8">
                    <Link href={"/"}>
                        <Button 
                            variant="outline"
                            size={"sm"}
                            className={"mb-4 bg-transparent"}
                        >Back to Home</Button>
                    </Link>
                </div>
                <ContactStats/>
                <ContactsLists/>
            </div>
        </main>

    )
}

export default Contacts;