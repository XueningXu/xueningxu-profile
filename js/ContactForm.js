// js/ContactForm.js
//import React, { useState } from 'react';
const { useState } = React;

function ContactForm() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [showToast, setShowToast] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would handle the form submission.
        console.log(form);


        // Convert form state to a format that can be sent (e.g., JSON)
        const formData = JSON.stringify(form);

        // Send the form data to your backend server
        fetch('http://remains.ddns.net:46315/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: formData,
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })


        // reset form after sending messages
        setForm({
            name: '',
            email: '',
            message: ''
        });

        // notify user of successful send
        setShowToast(true);
        // Hide the toast after a few seconds
        setTimeout(() => {
            setShowToast(false);
        }, 3000);
    };

    return (
        <div className="contact-container">
            {showToast && (
                <div className="toast">Thanks for reaching out! I will get back to you soon :)</div>
            )}
            <div className="contact-photo">
                <img 
                    src="img/ava.jpg" 
                    alt="Xuening Xu" 
                    className="photo" 
                />
                <p>xuening0912@gmail.com<br />
                +1(215) 433-8928</p> 
            </div> 
            <div className="contact-form">
                <form onSubmit={handleSubmit}>
                <div className="input-row">
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Name*"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Email*"
                        required
                    />
                </div> 
                <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Message"
                    required
                />
                <div className="button-container">
                    <button type="submit">Send</button>
                </div>
                </form>
            </div>
        </div>
    );
};

//export default ContactForm;
window.ContactForm = ContactForm;