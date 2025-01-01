import React from 'react';

const { useState } = React;

function ContactForm() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [showToast, setShowToast] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Get the reCAPTCHA response token from the global grecaptcha object
        const recaptchaResponse = grecaptcha.getResponse();

        // Here handle the form submission.
        console.log(form);

        // Convert form state to a format that can be sent (e.g., JSON)
        const formData = JSON.stringify({ ...form, recaptchaResponse });

        // Send the form data to backend server
        fetch('https://remains.ddns.net:46315/send-email', {
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
            subject: '',
            message: ''
        });
        // Reset the reCAPTCHA widget
        grecaptcha.reset();

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
                    src="img/xu.jpg" 
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
                <div className="input-row">
                    <input
                        type="text"
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        placeholder="Subject*"
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
                <div className="recaptcha-button-wrapper">
                    <div className="g-recaptcha" data-sitekey="6LewAvooAAAAAAP98pvAGKGsXp48upCa3tiN7ETa"></div>
                    <button type="submit" className="send-button">Send</button>
                </div>
                </form>
            </div>
        </div>
    );
};

//export default ContactForm;
window.ContactForm = ContactForm;