import React from 'react'

/**
* @author
* @function Contact
**/

export const Contact = (props) => {
  return(
    <div className="container mx-auto px-4 py-12">
    <h1 className="text-4xl font-bold text-center mb-6">Contact Us</h1>
    <p className="text-center text-gray-600 mb-8">
      Have any questions? We'd love to hear from you! Reach out to us using the form below.
    </p>

    <div className="grid md:grid-cols-2 gap-8">
      {/* Contact Form */}
      <div className="p-6 border rounded-lg shadow-md bg-white">
        <h2 className="text-2xl font-semibold mb-4">Send Us a Message</h2>
        <form className="space-y-8">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 border rounded-md"
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-3 border rounded-md"
            required
          />
          <textarea
            placeholder="Your Message"
            rows="4"
            className="w-full p-3 border rounded-md"
            required
          ></textarea>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
          >
            Send Message
          </button>
        </form>
      </div>

      {/* Contact Information */}
      <div className="text-gray-700">
        <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
        <p className="mb-2">📍 Address: Akshya Nagar, Bangalore-560016</p>
        <p className="mb-2">📞 Phone: +91 9999999999</p>
        <p className="mb-2">📧 Email: support@tshirtlelo.com</p>
        
        {/* Google Maps Embed */}
        <div className="mt-4">
          <iframe
            className="w-full h-64 rounded-md shadow-md"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.992555755862!2d77.61401377495912!3d12.92615118739157!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1564f2a36a21%3A0x2cf963dcdf478e3b!2sAkshya%20Nagar%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1647910884989!5m2!1sen!2sin"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
   )
  }
