sendMessage = async () => {
    let name = $("#sender-name").val().trim();
    let subject = $("#sender-subject").val().trim();
    let message = $("#sender-message").val().trim();

    let error = false;

    if (name.length === 0) {
        $("#sender-name").val('');
        $("#sender-name").attr("placeholder", "Name must not be Empty!");
        error = true;
    }

    if (message.length === 0) {
        $("#sender-message").val('');
        $("#sender-message").attr("placeholder", "Message must not be Empty!");
        error = true;
    }

    if (error) return;

    this.setState({ sending: true });

    const formData = {
        name: name,
        subject: subject,
        message: message,
    };

    const FORMSPREE_ENDPOINT = "https://formspree.io/f/mldjoezb";

    try {
        const response = await fetch(FORMSPREE_ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            this.setState({ sending: false });
            $("#close-gedit").trigger("click");
        } else {
            throw new Error("Failed to send message");
        }
    } catch (err) {
        console.error("Error:", err);
        this.setState({ sending: false });
        $("#close-gedit").trigger("click");
    }

    ReactGA.event({
        category: "Send Message",
        action: `${name}, ${subject}, ${message}`,
    });
}
