
    (function() {
        const form = document.getElementById('leadForm');
        const WHATSAPP_NUMBER = '919789029012'; // 9789029012 with country code 91
        
        function getSelectedBill() {
            const radios = document.querySelectorAll('input[name="bill"]');
            for (let radio of radios) {
                if (radio.checked) {
                    return radio.value;
                }
            }
            return 'Not specified';
        }
        
        function formatWhatsAppMessage() {
            const fullName = document.getElementById('fullName')?.value || '';
            const whatsappNumber = document.getElementById('whatsappNumber')?.value || '';
            const selectedBill = getSelectedBill();
            const pincode = document.getElementById('pincode')?.value || '';
            const city = document.getElementById('city')?.value || '';
            const email = document.getElementById('email')?.value || '';
            
            const message = `🌟 *New Lead from Sharabesh Website* 🌟%0A%0A` +
                `*👤 Name:* ${fullName}%0A` +
                `*📱 WhatsApp:* ${whatsappNumber}%0A` +
                `*💰 Monthly Electricity Bill:* ${selectedBill}%0A` +
                `*📍 Pincode:* ${pincode}%0A` +
                `*🏙️ City:* ${city || 'Not specified'}%0A` +
                `*📧 Email:* ${email || 'Not specified'}%0A` +
                `%0A*📅 Request:* FREE Solar Consultation%0A` +
                `*⚡ Company:* Sharabesh Technologies & Energies%0A` +
                `%0A_This lead is from the website contact form._`;
            
            return message;
        }
        
        function validateForm() {
            const fullName = document.getElementById('fullName')?.value.trim();
            const whatsappNumber = document.getElementById('whatsappNumber')?.value.trim();
            const pincode = document.getElementById('pincode')?.value.trim();
            const termsCheckbox = document.getElementById('termsCheckbox');
            const billSelected = document.querySelector('input[name="bill"]:checked');
            
            if (!fullName) {
                alert('Please enter your full name.');
                return false;
            }
            
            if (!whatsappNumber) {
                alert('Please enter your WhatsApp number.');
                return false;
            }
            
            // Basic WhatsApp number validation (10 digits)
            const phoneRegex = /^[0-9]{10}$/;
            if (!phoneRegex.test(whatsappNumber.replace(/\s/g, ''))) {
                alert('Please enter a valid 10-digit WhatsApp number.');
                return false;
            }
            
            if (!pincode) {
                alert('Please enter your pincode.');
                return false;
            }
            
            if (!billSelected) {
                alert('Please select your monthly electricity bill range.');
                return false;
            }
            
            if (!termsCheckbox.checked) {
                alert('Please agree to the terms of service & privacy policy.');
                return false;
            }
            
            return true;
        }
        
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                if (!validateForm()) {
                    return;
                }
                
                const message = formatWhatsAppMessage();
                const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
                
                // Open WhatsApp in a new tab
                window.open(whatsappUrl, '_blank');
                
                // Optional: Show a success message
                alert('Redirecting to WhatsApp! Please send the message to connect with our solar expert.');
                
                // Optional: Reset form after submission
                // form.reset();
            });
        }
    })();

