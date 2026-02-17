"use server"

import {Contact} from "@/models/Contact";
import { dbConnect } from "@/lib/db";
import { updateTag } from "next/cache";

export async function createContact(formData) {
    try {
        await dbConnect();
        const name = formData.get("name");
        const email = formData.get("email");
        const subject = formData.get("subject");
        const message = formData.get("message");

        if (!name || !email || !subject || !message) {
            return {
                success: false,
                error: "All fields are required"
            }
        }

        const contact = new Contact({
            name: name.trim(),
            email: email.trim(),
            subject: subject.trim(),
            message: message.trim()
        });

        return {
            success: true,
            message: "Message sent successfully",
            contactId: contact._id.toString()
        }
       
    } catch (error) {
        console.error("Error creating contact", error); 
        return {
            success: false,
            error: "Try again later"
        }
    }
}

export async function getContacts() {
    try {
        await dbConnect();
        const contacts = await Contact.find().sort({ createdAt: -1}).lean();
        return contacts.map(contact => ({
            ...contact,
            _id: contact._id.toString(),
            createdAt: contact.createdAt,
            updatedAt: contact.updatedAt,
        }));
    } catch (error) {
        console.error("Error fetching contacts", error);
        return [];
    }
}