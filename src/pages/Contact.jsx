import React, { useState } from "react";
import { motion } from "framer-motion";
import {Mail, Phone, MapPin, Send } from "lucide-react"

//Contact Page
//left: intro text + contact details + image
//right: simple contact form (name/email/subj/message)

export default function Contact() {
 //Basic local form from state (no backend rn, just console + temp placeholder)
 const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
 });

 //Handle input changes for all fields
 const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value}));
 };

 //Handle form submit (currently just logs; cna plug in EmailJS, API, ect later)
 const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    //TO-DO: replace with real submission logic for later
    alert("Form Submitted"); //subject to be changed/removed
 };

 return (
    //Full page BG & TXT color
    <div className="min-h-screen bg-[#FAFAF9] text-neutral-900">
        {/* Main content container aligned w/ rest of site */}
        <div className="mx-auto max-w-5xl px-4 md:px-8 lg:px-12 py-12 md:py-16 lg:py-20">
        {/* Header/Title */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0}}
          transition={{ duration: 0.6}}
          className="mb-12 md:mb-16"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight">
                Contact
            </h1>
            <div className="mt-4 w-16 h-[1px] bg-neutral-900" />
          </motion.div>
          {/* Two column layout: left into/right form */}
          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            {/* Left Col: intro text + contact details + image? */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0}}
              transition={{ duration: 0.6, delay: 0.1}}
              className="space-y-10"
              >
                {/* Intro copy */}
                <div>
                    <p className="text-lg font-light text-neutral-900 leading-relaxed mb-4">
                        test test test test test
                    </p>
                    <p className="text-sm md:text-base text-neutral-600 leading-relaxed font-light">
                        Blah Blah&apos;s this is a test yer
                        yerr 
                    </p>
                </div>

                {/* Contact details (email/phone/location) */}
                <div className="space-y-5">
                   {/* Email (simple, no icon) */}
<div>
  <a
    href="mailto:hello@example.com"
    className="text-sm md:text-base text-neutral-900 hover:underline"
  >
    hello@example.com
  </a>
</div>

                </div>
                {/* Supporting image (can get rid of this or some logo)*/}
                <div className="pt-2">
                    <img
                      src="/photos/contact-placeolder.jpg" //own file
                      alt="Studio or environment"
                      className="w-full h-56 md:h-64 object-cover grayscale fluid shadow-sm"
                      />    
                </div>
              </motion.div>
              { /* Right column: contact form */}
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                >
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name Field */}
                        <div>
                            <label className="block text-xs uppercase tracking-[0.18em] text-neutral-500 mb-2">
                                Name
                            </label>
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              className="w-full bg-transparent border-0 border-b border-neutral-300 focus:border-neutral-900 focus:ring-0 px-0 py-2 text-sm md:text-base font-light"
                              required
                              />
                        </div>

                        {/* Email field */}
                        <div>
                            <label className="block text-xs uppercase tracking-[0.18em] text-neutral-500 mb-2">
                                Email
                            </label>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              className="w-full bg-transparent border-0 border-b border-neutral-300 focus:border-neutral-900 focus:ring-0 px-0 py-2 text-sm md:text-base font-light"
                              required
                              />
                        </div>

                        {/* Subject field */}
                        <div>
                            <label className="block text-xs uppercase tracking-[0.18em] text-neutral-500 mb-2">
                                Subject
                            </label>
                            <input
                              type="text"
                              name="subject"
                              value={formData.subject}
                              onChange={handleChange}
                              className="w-full bg-transparent border-0 border-b border-neutral-300 focus:border-neutral-900 focus:ring-0 px-0 py-2 text-sm md:text-base font-light"
                              required
                              />
                        </div>

                        {/* Message field */}
                        <div>
                            <label className="block text-xs uppercase tracking-[0.18em] text-neutral-500 mb-2">
                                Message
                            </label>
                            <textarea
                              name="message"
                              value={formData.message}
                              onChange={handleChange}
                              className="w-full bg-transparent border-0 border-b border-neutral-300 focus:border-neutral-900 focus:ring-0 px-0 py-2 text-sm md:text-base font-light min-h-[120px] resize-y"
                              required
                              />
                        </div>
                        {/* Submit button */}
                        <button
                          type="submit"
                          className="inline-flex items-center justify-center w-full bg-neutral-900 hover:bg-neutral-800 text-white py-3 md:py-4 text-xs md:text-sm font-light tracking-[0.2em] uppercase transition-transform duration-200 hover:translate-x-1"
                          >
                            <span>Submit</span>
                            <Send className="w-4 h-4 ml-2" />
                          </button>
                    </form>
                </motion.div>
          </div>
      </div>
    </div>
 );
}