"use server"

import {Contact} from "@/models/Contact";
import { dbConnect } from "@/lib/db";
import { revalidatePath, revalidateTag, updateTag } from "next/cache";

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
            message: message.trim(),
        });

        await contact.save();
        revalidatePath("/contacts");

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

export async function updateContact(contactId, status) {
    try {
        await dbConnect();
        await Contact.findByIdAndUpdate(contactId, {status})
        revalidateTag("contact-stats")
        return {
            success: true,
        }
    } catch (error) {
        console.error("Error updating contact", error);
        return {
            success: false,
            error: "Try again later"
        }
    }
}

export async function getContactStats() {
  try {
    await dbConnect();

    const total = await Contact.countDocuments();
    const newCount = await Contact.countDocuments({ status: "new" });
    const readCount = await Contact.countDocuments({ status: "read" });
    const repliedCount = await Contact.countDocuments({ status: "replied" });

    return {
      total,
      newCount,
      readCount,
      repliedCount,
    };
  } catch (error) {
    console.error("Error fetching contact stats", error);

    return {
      total: 0,
      newCount: 0,
      readCount: 0,
      repliedCount: 0,
    };
  }
}
